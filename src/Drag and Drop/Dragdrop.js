
import React, { useEffect, useRef, useState } from "react";
import "../App.css";

const Dragdrop = () => {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem("kunaldrag");
    return saved ? JSON.parse(saved) : [];
  });

  const inputdata = useRef();
  const DragItemIndex = useRef(null);

  const handleSubmit = () => {
    const value = inputdata.current.value.trim();
    if (!value) {
      inputdata.current.focus();
      return;
    }
    setData((prev) => [...prev, { id: Date.now(), data: value }]);
    inputdata.current.value = "";
  };

  const handleDelete = (id) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  useEffect(() => {
    localStorage.setItem("kunaldrag", JSON.stringify(data));
  }, [data]);

  // Trash bin drop
  const handleTrashDrop = () => {
    if (DragItemIndex.current === null) return;
    const newData = [...data];
    newData.splice(DragItemIndex.current, 1);
    setData(newData);
    DragItemIndex.current = null;
  };

  const handleDragStart = (index) => {
    DragItemIndex.current = index;
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // required for drop to work
  };

  const handleswipe=(index)=>{
    if(DragItemIndex.current===null) return
    const newData=[...data]
    const swipe=newData.splice(DragItemIndex.current,1)[0]
    newData.splice(index,0,swipe)
    setData(newData)
    DragItemIndex.current=null
  }

  return (
    <>
      <h2>Drag and Drop with Trash Bin</h2>
      <div className="Drag">
        <input type="text" ref={inputdata} />
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>

      <div className="Drop">
        {data.map((item, index) => (
          <div
  className="droplist"
  key={item.id}
  draggable
  onDragStart={() => handleDragStart(index)}
  onDrop={() => handleswipe(index)} // ✅ function reference, not immediate call
  onDragOver={handleDragOver}
>
  <ul>
    <li>{item.data}</li>
  </ul>
  <span
    style={{ cursor: "pointer", color: "red", marginLeft: "10px" }}
    onClick={() => handleDelete(item.id)}
  >
    🗑️
  </span>
</div>

        ))}
      </div>

      {/* TRASH BIN */}
      <span
        className="dropborder"
        onDragOver={handleDragOver}
        onDrop={handleTrashDrop}
      >
        🗑️ Drop your item here to delete
      </span>
    </>
  );
};

export default Dragdrop;

