// import React from 'react'
// import {motion} from "framer-motion"
// import { SlCalender } from "react-icons/sl";
// import { IoTicket } from "react-icons/io5";
// import { LuNotebookPen } from "react-icons/lu";
// import { BsCashCoin } from "react-icons/bs";
// import { FaMoneyBillTransfer } from "react-icons/fa6";
// import { MdFileCopy } from "react-icons/md";
// import ReCAPTCHA from "react-google-recaptcha";
// import { GoogleLogin,googleLogout } from '@react-oauth/google';
// import {  useNavigate } from 'react-router-dom';
// import { jwtDecode } from "jwt-decode";

// const Register = () => {
//      const [recaptchaValue, setRecaptchaValue] = useState(null);

//     const handleExpired = () => {
//     setTimeout(() => {
//       setRecaptchaValue(null);
//       console.log("reCAPTCHA cleared after 5s delay");
//     }, 5000);
//   };
//    const handleSubmitWithRecaptcha = async (e) => {
//     e.preventDefault();

//     if (!recaptchaValue) {
//       alert("Please complete the reCAPTCHA before submitting!");
//       return;
//     }

//     try {
//       const response = await axios.post("http://localhost:4000/submit", {
//         username,
//         password,
//         recaptcha: recaptchaValue,
//       });

//       const data = response.data;

//       if (data.success) {
//         console.log("Form Submitted ✅:", data);
//         alert("Form submitted successfully!");
//       } else {
//         alert("❌ reCAPTCHA failed, try again");
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     }

//     setUsername("");
//     setPassword("");
//   };
//   const handlelogout=()=>{
//     googleLogout();
//     Navigate("/login")
//   }
//   return (
//     <motion.div className='parentcontainer'>
//       <motion.div className='logincontainer'>
//         <form>
//             <label>Email:</label>
//             <input type='text' value={email} onChange={(e)=>setemail(e.target.value)}/>
//             <label>Password:</label>
//             <input type='Number' value={passowrd} onChange={(e)=>setpassowrd(e.target.value)}
//              <ReCAPTCHA
//           sitekey="6LcI77srAAAAAOJKwOXUnrDcSkOGozbfFlrFc1Jt"
//           onChange={setRecaptchaValue}
//           onExpired={handleExpired}
//           ref={recaptchaRef}
//           className="recaptcha-box"
//         />
//          <button type="submit" className="submit-btn">
//           Submit
//         </button>
//         </form>
//         <hr>or</hr>
//         <div className='oauthgoogle'>
//             <GoogleLogin
//   onSuccess={credentialResponse => {
//     console.log(jwtDecode(credentialResponse.credential));
//     Navigate("/home")
//   }}
//   onError={() => {
//     console.log('Login Failed');
//   }}
// />;
//         </div>
//       </motion.div>
//       <motion.div className='knowmore'>
//         <p> Looged in /Registered user get more</p>
//         <p> <SlCalender />view/cancel/Resudule bookings</p>
//         <p> <IoTicket /> check booking history manage cancelation & print eTickets</p>
//         <p> <LuNotebookPen /> Book faster with Pre-Filled Forms,saved Traveelers & Saved Cards</p>
//         <p> <BsCashCoin /> Use Yatra eCash to get discounts</p>
//         <p> <FaMoneyBillTransfer />Transfer eCash to Shopping Coupons<br>from Amazon,BookMyShow,etc.</br></p>
//         <p> <MdFileCopy />Do you have GST number?Additional Benfeit of free Meals ,Low Cancenlation Free Resuduling for SME business customers</p>
//       </motion.div>
//     </motion.div>
//   )
// }

// export default Register

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { SlCalender } from "react-icons/sl";
import { IoTicket } from "react-icons/io5";
import { LuNotebookPen } from "react-icons/lu";
import { BsCashCoin } from "react-icons/bs";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { MdFileCopy } from "react-icons/md";
import ReCAPTCHA from "react-google-recaptcha";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import "./Register.css"
const Register = () => {
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const recaptchaRef = useRef();
  const navigate = useNavigate();

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
        email,
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

    setEmail("");
    setPassword("");
    if (recaptchaRef.current) recaptchaRef.current.reset();
  };

  const handleLogout = () => {
    googleLogout();
    navigate("/home");
  };

  return (
    <motion.div
      className="parentcontainer"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="logincontainer"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.form onSubmit={handleSubmitWithRecaptcha}>
          <label>Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
        </motion.form>

        <hr />
        <p style={{ display: "flex", justifyContent: "center" }}>or</p>


        <div className="oauthgoogle">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log(jwtDecode(credentialResponse.credential));
              navigate("/home");
            }}
            onError={handleLogout}
          />
        </div>
      </motion.div>

      <motion.div
        className="knowmore"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <p style={{height:"50px",backgroundColor:"pink"}}>Logged in / Registered users get more</p>
        <p>
          <SlCalender /> View / Cancel / Reschedule bookings
        </p>
        <p>
          <IoTicket /> Check booking history, manage cancellations & print
          eTickets
        </p>
        <p>
          <LuNotebookPen /> Book faster with Pre-Filled Forms, Saved Travelers &
          Saved Cards
        </p>
        <p>
          <BsCashCoin /> Use Yatra eCash to get discounts
        </p>
        <p>
          <FaMoneyBillTransfer /> Transfer eCash to Shopping Coupons
          <br /> from Amazon, BookMyShow, etc.
        </p>
        <p>
          <MdFileCopy /> Have a GST number? Get free Meals, Lower Cancellation
          Fees & Easy Rescheduling for SME business customers
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Register;
