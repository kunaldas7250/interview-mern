import React, { useEffect } from "react";
import "../App.css";

const ShowModel = (props) => {
    useEffect(()=>{
        document.body.style.overflowY="hidden";
        return (()=>{
            document.body.style.overflowY="auto";
        })
    },[])
  return (
    <div className="cointer">
      <div className="textmodel">
        <span className="close-icon" onClick={props.closemodel}>❌</span>
        <p>Into of my self</p>
        <p>Name: Kunal das</p>
        <p>Collge: Techno india university</p>
        <p>College id: 221003004010</p>
        <p>Location: kolkata, westbengal sector 5</p>
        <button className="accept-btn" onClick={props.closemodel}>
          Accept it
        </button>
      </div>
    </div>
  );
};

export default ShowModel;

