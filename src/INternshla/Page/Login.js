import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import "../css/Login.css"; // ✅ add external css

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Login Data:", data);
    // Call API here
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
        {errors.username && (
          <span className="error-text">This field is required</span>
        )}

        <label>Password:</label>
        <motion.input
          type="password"
          {...register("password", { required: true })}
          whileFocus={{ scale: 1.05 }}
        />
        {errors.password && (
          <span className="error-text">This field is required</span>
        )}

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
