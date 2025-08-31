


import React from "react";
import { motion } from "framer-motion";

const AnimatedShape = () => {
  const boxVariant = {
    initial: {
      scale: 1,
      rotate: 0,
      skew: 0,
    },
    hover: {
      scale: 1.2,
      rotate: 15,
      skew: "10deg",
      transition: { duration: 0.3 },
    },
    click: {
      scale: 0.9,
      rotate: -15,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f0f0",
      }}
    >
      <motion.div
        style={{
          width: "150px",
          height: "150px",
          backgroundColor: "blue",
          borderRadius: "12px",
        }}
        variants={boxVariant}
        initial="initial"
        whileHover="hover"
        whileTap="click"
      />
    </div>
  );
};

export default AnimatedShape;
