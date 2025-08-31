import React from "react";
import { motion } from "framer-motion";
import "./Tech.css"
const Technical_skill = () => {
  return (
    <motion.div className="parent">
      <h1>Technical Skill</h1>
      <ul>
        <li>
          <strong>Programming language:</strong>Python,JavaScript
        </li>
        <li>
          <strong>Data Analytics:</strong>Pandas,Numpy
        </li>
        <li>
          <strong>Data Visualization:</strong>Matplotlib, Seaborn, Power BI, MS
          Excel
        </li>
        <li>
          <strong>Web Technologies:</strong>HTML, CSS, JavaScript, React.js,
          Node.js, Express.js, FastAPI
        </li>
        <li>
          <strong>Database Management:</strong>MongoDB, Sql server
        </li>
        <li>
          <strong>Tools & Concepts:</strong>Git, REST APIs, JWT, WebSocket, DAX,
          ML Algorithms
        </li>
      </ul>
    </motion.div>
  );
};

export default Technical_skill;
