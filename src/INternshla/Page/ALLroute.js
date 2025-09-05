// INternshla/Page/AllRoutes.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import Nav from "../component/nav"; // ✅ import Nav
import Createresume from "../Page/Resume_builder_form"

const AllRoutes = () => {
  return (
    <BrowserRouter>
      <Nav />   {/* ✅ Nav inside router */}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Createresume" element={<Createresume/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default AllRoutes;
