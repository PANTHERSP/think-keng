// 'use client';

// import React, { useEffect, useState, useRef } from 'react';
// import { io } from 'socket.io-client';
// import { IoCamera, IoReload } from "react-icons/io5";
// import { motion } from 'framer-motion';
// import BackButton from '../components/BackButton';

// const MotionIoCamera = motion.create(IoCamera);
// const MotionIoReload = motion.create(IoReload);

// const Photo = () => {
//   const [videoSrc, setVideoSrc] = useState(null);
//   const [socket, setSocket] = useState(null);
//   const [labels, setLabels] = useState(null);
//   const [mapRedBin, setMapRedBin] = useState(null);
//   const [mapYellowBin, setMapYellowBin] = useState(null);
//   const [mapGreenBin, setMapGreenBin] = useState(null);
//   const [mapBlueBin, setMapBlueBin] = useState(null);
//   const [mapAllBin, setMapAllBin] = useState(null);
//   const [isTakePhoto, setIsTakePhoto] = useState(false);

//   const videoRef = useRef(null);
//   const detectedVideoRef = useRef(null);

//   let redBin = ['battery', 'mobile-phone', 'mouse', 'light-bulb', 'fluorescent-lamp', 'earphone', 'cable', 'spray']
//   let yellowBin = ['PET-plastic-bottle', 'PE-plastic-bag', 'broken-glass', 'metal-can', 'paper', 'taobin', 'transparent-plastic-bottle']
//   let greenBin = ['animal-waste', 'banana-peel', 'orange-peel']
//   let blueBin = ['snack-package', 'tissue-paper', 'foam']

//   let detectedRedBin = []
//   let detectedYellowBin = []
//   let detectedGreenBin = []
//   let detectedBlueBin = []

//   let detectedAllBin = []

  

  

//   useEffect(() => {
//     const newSocket = io('http://localhost:5501', {
//       transports: ['websocket']
//     })
//     // const newSocket = io('https://sixty-adults-feel.loca.lt', {
//     //   transports: ['websocket']
//     // })
//     // const newSocket = io('http://localhost:5501/', {
//     //   transports: ['websocket']
//     // })
//     // const newSocket = io('https://16a8-171-6-111-222.ngrok-free.app/', {
//     //   transports: ['websocket']
//     // });
//     // const newSocket = io('https://8007-171-6-111-222.ngrok-free.app')
    
//     setSocket(newSocket); // https://8007-171-6-111-222.ngrok-free.app
    
//     newSocket.on('result_frame', (data) => {
//       console.log("Received processed frame from server");
//       console.log(data.labels);
      
//       for (let label of data.labels) {
//         if (redBin.includes(label)) {
//           detectedRedBin.push(label);
//           console.log("red bin");
//         }
//         if (yellowBin.includes(label)) {
//           detectedYellowBin.push(label);
//           console.log("yellow bin");
//         }
//         if (greenBin.includes(label)) {
//           detectedGreenBin.push(label);
//           console.log("green bin");
//         }
//         if (blueBin.includes(label)) {
//           detectedBlueBin.push(label);
//           console.log("blue bin");
//         }
//       }
//       detectedRedBin = [...new Set(detectedRedBin)];
//       detectedYellowBin = [...new Set(detectedYellowBin)];
//       detectedGreenBin = [...new Set(detectedGreenBin)];
//       detectedBlueBin = [...new Set(detectedBlueBin)];

//       detectedAllBin = [{ binColor: 'red', binList: [...detectedRedBin]}, { binColor: 'yellow', binList: [...detectedYellowBin] }, { binColor: 'green', binList: [...detectedGreenBin] }, { binColor: 'blue', binList: [...detectedBlueBin] }];
//       setMapAllBin(detectedAllBin);
//       detectedAllBin = [];
//       detectedRedBin = [];
//       detectedYellowBin = [];
//       detectedGreenBin = [];
//       detectedBlueBin = [];
//       // setMapRedBin(detectedRedBin);
//       // setMapYellowBin(detectedYellowBin);
//       // setMapGreenBin(detectedGreenBin);
//       // setMapBlueBin(detectedBlueBin);
//       setLabels(data.labels);
//       // setVideoSrc('data:image/jpeg;base64,' + data.frame);
//       setVideoSrc(true);
//       // if (detectedVideoRef.current) {
//         detectedVideoRef.current.src = 'data:image/jpeg;base64,' + data.frame;
//         // setIsTakePhoto(false);
//       // }
//     });

//     // Cleanup เมื่อ component ถูก unmount
//     return () => {
//       newSocket.disconnect();
//     };
//   }, []);

