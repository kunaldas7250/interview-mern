import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import "../css/Nav.css";

const Nav = () => {
  const [isShow, setIsShow] = useState(false);

  const handleProfile = () => {
    setIsShow((prev) => !prev);
  };

  // 🔽 Dropdown animation variants
  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.2 } },
  };

  return (
    <motion.div className="parent">
      <motion.div className="child">
        <div className="text">
          <motion.p whileHover={{ scale: 1.05 }}>Resume Platform</motion.p>
        </div>

        <div className="button">
          {/* NavLink for Create Resume */}
          <NavLink to="/Createresume">
            <motion.button whileHover={{ scale: 1.05 }}>
              Create your resume
            </motion.button>
          </NavLink>

          {/* Profile button */}
          <motion.button whileHover={{ scale: 1.05 }} onClick={handleProfile}>
            Profile
          </motion.button>

          {/* ✅ AnimatePresence for dropdown */}
          <AnimatePresence>
            {isShow && (
              <motion.div
                className="dropdown"
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <motion.p>username</motion.p>
                <motion.p>password</motion.p>

                {/* NavLink for Logout */}
                <NavLink to="/register">
                  <motion.button whileHover={{ scale: 1.05 }}>
                    Logout
                  </motion.button>
                </NavLink>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Nav;
