// import React from "react";
// import { useForm } from "react-hook-form";
// import { NavLink, useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./style.css";

// const Register = () => {
//   const navigate = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       email: "",
//       password: "",
//       department: "",
//       firstName: "",
//       lastName: "",
//     },
//   });

//   const onSubmit = async (data) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:4000/Register",
//         {
//           firstname: data.firstName,
//           lastname: data.lastName,
//           email: data.email,
//           password: data.password,
//           department: data.department,
//         },
//         {
//           withCredentials: true,
//           headers: {
//             "X-CSRF-Token": "token-from-backend", // fetch from a GET request or server cookie
//           },
//         }
//       );

//       console.log("✅ Registered Successfully:", response.data);
//       alert("User registered successfully!");
//       navigate("/Login");
//     } catch (error) {
//       console.error("❌ Something went wrong:", error.response?.data || error);
//       alert(error.response?.data || "Registration failed!");
//     }
//   };

//   return (
//     <div className="register-container">
//       <div className="register-card">
//         <h2 className="register-title">Employee Signup</h2>
//         <p className="register-subtitle">
//           Create an account to access your dashboard
//         </p>

//         <form onSubmit={handleSubmit(onSubmit)} className="form">
//           {/* First Name */}
//           <div className="form-group">
//             <label>First Name</label>
//             <input
//               {...register("firstName", {
//                 required: "First name is required",
//                 minLength: { value: 3, message: "Min length is 3" },
//                 maxLength: { value: 15, message: "Max length is 15" },
//               })}
//               placeholder="John"
//             />
//             {errors.firstName && (
//               <p className="error">{errors.firstName.message}</p>
//             )}
//           </div>

//           {/* Last Name */}
//           <div className="form-group">
//             <label>Last Name</label>
//             <input
//               {...register("lastName", {
//                 required: "Last name is required",
//                 minLength: { value: 2, message: "Min length is 2" },
//                 maxLength: { value: 15, message: "Max length is 15" },
//               })}
//               placeholder="Doe"
//             />
//             {errors.lastName && (
//               <p className="error">{errors.lastName.message}</p>
//             )}
//           </div>

//           {/* Email */}
//           <div className="form-group">
//             <label>Email</label>
//             <input
//               type="email"
//               {...register("email", { required: "Email is required" })}
//               placeholder="example@email.com"
//             />
//             {errors.email && <p className="error">{errors.email.message}</p>}
//           </div>

//           {/* Password */}
//           <div className="form-group">
//             <label>Password</label>
//             <input
//               type="password"
//               {...register("password", {
//                 required: "Password is required",
//                 minLength: { value: 6, message: "Min length is 6 characters" },
//                 pattern: {
//                   value: /^(?=.*[A-Z])(?=.*[0-9])/,
//                   message:
//                     "Must include at least 1 uppercase letter and 1 number",
//                 },
//               })}
//               placeholder="••••••••"
//             />
//             {errors.password && (
//               <p className="error">{errors.password.message}</p>
//             )}
//           </div>

//           {/* Department */}
//           <div className="form-group">
//             <label>Department</label>
//             <select
//               {...register("department", {
//                 required: "Department is required",
//               })}
//             >
//               <option value="">Select Department</option>
//               <option value="HR">HR</option>
//               <option value="IT">IT</option>
//               <option value="Finance">Finance</option>
//             </select>
//             {errors.department && (
//               <p className="error">{errors.department.message}</p>
//             )}
//           </div>

//           {/* Submit Button */}
//           <button type="submit" className="btn-primary">
//             Sign Up
//           </button>

//           <div className="divider">or</div>

//           {/* Go to Login */}
//           <NavLink to="/Login" className="btn-secondary">
//             Login
//           </NavLink>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;



import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";

const Register = () => {
  const navigate = useNavigate();
  const [csrfToken, setCsrfToken] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      department: "",
    },
  });

  // Fetch CSRF token when component mounts
 useEffect(() => {
  axios.get("http://localhost:4000/csrf-token", { withCredentials: true })
    .then((res) => {
      setCsrfToken(res.data.csrfToken); // store token in state
      console.log("CSRF token fetched:", res.data.csrfToken);
    })
    .catch((err) => console.error("❌ CSRF fetch failed:", err));
}, []);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/Register",
        {
          firstname: data.firstName,
          lastname: data.lastName,
          email: data.email,
          password: data.password,
          department: data.department,
        },
        {
          withCredentials: true,
          headers: { "X-CSRF-Token": csrfToken },
        }
      );

      console.log("✅ Registered Successfully:", response.data);
      alert("User registered successfully!");
      navigate("/Login");
    } catch (error) {
      console.error(
        "❌ Something went wrong:",
        error.response?.data || error
      );
      alert(error.response?.data?.message || "Registration failed!");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Employee Signup</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="form">
          {/* First Name */}
          <input
            {...register("firstName", { required: "First name is required" })}
            placeholder="First Name"
          />
          {errors.firstName && <p className="error">{errors.firstName.message}</p>}

          {/* Last Name */}
          <input
            {...register("lastName", { required: "Last name is required" })}
            placeholder="Last Name"
          />
          {errors.lastName && <p className="error">{errors.lastName.message}</p>}

          {/* Email */}
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            placeholder="Email"
          />
          {errors.email && <p className="error">{errors.email.message}</p>}

          {/* Password */}
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Minimum 6 characters" },
            })}
            placeholder="Password"
          />
          {errors.password && <p className="error">{errors.password.message}</p>}

          {/* Department */}
          <select {...register("department", { required: "Department is required" })}>
            <option value="">Select Department</option>
            <option value="HR">HR</option>
            <option value="IT">IT</option>
            <option value="Finance">Finance</option>
          </select>
          {errors.department && <p className="error">{errors.department.message}</p>}

          <button type="submit" className="btn-primary">Sign Up</button>
        </form>

        <div className="divider">or</div>
        <NavLink to="/Login" className="btn-secondary">Login</NavLink>
      </div>
    </div>
  );
};

export default Register;
