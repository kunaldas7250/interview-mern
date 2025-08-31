// import React, { useContext, useEffect } from 'react'
// import {Theme} from "./Parent"
// const ChildC = () => {
//     const {state,setstate}=useContext(Theme)
//     const handlechangeTheme=()=>{
//         setstate((prev)=>({...prev,Theme:prev.Theme==="Light"?"dark":"Light"}))
         
//     }
//     useEffect(()=>{
// document.body.style.backgroundColor = state.Theme === "light" ? "black" : "white";
//     },[state.Theme])
//   return (
//     <div>
//       <button onClick={handlechangeTheme}> 
//     {state.Theme}
//       </button>
//     </div>
//   )
// }

// export default ChildC


import React, { useContext, useEffect } from 'react';
import { Theme } from "./Parent";

const ChildC = () => {
  const { state, setstate } = useContext(Theme);

  const handleChangeTheme = () => {
    setstate(prev => ({ ...prev, Theme: prev.Theme === "Light" ? "Dark" : "Light" }));
  };

  useEffect(() => {
    document.body.style.backgroundColor = state.Theme === "Light" ? "white" : "black";
    document.body.style.color = state.Theme === "Light" ? "black" : "white"; // optional: change text color
  }, [state.Theme]);

  return (
    <div>
      <button onClick={handleChangeTheme}>
        {state.Theme}
      </button>
    </div>
  );
};

export default ChildC;
