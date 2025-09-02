// import React, { useEffect, useState } from "react";
// import { io } from "socket.io-client";

// const LearnWebSocket = () => {
//   const [firstname, setFirstname] = useState("");
//   const [lastname, setLastname] = useState("");
//   const [socket, setSocket] = useState(null);

//   useEffect(() => {
//     const newSocket = io("http://localhost:4000");
//     setSocket(newSocket);

//     // ✅ client connects
//     newSocket.on("connect", () => {
//       console.log(`✅ Connected with id: ${newSocket.id}`);
//     });

//     // Example: listen for a custom event
//     newSocket.on("message", (msg) => {
//       console.log("📩 Server says:", msg);
//     });

//     // cleanup when component unmounts
//     return () => {
//       newSocket.disconnect();
//     };
//   }, []);

//   const handleSend = () => {
//     if (socket) {
//       socket.emit("userData", { firstname, lastname });
//       console.log("📤 Sent to server:", { firstname, lastname });
//     }
//   };

//   return (
//     <div
//       style={{
//         padding: "1rem",
//         margin: "5rem auto",
//         height: "300px",
//         width: "350px",
//         backgroundColor: "grey",
//         color: "white",
//         display: "flex",
//         flexDirection: "column",
//         gap: "10px",
//       }}
//     >
//       <h1>🚀 WebSocket Learning</h1>

//       <label>Firstname:</label>
//       <input
//         type="text"
//         placeholder="Enter your first name"
//         value={firstname}
//         onChange={(e) => setFirstname(e.target.value)}
//       />

//       <label>Lastname:</label>
//       <input
//         type="text"
//         placeholder="Enter your last name"
//         value={lastname}
//         onChange={(e) => setLastname(e.target.value)}
//       />

//       <button onClick={handleSend} style={{ marginTop: "10px" }}>
//         Send to Server
//       </button>
//     </div>
//   );
// };

// export default LearnWebSocket;

import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const LearnWebSocket = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [socket, setSocket] = useState(null);
  const [sentData, setSentData] = useState([]); // store array of objects

  useEffect(() => {
    const newSocket = io("http://localhost:4000");
    setSocket(newSocket);

    // ✅ client connects
    newSocket.on("connect", () => {
      console.log(`✅ Connected with id: ${newSocket.id}`);
    });

    // ✅ listen for "message" from server
    newSocket.on("message", (msg) => {
      console.log("📩 Server says:", msg);
    });

    // ✅ listen for "userData" event from server
    newSocket.on("userDataArray", (msg) => {
      console.log("📩 Message from server:", msg);
      // save response as object in array too (optional)
      setSentData((prev) => [...prev, { serverResponse: msg }]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleSend = (e) => {
  e.preventDefault();

  if (socket) {
    const newData = { firstname, lastname, id: socket.id };

    // update local array
    setSentData((prev) => {
      const updated = [...prev, newData];

      // send updated array of objects to server
      socket.emit("userDataArray", updated);

      return updated;
    });

    console.log("📤 Sent full array to server");
  }

  setFirstname("");
  setLastname("");
};


  return (
    <div
      style={{
        padding: "1rem",
        margin: "5rem auto",
        height: "400px",
        width: "350px",
        backgroundColor: "grey",
        color: "white",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <h1>🚀 WebSocket Learning</h1>

      <label>Firstname:</label>
      <input
        type="text"
        placeholder="Enter your first name"
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
      />

      <label>Lastname:</label>
      <input
        type="text"
        placeholder="Enter your last name"
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
      />

      <button onClick={handleSend} style={{ marginTop: "10px" }}>
        Send to Server
      </button>

      <h3>📦 Sent Data:</h3>
      <ul>
        {sentData.map((item, index) => (
          <li key={index}>
            {item.firstname
              ? `${item.firstname} ${item.lastname} (${item.id})`
              : `Server says: ${item.serverResponse}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LearnWebSocket;
