// import React, { useState } from 'react';

// const Star = () => {
//     const [hovered,sethovered]=useState(false)
//   const iconStyle = {
//     fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
//     fontSize: '30px',
//     cursor: 'pointer',
//     // color: 'gold',
//     color: hovered ? 'gold' : 'gray',
//     marginRight: '5px',

//   };

//   const [rating, setRating] = useState(0);

//   const handleStarClick = (index) => {
//     if (rating === index + 1) {

//       setRating(rating - 1); // Toggle off
//     } else {
//       setRating(index + 1); // Set new rating
//     }
//   };
// const handlehover=(e)={
// if (rating==index+1){
//     sethovered(true)
// }
// else{
//     sethovered(false)
// }
// }
//   return (
//     <div>
//       {[...Array(5)].map((_, index) => (
//         <span
//           key={index}
//           className="material-symbols-outlined"
//           style={iconStyle}
//           onClick={() => handleStarClick(index)}
//           onMouseEnter={handlehover}
//           onMouseLeave={handlehover}
//           onMouseMove={handlehover}
//         >
//           {index < rating ? 'star' : `${rating}`}
//         </span>
//       ))}
//     </div>
//   );
// };

// export default Star;

import React, { useState } from "react";

const Star = () => {
  const [rating, setRating] = useState(0); // Actual rating on click
  const [hoveredIndex, setHoveredIndex] = useState(null); // Current hovered index

  const handleStarClick = (index) => {
    if (rating === index + 1) {
      setRating(rating - 1); // Toggle off
    } else {
      setRating(index + 1); // Set new rating
    }
  };

  return (
    <div>
      {[...Array(5)].map((_, index) => {
        const isFilled =
          hoveredIndex !== null ? index <= hoveredIndex : index < rating;

        return (
          <span
            key={index}
            className="material-symbols-outlined"
            style={{
              fontVariationSettings:
                "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
              fontSize: "30px",
              cursor: "pointer",
              color: isFilled ? "gold" : "gray",
              marginRight: "5px",
            }}
            onClick={() => handleStarClick(index)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            star
            {/* {index < rating ? 'star' : `${rating}`} */}
          </span>
        );
      })}
    </div>
  );
};

export default Star;
