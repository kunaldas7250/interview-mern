
// import React, { useEffect, useRef, useState } from "react";
// import "../App.css";

// const Todo = () => {
//   const [datetime, setDatetime] = useState("");
//   const [inputdata, setInputdata] = useState(()=>{
//     const getiteamfromlocalstorage=localStorage.getItem("kunalTodo")
//     if(!getiteamfromlocalstorage)return []
//     return JSON.parse(getiteamfromlocalstorage)
//   });
//   const [incrementId, setIncrementId] = useState(0);
//   const inputRef = useRef();

//   // Clock effect
//   useEffect(() => {
//     const interval = setInterval(() => {
//       const now = new Date();
//       const datenow = now.toLocaleDateString();
//       const formattime = now.toLocaleTimeString();
//       setDatetime(`${datenow} - ${formattime}`);
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   // Add new todo
//   const handleAdd = () => {
//     const value = inputRef.current.value.trim();
//     if (!value) {
//       inputRef.current.focus();
//       return;
//     }
//     setInputdata((prev) => [...prev, { id: incrementId + 1, data: value }]);
//     setIncrementId((prev) => prev + 1);
//     inputRef.current.value = "";
   
//   };
//   useEffect(() => {
//   localStorage.setItem("kunalTodo", JSON.stringify(inputdata));
// }, [inputdata]);

// const handledelte=()=>{
//     inputdata.filter((iteam,index)=>{
//         inputdata((prev)=>{
//             [...prev,...data]=null
//         })
//     })
// }
// const handlecompleted=()=>{
//     inputdata.filter((iteam,index)=>{
//         if(iteam.id===id){

//         }
//     })
// }
//   return (
//     <div className="todoparent">
//       <h2>Todo List</h2>
//       <h2>{datetime}</h2>

//       <div className="inputfieldparent">
//         <input type="text" ref={inputRef} placeholder="Enter your text" />
//         <button onClick={handleAdd} type="button">
//           Submit
//         </button>
//       </div>

//       {inputdata.length > 0 ? (
//         <ul className="parentstoredata">
//           {inputdata.map((item) => (
//             <li key={item.id} className="todo-item">
//               <span className="todo-text">{item.data}</span>
//               <span className="todo-icons">
//                 <span onClick={handlecompleted}>✅</span>
//                 <span onClick={handledelte}>❌</span>
//               </span>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <div>Sorry...</div>
//       )}
//     </div>
//   );
// };

// export default Todo;



import React, { useEffect, useRef, useState } from "react";
import "../App.css";

const Todo = () => {
  const [datetime, setDatetime] = useState("");
  const [inputdata, setInputdata] = useState(() => {
    const saved = localStorage.getItem("kunalTodo");
    return saved ? JSON.parse(saved) : [];
  });
  const [incrementId, setIncrementId] = useState(0);
  const inputRef = useRef();

  // Clock effect
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const datenow = now.toLocaleDateString();
      const formattime = now.toLocaleTimeString();
      setDatetime(`${datenow} - ${formattime}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Save to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem("kunalTodo", JSON.stringify(inputdata));
  }, [inputdata]);

  // Add new todo
  const handleAdd = () => {
    const value = inputRef.current.value.trim();
    if (!value) {
      inputRef.current.focus();
      return;
    }
    setInputdata((prev) => [
      ...prev,
      { id: incrementId + 1, data: value, completed: false }
    ]);
    setIncrementId((prev) => prev + 1);
    inputRef.current.value = "";
  };

  // Delete todo
  const handleDelete = (id) => {
    setInputdata((prev) => prev.filter((item) => item.id !== id));
  };

  // Toggle completed
  const handleCompleted = (id) => {
    setInputdata((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return (
    <div className="todoparent">
      <h2>Todo List</h2>
      <h2>{datetime}</h2>

      <div className="inputfieldparent">
        <input type="text" ref={inputRef} placeholder="Enter your text" />
        <button onClick={handleAdd} type="button">
          Submit
        </button>
      </div>

      {inputdata.length > 0 ? (
        <ul className="parentstoredata">
          {inputdata.map((item) => (
            <li key={item.id} className="todo-item">
              <span
                className="todo-text"
                style={{
                  textDecoration: item.completed ? "line-through" : "none",
                  color: item.completed ? "gray" : "black"
                }}
              >
                {item.data}
              </span>
              <span className="todo-icons">
                <span onClick={() => handleCompleted(item.id)}>✅</span>
                <span onClick={() => handleDelete(item.id)}>❌</span>
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <div>Sorry...</div>
      )}
    </div>
  );
};

export default Todo;
