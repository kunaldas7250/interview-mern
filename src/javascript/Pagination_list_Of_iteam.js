import axios from "axios";
import React, { useEffect, useState } from "react";
import "../App.css";
const Pagination_list_Of_iteam = () => {
  const [data, setdata] = useState([]);
  const [page, setpage] = useState(1);
  const[totalpage,settotalpage]=useState(0)
  useEffect(() => {
    const fetch = async () => {
      try {
        const responce = await axios.get(`https://dummyjson.com/products?limit=10&skip=${page*10-10}`);
        console.log(responce.data.products);
        setdata(responce.data.products);
        // settotalpage(responce.data.products/10)
         settotalpage(Math.ceil(responce.data.total / 10)); 
      } catch (error) {
        console.error(`something went wrong ${error}`);
      }
    };
    fetch();
  }, [page]);
  const selectpage = (selectpageg) => {
    if (
      selectpageg >= 1 &&
      selectpageg <= totalpage &&
      selectpage !== page
    )
      setpage(selectpageg);
  };
  return (
    <div>
      <h2>Pagination list of items</h2>
      {data.length > 0 ? (
        <div className="parent">
          {data.map((item) => (
            <div key={item.id} className="pagination__css">
              <span>
                {" "}
                <img src={item.thumbnail} alt="pic not found" />
              </span>
              <span>{item.title}</span>
            </div>
          ))}
        </div>
      ) : (
        <div>Loading...</div>
      )}
      {data.length > 0 && (
        <div className="pagination">
          <span onClick={() => selectpage(page - 1)}>👈</span>
          {[...Array(totalpage)].map((_, i) => {
            return (
              <span onClick={() => selectpage(i + 1)} key={i}>
                {i + 1}
              </span>
            );
          })}
          {/* <span>1</span> */}
          {/* <span>2</span> */}
          <span onClick={() => selectpage(page + 1)}>👉</span>
        </div>
      )}
    </div>
  );
};

export default Pagination_list_Of_iteam;
