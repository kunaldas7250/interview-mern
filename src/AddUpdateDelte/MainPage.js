// import React, { useState } from "react";
// import "./style.css";
// import axios from "axios";
// const MainPage = () => {
//   const [data, setData] = useState([]);
//   const [formdata, setFormdata] = useState({
//     id: "",
//     firstname: "",
//     lastname: "",
//     current_location: "",
//     phone_number: "",
//   });
//   const [isshow, setisshow] = useState(false);
//   const [selected, setSelected] = useState(null); // for view
//   const [editIndex, setEditIndex] = useState(null); // for update

//   const handleAddClick = () => {
//     setisshow(true);
//     setSelected(null);
//     setEditIndex(null); // reset edit mode
//     setFormdata({
//       id: "",
//       firstname: "",
//       lastname: "",
//       current_location: "",
//       phone_number: "",
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (
//       !formdata.firstname ||
//       !formdata.lastname ||
//       !formdata.current_location ||
//       !formdata.phone_number
//     ) {
//       alert("Please fill all fields ❌");
//       return;
//     }

//     try {
//       if (editIndex !== null) {
//         // Update existing employee
//         await axios.patch(
//           `http://localhost:4000/UpdateEmployee/${formdata.id}`,
//           {
//             firstname: formdata.firstname,
//             lastname: formdata.lastname,
//             current_location: formdata.current_location,
//             phone_number: formdata.phone_number,
//           }
//         );

//         const updated = [...data];
//         updated[editIndex] = formdata;
//         setData(updated);
//         setEditIndex(null);
//         alert("Employee updated ✅");
//       } else {
//         // Add new employee
//         await axios.post("http://localhost:4000/Addemployee", {
//           firstname: formdata.firstname,
//           lastname: formdata.lastname,
//           current_location: formdata.current_location,
//           phone_number: formdata.phone_number,
//         });

//         setData((prev) => [...prev, formdata]);
//         alert("Employee added successfully ✅");
//       }

//       setFormdata({
//         id: "",
//         firstname: "",
//         lastname: "",
//         current_location: "",
//         phone_number: "",
//       });
//       setisshow(false);
//     } catch (error) {
//       console.error("❌ Error saving employee:", error);
//       alert("Error saving employee ❌");
//     }
//   };

//   const handledelte = async(id) => {
//     try {
//       axios.delete(`http://localhost:4000/DeleteEmployee/${id}`)
// setData(data.filter((_, index) => index !== id));
// alert("you successfully delete the iteam") 
//     } catch (error) {
//      console.error(`something went wrong`)
//      alert(`error in elteing problem`)
//     }
    
//   };

//   const handleview = async (emp) => {
//     try {
//       const res = axios.get(`http://localhost:4000/EmployeeDetails/${emp.id}`);
//       setSelected(res.data[0]);
//     } catch (error) {
//       console.error("Something went wrong", error);
//     }
//   };

//   const handleupdate = async (emp, index) => {
//     setisshow(true);
//     setFormdata(emp); // prefill form
//     setEditIndex(index); // track which one we are editing
//   };

//   return (
//     <div className="parent">
//       <nav className="nav">
//         <h1>Employee Details</h1>
//         <div className="Addbutton">
//           <button onClick={handleAddClick} type="button">
//             Add
//           </button>
//         </div>
//       </nav>

//       {/* Show form */}
//       {isshow && (
//         <form onSubmit={handleSubmit}>
//           <div className="form">
//             <label>ID:</label>
//             <input
//               type="number"
//               value={formdata.id}
//               placeholder="Enter your ID"
//               onChange={(e) => setFormdata({ ...formdata, id: e.target.value })}
//             />

//             <label>First Name:</label>
//             <input
//               type="text"
//               value={formdata.firstname}
//               placeholder="Enter first name"
//               onChange={(e) =>
//                 setFormdata({ ...formdata, firstname: e.target.value })
//               }
//             />

//             <label>Last Name:</label>
//             <input
//               type="text"
//               value={formdata.lastname}
//               placeholder="Enter last name"
//               onChange={(e) =>
//                 setFormdata({ ...formdata, lastname: e.target.value })
//               }
//             />

//             <label>Current Location:</label>
//             <input
//               type="text"
//               value={formdata.current_location}
//               placeholder="Enter location"
//               onChange={(e) =>
//                 setFormdata({
//                   ...formdata,
//                   current_location: e.target.value,
//                 })
//               }
//             />

//             <label>Phone Number:</label>
//             <input
//               type="number"
//               value={formdata.phone_number}
//               placeholder="Enter phone number"
//               onChange={(e) =>
//                 setFormdata({
//                   ...formdata,
//                   phone_number: e.target.value,
//                 })
//               }
//             />

//             <button type="submit">
//               {editIndex !== null ? "Update" : "Submit"}
//             </button>
//           </div>
//         </form>
//       )}

//       {/* Show Table */}
//       {data.length > 0 && (
//         <div className="list">
//           <h2>Employee List</h2>
//           <table border="1" cellPadding="8" cellSpacing="0">
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>First Name</th>
//                 <th>Last Name</th>
//                 <th>Current Location</th>
//                 <th>Phone Number</th>
//                 <th colSpan="3">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {data.map((emp, index) => (
//                 <tr key={index}>
//                   <td>{emp.id}</td>
//                   <td>{emp.firstname}</td>
//                   <td>{emp.lastname}</td>
//                   <td>{emp.current_location}</td>
//                   <td>{emp.phone_number}</td>
//                   <td>
//                     <button onClick={() => handleview(emp)}>View</button>
//                   </td>
//                   <td>
//                     <button onClick={() => handleupdate(emp, index)}>
//                       Update
//                     </button>
//                   </td>
//                   <td>
//                     <button onClick={() => handledelte(index)}>Delete</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {/* Show View Section */}
//           {selected && (
//             <div className="view">
//               <h3>Employee Details</h3>
//               <ul>
//                 <li>ID: {selected.id}</li>
//                 <li>First Name: {selected.firstname}</li>
//                 <li>Last Name: {selected.lastname}</li>
//                 <li>Location: {selected.current_location}</li>
//                 <li>Phone: {selected.phone_number}</li>
//               </ul>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MainPage;




import React, { useState } from "react";
import "./MainStyle.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const [data, setData] = useState([]);
  const [formdata, setFormdata] = useState({
    id: "",
    firstname: "",
    lastname: "",
    current_location: "",
    phone_number: "",
  });
  const [isshow, setisshow] = useState(false);
  const [selected, setSelected] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  const navigate = useNavigate();

  const handleLogout = async () => {
  try {
    const response = await axios.get("http://localhost:4000/logout", { withCredentials: true });
    console.log("Logout response:", response.data);

    localStorage.removeItem("token");
    navigate("/");
  } catch (error) {
    console.error("Logout error:", error);
    alert("Logout failed ❌");
  }
};


  // ... (your existing functions: handleAddClick, handleSubmit, handleview, handleupdate, handledelte)
  const handleAddClick = () => {
    setisshow(true);
    setSelected(null);
    setEditIndex(null); // reset edit mode
    setFormdata({
      id: "",
      firstname: "",
      lastname: "",
      current_location: "",
      phone_number: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formdata.firstname ||
      !formdata.lastname ||
      !formdata.current_location ||
      !formdata.phone_number
    ) {
      alert("Please fill all fields ❌");
      return;
    }

    try {
      if (editIndex !== null) {
        // Update existing employee
        await axios.patch(
          `http://localhost:4000/UpdateEmployee/${formdata.id}`,
          {
            firstname: formdata.firstname,
            lastname: formdata.lastname,
            current_location: formdata.current_location,
            phone_number: formdata.phone_number,
          }
        );

        const updated = [...data];
        updated[editIndex] = formdata;
        setData(updated);
        setEditIndex(null);
        alert("Employee updated ✅");
      } else {
        // Add new employee
        await axios.post("http://localhost:4000/Addemployee", {
          firstname: formdata.firstname,
          lastname: formdata.lastname,
          current_location: formdata.current_location,
          phone_number: formdata.phone_number,
        });

        setData((prev) => [...prev, formdata]);
        alert("Employee added successfully ✅");
      }

      setFormdata({
        id: "",
        firstname: "",
        lastname: "",
        current_location: "",
        phone_number: "",
      });
      setisshow(false);
    } catch (error) {
      console.error("❌ Error saving employee:", error);
      alert("Error saving employee ❌");
    }
  };

 const handledelte = async (id) => {
  try {
    await axios.delete(`http://localhost:4000/DeleteEmployee/${id}`);
    setData(data.filter(emp => emp.id !== id)); // ✅ filter by DB id
    alert("Employee deleted ✅");
  } catch (error) {
    console.error("❌ Error deleting employee:", error);
    alert("Error deleting employee ❌");
  }
};



 const handleview = async (emp) => {
  try {
    console.log("Viewing employee with ID:", emp.id); // ✅ debug
    const res = await axios.get(`http://localhost:4000/EmployeeDetails/${emp.id}`);
    setSelected(res.data);
  } catch (error) {
    console.error("Something went wrong", error);
    alert("Employee not found ❌");
  }
};



  const handleupdate = async (emp, index) => {
    setisshow(true);
    setFormdata(emp); // prefill form
    setEditIndex(index); // track which one we are editing
  };
  return (
    <div className="parent">
      <nav className="nav">
        <h1>Employee Details</h1>
        <div className="nav-actions">
          <button onClick={handleAddClick} type="button" className="btn">
            Add
          </button>
          <button onClick={handleLogout} type="button" className="btn logout">
            Logout
          </button>
        </div>
      </nav>

      {/* Show form */}
      {isshow && (
        <form onSubmit={handleSubmit} className="form">
          <label>ID:</label>
          <input
            type="number"
            value={formdata.id}
            onChange={(e) => setFormdata({ ...formdata, id: e.target.value })}
          />

          <label>First Name:</label>
          <input
            type="text"
            value={formdata.firstname}
            onChange={(e) =>
              setFormdata({ ...formdata, firstname: e.target.value })
            }
          />

          <label>Last Name:</label>
          <input
            type="text"
            value={formdata.lastname}
            onChange={(e) =>
              setFormdata({ ...formdata, lastname: e.target.value })
            }
          />

          <label>Current Location:</label>
          <input
            type="text"
            value={formdata.current_location}
            onChange={(e) =>
              setFormdata({ ...formdata, current_location: e.target.value })
            }
          />

          <label>Phone Number:</label>
          <input
            type="number"
            value={formdata.phone_number}
            onChange={(e) =>
              setFormdata({ ...formdata, phone_number: e.target.value })
            }
          />

          <button type="submit" className="btn">
            {editIndex !== null ? "Update" : "Submit"}
          </button>
        </form>
      )}

      {/* Show Table */}
      {data.length > 0 && (
        <div className="list">
          <h2>Employee List</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>First</th>
                <th>Last</th>
                <th>Location</th>
                <th>Phone</th>
                <th colSpan="3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((emp, index) => (
                <tr key={index}>
                  <td>{emp.id}</td>
                  <td>{emp.firstname}</td>
                  <td>{emp.lastname}</td>
                  <td>{emp.current_location}</td>
                  <td>{emp.phone_number}</td>
                  <td>
                    <button onClick={() => handleview(emp)} className="btn small">View</button>
                  </td>
                  <td>
                    <button onClick={() => handleupdate(emp, index)} className="btn small">Update</button>
                  </td>
                  <td>
                    <button onClick={() => handledelte(emp.id)} className="btn small delete">Delete</button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {selected && (
            <div className="view">
              <h3>Employee Details</h3>
              <ul>
                <li>ID: {selected.id}</li>
                <li>First Name: {selected.firstname}</li>
                <li>Last Name: {selected.lastname}</li>
                <li>Location: {selected.current_location}</li>
                <li>Phone: {selected.phone_number}</li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MainPage;
