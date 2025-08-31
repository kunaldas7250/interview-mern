import React from "react";
import { NavLink } from "react-router-dom";
import "./home.css"; // import css file

const HOME = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Employee Portal</h1>
      <p className="home-subtitle">Choose an option to continue</p>

      <div className="nav-links">
        <NavLink to="/Register" className="btn btn-register">
          Register
        </NavLink>
        <NavLink to="/Login" className="btn btn-login">
          Login
        </NavLink>
      </div>
    </div>
  );
};

export default HOME;
