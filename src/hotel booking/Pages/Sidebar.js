// import React, { useRef, useState } from 'react'
// import hoteljson from "./hotels.json"
// import { CiSearch } from "react-icons/ci";
// import { IoIosPricetags } from "react-icons/io";
// import { FaCity } from "react-icons/fa";
// import { FaLocationCrosshairs } from "react-icons/fa6";
// import "../css/Sidebar.css"
// const Sidebar = () => {
//   const [hoteldata, setHoteldata] = useState(hoteljson);

//   // refs for input fields
//   const hotelNameRef = useRef();
//   const priceRef = useRef();
//   const cityRef = useRef();
//   const locationRef = useRef();

//   // toggle states
//   const [showSearch, setShowSearch] = useState(false);
//   const [showPrice, setShowPrice] = useState(false);
//   const [showCity, setShowCity] = useState(false);
//   const [showLocation, setShowLocation] = useState(false);

//   // handlers
//   const handleSearch = () => {
//     const searchValue = hotelNameRef.current.value.toLowerCase();
//     const filtered = hoteljson.filter(h => 
//       h.hotelName.toLowerCase().includes(searchValue)
//     );
//     setHoteldata(filtered);
//     setShowSearch(true);
//   };

//   const handlePrice = () => {
//     const priceValue = parseInt(priceRef.current.value, 10);
//     if (!isNaN(priceValue)) {
//       const filtered = hoteljson.filter(h => h.price <= priceValue);
//       setHoteldata(filtered);
//     }
//     setShowPrice(true);
//   };

//   const handleCity = () => {
//     const cityValue = cityRef.current.value.toLowerCase();
//     const filtered = hoteljson.filter(h => 
//       h.city.toLowerCase().includes(cityValue)
//     );
//     setHoteldata(filtered);
//     setShowCity(true);
//   };

//   const handleLocation = () => {
//     const locationValue = locationRef.current.value.toLowerCase();
//     const filtered = hoteljson.filter(h => 
//       h.location.toLowerCase().includes(locationValue)
//     );
//     setHoteldata(filtered);
//     setShowLocation(true);
//   };
//   const handledropdownhotel=()=>{
//     setShowSearch((prev)=>!prev)
//   }
//   const handledropdownprice=()=>{
//     setShowPrice((prev)=>!prev)
//   }
//   const handledropdowncity=()=>{
//     setShowCity((prev)=>!prev)
//   }
//   const handledropdownlocation=()=>{
//     setShowLocation((prev)=>!prev)
//   }
//   return (
//     <div className='sidebarparent'>
//       <div className='serachcommponet'>
//         <p>FILTERS</p>

//         {/* Hotel Search */}
//         <input type='text' ref={hotelNameRef} placeholder="Search Hotel" />
//         <CiSearch onClick={handledropdownhotel}/>
//         {showSearch && (
//           <div className='hotelname' onClick={handleSearch} >
//             {hoteldata.map((item, index) => (
//               <p key={index}>{item.hotelName}</p>
//             ))}
//           </div>
//         )}

//         {/* Price */}
//         <p>Price (Hotels)</p>
//         <input type='text' ref={priceRef} placeholder="Enter Price" />
//         <IoIosPricetags onClick={handledropdownprice} />
//         {showPrice && (
//           <div onClick={handlePrice}>
//             {hoteldata.map((item, index) => (
//               <p key={index}>{item.price}</p>
//             ))}
//           </div>
//         )}

//         {/* City */}
//         <p>City</p>
//         <input type='text' ref={cityRef} placeholder="Enter City" />
//         <FaCity onClick={handledropdowncity} />
//         {showCity && (
//           <div onClick={handleCity}>
//             {hoteldata.map((item, index) => (
//               <p key={index}>{item.city}</p>
//             ))}
//           </div>
//         )}

//         {/* Location */}
//         <p>Location</p>
//         <input type='text' ref={locationRef} placeholder="Enter Location" />
//         <FaLocationCrosshairs onClick={handledropdownlocation} />
//         {showLocation && (
//           <div onClick={handleLocation}>
//             {hoteldata.map((item, index) => (
//               <p key={index}>{item.location}</p>
//             ))}
//           </div>
//         )}

//         {/* Payment Mode */}
//         <p>Payment Mode</p>
//         <label><input type='checkbox' /> UPI</label><br />
//         <label><input type='checkbox' /> Credit Card</label><br />
//         <label><input type='checkbox' /> Debit Card</label><br />

//         {/* Property Type */}
//         <p>Property Type</p>
//         <label><input type='checkbox' /> Hotels</label><br />
//         <label><input type='checkbox' /> Guest House</label><br />
//         <label><input type='checkbox' /> PG</label><br />
//         <label><input type='checkbox' /> Farm House</label>
//       </div>
//     </div>
//   )
// }

