

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import Template from "../Page/Template";   
import axios from "axios";
import "../css/Nav.css";

const Nav = () => {
  const [isShow, setIsShow] = useState(false);
  const [user, setUser] = useState(null); 

  const handleProfile = () => {
    setIsShow((prev) => !prev);
  };

  // ✅ Fetch logged-in user info on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:4000/auth/me", {
          withCredentials: true, 
        });
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, []);

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
    <motion.div className="nav-parent">
      <motion.div className="nav-child">
        <div className="text">
          <motion.p whileHover={{ scale: 1.05 }}>Resume Platform</motion.p>
        </div>

        <div className="button">
          <NavLink to="/createresume">
            <motion.button whileHover={{ scale: 1.05 }}>
              Create your resume
            </motion.button>
          </NavLink>

          <motion.button whileHover={{ scale: 1.05 }} onClick={handleProfile}>
            Profile
          </motion.button>

          <AnimatePresence>
            {isShow && (
              <motion.div
                className="dropdown"
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {user ? (
                  <>
                    <motion.p>Username: {user.username}</motion.p>
                    <motion.p>Password: {user.password}</motion.p>
                  </>
                ) : (
                  <motion.p>Loading...</motion.p>
                )}
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

      <Template />
    </motion.div>
  );
};

export default Nav;