//   useEffect(() => {
//     if (socket) {
//       // เรียกกล้องและจับภาพ frame
//       const video = document.createElement('video');
      
//       let animationId;
      

      

//       navigator.mediaDevices.getUserMedia({ video: {
//         facingMode: navigator.userAgent.match(/(iPhone|iPad|Android)/i)
//           ? { ideal: "environment" } // กล้องหลังสำหรับมือถือ
//           : "user" // กล้องหลักสำหรับคอมพิวเตอร์
//       } }).then((stream) => {
        
          
        
//         video.srcObject = stream;
//         video.play();

        
//         const captureFrame = () => {
//           const canvas = document.createElement('canvas');
//           canvas.width = video.videoWidth;
//           canvas.height = video.videoHeight;
//           const context = canvas.getContext('2d');
//           context.drawImage(video, 0, 0, canvas.width, canvas.height);
//           const frameData = canvas.toDataURL('image/jpeg'); // แปลง frame เป็น base64
//           setVideoSrc(frameData);
          
//               // if (videoRef.current) {
//               //   // videoRef.current.src = frameData;
//               //   console.log("videoRef.current.src:", videoRef.current.src);
                
//               // }
//               // if (isTakePhoto) {
//               //     // cancelAnimationFrame(animationId);
//               //     // socket.emit('processed_frame', frameData);
//               //     console.log("Sent frame to server:", frameData);
//               //   return;
//               // }
          
//           console.log('executed');
//           animationId = requestAnimationFrame(captureFrame);
          

//         }
        
        
//         animationId = requestAnimationFrame(captureFrame);
        
//         function stopCamera() {
//           let tracks = stream.getTracks();
//           tracks.forEach(track => track.stop()); 
//           video.srcObject = null; 
//         };
        

        
        
        
//         return () => {
//           cancelAnimationFrame(animationId);
//           stopCamera();
//           // video.srcObject = null;
//           console.log('Cleanup');

//           // stream.getTracks().forEach(track => track.stop());
//           // video.srcObject = null;
//         };
//       });

//     }
//   }, [socket]);

  
      
// const handleTakePhoto = () => {

//       setIsTakePhoto(!isTakePhoto);
      
          
//          if (!isTakePhoto) {
           
//            socket.emit('processed_frame', videoRef.current.src);
//            console.log("Sent frame to serverrr:", videoRef.current.src);
//           } else {
//             setMapAllBin(null);
//             detectedAllBin = [];
//             detectedRedBin = [];
//             detectedYellowBin = [];
//             detectedGreenBin = [];
//             detectedBlueBin = [];
//           }
         

//     };

