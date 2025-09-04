import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Hotel.css"


const key = `q46kWjyGVGBb1O-ttu8bQYQe4G54eMAHIrbo6WxW4Wg`;

const Hotels = () => {
  const [pictures, setPictures] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.unsplash.com/search/photos?query=hotel&per_page=20&client_id=${key}`
        );
        setPictures(response.data.results); // ✅ correct field
      } catch (error) {
        console.error(`Something went wrong: ${error}`);
      }
    };
    fetchData();
  }, []);

  return (
    <>
  
    <div className="card">
      <div className="photo">
        {pictures.length > 0 &&
          pictures.map((item) => (
            <div key={item.id} className="hotel-card">
              <img
                src={item.urls.small}
                alt={item.alt_description || "Hotel"}
                className="hotel-img"
              />

              <div className="description">
                <div>
                  <h3>{item.alt_description || "Hotel Resort"}</h3>
                  <p className="rating-location">⭐ 4.5 | 📍 Example City</p>

                  <div className="tags">
                    <div className="box">Women Friendly</div>
                    <div className="enviro">Eco</div>
                  </div>

                  <div className="features">
                    <div>
                      <p>✔️ Free wifi</p>
                      <p>✔️ Fitness Center</p>
                    </div>
                    <div>
                      <p>✔️ Health Club</p>
                      <p>✔️ Pool side bar</p>
                    </div>
                  </div>
                </div>

                <div className="price-book">
                  <p className="price">₹3,499 / night</p>
                  <button className="book-btn">Book Now</button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
    </>
  );
};

export default Hotels;
