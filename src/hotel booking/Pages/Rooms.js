// import React, { useRef, useState } from "react";

// const Rooms = () => {
//     const [isshow,setisshow]=useState(false)
//     const [childrenshow,setchildrenshow]=useState(false)
//     const [rooms,setrooms]=useState(1)
//     const [guest,setGuest]=useState([1,2,3,4])
//     const [children,setchildren]=useState([1,2,3,4])
//     const [noofchiledren, setnoofchildren] = useState(Array.from({ length: 12 }, (_, i) => i + 1));

//     const childrenref=useRef()
//     const handlechildren=()=>{
//         childrenref.current.value=Number(childrenref.current.value)
//         if(childrenref.current.value===2 || childrenref.current.value>2){
//             setchildrenshow((prev)=>!prev)
//         }
//     }
//     const handleopen=()=>{
//         setisshow((prev)=>!prev)
//     }
//     const handlesubmit=()=>{
//         handleopen()
//         handlechildren()
//     }
//     const handleguest=(item)=>{
//         console.log(item)
//     }
//   return (
//     <div className="parent">
//       <div className="Rooms1" onClick={handleopen}>
//         <p>Room & Guest</p>
//         <p>
//           Rooms: ,Guest
//         </p>
//         <p>{children}</p>
//         <div>
//             <div>
//                 {isshow && (
//             <p> Rooms1</p>
//             <p>No of Guest </p>
//             {guest.map((item,index)=>{
//               return  <div onClick={()=>handleguest(item)}>{item}</div>
//             })}
//         )}
//             </div>
//             <div>
//                 <p>No of Children</p>
//                 {children.map((item,index)=>{
//                     <div onClick={handlechildren}>{item}</div>
//                     {childrenshow && (
//                          <>
//                         <p>ages</p>

//                         noofchiledren.map((iteam,index)=>{
//                           return  <div key={index}>
//                                 <div>{iteam}</div>
//                             </div>
//                            </>
//                         })
//                     )}
//                 })}
//             </div>
//         </div>
//         <div>
//             <div>
//                 <button onClick={handlesubmit}>
//                     No of Rooms
//                 </button>
//             </div>
//             <div>
//                 <button>
//                     Apply
//                 </button>
//             </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Rooms;

import React, { useState } from "react";
import { motion } from "framer-motion";
import "./Rooms.css";

const dropdownVariants = {
  hidden: { opacity: 0, y: -10, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.2 } },
};

const Rooms = () => {
  const [isshow, setIsshow] = useState(false);
  const [rooms] = useState(1);
  const [selectedGuests, setSelectedGuests] = useState(1);
  const [selectedChildren, setSelectedChildren] = useState(0);
  const [childrenAges, setChildrenAges] = useState([]);

  const guestOptions = [1, 2, 3, 4];
  const childrenOptions = [0, 1, 2, 3, 4];
  const ageOptions = Array.from({ length: 12 }, (_, i) => i + 2); // 2–13 yrs

  const handleopen = () => {
    setIsshow((prev) => !prev);
  };

  const handleguest = (item) => setSelectedGuests(item);

  const handlechildren = (item) => {
    setSelectedChildren(item);
    setChildrenAges(item > 0 ? Array(item).fill(2) : []);
  };

  const handleChildAgeChange = (index, age) => {
    const updated = [...childrenAges];
    updated[index] = parseInt(age);
    setChildrenAges(updated);
  };

  const handlesubmit = () => {
    setIsshow(false);
    console.log({
      rooms,
      guests: selectedGuests,
      children: selectedChildren,
      childrenAges,
    });
  };

  return (
    <motion.div className="parent">
      <motion.div
        className="Rooms1"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleopen}
      >
       
        <p>
          Rooms: {rooms}, Guest: {selectedGuests}, Children: {selectedChildren}
        </p>
      </motion.div>

      {isshow && (
        <motion.div
          className="dropdown"
          variants={dropdownVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.p>Rooms: {rooms}</motion.p>

          {/* Guest Selection */}
          <p>No of Guests</p>
          <div className="option-list">
            {guestOptions.map((item, index) => (
              <motion.div
                key={index}
                onClick={() => handleguest(item)}
                className={`option-item ${
                  selectedGuests === item ? "active" : ""
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item}
              </motion.div>
            ))}
          </div>

          {/* Children Selection */}
          <p>No of Children</p>
          <div className="option-list">
            {childrenOptions.map((item, index) => (
              <motion.div
                key={index}
                onClick={() => handlechildren(item)}
                className={`option-item ${
                  selectedChildren === item ? "active" : ""
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item}
              </motion.div>
            ))}
          </div>

          {/* Children Ages */}
          {selectedChildren > 0 && (
            <motion.div>
              <motion.p>Children Ages</motion.p>
              {childrenAges.map((age, index) => (
                <select
                  key={index}
                  value={age}
                  onChange={(e) => handleChildAgeChange(index, e.target.value)}
                >
                  {ageOptions.map((a) => (
                    <option key={a} value={a}>
                      {a} yrs
                    </option>
                  ))}
                </select>
              ))}
            </motion.div>
          )}

          <div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlesubmit}
            >
              Apply
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Rooms;
