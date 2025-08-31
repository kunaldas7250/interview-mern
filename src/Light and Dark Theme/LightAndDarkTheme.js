

// import React, { useState } from "react";

// const LightAndDarkTheme = () => {
//   const [colors, setColors] = useState(Array(5).fill("white"));

//   const handleLight = (e) => {
//     e.preventDefault();
//     setColors(["lightgreen", "yellow", "pink", "pink", "gold"]);
//   };

//   const handleDark = (e) => {
//     e.preventDefault();
//     setColors(["red", "black", "blue", "darkgreen", "purple"]);
//   };

//   return (
//     <div className="parent">
//       <h2>LIGHT AND DARK THEME ON CLICK</h2>

//       <div className=" lighttheme">
//         {/* {colors.map((color, index) => {
//           <div
//             key={index}
//             style={{
//               width: "100px",
//               height: "100px",
//               backgroundColor: color,
//             }}
//           >
//             <button type="button" onClick={handleLight}>
//               Light Theme
//             </button>
//           </div>;
//         })} */}
//         {colors.map((color, index) => (
//   <div
//     key={index}
//     style={{
//       width: "100px",
//       height: "100px",
//       backgroundColor: color,
//     }}
//   >
//     <button type="button" onClick={handleLight}>
//       Light Theme
//     </button>
//   </div>
// ))}

//         <div className="darktheme">
//           {/* {colors.map((color, index) => {
//             <div
//               key={index}
//               style={{
//                 width: "100px",
//                 height: "100px",
//                 backgroundColor: color,
//               }}
//             >
//               <button type="button" onClick={handleDark}>
//                 Dark Theme
//               </button>
//             </div>;
//           })} */}
//           {colors.map((color, index) => (
//   <div
//     key={index}
//     style={{
//       width: "100px",
//       height: "100px",
//       backgroundColor: color,
//     }}
//   >
//     <button type="button" onClick={handleDark}>
//       dark Theme
//     </button>
//   </div>
// ))}

//         </div>
//       </div>
//     </div>
//   );
// };

// export default LightAndDarkTheme;


import React, { useState } from "react";

const LightAndDarkTheme = () => {
  const [colors, setColors] = useState(["white", "white", "white", "white", "white"]);

  const handleLight = () => {
    setColors(["lightgreen", "yellow", "pink", "orange", "gold"]);
  };

  const handleDark = () => {
    setColors(["red", "black", "blue", "darkgreen", "purple"]);
  };

  const gradient = `linear-gradient(to right, ${colors.join(", ")})`;

  return (
    <div
      className="parent"
      style={{
        minHeight: "100vh",
        background: gradient,
        color: "white",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <h2>LIGHT AND DARK THEME ON CLICK</h2>
      <div>
        <button onClick={handleLight} style={{ marginRight: "10px" }}>
          Light Theme
        </button>
        <button onClick={handleDark}>Dark Theme</button>
      </div>
    </div>
  );
};

export default LightAndDarkTheme;