//   return (
//     <div className="container">
//       <BackButton />
//       <h1 className="title">Photo Detect</h1>
//       {!videoSrc ? <img className="video-frame-image" src="https://i.pinimg.com/originals/b6/f1/6b/b6f16bbbd9a0b09458a6e60f2c4342a9.gif" alt="Video Stream" /> : isTakePhoto ? <img style={{ scale: '0.7', transform: 'translateY(-20%)', transition: 'all 0.3s ease-in-out' }} className="video-frame-image" ref={detectedVideoRef} src={'https://i.pinimg.com/originals/b6/f1/6b/b6f16bbbd9a0b09458a6e60f2c4342a9.gif' || null} alt="Video Stream" /> : <img className="video-frame-image" ref={videoRef} src={videoSrc} alt="Video Stream" />}
//       {isTakePhoto ? <MotionIoReload initial={{ y: 0 }} animate={{ y: [0, -85] }} transition={{ duration: 0.4 }} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }} size={30} className="icon" onClick={() => handleTakePhoto()}/> : <MotionIoCamera whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }} size={30} className="icon" onClick={() => handleTakePhoto()}/>}
//       {/* {!videoSrc ? <p className="loading-message">Waiting for AI to process the image...</p> : <p className="loading-message">Everything is ready!</p>} */}
//       <motion.div initial={{ y: 0 }} animate={{ y: [0, -85] }} transition={{ duration: 0.4 }} style={{ backgroundColor: 'transparent', display: 'flex', flexDirection: 'column', gap: '0px', marginTop: '10px' }}>
//         {mapAllBin && mapAllBin.map((allBinLabel, index1) => (
//           <div key={index1} style={{alignItems: 'center', height: allBinLabel.binList.length > 0 ? '70px' : '0px', display: 'flex', flexDirection: 'row', gap: allBinLabel.binList.length > 0 ? '10px' : '0px', marginBottom: allBinLabel.binList.length > 0 ? '10px' : '0px' }}>
//             { allBinLabel.binList.length > 0 && <motion.img transition={{ scale: { duration: 0.2, whileHover: 0.2 } }} initial={{ opacity: 0, x: -20, y: 20 }} animate={{ opacity: 1, x: 0, y: 0 }} whileHover={{ scale: 1.1 }} style={{ height: '70px', aspectRatio: '1/1' }} src={`/images/${allBinLabel.binColor}.png`} />}
//               {/* <div style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'black' }}> */}
//                 { allBinLabel.binList.length > 0 && allBinLabel.binList.map((label, index2) => (
//                   <motion.div transition={{ scale: { duration: 0.2, whileHover: 0.2 } }} initial={{ opacity: 0, x: -20, y: 20 }} animate={{ opacity: 1, x: 0, y: 0 }} whileHover={{ scale: 1.1 }} key={index2} style={{ height: '40px', fontSize: '16px', fontWeight: '400', display: 'flex', flexDirection: 'row', alignItems: 'center', color: yellowBin.includes(label) ? 'black' : 'white', paddingBlock: '0px', paddingInline: '12px', borderRadius: '100px', backgroundColor: redBin.includes(label) ? 'red' : yellowBin.includes(label) ? 'yellow' : greenBin.includes(label) ? 'green' : blueBin.includes(label) ? 'blue' : 'white' }}>
//                     {label}
//                   </motion.div>
//                 ))}
//               {/* </div> */}
//           </div>
//         ))}
//         {/* {mapYellowBin && mapYellowBin.map((yellowBinLabel, index) => (
//           <div key={index} style={{ display: 'flex', flexDirection: 'row', gap: '10px', padding: '10px', borderRadius: '10px', backgroundColor: 'yellow' }}>
//             {yellowBinLabel}
//           </div>
//         ))}
//         {mapRedBin && mapRedBin.map((redBinLabel, index) => (
//           <div key={index} style={{ display: 'flex', flexDirection: 'row', gap: '10px', padding: '10px', borderRadius: '10px', backgroundColor: 'red' }}>
//             {redBinLabel}
//           </div>
//         ))}
//         {mapGreenBin && mapGreenBin.map((greenBinLabel, index) => (
//           <div key={index} style={{ display: 'flex', flexDirection: 'row', gap: '10px', padding: '10px', borderRadius: '10px', backgroundColor: 'green' }}>
//             {greenBinLabel}
//           </div>
//         ))}
//         {mapBlueBin && mapBlueBin.map((blueBinLabel, index) => (
//           <div key={index} style={{ display: 'flex', flexDirection: 'row', gap: '10px', padding: '10px', borderRadius: '10px', backgroundColor: 'blue' }}>
//             {blueBinLabel}
//           </div>
//         ))} */}
//       </motion.div>
//       <p className="footer">Copyright &copy; 2024 by <a className="remove-underline" href="https://www.think-keng.com">Think-keng</a></p>
//     </div>
//   );
// };

// export default Photo;


'use client';

