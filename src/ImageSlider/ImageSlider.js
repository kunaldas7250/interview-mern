


import React, { useEffect, useState } from "react";
import axios from "axios";

const ImageSlider = () => {
  const [slider, setSlider] = useState([]);
  const [current, setCurrent] = useState(0);


useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://api.unsplash.com/photos/random',
        {
          params: { count: 20 },
          headers: {
            Authorization: `Client-ID vSsek9HGYI2EoRBaRNvJhRh8IyTuLNxOZE3AbcVcXP4`
          }
        }
      );
      console.log(response.data);
      setSlider(response.data);
    } catch (error) {
      console.error("❌ Error fetching images:", error);
    }
  };
  fetchData();
}, []);


  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slider.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slider.length) % slider.length);
  };

  return (
    <div>
      <h2>Image Slider Project</h2>
      {slider.length > 0 ? (
        <div className="slider">
          <div>
            <img
              src={slider[current].urls.small}
              alt={slider[current].alt_description || "Unsplash Image"}
              width={300}
              height={200}
            />
            <p>{slider[current].alt_description || "No description"}</p>
          </div>
          <button onClick={prevSlide}>⏮️ Prev</button>
          <button onClick={nextSlide}>⏭️ Next</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ImageSlider;
