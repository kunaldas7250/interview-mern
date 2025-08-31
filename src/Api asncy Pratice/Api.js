
import React, { useEffect, useState } from "react";
import axios from "axios";


const Api = () => {
  const [data, setData] = useState(null); // For storing the fetched data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/todos/2"
        );
        setData(response.data); // Use response.data with axios, not .json()
      } catch (error) {
        console.error("Something went wrong", error);
      }
    };

    fetchData();
  }, [data]);

  return (
    <div>
      <h2>API Response:</h2>
      {data ? <pre>{JSON.stringify(data, null,2)}</pre> : <p>Loading...</p>}
    </div>
  );
};

export default Api;
