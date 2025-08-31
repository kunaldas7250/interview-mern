import React from "react";
// import { Box } from "@mui/material";
import { motion } from "framer-motion";
import "./index.css";
const Lear = () => {
  return (
    <div>
      {/* <motion.div className='box' animate={{translateX:100,}}/> */}
      {/* <motion.div className='box' animate={{translateY:50}}/> */}
      {/* <motion.div className='box' animate={{rotateY:35,}}/> */}
      {/* <motion.div className='box' animate={{y:50}}/> */}
      {/* <motion.div className='box' animate={{rotateX:70,x:100,}}/> */}
      {/* <motion.div className='box' animate={{scaleX:2}}/> */}
      {/* <motion.div className='box' animate={{skewX:20}}/> */}
      {/* <motion.div className='box' animate={{skewY:10}}/> */}
      {/* <motion.div className='box' animate={{x:120}}/> */}
      {/* <Box
        component={motion.div}
        className="box"
        animate={{ x: 120 }}
        transition={{ duration: 3, speed: 5, delay: 2 }}
      /> */}
      {/* <motion.div
        initial={{ y: 0 }}
        
        animate={{ x: 100 }}
        transition={{ delay: 2,ease:"easeInOut",duration:20 }}
      />
      <motion.div
        style={{
          width: 100,
          height: 100,
          backgroundColor: "skyblue",
          borderRadius: 10,
        }}
        initial={{ x: 0, y: 0 }}
        animate={{ x: 100, y: 30 }}
        transition={{ delay: 1, duration: 1,ease:"linear" }}
      /> */}

      <motion.div
        className="box"
        initial={{x:0}}
        animate={{ 
          scale: [1, 2,2,3,2,1] ,
          rotate:[0,180,90,270,60,90,360],
          borderRadius:["20%","20%","30%","40%","30%","20%","30%"]
        }}
        transition={{ duration: 5 }}
      />
    </div>
  );
};

export default Lear;
