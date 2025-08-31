import React, { useRef, useState } from "react";

const Change_color_button = () => {
  const color = useRef();
  const [time, settime] = useState(0);
  const value = useRef(0);
  const timer=useRef(null)
  const handlecolorchange = () => {
    // setvalue(value+1)
    value.current = value.current + 1;
    console.log(`value change ${value}`);
    color.current.style.backgroundColor = "red";
  };
  const handlestart = () => {
    if(timer.current)return
   timer.current= setInterval 
      (() => {
        settime((time)=>time + 1);
      },
      1000);
  };
  const handlestop = () => {
  clearInterval(timer.current)
  timer.current=null
  };
  const handlepause = () => {
    handlestop()
    settime(0)
  };
  return (
    <div>
      <button ref={color}>increment</button>
      <br></br>
      <button onClick={handlecolorchange}>change color</button>
      <br></br>
      <h2>stop watch {time}</h2>
      <button onClick={handlestart}>start</button>
      <br></br>
      <button onClick={handlestop}>stop</button>
      <br></br>
      <button onClick={handlepause}>pause</button>
    </div>
  );
};

export default Change_color_button;
