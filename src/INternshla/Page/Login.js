

import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; 
import "../css/Login.css";
import axios from "axios";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate(); 

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:4000/auth/login", {
        username: data.username,
        password: data.password,
      }, { withCredentials: true }); 

      console.log("✅ User logged in:", response.data);

      
      navigate("/nav");

    } catch (error) {
      console.error("❌ Login failed:", error);
    }
  };

  return (
    <motion.div
      className="login-container"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <motion.form
        className="login-form"
        onSubmit={handleSubmit(onSubmit)}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="login-title">Login</h2>

        <label>Username:</label>
        <motion.input
          type="text"
          {...register("username", { required: true })}
          whileFocus={{ scale: 1.05 }}
        />
        {errors.username && <span className="error-text">This field is required</span>}

        <label>Password:</label>
        <motion.input
          type="password"
          {...register("password", { required: true })}
          whileFocus={{ scale: 1.05 }}
        />
        {errors.password && <span className="error-text">This field is required</span>}

        <motion.button
          type="submit"
          className="login-btn"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Login
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default Login;
