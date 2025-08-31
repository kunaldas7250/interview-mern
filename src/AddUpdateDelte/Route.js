// import React from 'react'
// import { BrowserRouter,Routes,Route} from 'react-router-dom'
// import Login from './Login'
// import Register from './Register'
// import MainPage from "./MainPage"
// const AllRoutes = () => {
//   return (
//     <>
//       <BrowserRouter>
//       <Routes>
//         <Route path="/MainPage" element={<MainPage/>}/>
//         <Route path="/Register" element={<Register/>}/>
//         <Route path="/Login" element={<Login/>}/>
//       </Routes>
//       </BrowserRouter>
//     </>
//   )
// }

// export default AllRoutes



import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import MainPage from "./MainPage";
import HOME from "./HOME";
const AllRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route → redirect to Login */}
        <Route path="/" element={<HOME/>} />

        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/MainPage" element={<MainPage />} />

        {/* 404 Page */}
        <Route path="*" element={<h1>404 Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AllRoutes;
