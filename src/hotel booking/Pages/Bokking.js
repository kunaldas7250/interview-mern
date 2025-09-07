import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

import Rooms from "./Rooms"
import {
  FaRegCalendarAlt,
} from "react-icons/fa";
import hotels from "./hotels.json";
import { CiCircleChevDown, CiLocationOn } from "react-icons/ci";
import "../css/Booking.css";
import Calendar from "./Calender"
const Bokking = () => {
     const [data, setData] = useState(hotels);
  const [showList, setShowList] = useState(false);

  const [checkinshow, setCheckinShow] = useState(false);
  const [checkoutshow, setCheckoutShow] = useState(false);

  const hotelInput = useRef();
  const checkinInput = useRef();
  const checkoutInput = useRef();

  // when user selects a hotel
    const handleHotel = (hotel) => {
      if (hotelInput.current) {
        hotelInput.current.value = hotel.hotelName;
      }
      setShowList(false);
    };
  
    // toggle hotel dropdown
    const handleDropdown = () => {
      setShowList((prev) => !prev);
    };
  
    // filter hotels based on input value
    const handleInput = (e) => {
      const searchValue = e.target.value.toLowerCase();
  
      if (searchValue === "") {
        setData(hotels);
      } else {
        const filtered = hotels.filter(
          (item) =>
            item.hotelName.toLowerCase().includes(searchValue) ||
            item.city.toLowerCase().includes(searchValue)
        );
        setData(filtered);
      }
      setShowList(true);
    };
  
    // ✅ handle date selection for check-in
    const handleCheckinDate = (date) => {
      if (checkinInput.current) {
        checkinInput.current.value = date.toLocaleDateString();
      }
      setCheckinShow(false);
    };
  
    // ✅ handle date selection for check-out
    const handleCheckoutDate = (date) => {
      if (checkoutInput.current) {
        checkoutInput.current.value = date.toLocaleDateString();
      }
      setCheckoutShow(false);
    };
    const handleclick = () => {
      
    };
  return (
    <div>
      <div className="booking">
          <motion.div
            className="booking-inputs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {/* Hotel Input */}
            <div className="hotel">
              <p>Select City, Location or Hotel Name</p>
              <input
                type="text"
                ref={hotelInput}
                placeholder="Enter city or hotel"
                onChange={handleInput}
              />
              <CiCircleChevDown
                onClick={handleDropdown}
                style={{
                  cursor: "pointer",
                  position: "relative",
                  top: 5,
                  left: 7,
                  fontSize: "20px",
                }}
              />

              {showList && data.length > 0 && (
                <div className="hotel-list">
                  {data.map((item) => (
                    <div
                      key={item.id}
                      className="hotel-item"
                      onClick={() => handleHotel(item)}
                    >
                      <p>
                        Hotel: <CiLocationOn /> {item.hotelName}
                      </p>
                      <p>City: {item.city}</p>
                      <div className="flex">
                        <p>Price: {item.price}</p>
                        <p>Hotels: {item.cityHotelCount}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {showList && data.length === 0 && (
                <div className="hotel-list">
                  <p>No results found ❌</p>
                </div>
              )}
            </div>

            {/* ✅ Check-in */}
            <div className="checkin">
              <p>Check-In Date</p>
              <input type="text" ref={checkinInput} readOnly />
              <FaRegCalendarAlt
                onClick={() => setCheckinShow((prev) => !prev)}
                style={{
                  cursor: "pointer",
                  position: "relative",
                  top: 5,
                  left: 7,
                  fontSize: "20px",
                }}
              />
              {checkinshow && (
                <div className="checkincalender">
                  <Calendar onDateSelect={handleCheckinDate} />
                </div>
              )}
            </div>

            {/* ✅ Check-out */}
            <div className="checkout">
              <p>Check-Out Date</p>
              <input type="text" ref={checkoutInput} readOnly />
              <FaRegCalendarAlt
                onClick={() => setCheckoutShow((prev) => !prev)}
                style={{
                  cursor: "pointer",
                  position: "relative",
                  top: 5,
                  left: 7,
                  fontSize: "20px",
                }}
              />
              {checkoutshow && (
                <div className="checkincalender">
                  <Calendar onDateSelect={handleCheckoutDate} />
                </div>
              )}
            </div>
            <div className="rooms">
              <p>ROOMS & GUEST</p>
              <hr></hr>
              <Rooms />
            </div>
            <motion.div>
              <button onClick={handleclick}>Search</button>
            </motion.div>
          </motion.div>
        </div>
    </div>
  )
}

export default Bokking
