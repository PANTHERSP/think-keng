'use client';

import React, { useEffect, useState, useRef } from 'react';
import { IoCamera, IoReload, IoArrowBackOutline  } from "react-icons/io5";
import { IoMdArrowRoundBack } from "react-icons/io";
import { motion } from 'framer-motion';
import Link from 'next/link';

const MotionLink = motion.create(Link);

const BackButton = () => {
    return (
        <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} style={{ position: "absolute", top: 20, left: 20, zIndex: 1, cursor: "pointer" }}>
            <MotionLink href="/"
                
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                
        >
                <IoMdArrowRoundBack size={60} style={{ color: "rgba(0, 0, 0, 0.6)" }}/>
            </MotionLink>
        </motion.div>
    );
}

export default BackButton;