// import React from 'react'
// import { motion } from "framer-motion"
// import "./index.css";
// const StagerAnimation = () => {
//   const parent_Variant = {
//     hidden: {
//       opacity: 0
//     },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.3,   // ✅ Corrected here
//       }
//     }
//   }

//   const childVariant = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0 }
//   }

//   return (
//     <motion.div
//       variants={parent_Variant}
//       initial="hidden"
//       animate="visible"
//     >
//       {[...Array(5)].map((_, index) => (
//         <motion.div
//           className="box mt-[2rem] w-20 h-20 bg-blue-500 rounded"
//           key={index}
//           variants={childVariant}
//         />
//       ))}
//     </motion.div>
//   )
// }

// export default StagerAnimation

import React from "react";
import { motion } from "framer-motion";
import "./index.css";

const StagerAnimation = () => {
  const parent_Variant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  };

  const childVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="motion-parent"
      variants={parent_Variant}
      initial="hidden"
      animate="visible"
    >
      {[...Array(5)].map((_, index) => (
        <motion.div className="box" key={index} variants={childVariant} />
      ))}
    </motion.div>
  );
};

export default StagerAnimation;

