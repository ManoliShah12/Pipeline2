import React, { useState, useEffect } from "react";
import axios from "axios";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Fetch cart items from backend
    const fetchCartItems = async () => {
      try {
        const response = await axios.get("http://localhost:3001/cart");
        setCartItems(response.data);
        // Handle the response
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  const updateQuantity = async (itemId, newQuantity) => {
    // Update item quantity in backend
    await axios.put(`http://localhost:3001/cart/${itemId}`, {
      quantity: newQuantity,
    });
    // Refresh cart items
    const updatedItems = cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);
  };

  const removeItem = async (itemId) => {
    // Remove item from backend
    await axios.delete(`http://localhost:3001/cart/${itemId}`);
    // Refresh cart items
    const updatedItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedItems);
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cartItems.map((item) => (
        <div key={item.id}>
          <p>
            {item.name} - Quantity: {item.quantity}
          </p>
          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
            +
          </button>
          <button
            onClick={() =>
              updateQuantity(item.id, Math.max(1, item.quantity - 1))
            }
          >
            -
          </button>
          <button onClick={() => removeItem(item.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
}

export default Cart;