// export default Sidebar

import React, { useRef, useState } from 'react'
import hoteljson from "./hotels.json"
import { CiSearch } from "react-icons/ci";
import { IoIosPricetags } from "react-icons/io";
import { FaCity } from "react-icons/fa";
import { FaLocationCrosshairs } from "react-icons/fa6";
import "../css/Sidebar.css"

const Sidebar = () => {
  const [hoteldata, setHoteldata] = useState(hoteljson);

  // refs
  const hotelNameRef = useRef();
  const priceRef = useRef();
  const cityRef = useRef();
  const locationRef = useRef();

  // toggle states
  const [showSearch, setShowSearch] = useState(false);
  const [showPrice, setShowPrice] = useState(false);
  const [showCity, setShowCity] = useState(false);
  const [showLocation, setShowLocation] = useState(false);

  // handlers
  const handleSearch = () => {
    const searchValue = hotelNameRef.current.value.toLowerCase();
    const filtered = hoteljson.filter(h =>
      h.hotelName.toLowerCase().includes(searchValue)
    );
    setHoteldata(filtered);
  };

  const handlePrice = () => {
    const priceValue = parseInt(priceRef.current.value, 10);
    if (!isNaN(priceValue)) {
      const filtered = hoteljson.filter(h => h.price <= priceValue);
      setHoteldata(filtered);
    } else {
      setHoteldata(hoteljson);
    }
  };

  const handleCity = () => {
    const cityValue = cityRef.current.value.toLowerCase();
    const filtered = hoteljson.filter(h =>
      h.city.toLowerCase().includes(cityValue)
    );
    setHoteldata(filtered);
  };

  const handleLocation = () => {
    const locationValue = locationRef.current.value.toLowerCase();
    const filtered = hoteljson.filter(h =>
      h.location.toLowerCase().includes(locationValue)
    );
    setHoteldata(filtered);
  };

  return (
    <div className='sidebarparent'>
      <div className='serachcommponet'>
        <p>FILTERS</p>

        {/* Hotel Search */}
        <input 
          type='text' 
          ref={hotelNameRef} 
          placeholder="Search Hotel"
          onChange={handleSearch}
        />
        <CiSearch onClick={() => setShowSearch(prev => !prev)} />
        {showSearch && (
          <div className='hotelname'>
            {hoteldata.map((item, index) => (
              <p 
                key={index}
                onClick={() => {
                  hotelNameRef.current.value = item.hotelName;
                  setShowSearch(false);
                }}
              >
                {item.hotelName}
              </p>
            ))}
          </div>
        )}

        {/* Price */}
        <p>Price (Hotels)</p>
        <input 
          type='text' 
          ref={priceRef} 
          placeholder="Enter Price"
          onChange={handlePrice}
        />
        <IoIosPricetags onClick={() => setShowPrice(prev => !prev)} />
        {showPrice && (
          <div>
            {hoteldata.map((item, index) => (
              <p 
                key={index}
                onClick={() => {
                  priceRef.current.value = item.price;
                  setShowPrice(false);
                }}
              >
                {item.price}
              </p>
            ))}
          </div>
        )}

        {/* City */}
        <p>City</p>
        <input 
          type='text' 
          ref={cityRef} 
          placeholder="Enter City"
          onChange={handleCity}
        />
        <FaCity onClick={() => setShowCity(prev => !prev)} />
        {showCity && (
          <div>
            {hoteldata.map((item, index) => (
              <p 
                key={index}
                onClick={() => {
                  cityRef.current.value = item.city;
                  setShowCity(false);
                }}
              >
                {item.city}
              </p>
            ))}
          </div>
        )}

        {/* Location */}
        <p>Location</p>
        <input 
          type='text' 
          ref={locationRef} 
          placeholder="Enter Location"
          onChange={handleLocation}
        />
        <FaLocationCrosshairs onClick={() => setShowLocation(prev => !prev)} />
        {showLocation && (
          <div>
            {hoteldata.map((item, index) => (
              <p 
                key={index}
                onClick={() => {
                  locationRef.current.value = item.location;
                  setShowLocation(false);
                }}
              >
                {item.location}
              </p>
            ))}
          </div>
        )}

        {/* Payment Mode */}
        <p>Payment Mode</p>
        <label><input type='checkbox' /> UPI</label><br />
        <label><input type='checkbox' /> Credit Card</label><br />
        <label><input type='checkbox' /> Debit Card</label><br />

        {/* Property Type */}
        <p>Property Type</p>
        <label><input type='checkbox' /> Hotels</label><br />
        <label><input type='checkbox' /> Guest House</label><br />
        <label><input type='checkbox' /> PG</label><br />
        <label><input type='checkbox' /> Farm House</label>
      </div>
    </div>
  )
}

export default Sidebar
