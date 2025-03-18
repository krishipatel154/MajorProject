import { useState, useEffect } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import { useAuth } from "../context/AuthContext";

const LiveStream = ({ courseId, isTeacher }) => {
  const [client, setClient] = useState(null);
  const [localTracks, setLocalTracks] = useState(null);
  const { user } = useAuth();

  const AGORA_APP_ID = process.env.REACT_APP_AGORA_APP_ID;

  useEffect(() => {
    const init = async () => {
      const agoraClient = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
      setClient(agoraClient);

      if (isTeacher) {
        const [audioTrack, videoTrack] =
          await AgoraRTC.createMicrophoneAndCameraTracks();
        setLocalTracks([audioTrack, videoTrack]);
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
      // Get token from your backend
      const response = await fetch(`/api/agora/token?channelName=${courseId}`);
      const data = await response.json();
      const { token } = data;

      await client.join(AGORA_APP_ID, courseId, token, user._id);

      if (isTeacher && localTracks) {
        await client.publish(localTracks);
      }
    } catch (error) {
      console.error("Error joining stream:", error);
    }
  };

  return (
    <div className="live-stream-container">
      <div className="video-container">
        {isTeacher && localTracks && (
          <div className="local-video">
            <video
              ref={(ref) => {
                if (ref) localTracks[1].play(ref);
              }}
            />
          </div>
        )}
      </div>
      <button onClick={handleJoinStream} className="stream-button">
        {isTeacher ? "Start Stream" : "Join Stream"}
      </button>
    </div>
  );
};

export default LiveStream;
