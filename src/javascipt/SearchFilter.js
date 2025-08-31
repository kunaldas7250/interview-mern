
import axios from "axios";
import React, { useEffect, useState } from "react";

const SearchFilter = () => {
  const style = {
    fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
    cursor: "pointer",
  };

  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/users");
        console.log(response.data);
        setUsers(response.data.users);
      } catch (error) {
        console.error(`Something went wrong: ${error}`);
      }
    };
    fetchUsers();
  }, []);

  

  const handleSearchClick = (user) => {
    const filteredUsers = users.filter((user) =>
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  setUsers(filteredUsers)
  };

  return (
    <div>
      <h2>Implementing Search Filter</h2>

      <input
        type="text"
        placeholder="Search by first name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <span
        style={style}
        onClick={handleSearchClick}
        className="material-symbols-outlined"
      >
        search
      </span>
      <div className="parent">
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user.id} className="searchbox">
              {user.firstName} {user.lastName}
            </div>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default SearchFilter;
