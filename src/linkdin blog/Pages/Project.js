
import React, { useState } from "react";
import { motion } from "framer-motion";
import img from "./project.webp";
import "./Project.css"
const Project = () => {
  const projects = [
  {
    title: "Business Sales Dashboard",
    tech: ["Power BI", "Excel"],
    features: [
      "Resolved inconsistent/incomplete data using Power Query",
      "Learned DAX for flexible KPIs and filters",
      "Refined visuals through feedback-based iterations"
    ]
  },
  {
    title: "Cricket Match Prediction System",
    tech: ["React.js", "Node.js", "Express.js", "MySQL", "Pandas"],
    features: [
      "Collected and preprocessed match data",
      "Improved model accuracy with feature selection & tuning",
      "Evaluated using confusion matrix and visualizations"
    ]
  },
  {
    title: "Hotel Booking System",
    tech: ["React.js", "Tailwind CSS", "Node.js", "Express.js", "MySQL", "Razorpay/Stripe"],
    features: [
      "JWT-based login system",
      "Hotel search, room booking, and admin panel",
      "Integrated payment gateway (Razorpay/Stripe)",
      "Optimized queries, lazy loading, and mobile-first UI"
    ]
  },
  {
    title: "Ride Booking App (Uber Clone)",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Redux", "Socket.io"],
    features: [
      "Real-time ride tracking with Google Maps API & WebSocket",
      "Secure login, fare estimation, and responsive UI",
      "JWT authentication, bcrypt password hashing, debounce search"
    ]
  },
  {
    title: "Real-Time Chat App",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "WebSocket"],
    features: [
      "WebSocket for live chat",
      "JWT-based authentication, secure message storage in MongoDB",
      "Responsive UI with React.js"
    ]
  },
  {
    title: "Coffee Shop Website",
    tech: ["React.js", "Tailwind CSS"],
    features: [
      "Responsive single-page site for a fictional cafe",
      "Sections: Menu, location, contact",
      "Styled with Tailwind for mobile-first layout"
    ]
  },
  {
    title: "Employee Management System (MERN Stack)",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT Authentication", "CSURF"],
    features: [
      "JWT authentication with CSURF protection",
      "CRUD APIs for employees (Add, Update, Delete, View)",
      "Role-based access for admin and staff",
      "REST API with Express & MongoDB"
    ]
  },
  {
    title: "Drag and Drop UI",
    tech: ["React.js", "Framer Motion", "TailwindCSS"],
    features: [
      "Implemented drag-and-drop interactions with Framer Motion",
      "Smooth animations and responsive design using TailwindCSS",
      "Real-time card reordering with React state updates"
    ]
  },
  {
    title: "Star Rating Component",
    tech: ["React.js", "TailwindCSS", "React Icons"],
    features: [
      "Built a reusable star rating UI with hover and click interactions",
      "Stars highlighted dynamically using React state",
      "Styled with Tailwind for responsiveness"
    ]
  },
  {
    title: "Pagination System",
    tech: ["React.js", "Functional Components", "REST API"],
    features: [
      "Implemented server-side pagination using APIs",
      "Next/Previous page navigation with controlled state",
      "Optimized data fetching for large datasets"
    ]
  },
  {
    title: "Shopping Cart Project",
    tech: ["React.js", "REST API", "Framer Motion"],
    features: [
      "Fetched product data from API",
      "Added products to cart with increase/decrease quantity",
      "Animated cart UI using Framer Motion",
      "Dynamic total price calculation"
    ]
  },
  {
    title: "User Management System (Show Users & CRUD)",
    tech: ["React.js", "Node.js", "Express.js", "SQL (MySQL/PostgreSQL)"],
    features: [
      "Backend with Express.js + SQL database for storing user details",
      "CRUD API endpoints (GET, POST, PUT, DELETE) for user management",
      "React frontend displaying users in a table with Add, Edit, Delete functionality",
      "API integration with Axios for real-time updates",
      "Validation and error handling on both client & server"
    ]
  },
  {
    title: "Secure Authentication Backend",
    tech: ["Node.js", "Express.js", "JWT", "Express-Session", "CSURF"],
    features: [
      "Implemented JWT-based authentication with session management",
      "Added CSURF protection to prevent cross-site request forgery attacks",
      "Login, Register, and Logout APIs with secure cookies",
      "Password hashing with bcrypt",
      "Middleware for protected routes (accessible only with valid token/session)",
      "Error handling for token expiration and invalid sessions"
    ]
  },
  {
    title: "Secure Authentication with JWT & Cookies",
    tech: ["Node.js", "Express.js", "JWT", "Cookies", "bcrypt.js"],
    features: [
      "Implemented JWT-based login & signup system",
      "Tokens stored in HTTP-only cookies for improved security",
      "Passwords secured using bcrypt hashing",
      "Middleware for verifying JWT from cookies before accessing protected routes",
      "Auto token refresh & cookie expiry handling",
      "Logout clears cookie and invalidates token"
    ]
  },
  {
    title: "Form Validation System",
    tech: ["React.js", "Framer Motion", "Node.js", "Express.js", "JWT", "CSURF", "Cookies"],
    features: [
      "Dynamic form with animated error messages (React + Framer Motion)",
      "Real-time validation (email format, password strength, required fields)",
      "Smooth UI feedback using Framer Motion animations",
      "JWT-based authentication for login/register",
      "CSURF token protection to prevent cross-site request forgery",
      "Secure cookie storage (HTTP-only cookies) for session tokens",
      "Input sanitization & validation at server-side for extra security"
    ]
  }
];

    

  const [data] = useState(projects);

  return (
    <motion.div className="page-container  parentcontainer">
      <div className="childcontainer">
        <motion.img src={img} alt="pic not found" />
        {/* project section */}
        <motion.div className="projectsection">
          {data.map((item, index) => (
            <motion.div key={index} className="card">
              <h1>{item.title}</h1>
              <p>
                <strong>Tech:</strong> {item.tech.join(", ")}
              </p>
              <ul>
                {item.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Project;
