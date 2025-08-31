// import React, { useState } from "react";
// import { motion } from "framer-motion";
// const FlippingCard = () => {
//   const [isflipped, setisfliped] = useState(false);
//   return (
//     <motion.div
//       onClick={() => setisfliped(!isflipped)}
//       className="perspective-500"
//     >
//       <motion.div
//         variants={{
//           front: { rotateY: 0 },
//           back: { rotateY: 180 },
//         }}
//         initial="front"
//         animate={isflipped?"front":"back"}
//         transition={{duration:0.8}}
//         className="w-64 h-40 bg-white rounded-lg shadow-lg overflow-hidden transform-style-preserve-3d"
//       >
//         <div className="absolute inset-0 bg-white flex items-center justify-center text-xl font-bold">
//           Front Side
//         </div>

//         <div className="absolute inset-0 bg-blue-500 flex items-center justify-center text-xl font-bold rotate-y-180">
//           Back Side
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default FlippingCard;


import React, { useState } from "react";
import { motion } from "framer-motion";
import "./index.css";
const FlippingCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const cardVariants = {
    front: { rotateY: 0 },
    back: { rotateY: 180 },
  };

  return (
    <div
      className="w-64 h-40 [perspective:1000px] cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-full [transform-style:preserve-3d]"
        variants={cardVariants}
        initial="front"
        animate={isFlipped ? "back" : "front"}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
      <div className="absolute inset-0 flex items-center justify-center bg-red-500 text-white rounded-lg shadow-lg backface-hidden">
  Front Side
</div>

<div className="absolute inset-0 flex items-center justify-center bg-blue-500 text-white rounded-lg shadow-lg backface-hidden transform rotate-y-180">
  Back Side
</div>

      </motion.div>
    </div>
  );
};

export default FlippingCard;
