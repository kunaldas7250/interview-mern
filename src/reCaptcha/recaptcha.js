

import React, { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { motion } from "framer-motion";
import axios from "axios";
import "./RecaptchaForm.css"; // <-- import CSS file

const RecaptchaForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [recaptchaValue, setRecaptchaValue] = useState(null);

  const recaptchaRef = useRef();

  const handleExpired = () => {
    setTimeout(() => {
      setRecaptchaValue(null);
      console.log("reCAPTCHA cleared after 5s delay");
    }, 5000);
  };

  const handleSubmitWithRecaptcha = async (e) => {
    e.preventDefault();

    if (!recaptchaValue) {
      alert("Please complete the reCAPTCHA before submitting!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/submit", {
        username,
        password,
        recaptcha: recaptchaValue,
      });

      const data = response.data;

      if (data.success) {
        console.log("Form Submitted ✅:", data);
        alert("Form submitted successfully!");
      } else {
        alert("❌ reCAPTCHA failed, try again");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }

    setUsername("");
    setPassword("");
  };

  return (
    <motion.div
      className="form-container"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmitWithRecaptcha} className="form-box">
        <h2 className="form-title">Login Form</h2>

        <label>Username:</label>
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <ReCAPTCHA
          sitekey="6LcI77srAAAAAOJKwOXUnrDcSkOGozbfFlrFc1Jt"
          onChange={setRecaptchaValue}
          onExpired={handleExpired}
          ref={recaptchaRef}
          className="recaptcha-box"
        />

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </motion.div>
  );
};

export default RecaptchaForm;
