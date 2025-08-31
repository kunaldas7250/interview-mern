import React, { useState, useCallback } from "react";
import ReactDOM from "react-dom"; // ✅ Import ReactDOM
import ShowModel from "./ShowModel";

const Model = () => {
  const [showmodel, setshowmodel] = useState(false);

  const openmodel = useCallback(() => {
    setshowmodel(true);
  }, []);

  const closemodel = useCallback(() => {
    setshowmodel(false);
  }, []);

  // Where the portal will render
  const popupRoot = document.querySelector(".popup");

  return (
    <>
      <button onClick={openmodel}>Open Model</button>
      {showmodel &&
        ReactDOM.createPortal(
          <ShowModel closemodel={closemodel} />,
          popupRoot
        )}
    </>
  );
};

export default Model;
