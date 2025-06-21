// "use client";
// import React, { useRef, useState } from "react";
// import { Link } from "react-router";
// import { ClientOnly } from "remix-utils/client-only";

// const CameraButton: React.FC = () => {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const [cameraActive, setCameraActive] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
//   console.log("first");
//   const openCamera = async () => {
//     setError(null); // Clear any previous errors
//     try {
//       console.log("inside try");
//       // Request access to the video stream
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//       console.log("1st", navigator.mediaDevices);
//       console.log(
//         "2nd",
//         navigator.mediaDevices && navigator.mediaDevices.getUserMedia
//       );
//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//         // Play the video once the stream is loaded
//         videoRef.current.onloadedmetadata = () => {
//           videoRef.current?.play().catch((playError) => {
//             console.error("Error playing video:", playError);
//             setError("Could not play video stream.");
//           });
//         };
//         setCameraActive(true);
//       }
//     } catch (err) {
//       console.error("Error accessing the camera: ", err);
//       if (err instanceof DOMException) {
//         if (err.name === "NotAllowedError") {
//           setError(
//             "Camera access denied. Please grant permission in your browser settings."
//           );
//         } else if (err.name === "NotFoundError") {
//           setError("No camera found on this device.");
//         } else if (err.name === "NotReadableError") {
//           setError("Camera is in use by another application.");
//         } else {
//           setError(`An unexpected error occurred: ${err.message}`);
//         }
//       } else {
//         setError("An unknown error occurred while accessing the camera.");
//       }
//       setCameraActive(false);
//     }
//   };

//   const stopCamera = () => {
//     if (videoRef.current && videoRef.current.srcObject) {
//       const stream = videoRef.current.srcObject as MediaStream;
//       stream.getTracks().forEach((track) => track.stop()); // Stop all tracks in the stream
//       videoRef.current.srcObject = null; // Clear the source
//       setCameraActive(false);
//       setError(null); // Clear errors when stopping
//     }
//   };

//   return (
//     <>
//       <h1>going in</h1>
//       <ClientOnly >
//         {() => (
//           <div>
//             <h1>inside client</h1>
//             {!cameraActive ? (
//               <button onClick={openCamera}>Open Camera</button>
//             ) : (
//               <button onClick={stopCamera}>Close Camera</button>
//             )}

//             {error && <p style={{ color: "red" }}>{error}</p>}

//             <div style={{ marginTop: "20px" }}>
//               <video
//                 ref={videoRef}
//                 style={{
//                   width: "100%",
//                   maxWidth: "600px",
//                   border: "1px solid #ccc",
//                   display: cameraActive ? "block" : "none",
//                 }}
//                 autoPlay
//                 playsInline
//                 muted // Muted to avoid audio feedback loops unless explicitly needed
//               ></video>
//             </div>

//             {!cameraActive && (
//               <p
//                 style={{ marginTop: "10px", fontSize: "0.9em", color: "#555" }}
//               >
//                 (A browser prompt will appear asking for camera permission. The
//                 camera feed will appear above if permission is granted.)
//               </p>
//             )}
//           </div>
//         )}
        
//       </ClientOnly>
//     </>
//   );
// };

// export default CameraButton;
