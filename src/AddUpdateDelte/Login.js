
// import React from "react";
// import { useForm } from "react-hook-form";
// import { NavLink, useNavigate } from "react-router-dom"; // ✅ import useNavigate
// import "./login.css";
// import axios from "axios";

// const Login = () => {
//   const navigate = useNavigate(); // ✅ hook for navigation

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = async (data) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:4000/login",
//         {
//           email: data.email,
//           department: data.department,
//           password: data.password,
//         },
//         { withCredentials: true },
//          // ✅ cookie will be stored automatically
//       );

//       console.log("✅ User logged in successfully:", response.data);

//       // ✅ Redirect to main page after login
//       navigate("/MainPage"); // <-- change to your actual route
//     } catch (error) {
//       console.error("❌ Login failed:", error.response?.data || error);
//       alert(error.response?.data || "Login failed!");
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-card">
//         <h2 className="login-title">Employee Login</h2>

//         <form onSubmit={handleSubmit(onSubmit)} className="login-form">
//           {/* Email */}
//           <div className="form-group">
//             <label>Email</label>
//             <input
//               type="email"
//               {...register("email", { required: "Email is required" })}
//             />
//             {errors.email && <p className="error">{errors.email.message}</p>}
//           </div>

//           {/* Password */}
//           <div className="form-group">
//             <label>Password</label>
//             <input
//               type="password"
//               {...register("password", { required: "Password is required" })}
//             />
//             {errors.password && (
//               <p className="error">{errors.password.message}</p>
//             )}
//           </div>

//           {/* Department */}
//           <div className="form-group">
//             <label>Department</label>
//             <input
//               {...register("department", { required: "Department is required" })}
//             />
//             {errors.department && (
//               <p className="error">{errors.department.message}</p>
//             )}
//           </div>

//           {/* Buttons */}
//           <button type="submit" className="btn login-btn">
//             Login
//           </button>

//           <NavLink to="/Register">
//             <button type="button" className="btn register-btn">
//               Register
//             </button>
//           </NavLink>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;



import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import "./login.css";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [csrfToken, setCsrfToken] = useState(""); // ✅ state for CSRF token

  const { register, handleSubmit, formState: { errors } } = useForm();

  // ✅ Fetch CSRF token on component mount
  useEffect(() => {
    axios.get("http://localhost:4000/csrf-token", { withCredentials: true })
      .then(res => setCsrfToken(res.data.csrfToken))
      .catch(err => console.error("❌ Error fetching CSRF token:", err));
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/login",
        {
          email: data.email,
          department: data.department,
          password: data.password,
        },
        {
          withCredentials: true,
          headers: { "X-CSRF-Token": csrfToken }, // ✅ now defined
        }
      );

      console.log("✅ User logged in successfully:", response.data);
      navigate("/MainPage");
    } catch (error) {
      console.error("❌ Login failed:", error.response?.data || error);
      alert(error.response?.data || "Login failed!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Employee Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
          {/* Email */}
          <div className="form-group">
            <label>Email</label>
            <input type="email" {...register("email", { required: "Email is required" })} />
            {errors.email && <p className="error">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="form-group">
            <label>Password</label>
            <input type="password" {...register("password", { required: "Password is required" })} />
            {errors.password && <p className="error">{errors.password.message}</p>}
          </div>

          {/* Department */}
          <div className="form-group">
            <label>Department</label>
            <input {...register("department", { required: "Department is required" })} />
            {errors.department && <p className="error">{errors.department.message}</p>}
          </div>

          <button type="submit" className="btn login-btn">Login</button>

          <NavLink to="/Register">
            <button type="button" className="btn register-btn">Register</button>
          </NavLink>
        </form>
      </div>
    </div>
  );
};

export default Login;
