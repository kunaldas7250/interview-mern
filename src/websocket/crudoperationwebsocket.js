import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const CrudOperationWebSocket = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [college, setCollege] = useState("");
  const [location, setLocation] = useState("");
  const [socket, setSocket] = useState(null);
  const [data, setData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null); // 👈 Track row being edited
  const [editValues, setEditValues] = useState({}); // 👈 Temporary values for editing

  useEffect(() => {
    const newSocket = io("http://localhost:4000");
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log(`✅ Connected with id: ${newSocket.id}`);
    });
    newSocket.on("message",(msg)=>{
        console.log(`📩 Message from server: ${msg}`);
    })
    newSocket.on("connect_error", (error) => {
      if (newSocket.active) {
        console.log("⚠️ Temporary connection issue, retrying...");
      } else {
        console.log("❌ Connection denied:", error.message);
        // socket.connect(); // manually retry if needed
      }
    });
    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleData = (e) => {
    e.preventDefault();
    if (socket) {
      const newData = { id: socket.id, firstname, lastname, college, location };
      setData((prev) => {
        const updated = [...prev, newData];
        socket.emit("data", updated);
        return updated;
      });
    }
    setFirstname("");
    setLastname("");
    setCollege("");
    setLocation("");
  };
 const handleDelete = (index) => {
    const updatedData = data.filter((_, i) => i !== index); // remove that row
    setData(updatedData);
    socket.emit("data", updatedData); // send updated array to server
  };
  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditValues(data[index]); // load values of that row
  };

  const handleSave = (index) => {
    const updatedData = [...data];
    updatedData[index] = { ...editValues }; // save new values
    setData(updatedData);
    socket.emit("data", updatedData);
    setEditingIndex(null); // exit edit mode
  };

  const handleChangeEdit = (field, value) => {
    setEditValues((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <h1>Crud Operation Using WebSocket</h1>

      <form onSubmit={handleData}>
        <label>Firstname:</label>
        <input
          type="text"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <label>Lastname:</label>
        <input
          type="text"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
        <label>College:</label>
        <input
          type="text"
          value={college}
          onChange={(e) => setCollege(e.target.value)}
        />
        <label>Location:</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      {data.length > 0 ? (
        <table border="1" style={{ marginTop: "20px" }}>
          <thead>
            <tr>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>College</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) =>
              editingIndex === index ? (
                <tr key={index}>
                  <td>
                    <input
                      type="text"
                      value={editValues.firstname}
                      onChange={(e) =>
                        handleChangeEdit("firstname", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editValues.lastname}
                      onChange={(e) =>
                        handleChangeEdit("lastname", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editValues.college}
                      onChange={(e) =>
                        handleChangeEdit("college", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editValues.location}
                      onChange={(e) =>
                        handleChangeEdit("location", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <button onClick={() => handleSave(index)}>💾 Save</button>
                  </td>
                </tr>
              ) : (
                <tr key={index}>
                  <td>{item.firstname}</td>
                  <td>{item.lastname}</td>
                  <td>{item.college}</td>
                  <td>{item.location}</td>
                  <td>
                    <button onClick={() => handleEdit(index)}>✏️ Update</button>
                    <button onClick={() => handleDelete(index)}>🗑️ Delete</button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      ) : (
        <div>No Records Found</div>
      )}
    </div>
  );
};

export default CrudOperationWebSocket;
