import React, { useEffect, useReducer } from "react";
import axios from "axios";

const ShopingCart = () => {
  // Reducer
  const fun = (state, action) => {
    switch (action.type) {
      case "setdata":
        return { ...state, products: action.payload };

      case "additem": {
        // If item already in cart, just increase quantity
        const existing = state.cart.find((i) => i.id === action.payload.id);
        if (existing) {
          return {
            ...state,
            cart: state.cart.map((item) =>
              item.id === action.payload.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          };
        }
        // If new item, add with quantity = 1
        return { ...state, cart: [...state.cart, { ...action.payload, quantity: 1 }] };
      }

      case "updateItem":
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id ? { ...item, ...action.payload } : item
          ),
        };

      case "removeitem":
        return {
          ...state,
          cart: state.cart.filter((item) => item.id !== action.payload),
        };

      case "increase":
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };

      case "decrease":
        return {
          ...state,
          cart: state.cart
            .map((item) =>
              item.id === action.payload
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity > 0), // auto remove if qty = 0
        };

      default:
        return state;
    }
  };

  // Initial State
  const data = { products: [], cart: [] };
  const [state, dispatch] = useReducer(fun, data);

  // Fetch Products
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "https://dummyjson.com/products?limit=10&skip=10"
        );
        if (response) {
          dispatch({ type: "setdata", payload: response.data.products });
        }
      } catch (error) {
        console.error(`❌ Something went wrong`, error);
      }
    };
    fetch();
  }, []);

  return (
    <div className="parent" style={{ display: "flex", gap: "20px" }}>
      {/* Product List */}
      <div className="leftchild" style={{ flex: 2 }}>
        <h2>Products</h2>
        {state.products.length > 0 ? (
          state.products.map((item) => (
            <div
              key={item.id}
              style={{
                border: "1px solid gray",
                margin: "10px 0",
                padding: "10px",
              }}
            >
              <h4>{item.title}</h4>
              <p>Category: {item.category}</p>
              <p>Brand: {item.brand}</p>
              <button
                onClick={() => dispatch({ type: "additem", payload: item })}
              >
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p>Loading products...</p>
        )}
      </div>

      {/* Cart */}
      <div className="rightchild" style={{ flex: 1 }}>
        <h2>Cart</h2>
        {state.cart.length > 0 ? (
          state.cart.map((item) => (
            <div
              key={item.id}
              style={{
                border: "1px solid green",
                margin: "10px 0",
                padding: "10px",
              }}
            >
              <h4>{item.title}</h4>
              <p>Quantity: {item.quantity}</p>
              <button onClick={() => dispatch({ type: "increase", payload: item.id })}>
                ➕
              </button>
              <button onClick={() => dispatch({ type: "decrease", payload: item.id })}>
                ➖
              </button>
              <button
                onClick={() => dispatch({ type: "removeitem", payload: item.id })}
              >
                ❌ Remove
              </button>
            </div>
          ))
        ) : (
          <p>No items in cart</p>
        )}
      </div>
    </div>
  );
};

export default ShopingCart;
