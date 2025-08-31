// import React, { useEffect, useRef, useState } from "react";

// const WindowPop = () => {
//   const [state, setState] = useState("");
//   const[isopen,setisopen]=useState(false)
//   const popref = useRef();
//   useEffect(() => {
//     const name = "kunal das";
//     if (name === "kunal das") {
//        setisopen(true)
//       alert("You have successfully logged in");
//       setState("Success ✅");

//     } else {
//       setState("Failed ❌");
//       setisopen(false)
//     }
//   }, []);
// useEffect(()=>{
// const handleclickoutside=(event)=>{
// if(popref.current && popref.current.contains(event.target)){
//     setisopen(false)
// }
// }

// if(isopen){
//     document.addEventListener("mousedown",handleclickoutside)
// }
// else{
//     return document.removeEventListener("mousedown",handleclickoutside)
// }
// },[isopen])
//   return (
//     <div ref={popref}>
//       <h2>{state}</h2>
//     </div>
//   );
// };

// export default WindowPop;


import React, { useEffect, useRef, useState } from "react";

const WindowPop = () => {
  const [state, setState] = useState("");
  const [isopen, setisopen] = useState(false);
  const popref = useRef();

  useEffect(() => {
    const name = "kunal das";
    if (name === "kunal das") {
      setisopen(true);
      setState("You have successfully logged in ✅");
    } else {
      setState("Failed ❌");
      setisopen(false);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popref.current && !popref.current.contains(event.target)) {
        setisopen(false);
      }
    };

    if (isopen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isopen]);

  return (
    <>
      {isopen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)", // overlay
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            ref={popref}
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0px 0px 10px rgba(0,0,0,0.3)",
              minWidth: "250px",
              textAlign: "center",
            }}
          >
            <h2>{state}</h2>
            <button onClick={() => setisopen(false)}>OK</button>
          </div>
        </div>
      )}
    </>
  );
};

export default WindowPop;
