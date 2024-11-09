'use client';

import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import Link from 'next/link';
import { IoCamera } from "react-icons/io5";
import { HiMiniVideoCamera } from "react-icons/hi2";
import { FaImage } from "react-icons/fa6";
import { motion } from 'framer-motion';
import BackButton from './components/BackButton';
// import blueBin from "../public/images/recycle-bin.png";
import Image from 'next/image';

const MotionLink = motion.create(Link);

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.125 
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Home = () => {
  const [videoSrc, setVideoSrc] = useState(null);
  const [socket, setSocket] = useState(null);

  // useEffect(() => {
    // const newSocket = io('http://localhost:5500', {
    //   transports: ['websocket']
    // })
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
    
    // setSocket(newSocket); // https://8007-171-6-111-222.ngrok-free.app
    
    // newSocket.on('result_frame', (data) => {
    //   console.log("Received processed frame from server");
    //   setVideoSrc('data:image/jpeg;base64,' + data);
    // });

    // Cleanup เมื่อ component ถูก unmount
    // return () => {
    //   newSocket.disconnect();
    // };
  // }, []);

  useEffect(() => {
    if (socket) {
      // เรียกกล้องและจับภาพ frame
      const video = document.createElement('video');
      let lastSentTime = 0;

      

      navigator.mediaDevices.getUserMedia({ video: {
        facingMode: navigator.userAgent.match(/(iPhone|iPad|Android)/i)
          ? { exact: "environment" } // กล้องหลังสำหรับมือถือ
          : "user" // กล้องหลักสำหรับคอมพิวเตอร์
      } }).then((stream) => {
        video.srcObject = stream;
        video.play();

        const captureFrame = () => {
          const canvas = document.createElement('canvas');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          const context = canvas.getContext('2d');
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          const frameData = canvas.toDataURL('image/jpeg'); // แปลง frame เป็น base64
          if ((new Date()).getTime() - lastSentTime >= 200) {
            socket.emit('processed_frame', frameData);
            console.log("Sent frame to server");
            lastSentTime = (new Date()).getTime();
          }
          
          requestAnimationFrame(captureFrame);
        };

        video.onloadedmetadata = () => {
          captureFrame();
        };
      });
    }
  }, [socket]);

  return (
    <motion.div className="container" variants={containerVariants} initial="hidden" animate="visible">
      {/* <BackButton /> */}
      <motion.h1 className="title" variants={itemVariants}><span className="title-red">T</span>HIN<span className="title-green">K</span> <span className="title-blue">K</span>EN<span className="title-yellow">G</span></motion.h1>
      {/* {!videoSrc ? <div className="video-frame"></div> : <img className="video-frame-image" src={videoSrc} alt="Video Stream" />}
      {!videoSrc ? <p className="loading-message">Waiting for AI to process the image...</p> : <p className="loading-message">Everything is ready!</p>} */}
      {/* <img className="bin-image" width={250} height={250} src="https://pngimg.com/uploads/recycle_bin/small/recycle_bin_PNG36.png" /> */}
      <motion.img transition={{ type: 'spring', stiffness: 200, damping: 10 }} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} whileHover={{ scale: 1.05 }} className="bin-image" style={{ height: '35vh', aspectRatio: '1/1' }} src="/images/recycle-bin_3320628.png" alt="Recycle Bin" />
      <motion.p variants={itemVariants} className="description">"Detect Waste Types with AI - Making Sustainability Easier"</motion.p>
      <motion.div variants={itemVariants} className="links">
        <MotionLink whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1 }} className="link" href="/realtime"><HiMiniVideoCamera size={35} />Real-time Detect</MotionLink>
        <MotionLink whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1 }} className="link" href="/photo"><IoCamera size={35}/>Photo Detect</MotionLink>
        <MotionLink whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1 }} className="link" href="/file"><FaImage size={35}/>File Detect</MotionLink>
      </motion.div> 
      {/* <p className="footer">Powered by <a href="https://openai.com/">OpenAI</a></p> */}
      <motion.p variants={itemVariants} className="footer">Copyright &copy; 2024 by <a className="remove-underline" href="https://www.think-keng.com">Think-keng</a></motion.p>
    </motion.div>
  );
};

export default Home;

