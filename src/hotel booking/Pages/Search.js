import React from 'react'
import { FaBed } from "react-icons/fa";
import Bokking from './Bokking';
import { motion } from "framer-motion";
import "./Search.css"
import Hotels from './hote';

const Search = () => {
  

  

 

  return (
    <motion.div className='parent'>
      {/* 🔝 Navbar */}
      <motion.div className='navbar'>
        <div className='icon'>
          <FaBed />
        </div>
        <div className='booking'>
          <Bokking />
        </div>
      </motion.div>

      {/* 🏨 Cards */}
     <Hotels/>
    </motion.div>
  )
}

export default Search;
