import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/Register.css"; 

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:4000/auth/signup", {
        username: data.username,
        password: data.password,
        email: data.email,
      });

      console.log("✅ Register Data:", response.data);

      
      navigate("/login");

    } catch (error) {
      console.error("❌ Something went wrong:", error);
    }
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
        {errors.username && <span className="error-text">This field is required</span>}

        <label>Password:</label>
        <motion.input
          type="password"
          {...register("password", { required: true })}
          whileFocus={{ scale: 1.05 }}
        />
        {errors.password && <span className="error-text">This field is required</span>}

        <label>Email:</label>
        <motion.input
          type="email"
          {...register("email", { required: true })}
          whileFocus={{ scale: 1.05 }}
        />
        {errors.email && <span className="error-text">This field is required</span>}

        {/* Submit button */}
        <motion.button
          type="submit"
          className="register-btn"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Submit
        </motion.button>

       
        <Link to="/login">
          <motion.button
            type="button"
            className="login-btn"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Login
          </motion.button>
        </Link>
      </motion.form>
    </motion.div>
  );
};

export default Register;
