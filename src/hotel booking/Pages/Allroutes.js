// import React from 'react'
// import { BrowserRouter,Route,Routes } from 'react-router-dom'
// import Register from './Register'
// import Home from './Home'
// const Allroutes = () => {
    
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path='/home' element={<Home/>}/>
//         <Route path='/Register' element={<Register/>}/>
//       </Routes>
//     </BrowserRouter>
//   )
// }

// export default Allroutes


import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Register from './Register'
// import Home from './Home'
import Header from './Header'
const Allroutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route → redirect to /home */}
        <Route path='/' element={<Navigate to="/home" replace />} />
        
        <Route path='/Header' element={<Header />} />

        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Allroutes
