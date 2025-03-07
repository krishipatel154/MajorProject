// import { useState, useEffect } from "react";
// import AgoraRTC from "agora-rtc-sdk-ng";
// // import { useAuth } from '../context/AuthContext';

// const LiveStream = ({ courseId, isTeacher }) => {
//   const [client, setClient] = useState(null);
//   const [localTracks, setLocalTracks] = useState(null);
//   // const { user } = useAuth();

//   const AGORA_APP_ID = process.env.NEXT_PUBLIC_AGORA_APP_ID;

//   useEffect(() => {
//     const init = async () => {
//       const agoraClient = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
//       setClient(agoraClient);

//       if (isTeacher) {
//         const [audioTrack, videoTrack] =
//           await AgoraRTC.createMicrophoneAndCameraTracks();
//         setLocalTracks([audioTrack, videoTrack]);
//       }
//     };

//     init();

//     return () => {
//       if (localTracks) {
//         localTracks[0]?.close();
//         localTracks[1]?.close();
//       }
//     };
//   }, [isTeacher, localTracks]);

//   const handleJoinStream = async () => {
//     if (!client) return;

//     try {
//       // Generate token from your backend
//       const tokenResponse = await fetch(
//         `/api/agora/token?channelName=${courseId}`
//       );
//       const { agoraToken } = await tokenResponse.json();

//       const userId = user?.id || "guest"; // Fallback if user is not defined
//       await client.join(AGORA_APP_ID, courseId, agoraToken, userId);

//       if (isTeacher && localTracks) {
//         await client.publish(localTracks);
//       }
//     } catch (error) {
//       console.error("Error joining stream:", error);
//     }
//   };

//   return (
//     <div className="w-full h-full">
//       <div className="video-container">
//         {isTeacher && localTracks && (
//           <div className="local-video">
//             <video
//               ref={(ref) => {
//                 if (ref) localTracks[1].play(ref);
//               }}
//             />
//           </div>
//         )}
//       </div>
//       <button
//         onClick={handleJoinStream}
//         className="bg-blue-500 text-white px-4 py-2 rounded"
//       >
//         {isTeacher ? "Start Stream" : "Join Stream"}
//       </button>
//     </div>
//   );
// };

// export default LiveStream;
