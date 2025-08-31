import React, { useRef } from 'react';

const FocusInput = () => {
  const inputFocus = useRef();

  const handlefocus = () => {
    if (!inputFocus.current.value) { // ✅ check if input is empty
      inputFocus.current.focus();
      inputFocus.current.style.border = "1px solid black";
    } else {
      alert(`You already have text`);
    }
  };

  return (
    <div>
      <h2>Focusing on Input</h2>
      <input ref={inputFocus} type="text" />
      <br />
      <button onClick={handlefocus}>Focus</button>
    </div>
  );
};

export default FocusInput;
