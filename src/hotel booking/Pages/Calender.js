// import React, { useEffect, useState } from "react";
// import { FaLessThan } from "react-icons/fa6";
// import { FaGreaterThan } from "react-icons/fa";
// import "./Calendar.css"; // import CSS file
// import {motion} from "framer-motion"
// const Calendar = () => {
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [daysInMonth, setDaysInMonth] = useState([]);
//   const [startDay, setStartDay] = useState(0);
//   const [selectedDate, setSelectedDate] = useState(null);

//   useEffect(() => {
//     const year = currentDate.getFullYear();
//     const month = currentDate.getMonth();
//     const date = new Date(year, month, 1);
//     const days = [];

//     while (date.getMonth() === month) {
//       days.push(new Date(date));
//       date.setDate(date.getDate() + 1);
//     }

//     setDaysInMonth(days);
//     setStartDay(new Date(year, month, 1).getDay()); // Sunday = 0
//   }, [currentDate]);

//   const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

//   const prevMonth = () => {
//     const newDate = new Date(currentDate);
//     newDate.setMonth(currentDate.getMonth() - 1);
//     setCurrentDate(newDate);
//   };

//   const nextMonth = () => {
//     const newDate = new Date(currentDate);
//     newDate.setMonth(currentDate.getMonth() + 1);
//     setCurrentDate(newDate);
//   };

//   const handleDateClick = (day) => {
//     setSelectedDate(day);
//   };

//   return (
//     <motion.div className="calendar-container">
//       <motion.div className="calendar-header">
//         <button onClick={prevMonth} className="nav-btn">
//           <FaLessThan />
//         </button>
//         <span className="month-year">
//           {currentDate.toLocaleString("default", { month: "long" })}{" "}
//           {currentDate.getFullYear()}
//         </span>
//         <button onClick={nextMonth} className="nav-btn">
//           <FaGreaterThan />
//         </button>
//       </motion.div>

//       <div className="day-names">
//         {dayNames.map((day) => (
//           <div key={day} className="day-name">
//             {day}
//           </div>
//         ))}
//       </div>

//       <motion.div className="days">
//         {Array.from({ length: startDay }).map((_, index) => (
//           <div key={index} className="empty-day"></div>
//         ))}

//         {daysInMonth.map((day) => {
//           const isToday = day.toDateString() === new Date().toDateString();
//           const isSelected =
//             selectedDate && day.toDateString() === selectedDate.toDateString();

//           return (
//             <div
//               key={day}
//               className={`day ${isToday ? "today" : ""} ${
//                 isSelected ? "selected" : ""
//               }`}
//               onClick={() => handleDateClick(day)}
//             >
//               {day.getDate()}
//             </div>
//           );
//         })}
//       </motion.div>
//     </motion.div>
//   );
// };

// export default Calendar;


// Calendar.jsx


import React, { useEffect, useState } from "react";
import { FaLessThan } from "react-icons/fa6";
import { FaGreaterThan } from "react-icons/fa";
import "./Calendar.css";
import { motion, AnimatePresence } from "framer-motion";

const Calendar = ({ onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [startDay, setStartDay] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const date = new Date(year, month, 1);
    const days = [];

    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    setDaysInMonth(days);
    setStartDay(new Date(year, month, 1).getDay());
  }, [currentDate]);

  const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const prevMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const nextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  const handleDateClick = (day) => {
    setSelectedDate(day);
    onDateSelect(day); // ✅ send selected date back to Booking
  };

  return (
    <motion.div className="calendar-container">
      <motion.div className="calendar-header">
        <button onClick={prevMonth} className="nav-btn">
          <FaLessThan />
        </button>

        <AnimatePresence mode="wait">
          <motion.span
            key={currentDate.getMonth() + "-" + currentDate.getFullYear()}
            className="month-year"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            {currentDate.toLocaleString("default", { month: "long" })}{" "}
            {currentDate.getFullYear()}
          </motion.span>
        </AnimatePresence>

        <button onClick={nextMonth} className="nav-btn">
          <FaGreaterThan />
        </button>
      </motion.div>

      <div className="day-names">
        {dayNames.map((day) => (
          <motion.div key={day} className="day-name">
            {day}
          </motion.div>
        ))}
      </div>

      <motion.div className="days">
        {Array.from({ length: startDay }).map((_, index) => (
          <div key={index} className="empty-day"></div>
        ))}

        {daysInMonth.map((day) => {
          const isToday = day.toDateString() === new Date().toDateString();
          const isSelected =
            selectedDate && day.toDateString() === selectedDate.toDateString();

          return (
            <motion.div
              key={day}
              className={`day ${isToday ? "today" : ""} ${
                isSelected ? "selected" : ""
              }`}
              onClick={() => handleDateClick(day)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {day.getDate()}
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

export default Calendar;
