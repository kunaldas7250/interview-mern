import React from 'react'
import { FaBed } from "react-icons/fa";
import Bokking from './Bokking';
import { motion } from "framer-motion";
import "../css/Search.css"
import Hotels from './hote';
import Sidebar from './Sidebar';

const Search = () => {
  

  

 

  return (
    <motion.div className='.search_parent'>
      {/* 🔝 Navbar */}
      <motion.div className='navbar'>
        <div className='icon'>
          <FaBed />
        </div>
        <div className='booking'>
          <Bokking />
        </div>
      </motion.div>
      {/* sidebar */}
      <Sidebar/>
      {/* 🏨 Cards */}
     <Hotels/>
    </motion.div>
  )
}

export default Search;
