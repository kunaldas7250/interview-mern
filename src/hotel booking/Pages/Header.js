// import React, { useState } from 'react'
// import { IoIosMenu } from "react-icons/io";
// import {motion} from "framer-motion"
// import { LuPhoneCall } from "react-icons/lu";
// import yatra from "./yatra.png"
// import { redirect } from 'react-router-dom';
// const Header = () => {
//     const [isshow,setisshow]=useState(false)
//     const[supportisshow,setsupportisshow]=useState(false)
//     const handleOpen=()={
//         setisshow((prev)=>!prev)
//     }
//     const handleloginsigup=()=>{
//         redirect("/Register")
//     }
//   return (
//     <div className='parentcointainer'>
//       <div className='childMenu'>
//         <IoIosMenu onClick={handleOpen} />
//         {isshow?(
//             <div className='parentmenu'>
//             <div className='login/signup'>
//                 <button onClick={handleloginsigup}>Login/Signup</button>
//                 <p>Login for best deals & offers</p>
//             </div>
//             <div className='support'>
//             <button onClick={handlesupport}><LuPhoneCall /></button>
//             {supportisshow?(
//                 <div className='supportul'>
//                     <ul>
//                         <li>Check your Refund</li>
//                         <li>Contact Us</li>
//                         <li>Complete Your Booking</li>
//                         <li>Make a payment</li>
//                         <li>Flight Cancenlation</li>
//                         <li>Complete hotel booking</li>
//                         <li>Corparate Travel</li>
//                     </ul>
//                 </div>
//             ):(
//                 <div>Loding ..</div>
//             )}
//             </div>
//             <button onClick={handleoffers}>Offers</button>
//             </div>
//         ):(
//             <div>Loading ...</div>
//         )}
//         <img src={yatra} alt='pic not found'/>
//       </div>
//     </div>
//   )
// }

// export default Header

// import React, { useState } from "react";
// import { IoIosMenu } from "react-icons/io";
// import { motion } from "framer-motion";
// import { LuPhoneCall } from "react-icons/lu";
// import yatra from "./yatra.png";
// import { useNavigate } from "react-router-dom";
// import "./Header.css"
// const Header = () => {
//   const [isshow, setisshow] = useState(false);
//   const [supportisshow, setsupportisshow] = useState(false);
//   const navigate = useNavigate();

//   const handleOpen = () => {
//     setisshow((prev) => !prev);
//   };

//   const handleloginsigup = () => {
//     navigate("/Register");
//   };

//   const handlesupport = () => {
//     setsupportisshow((prev) => !prev);
//   };

//   const handleoffers = () => {
//     navigate("/offers");
//   };

//   return (
//     <motion.div className="parentcointainer">
//       <motion.div className="childMenu">
//         <IoIosMenu onClick={handleOpen} />
//         {isshow ? (
//           <motion.div
//             className="parentmenu"
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             transition={{ duration: 0.3 }}
//           >
//             <div className="login-signup">
//               <button onClick={handleloginsigup}>Login/Signup</button>
//               <p>Login for best deals & offers</p>
//             </div>
//             <div className="support">
//               <button onClick={handlesupport}>
//                 <LuPhoneCall />
//               </button>
//              {supportisshow && (
//   <div className="supportul">
//     <ul>
//       <li>Check your Refund</li>
//       <li>Contact Us</li>
//       <li>Complete Your Booking</li>
//       <li>Make a payment</li>
//       <li>Flight Cancellation</li>
//       <li>Complete hotel booking</li>
//       <li>Corporate Travel</li>
//     </ul>
//   </div>
// )}

//             <button onClick={handleoffers}>Offers</button>
//           </motion.div>
//         ) : (
//           <div>Loading ...</div>
//         )}
//         <motion.img
//           src={yatra}
//           alt="pic not found"
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5 }}
//         />
//       </motion.div>
//     </motion.div>
//   );
// };

// export default Header;


import React, { useState } from "react";
import { IoIosMenu } from "react-icons/io";
import { motion } from "framer-motion";
import { LuPhoneCall } from "react-icons/lu";
import yatra from "./yatra.png";
import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [isshow, setisshow] = useState(false);
  const [supportisshow, setsupportisshow] = useState(false);
  const navigate = useNavigate();

  const handleOpen = () => {
    setisshow((prev) => !prev);
  };

  const handleloginsigup = () => {
    navigate("/Register");
  };

  const handlesupport = () => {
    setsupportisshow((prev) => !prev);
  };

  const handleoffers = () => {
    navigate("/offers");
  };

  return (
    <motion.div className="parentcointainer">
      <motion.div className="childMenu">
        <IoIosMenu onClick={handleOpen} />
        {isshow ? (
          <motion.div
            className="parentmenu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="login-signup">
              <button onClick={handleloginsigup}>Login/Signup</button>
              <p>Login for best deals & offers</p>
            </div>

            <div className="support">
              <button onClick={handlesupport}>
                <LuPhoneCall />
              </button>
              {supportisshow && (
                <div className="supportul">
                  <ul>
                    <li>Check your Refund</li>
                    <li>Contact Us</li>
                    <li>Complete Your Booking</li>
                    <li>Make a payment</li>
                    <li>Flight Cancellation</li>
                    <li>Complete hotel booking</li>
                    <li>Corporate Travel</li>
                  </ul>
                </div>
              )}
            </div> {/* ✅ properly closed support div */}

            <button onClick={handleoffers}>Offers</button>
          </motion.div>
        ) : (
          <div>Loading ...</div>
        )}

        <motion.img
          src={yatra}
          alt="pic not found"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>
    </motion.div>
  );
};

export default Header;
