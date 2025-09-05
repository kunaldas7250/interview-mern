import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import "../css/Register.css"; // ✅ external CSS

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // ✅ submit function
  const onSubmit = (data) => {
    console.log("Register Data:", data);
    // Call API here
  };

  return (
    <motion.div
      className="register-container"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <motion.form
        className="register-form"
        onSubmit={handleSubmit(onSubmit)}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="register-title">Register</h2>

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

        <label>Email:</label>
        <motion.input
          type="email"
          {...register("email", { required: true })}
          whileFocus={{ scale: 1.05 }}
        />
        {errors.email && (
          <span className="error-text">This field is required</span>
        )}

        <motion.button
          type="submit"
          className="register-btn"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Submit
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default Register;
