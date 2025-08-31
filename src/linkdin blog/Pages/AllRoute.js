// import React from 'react'
// import { BrowserRouter, Routes, Route} from "react-router-dom";
// import About from './About';
// import HOME from '../HeaderSection';
// import Education from './Education';
// import Project from './Project';
// import Technical from './Technical_skill';
// const AllRoute = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path='/' element={<HOME/>}/>
//         <Route path='/About' element={<About/>}/>
//         <Route path='/Technical' element={<Technical/>}/>
//         <Route path='/Education' element={<Education/>}/>
//         <Route path='/Project' element={<Project/>}/>
//       </Routes>
//     </BrowserRouter>
//   )
// }

// export default AllRoute



import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from './About';
import HeaderSection from '../HeaderSection'; // ✅ Navbar/Header
import Education from './Education';
import Project from './Project';
import Technical from './Technical_skill';
import HomePage from './Home'; // create a simple homepage component
// import BodySection from '../BodySection';
const AllRoute = () => {
  return (
    <BrowserRouter>
      {/* ✅ Header should be outside <Routes>, so it always shows */}
      <HeaderSection />
    {/* <BodySection/> */}
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/About' element={<About />} />
        <Route path='/Technical' element={<Technical />} />
        <Route path='/Education' element={<Education />} />
        <Route path='/Project' element={<Project />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AllRoute;
