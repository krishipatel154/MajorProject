import { useState, useEffect } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { handleError } from "../../utils";

const LiveStream = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const [localTracks, setLocalTracks] = useState(null);
  const [users, setUsers] = useState([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const role = useSelector((state) => state.auth.role);
  const isTeacher = role === "admin";

  const AGORA_APP_ID = "96566ecc4b16414ba6d02e54a2fd806b";
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const init = async () => {
      const agoraClient = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
      setClient(agoraClient);

      if (isTeacher) {
        try {
          const [audioTrack, videoTrack] =
            await AgoraRTC.createMicrophoneAndCameraTracks();
          setLocalTracks([audioTrack, videoTrack]);
        } catch (error) {
          handleError("Failed to access camera and microphone");
        }
      }
    };

    init();
    return () => {
      if (localTracks) {
        localTracks[0].close();
        localTracks[1].close();
      }
    };
  }, []);

  const handleJoinStream = async () => {
    if (!client) return;

    try {
      const response = await fetch(
        `http://localhost:8089/course/get-stream-token?channelName=${courseId}`,
        { headers }
      );
      const data = await response.json();
      const { token } = data;

      await client.join(AGORA_APP_ID, courseId, token);
      setIsStreaming(true);

      if (isTeacher && localTracks) {
        await client.publish(localTracks);
      }

      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        if (mediaType === "video") {
          setUsers((prevUsers) => [...prevUsers, user]);
        }
        if (mediaType === "audio") {
          user.audioTrack.play();
        }
      });

      client.on("user-unpublished", (user) => {
        setUsers((prevUsers) => prevUsers.filter((u) => u.uid !== user.uid));
      });
    } catch (error) {
      handleError("Error joining stream");
    }
  };

  const handleLeaveStream = async () => {
    if (localTracks) {
      localTracks.forEach((track) => track.close());
    }
    await client?.leave();
    setIsStreaming(false);
    navigate(`/view-course-details/${courseId}`);
  };

  return (
    <div className="live-stream-container p-4 min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="video-container bg-black rounded-lg min-h-[500px] relative mb-4">
          {isTeacher && localTracks && (
            <div className="local-video absolute top-4 right-4 w-[200px] h-[150px] bg-gray-800 rounded">
              <video
                ref={(ref) => {
                  if (ref && localTracks[1]) {
                    localTracks[1].play(ref); // Playing the local video track
                  }
                }}
                className="w-full h-full object-cover rounded"
              />
            </div>
          )}

          {users.map((user) => (
            <div key={user.uid} className="remote-video w-full h-full">
              <video
                ref={(ref) => {
                  if (ref && user.videoTrack) {
                    user.videoTrack.play(ref); // Play the remote video track
                  }
                }}
                className="w-full h-full object-cover"
                muted // Add muted to handle autoplay restrictions
              />
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4">
          {!isStreaming ? (
            <button
              onClick={handleJoinStream}
              className="text-2xl font-semibold bg-back text-text px-6 py-2 rounded hover:bg-[#03476F]"
            >
              {isTeacher ? "Start Stream" : "Join Stream"}
            </button>
          ) : (
            <button
              onClick={handleLeaveStream}
              className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
            >
              Leave Stream
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveStream;
