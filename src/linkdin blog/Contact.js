// import React from 'react'
// import { NavLink } from 'react-router-dom'
// import {motion} from "framer-motion"
// import gmail from"./Pages/gmail.png"
// import linkdin from "./Pages/linkdin.jpg"
// import github from "./Pages/github.png"
// import twitter from "./Pages/twitter.png"
// const Contact = () => {
//   return (
//     <div>
//       <motion.hr><NavLink to="/"></NavLink></motion.hr>
//       <motion.ul>
//         <motion.li>
//             <img src={gmail} alt='pic not not found'/><a  href='dashingkunal143@gmail.com'>Gmail</a>
//         </motion.li>
//         <motion.li>
//             <img src={linkdin} alt='pic not found'/>< a href='https://www.linkedin.com/in/kunal-das-846295247/'>Linkdin</a>
//         </motion.li>
//         <motion.li>
//             <img src={github} alt='pic not not found'/><a href='https://github.com/kunaldas7250'>Github</a>
//         </motion.li>
//         <motion.li>
//             <img src={twitter} alt='pic not found'/><a href='https://x.com/proxyserve79181'>Twitter</a>
//         </motion.li>
//       </motion.ul>
//     </div>
//   )
// }

// export default Contact



import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import gmail from "./Pages/gmail.png";
import linkdin from "./Pages/linkdin.jpg";
import github from "./Pages/github.png";
import twitter from "./Pages/twitter.png";
import "./Contact.css"
const Contact = () => {
  // Variants for list items
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      className="contact-parent"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <NavLink to="/">
        {/* <motion.hr
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
        /> */}
      </NavLink>

      <motion.ul
        className="contact-list"
        initial="hidden"
        animate="visible"
      >
        <motion.li variants={itemVariants} whileHover={{ scale: 1.1 }}>
          <img src={gmail} alt="gmail" />
          <a href="mailto:dashingkunal143@gmail.com">Gmail</a>
        </motion.li>

        <motion.li variants={itemVariants} whileHover={{ scale: 1.1 }}>
          <img src={linkdin} alt="linkedin" />
          <a href="https://www.linkedin.com/in/kunal-das-846295247/" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </motion.li>

        <motion.li variants={itemVariants} whileHover={{ scale: 1.1 }}>
          <img src={github} alt="github" />
          <a href="https://github.com/kunaldas7250" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </motion.li>

        <motion.li variants={itemVariants} whileHover={{ scale: 1.1 }}>
          <img src={twitter} alt="twitter" />
          <a href="https://x.com/proxyserve79181" target="_blank" rel="noreferrer">
            Twitter
          </a>
        </motion.li>
      </motion.ul>
      <hr></hr>
      <motion.p
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
  whileHover={{ scale: 1.1, color: "#4a90e2" }}
  whileTap={{ scale: 0.9, opacity: 0.7 }}
>
  Made BY Kunal Das
</motion.p>

    </motion.div>
  );
};

export default Contact;
