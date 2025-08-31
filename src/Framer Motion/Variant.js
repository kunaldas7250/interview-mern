import React, { useState } from "react";
import { motion } from "framer-motion";
import "./index.css";
const Variant = () => {
  const [isvisiblle,setisbile]=useState(true)
  const variants={
          hidden: { opacity: 1, scale: 0.8 },
          visible: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 0.5 },
        }
  return (
    <div>
      <motion.div
        className="box"
        variants={variants}
        initial="hidden"
        animate={isvisiblle?"visible":"hidden"}
        exit={"exit"}
        transition={{duration:3}}
        onClick={()=>setisbile(!isvisiblle)}
      />
    </div>
  );
};

export default Variant;
