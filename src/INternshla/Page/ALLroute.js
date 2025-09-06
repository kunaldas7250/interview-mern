import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import Createresume from "../Page/Resume_builder_form";
import Nav from "../component/nav"

const AllRoutes = () => {
  return (
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<Home />} /> {/* ✅ Home only on "/" */}
        <Route path="/register" element={<Register />} />
        <Route path="/nav" element={<Nav/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/createresume" element={<Createresume />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AllRoutes;
