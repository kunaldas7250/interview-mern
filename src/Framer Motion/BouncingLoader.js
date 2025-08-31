// import React from 'react'
// import { motion } from 'framer-motion'
// import "./index.css";
// const BouncingLoader = () => {
//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100 space-x-3">
//      {Array.from({length:3}).map((_,index)=>
//         <motion.div 
//         key={index}
//           className="w-4 h-4 bg-teal-500 rounded-full"
//           animate={{ y: [0, -15, 0] }}
//           transition={{
//             duration: 0.6,
//             ease: "easeInOut",
//             repeat: Infinity,
//             delay: index * 0.2, // stagger the dots
//           }}/>
//      )}
//     </div>
//   )
// }

// export default BouncingLoader


import React from "react";
import { motion } from "framer-motion";

const BouncingLoader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        gap: "10px",
        background: "#f3f4f6", // light gray background
      }}
    >
      {Array.from({ length: 3 }).map((_, index) => (
        <motion.div
          key={index}
          style={{
            width: "20px",
            height: "20px",
            backgroundColor: "teal",
            borderRadius: "50%",
          }}
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 0.6,
            ease: "easeInOut",
            repeat: Infinity,
            delay: index * 0.2, // stagger effect
          }}
        />
      ))}
    </div>
  );
};

export default BouncingLoader;
