// import React, { useEffect, useRef, useState } from 'react'
// import {motion} from "framer-motion"
// import axios from "axios"
// const SimplePagination = () => {
//     const [data,setdata]=useState([])
//      const [page, setPage] = useState(0);
//     const nameref=useRef()
    
//         const fetch=async()=>{
//             try {
//                 const responce=await axios.get(`http:localhost:4000/api/students`,{withCredentials:true})
//                 setdata(responce.data)
//             } catch (error) {
//                 console.log(`someting went wrong ${error}`)
//             }
//         }
        
//     useEffect(()=>{
//         fetch()
//     },[page])
//     const handlesearch=async(iteam,ref)=>{
        
//         try {
//             const responce=await axios.get(`http://localhost:4000/api/students/firstname`,{withCredentials:true},
//                 params: { nameref.current.value()}
//             )
//             setdata(responce.data)
//         } catch (error) {
//             console.error(`something went wrong`)
//         }
//     }
//     const handlePage=async(id)=>{
// try {
//     const responce=await axios.get(`http:localhost:4000/api/students/page/:page`,{withCredentials:true})
//     setdata(responce.data)
// } catch (error) {
//     console.log(`something went wrong ${error}`)
// }
//     }
//   return (
//     <motion.div className='parent'>
//       {data.length>0& (
//         <div className='child'>
//             {data.map((iteam,index)=>{
//                 <motion.div key={index} className='searchcointainer'>
//                     <input type='text'placeholder='enter your name'  ref={nameref} onChange={()=>e.target.value()}/>
//                 </motion.div>
//                 <motion.div className='searchbttn'>
//                     <button type='submit' onClick={()=>handlesearch(iteam,ref)}>Search</button>
//                 </motion.div>
//                 <motion.div className='paginationbox' onClick={() => setPage(page > 0 ? page - 1 : 0)}>
//                 <div className='box'>
//                     preav
//                 </div>
//                 <div className='box'>
//                     1
//                 </div>
//                 <div className='box'>
//                     2
//                 </div>
//                 <div className='box'>
//                     3
//                 </div>
//                 <div className='box'>
//                     next
//                 </div>
//             </motion.div>
//             })}
            
//         </div>
//       ):(
//         <div>Loading...</div>
//       )}
//     </motion.div>
//   )
// }

// export default SimplePagination

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import "./SimplePagination.css"; // 👈 Import the CSS

const SimplePagination = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const nameref = useRef();

  // Motion Variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.15, when: "beforeChildren" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 120, damping: 12 },
    },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  };

  // API Calls
  const getAll = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/students");
      setData(response.data);
    } catch (error) {
      console.error("Something went wrong (getAll):", error);
    }
  };

  const getPaginated = async (pageNo) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:5000/api/students/page/${pageNo}`
      );
      setData(res.data);
      setPage(pageNo);
    } catch (error) {
      console.error("Something went wrong (pagination):", error);
    } finally {
      setLoading(false);
    }
  };

  const searchByFirstname = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/students/firstname", {
        params: { name: nameref.current.value },
      });
      setData(res.data);
    } catch (error) {
      console.error("Something went wrong (search):", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPaginated(0);
  }, []);

  return (
    <motion.div
      className="pagination-container"
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      {/* 🔍 Search Section */}
      <motion.div
        className="search-section"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <input type="text" placeholder="Enter firstname" ref={nameref} />
        <button onClick={searchByFirstname} className="btn btn-blue">
          Search
        </button>
        <button onClick={getAll} className="btn btn-gray">
          Get All
        </button>
      </motion.div>

      {/* 📋 Data Section */}
      {loading ? (
        <div className="loading">Loading...</div>
      ) : data.length > 0 ? (
        <motion.div
          className="card-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {data.map((student) => (
            <motion.div
              key={student.id}
              className="student-card"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <h2>
                {student.firstname} {student.lastname}
              </h2>
              <p>📚 School: {student.school}</p>
              <p>📞 Phone: {student.phone_number}</p>
              <p>
                📍 {student.location}, {student.state}
              </p>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="no-data">No students found</div>
      )}

      {/* 🔄 Pagination */}
      <motion.div
        className="pagination-buttons"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <button
          onClick={() => getPaginated(page > 0 ? page - 1 : 0)}
          className="btn btn-green"
        >
          Prev
        </button>
        <span className="page-info">Page {page + 1}</span>
        <button
          onClick={() => getPaginated(page + 1)}
          className="btn btn-green"
        >
          Next
        </button>
      </motion.div>
    </motion.div>
  );
};

export default SimplePagination;
