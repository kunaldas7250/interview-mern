import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import pic from "./pic.png";
import "./HeaderSection.css";

const HeaderSection = () => {
  const [isshow, setisshow] = useState(false);

  const handleclick = () => {
    setisshow((prev) => !prev); // toggle
  };

  // Animation variants
  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15,
        staggerChildren: 0.15,
      },
    },
    exit: { opacity: 0, y: -20 },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="page-container  parentcontainer">
      {/* Header */}
      <motion.div
        className="header"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo */}
        <motion.img
          src={pic}
          alt="logo"
          className="logo"
          animate={{ borderRadius: ["5%", "7%", "5%"] }}
          transition={{ duration: 2, repeat: Infinity }}
          whileHover={{ scale: 1.1 }}
        />

        {/* Menu Icon */}
        <motion.div
          onClick={handleclick}
          whileHover={{ scale: 1, opacity: 1.2 }}
          whileTap={{ scale: 0.8 }}
          className="menu-icon"
        >
          <FiMenu />
        </motion.div>
      </motion.div>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isshow && (
          <motion.div
            className="menu-content"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit" // ✅ matches `menuVariants.exit`
          >
            <motion.ul>
              <motion.li
                variants={itemVariants}
                whileHover={{ scale: 1, opacity: 1 }}
                whileTap={{ scale: 0.9, opacity: 0.6 }}
              >
                <NavLink to="/" onClick={() => setisshow(false)}>
                  Home
                </NavLink>
              </motion.li>
              <motion.li variants={itemVariants}>
                <NavLink to="/About" onClick={() => setisshow(false)}>
                  About
                </NavLink>
              </motion.li>
              <motion.li variants={itemVariants}>
                <NavLink to="/Technical" onClick={() => setisshow(false)}>
                  Technical
                </NavLink>
              </motion.li>
              <motion.li variants={itemVariants}>
                <NavLink to="/Project" onClick={() => setisshow(false)}>
                  Project
                </NavLink>
              </motion.li>
              <motion.li variants={itemVariants}>
                <NavLink to="/Education" onClick={() => setisshow(false)}>
                  Education
                </NavLink>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeaderSection;