import React, { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import { IoCamera, IoReload } from "react-icons/io5";
import { motion } from 'framer-motion';
import BackButton from '../components/BackButton';

const MotionIoCamera = motion.create(IoCamera);
const MotionIoReload = motion.create(IoReload);

const Photo = () => {
  const [videoSrc, setVideoSrc] = useState(null);
  const [socket, setSocket] = useState(null);
  const [labels, setLabels] = useState(null);
  const [mapAllBin, setMapAllBin] = useState(null);
  const [isTakePhoto, setIsTakePhoto] = useState(false);

  const videoRef = useRef(null);
  const detectedVideoRef = useRef(null);
  const streamRef = useRef(null); // Reference for the media stream

  // Define the stopCamera function outside useEffect
  const stopCamera = () => {
    if (streamRef.current) {
      let tracks = streamRef.current.getTracks();
      tracks.forEach(track => track.stop());
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      console.log('Camera stream stopped');
    }
  };

  useEffect(() => {
    const newSocket = io('https://e196405d88bb0b.lhr.life', {
      transports: ['websocket'],
    });

    setSocket(newSocket);

    newSocket.on('result_frame', (data) => {
      console.log("Received processed frame from server");
      console.log(data.labels);
      
      setVideoSrc(true);
      detectedVideoRef.current.src = 'data:image/jpeg;base64,' + data.frame;
    });

    return () => {
      newSocket.disconnect();
      stopCamera();  // Stop the camera when the component unmounts
    };
  }, []);

  useEffect(() => {
    if (socket) {
      const video = document.createElement('video');
      let animationId;

      navigator.mediaDevices.getUserMedia({ video: {
        facingMode: navigator.userAgent.match(/(iPhone|iPad|Android)/i)
          ? { ideal: "environment" } // Back camera for mobile
          : "user" // Front camera for computers
      }}).then((mediaStream) => {
        streamRef.current = mediaStream; // Save the stream to the ref
        video.srcObject = mediaStream;
        video.play();

        const captureFrame = () => {
          const canvas = document.createElement('canvas');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          const context = canvas.getContext('2d');
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          const frameData = canvas.toDataURL('image/jpeg');
          setVideoSrc(frameData);

          animationId = requestAnimationFrame(captureFrame);
        };

        animationId = requestAnimationFrame(captureFrame);
      });

      return () => {
        cancelAnimationFrame(animationId);
        stopCamera(); // Stop the camera when the component unmounts
      };
    }
  }, [socket]);

  const handleTakePhoto = () => {
    setIsTakePhoto(!isTakePhoto);

    if (!isTakePhoto) {
      socket.emit('processed_frame', videoRef.current.src);
      console.log("Sent frame to server:", videoRef.current.src);
    } else {
      setMapAllBin(null);
    }
  };

  return (
    <div className="container">
      <BackButton />
      <h1 className="title">Photo Detect</h1>
      {!videoSrc ? <img className="video-frame-image" src="https://i.pinimg.com/originals/b6/f1/6b/b6f16bbbd9a0b09458a6e60f2c4342a9.gif" alt="Video Stream" /> : isTakePhoto ? <img style={{ scale: '0.7', transform: 'translateY(-20%)', transition: 'all 0.3s ease-in-out' }} className="video-frame-image" ref={detectedVideoRef} src={'https://i.pinimg.com/originals/b6/f1/6b/b6f16bbbd9a0b09458a6e60f2c4342a9.gif' || null} alt="Video Stream" /> : <img className="video-frame-image" ref={videoRef} src={videoSrc} alt="Video Stream" />}
      {isTakePhoto ? <MotionIoReload initial={{ y: 0 }} animate={{ y: [0, -85] }} transition={{ duration: 0.4 }} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }} size={30} className="icon" onClick={() => handleTakePhoto()}/> : <MotionIoCamera whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }} size={30} className="icon" onClick={() => handleTakePhoto()}/>}
      <motion.div initial={{ y: 0 }} animate={{ y: [0, -85] }} transition={{ duration: 0.4 }} style={{ backgroundColor: 'transparent', display: 'flex', flexDirection: 'column', gap: '0px', marginTop: '10px' }}>
        {mapAllBin && mapAllBin.map((allBinLabel, index1) => (
          <div key={index1} style={{alignItems: 'center', height: allBinLabel.binList.length > 0 ? '70px' : '0px', display: 'flex', flexDirection: 'row', gap: allBinLabel.binList.length > 0 ? '10px' : '0px', marginBottom: allBinLabel.binList.length > 0 ? '10px' : '0px' }}>
            { allBinLabel.binList.length > 0 && <motion.img transition={{ scale: { duration: 0.2, whileHover: 0.2 } }} initial={{ opacity: 0, x: -20, y: 20 }} animate={{ opacity: 1, x: 0, y: 0 }} whileHover={{ scale: 1.1 }} style={{ height: '70px', aspectRatio: '1/1' }} src={`/images/${allBinLabel.binColor}.png`} />}
            { allBinLabel.binList.length > 0 && allBinLabel.binList.map((label, index2) => (
              <motion.div transition={{ scale: { duration: 0.2, whileHover: 0.2 } }} initial={{ opacity: 0, x: -20, y: 20 }} animate={{ opacity: 1, x: 0, y: 0 }} whileHover={{ scale: 1.1 }} key={index2} style={{ height: '40px', fontSize: '16px', fontWeight: '400', display: 'flex', flexDirection: 'row', alignItems: 'center', color: yellowBin.includes(label) ? 'black' : 'white', paddingBlock: '0px', paddingInline: '12px', borderRadius: '100px', backgroundColor: redBin.includes(label) ? 'red' : yellowBin.includes(label) ? 'yellow' : greenBin.includes(label) ? 'green' : blueBin.includes(label) ? 'blue' : 'white' }}>
                {label}
              </motion.div>
            ))}
          </div>
        ))}
      </motion.div>
      <p className="footer">Copyright &copy; 2024 by <a className="remove-underline" href="https://www.think-keng.com">Think-keng</a></p>
    </div>
  );
};

export default Photo;
