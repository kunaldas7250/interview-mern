import React from "react";
import { motion } from "framer-motion";
import "./index.css";
const Gesture = () => {
  return (
    <div>
      {/* while gesture */}
      {/* while hover */}
      {/* <motion.div
        className="box"
        whileHover={{ scale: 1.2, rotate: 10 }}
        transition={{ type: "spring", stiffness: 500 }}
      /> */}
      {/* while tap */}
      {/* <motion.div
        className="box"
        whileTap={{ scale: 0.8, backgroundColor: "#880808" }}
        transition={{type:"spring",stiffness:300}}
      /> */}
      {/* while drag */}
     <motion.div
  className="box"
  drag
  dragConstraints={{
    top: -50,
    left: -50,
    right: 50,
    bottom: 50
  }}
/>

    </div>
  );
};

export default Gesture;
