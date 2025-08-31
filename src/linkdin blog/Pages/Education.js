import React from 'react'
import { motion } from "framer-motion"
import "./Educ.css"
const Education = () => {
  return (
    <motion.div
      className='page-container  education-parent'
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1>Education</h1>
      <hr />

      <motion.table
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <thead>
          <tr>
            <th>10th Standard</th>
            <th>Diploma</th>
            <th>Graduation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Subhas Public School</td>
            <td>Subhas Institute of Technology</td>
            <td>Techno India University</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td>43%</td>
            <td>75%</td>
            <td>64%</td>
          </tr>
        </tfoot>
      </motion.table>
    </motion.div>
  )
}

export default Education
