

import React from "react";
import img from "../Pages/images.jpeg";
import { motion } from "framer-motion";
import "./About.css";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, when: "beforeChildren", staggerChildren: 0.3 },
  },
};

const imageVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    borderRadius: ["3%", "5%", "3%"],
    borderColor: "black",
    transition: { duration: 0.6 },
  },
  hover: { scale: 1.05, rotate: 1 },
  tap: { scale: 0.95, opacity: 0.8 },
};

const textVariants = {
  hidden: { x: 50, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.6 } },
};

const paragraphVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: "easeInOut" } },
  hover: { scale: 1.01,  textDecorationColor: "black" },
  tap: { scale: 0.97, opacity: 0.9 },
};

const About = () => {
  return (
    <motion.div
      className="parentcointener"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="child">
        {/* Profile Image */}
        <motion.img
          src={img}
          alt="pic not found"
          className="profile-img"
          variants={imageVariants}
          whileHover="hover"
          whileTap="tap"
        />

        {/* Summary Section */}
        <motion.div className="sumary" variants={textVariants}>
          <h1>Summary</h1>
          <motion.p
            variants={paragraphVariants}
            whileHover="hover"
            whileTap="tap"
          >
            Hi, I’m <strong>Kunal Das 👋</strong>, a Computer Science and
            Engineering student specializing in Artificial Intelligence. Over
            the past few years, I’ve built a strong foundation in Python,
            JavaScript, MERN stack (MongoDB, Express.js, React.js, Node.js),
            SQL, and Power BI. 🎯 My interests lie at the intersection of Full
            Stack Development and Data Analytics, where I’m passionate about
            solving real-world problems through scalable applications,
            automation, and data-driven insights.
            <br />
            📍 Based in Bengaluru, Karnataka, I am actively seeking
            opportunities in Full Stack Development or Data Analytics roles
            where I can apply my skills and continue to grow.
            <br />
            Outside of tech, I enjoy playing cricket and other competitive
            indoor & outdoor games. I also love watching movies and exploring
            new technologies on YouTube—always staying curious and learning.
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;
