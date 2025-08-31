import React from "react";
import { motion } from "framer-motion";
import "./index.css";

const PulsingMotion = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <motion.button
        className="px-6 py-3 text-white rounded-lg shadow-lg outline-none"
        animate={{
          scale: [1, 1.5, 2, 1.5, 1],
          backgroundColor: [
            "#ff0000",
            "#00ff00",
            "#ff69b4",
            "#ffff00",
            "#0000ff",
          ],
        }}
        transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
      >
        Click Me
      </motion.button>
    </div>
  );
};

export default PulsingMotion;
