import React, { useState } from "react";
import full1 from "../resume image/full1.jpg";
import full2 from "../resume image/full2.jpg";
import kd1 from "../resume image/kd1.jpg";
import kd2 from "../resume image/kd2.jpg";
import kd3 from "../resume image/kd3.jpg";
import new1 from "../resume image/new1.jpg";
import new2 from "../resume image/new2.jpg";
import { motion } from "framer-motion";
import "../css/Template.css"
const Template = () => {
  const [resume] = useState([full1, full2, kd1, kd2, kd3, new1, new2]);

  return (
    <motion.div
      className="parent"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="child">
        <div className="text">
          <p>📄 Use this Template</p>
        </div>

        {resume.length > 0 && (
          <motion.div
            className="photo"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ staggerChildren: 0.2 }}
          >
            {resume.map((item, index) => (
              <motion.div
                key={index}
                className="template-card"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img src={item} alt="resume template" />
                <button className="use-btn">Use Template</button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Template;
