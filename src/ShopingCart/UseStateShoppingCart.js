

import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./style.css";

const UseStateShoppingCart = () => {
  const [data, setData] = useState([]);
  const [carts, setCarts] = useState([]); // ✅ initialize as empty array

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `https://dummyjson.com/products?limit=10&skip=0`
        );
        setData(response.data.products); // ✅ correct
      } catch (error) {
        console.error(`Something went wrong: ${error}`);
      }
    };
    fetch();
  }, []);

  // ✅ Add to cart (or increase qty if exists)
  const handleUpadteIteam = (item) => {
    setCarts((prev) => {
      const exists = prev.find((p) => p.id === item.id);
      if (exists) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, qty: p.qty + 1 } : p
        );
      } else {
        return [...prev, { ...item, qty: 1 }];
      }
    });
  };

  // ✅ Increase qty
  const handleAdditeam = (id) => {
    setCarts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, qty: p.qty + 1 } : p
      )
    );
  };

  // ✅ Decrease qty
  const handleMinusIteam = (id) => {
    setCarts((prev) =>
      prev
        .map((p) =>
          p.id === id ? { ...p, qty: p.qty - 1 } : p
        )
        .filter((p) => p.qty > 0) // remove if qty = 0
    );
  };

  // ✅ Delete item
  const handledeleteiteam = (id) => {
    setCarts((prev) => prev.filter((p) => p.id !== id));
  };

  // ✅ Grand Total for cart
  const grandTotal = carts.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <motion.div className="parent">
      {data.length > 0 ? (
        <motion.div className="child">
          {data.map((item) => (
            <motion.div
              key={item.id}
              className="card"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h2>{item.id}</h2>
              <h1>{item.title}</h1>
              <p>{item.brand}</p>
              <p>${item.price}</p>
              <div className="AddToCartButton">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  onClick={() => handleUpadteIteam(item)}
                >
                  Add To Cart
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div>Loading...</div>
      )}

      {/* ✅ Cart Section */}
      <motion.div className="CartParent">
        {carts.length > 0 ? (
          <div className="cart">
            {carts.map((item, index) => (
              <motion.div key={index} className="cart-item">
                <p>{item.brand}</p>
                <p>{item.title}</p>
                <p>Price: ${item.price}</p>
                <p>Qty: {item.qty}</p>
                <p>Total: ${item.price * item.qty}</p>
                <motion.div>
                  <button onClick={() => handleAdditeam(item.id)}>➕</button>
                  <button onClick={() => handleMinusIteam(item.id)}>➖</button>
                  <button onClick={() => handledeleteiteam(item.id)}>🗑️</button>
                </motion.div>
              </motion.div>
            ))}

            {/* ✅ Show grand total */}
            <h2 style={{ marginTop: "20px" }}>Grand Total: ${grandTotal}</h2>
          </div>
        ) : (
          <div>Cart Empty..</div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default UseStateShoppingCart;
