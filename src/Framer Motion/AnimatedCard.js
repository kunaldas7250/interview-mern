
// import React from "react";
// import car from "../Framer Motion/car.jpg";
// import { motion } from "framer-motion";

// const AnimatedCard = () => {
//   return (
//     <motion.div
//       initial={{ scale: 1, rotate: 0 }}
//       whileHover={{ scale: 1.05, rotate: 0 }}
//       whileTap={{ scale: 0.95 }}
//       drag
//       dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
//       dragElastic={0.2}
//       transition={{ type: "spring", stiffness: 300 }}
//       className="max-w-sm mx-auto bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
//     >
//       <motion.img
//         src={car}
//         alt="pic not found"
//         className="w-full h-40 object-cover"
//         whileHover={{ scale: 1.1 }}
//         transition={{ duration: 0.3 }}
//       />
//       <div className="p-6">
//         <h2 className="text-xl font-semibold mb-2">Card Title</h2>
//         <p className="text-gray-700 mb-4">
//           This is a simple card with Framer Motion animation
//         </p>
//         <motion.button
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.9 }}
//           transition={{ duration: 0.2 }}
//           className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-400 transition"
//         >
//           Learn MORE
//         </motion.button>
//       </div>
//     </motion.div>
//   );
// };

// export default AnimatedCard;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "./index.css";

const AnimatedCard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "https://api.unsplash.com/search/photos",
          {
            params: { query: "cars", per_page: 8 },
            headers: {
              Authorization:
                "Client-ID q46kWjyGVGBb1O-ttu8bQYQe4G54eMAHIrbo6WxW4Wg",
            },
          }
        );
        setData(response.data.results);
      } catch (error) {
        console.error(`Something went wrong: ${error}`);
      }
    };
    fetch();
  }, []);

  return (
    <div className="parent">
      <div className="card-list">
        {data.map((item, index) => (
          <motion.div
            key={index}
            className="card"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.img
              animate={{
                borderRadius: ["5%", "10%", "5%"],
                scale: [0.5, 1, 1.2, 1, 0.5],
              }}
              transition={{
                duration: 3,
                ease: "easeInOut",
                repeat: Infinity, // keeps looping
              }}
              whileHover={{ scale: 1.05 }}
              src={item.urls.small}
              alt={item.alt_description || "Unsplash Image"}
            />
            <motion.div
              whileTap={{ scale: 1, opacity: 1 }}
              whileHover={{ opacity: 0.8 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="card-content"
            >
              <h2>{item.alt_description || "Car Image"}</h2>
              <p>{item.description || "Beautiful Unsplash car photo"}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedCard;
