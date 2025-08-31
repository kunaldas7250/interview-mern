

import React from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import "./Footer.css"
const Footer = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
  };

  return (
    <motion.div
      className="footer-parent"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div className="footer-child">
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          Contact
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Interested in working together? Let&apos;s talk
        </motion.h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Full Name:</label>
          <input
            {...register("fullname", { required: true })}
            aria-invalid={errors.fullname ? "true" : "false"}
          />
          {errors.fullname && <p role="alert">Full name is required</p>}

          <label>Email:</label>
          <input
            type="email"
            {...register("mail", { required: "Email Address is required" })}
            aria-invalid={errors.mail ? "true" : "false"}
          />
          {errors.mail && <p role="alert">{errors.mail.message}</p>}

          <label>Subject:</label>
          <input
            {...register("subject", { required: "Subject is required" })}
            aria-invalid={errors.subject ? "true" : "false"}
          />
          {errors.subject && <p role="alert">{errors.subject.message}</p>}

          <label>Enter your message:</label>
          <textarea
            {...register("message", { required: "Message is required" })}
            aria-invalid={errors.message ? "true" : "false"}
          ></textarea>
          {errors.message && <p role="alert">{errors.message.message}</p>}

          <input type="submit" value="Send Message" />
        </form>
      </div>
      
    </motion.div>
    
  );
};

export default Footer;
