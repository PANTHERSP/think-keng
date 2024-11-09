'use client';

import React, { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import { HiMiniVideoCamera } from "react-icons/hi2";
import { IoCamera, IoReload } from "react-icons/io5";
import { FaSearchengin } from "react-icons/fa6";
import { FaImage } from "react-icons/fa6";
import { motion, AnimatePresence } from 'framer-motion';
import { FileUploader } from 'react-drag-drop-files';
import BackButton from '../components/BackButton';

const MotionFaImage = motion.create(FaImage);
const MotionFaSearchengin = motion.create(FaSearchengin);

const fileTypes = ["JPG", "PNG", "JPEG", "WEBP", "GIF", "BMP", "TIFF", "SVG"];

const File = () => {
    const [videoSrc, setVideoSrc] = useState(null);
    const [originalImageSize, setOriginalImageSize] = useState(null);
    const [socket, setSocket] = useState(null);
    const [labels, setLabels] = useState(null);
    const [mapAllBin, setMapAllBin] = useState(null);
    const [isTakePhoto, setIsTakePhoto] = useState(false);

    const [isPredict, setIsPredict] = useState(false);
  
    const videoRef = useRef(null);
    const detectedVideoRef = useRef(null);

    const [file, setFile] = useState(null);
    


    // const handleChange = (file) => {
    //     const reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onload = (e) => {
    //       const image = new Image();
    //       image.src = e.target.result;
    
    //       image.onload = () => {
    //         const width = image.width;
    //         const height = image.height;
    //         console.log("Image Width:", width);
    //         console.log("Image Height:", height);
    //       };
    //     };
    //   };
  
    let redBin = ['battery', 'mobile-phone', 'mouse', 'light-bulb', 'fluorescent-lamp', 'earphone', 'cable', 'spray']
    let yellowBin = ['PET-plastic-bottle', 'PE-plastic-bag', 'broken-glass', 'metal-can', 'paper', 'taobin', 'transparent-plastic-bottle']
    let greenBin = ['animal-waste', 'banana-peel', 'orange-peel']
    let blueBin = ['snack-package', 'tissue-paper', 'foam']
  
    let detectedRedBin = []
    let detectedYellowBin = []
    let detectedGreenBin = []
    let detectedBlueBin = []
  
    let detectedAllBin = []


    


    function resizeBase64Image(base64Str) {
      const width = originalImageSize.width;
      const height = originalImageSize.height;
  
      
      const img = new Image();
      img.src = base64Str;
  
      img.onload = function() {
          
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
  
          
          canvas.width = width;
          canvas.height = height;
  
          
          ctx.drawImage(img, 0, 0, width, height);
  
          
          const resizedBase64 = canvas.toDataURL();
  
          
          console.log("Base64 ที่ resize แล้ว: ", resizedBase64);
      };
  }
  
    
  
    useEffect(() => {
      const newSocket = io('https://790f868d1b9414.lhr.life', {
        transports: ['websocket']
      })
      // const newSocket = io('https://sixty-adults-feel.loca.lt', {
      //   transports: ['websocket']
      // })
      // const newSocket = io('http://localhost:5501/', {
      //   transports: ['websocket']
      // })
      // const newSocket = io('https://16a8-171-6-111-222.ngrok-free.app/', {
      //   transports: ['websocket']
      // });
      // const newSocket = io('https://8007-171-6-111-222.ngrok-free.app')
      
      setSocket(newSocket); // https://8007-171-6-111-222.ngrok-free.app
      
      newSocket.on('result_frame', (data) => {
        console.log("Received processed frame from server");
        console.log(data.labels);
        
        for (let label of data.labels) {
          if (redBin.includes(label)) {
            detectedRedBin.push(label);
            console.log("red bin");
          }
          if (yellowBin.includes(label)) {
            detectedYellowBin.push(label);
            console.log("yellow bin");
          }
          if (greenBin.includes(label)) {
            detectedGreenBin.push(label);
            console.log("green bin");
          }
          if (blueBin.includes(label)) {
            detectedBlueBin.push(label);
            console.log("blue bin");
          }
        }
        detectedRedBin = [...new Set(detectedRedBin)];
        detectedYellowBin = [...new Set(detectedYellowBin)];
        detectedGreenBin = [...new Set(detectedGreenBin)];
        detectedBlueBin = [...new Set(detectedBlueBin)];
  
        detectedAllBin = [{ binColor: 'red', binList: [...detectedRedBin]}, { binColor: 'yellow', binList: [...detectedYellowBin] }, { binColor: 'green', binList: [...detectedGreenBin] }, { binColor: 'blue', binList: [...detectedBlueBin] }];
        setMapAllBin(detectedAllBin);
        detectedAllBin = [];
        detectedRedBin = [];
        detectedYellowBin = [];
        detectedGreenBin = [];
        detectedBlueBin = [];
        // setMapRedBin(detectedRedBin);
        // setMapYellowBin(detectedYellowBin);
        // setMapGreenBin(detectedGreenBin);
        // setMapBlueBin(detectedBlueBin);
        setLabels(data.labels);
        // setVideoSrc('data:image/jpeg;base64,' + data.frame);
        setVideoSrc(true);
        // if (detectedVideoRef.current) {
        // console.log('originalImageSize:', originalImageSize);
          detectedVideoRef.current.src = 'data:image/jpeg;base64,' + data.frame;
          // setIsTakePhoto(false);
        // }
      });
  
      // Cleanup เมื่อ component ถูก unmount
      return () => {
        newSocket.disconnect();
      };
    }, []);


    const handleChange = (uploadedFile) => {
        setFile(URL.createObjectURL(uploadedFile));
        // console.log('Uploaded file:', URL.createObjectURL(uploadedFile));
        const reader = new FileReader();
    
        reader.onloadend = () => {
            let base64String = reader.result;
            if (base64String.startsWith('data:image/png')) {
                base64String = base64String.replace('data:image/png', 'data:image/jpeg');
            }
            console.log('Base64 String:', base64String);
            setVideoSrc(base64String);
        };

        reader.readAsDataURL(uploadedFile);
        // console.log('Uploaded file:', uploadedFile);

    };


    // const handleChange = (uploadedFile) => {
    //     setFile(URL.createObjectURL(uploadedFile));
    
    //     const reader = new FileReader();
        
    //     reader.onloadend = () => {
    //         const img = new Image();
    //         img.src = reader.result;
    
    //         img.onload = () => {
    //             // const scale = 1.0;
    //             const canvas = document.createElement('canvas');
    //             canvas.width = 640;
    //             canvas.height = 480;

    //             // console.log('Original Image Size:', img.width, img.height);
    
    //             const ctx = canvas.getContext('2d');
    //             ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    
    //             // แปลงภาพที่ปรับสเกลแล้วเป็น base64 format JPEG
    //             const resizedBase64 = canvas.toDataURL('image/jpeg');
    //             console.log('Resized Base64 Image:', resizedBase64);
    
    //             // ตั้งค่า resizedBase64 ให้กับ setVideoSrc
    //             setVideoSrc(resizedBase64);
                
    //           };
    //         };
            
    //         reader.readAsDataURL(uploadedFile);
    //         // return {width: img.width, height: img.height};
    // };




  //   const handleChange = (uploadedFile) => {
  //     setFile(URL.createObjectURL(uploadedFile));
  
  //     const reader = new FileReader();
      
  //     reader.onloadend = () => {
  //         const img = new Image();
  //         img.src = reader.result;
  
  //         img.onload = () => {
  //             // เลือกขนาดที่เล็กที่สุดระหว่างความกว้างและความสูงของภาพเพื่อทำให้เป็นสี่เหลี่ยมจัตุรัส
  //             const minDimension = Math.min(img.width, img.height);
  
  //             // คำนวณตำแหน่งเริ่มต้นของการตัด (ให้ภาพอยู่ตรงกลาง)
  //             const startX = (img.width - minDimension) / 2;
  //             const startY = (img.height - minDimension) / 2;
  
  //             const canvas = document.createElement('canvas');
  //             const ctx = canvas.getContext('2d');
  
  //             // ตั้งขนาดของ canvas ให้เป็นขนาดสี่เหลี่ยมจัตุรัส
  //             canvas.width = minDimension;
  //             canvas.height = minDimension;
  
  //             // วาดภาพที่ตัดลงบน canvas
  //             ctx.drawImage(img, startX, startY, minDimension, minDimension, 0, 0, minDimension, minDimension);
  
  //             // แปลงภาพที่ตัดแล้วเป็น base64 ในรูปแบบ JPEG
  //             const croppedBase64 = canvas.toDataURL('image/jpeg');
  //             console.log('Cropped Base64 Image:', croppedBase64);
  
  //             // ตั้งค่า croppedBase64 ให้กับ setVideoSrc
  //             setVideoSrc(croppedBase64);
  //         };
  //     };
  
  //     reader.readAsDataURL(uploadedFile);
  // };
  
    


    const handlePrediction = () => {
        console.log('isPredict:', isPredict)
        if (!isPredict) {
            
            socket.emit('processed_frame', videoSrc);
            console.log("Sent frame to serverrr:", videoSrc);
        } else {
            setMapAllBin(null);
            detectedAllBin = [];
            detectedRedBin = [];
            detectedYellowBin = [];
            detectedGreenBin = [];
            detectedBlueBin = [];
            //  setVideoSrc(null);
            //  setFile(null);
            //  detectedVideoRef.current.src = null;
            console.log("detectedAllBin:", detectedAllBin);
        }
        setIsPredict(!isPredict);
      
    };
  
    
  
   
  
    
        

  
    return (
      <div className="container">
        <BackButton />
        <h1 className="title">File Detect</h1>
        {!file ? <img className="video-frame-image" src="https://i.pinimg.com/originals/b6/f1/6b/b6f16bbbd9a0b09458a6e60f2c4342a9.gif" alt="Video Stream" /> : isPredict ? <img style={{ scale: '0.7', transform: 'translateY(-20%)', transition: 'all 0.3s ease-in-out', objectFit: 'contain', background: 'linear-gradient(45deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))' }} className="video-frame-image" ref={detectedVideoRef} src={'https://i.pinimg.com/originals/b6/f1/6b/b6f16bbbd9a0b09458a6e60f2c4342a9.gif' || null} alt="Video Stream" /> : <img style={{ objectFit: 'contain', background: 'linear-gradient(45deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))' }} className="video-frame-image" ref={videoRef} src={file} alt="Video Stream" />}
        {isPredict ? <MotionFaImage initial={{ y: 0 }} animate={{ y: [0, -85] }} transition={{ duration: 0.4 }} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }} size={30} className="icon" onClick={file ? handlePrediction : null}/> : <MotionFaSearchengin whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }} size={30} className="icon" onClick={file ? handlePrediction : null}/>}
        {/* {isPredict ? <MotionFaImage initial={{ y: 0 }} animate={{ y: [0, -85] }} transition={{ duration: 0.4 }} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }} size={30} className="icon" onClick={() => handlePrediction()}/> : <MotionFaImage whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }} size={30} className="icon" onClick={() => handlePrediction()}/>} */}
        {/* {!videoSrc ? <p className="loading-message">Waiting for AI to process the image...</p> : <p className="loading-message">Everything is ready!</p>} */}
        <motion.div initial={{ y: 0 }} animate={{ y: [0, -85] }} transition={{ duration: 0.4 }} style={{ backgroundColor: 'transparent', display: 'flex', flexDirection: 'column', gap: '0px', marginTop: '10px' }}>
          {mapAllBin && mapAllBin.map((allBinLabel, index1) => (
            <div key={index1} style={{alignItems: 'center', height: allBinLabel.binList.length > 0 ? '70px' : '0px', display: 'flex', flexDirection: 'row', gap: allBinLabel.binList.length > 0 ? '10px' : '0px', marginBottom: allBinLabel.binList.length > 0 ? '10px' : '0px' }}>
              { allBinLabel.binList.length > 0 && <motion.img transition={{ scale: { duration: 0.2, whileHover: 0.2 } }} initial={{ opacity: 0, x: -20, y: 20 }} animate={{ opacity: 1, x: 0, y: 0 }} whileHover={{ scale: 1.1 }} style={{ height: '70px', aspectRatio: '1/1' }} src={`/images/${allBinLabel.binColor}.png`} />}
                {/* <div style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'black' }}> */}
                  { allBinLabel.binList.length > 0 && allBinLabel.binList.map((label, index2) => (
                    <motion.div transition={{ scale: { duration: 0.2, whileHover: 0.2 } }} initial={{ opacity: 0, x: -20, y: 20 }} animate={{ opacity: 1, x: 0, y: 0 }} whileHover={{ scale: 1.1 }} key={index2} style={{ height: '40px', fontSize: '16px', fontWeight: '400', display: 'flex', flexDirection: 'row', alignItems: 'center', color: yellowBin.includes(label) ? 'black' : 'white', paddingBlock: '0px', paddingInline: '12px', borderRadius: '100px', backgroundColor: redBin.includes(label) ? 'red' : yellowBin.includes(label) ? 'yellow' : greenBin.includes(label) ? 'green' : blueBin.includes(label) ? 'blue' : 'white' }}>
                      {label}
                    </motion.div>
                  ))}
                {/* </div> */}
            </div>
          ))}
        </motion.div>
        { !isPredict && <div style={{ border: "2px solid black", padding: "15px", borderRadius: "15px", backgroundColor: "rgba(255, 255, 255, 1)", marginTop: "20px", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <FileUploader 
                    style={{ height: "400px", width: "400px", backgroundColor: "white" }}
                    handleChange={handleChange} 
                    name="file" 
                    accept="image/*"
                    types={fileTypes} 
            />
        </div>}
                {/* {file && (
                <div style={{ marginTop: "20px" }}>
                    
                    <img 
                        src={file} 
                        alt="Uploaded Preview" 
                        style={{ maxWidth: "100%", height: "auto" }} />
                </div>
            )} */}
          {/* {mapYellowBin && mapYellowBin.map((yellowBinLabel, index) => (
            <div key={index} style={{ display: 'flex', flexDirection: 'row', gap: '10px', padding: '10px', borderRadius: '10px', backgroundColor: 'yellow' }}>
              {yellowBinLabel}
            </div>
          ))}
          {mapRedBin && mapRedBin.map((redBinLabel, index) => (
            <div key={index} style={{ display: 'flex', flexDirection: 'row', gap: '10px', padding: '10px', borderRadius: '10px', backgroundColor: 'red' }}>
              {redBinLabel}
            </div>
          ))}
          {mapGreenBin && mapGreenBin.map((greenBinLabel, index) => (
            <div key={index} style={{ display: 'flex', flexDirection: 'row', gap: '10px', padding: '10px', borderRadius: '10px', backgroundColor: 'green' }}>
              {greenBinLabel}
            </div>
          ))}
          {mapBlueBin && mapBlueBin.map((blueBinLabel, index) => (
            <div key={index} style={{ display: 'flex', flexDirection: 'row', gap: '10px', padding: '10px', borderRadius: '10px', backgroundColor: 'blue' }}>
              {blueBinLabel}
            </div>
          ))} */}
        <p className="footer">Copyright &copy; 2024 by <a className="remove-underline" href="https://www.think-keng.com">Think-keng</a></p>
      </div>
    );
  };
  
  export default File;