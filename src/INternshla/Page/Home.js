import React from "react";
import img from "./images.jpeg";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import "../css/Home.css"
const Home = () => {
  return (
    <motion.div
      className="parent"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="child"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.img
          src={img}
          alt="pic not found"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.7 }}
        />

        <motion.div
          className="buttonparent"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          <NavLink to="/register">
            <button className="btn">Register</button>
          </NavLink>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.7 }}
        >
          <NavLink to="/login">
            <button className="btn">Login</button>
          </NavLink>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Home;
