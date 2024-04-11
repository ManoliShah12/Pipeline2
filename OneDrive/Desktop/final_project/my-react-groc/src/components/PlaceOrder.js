import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory

function PlaceOrder() {
  const navigate = useNavigate(); // Use useNavigate hook
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/cart")
      .then((response) => setCartItems(response.data))
      .catch((error) =>
        console.error("There was an error fetching the cart items:", error)
      );
  }, []);

  const placeOrder = async () => {
    try {
      await axios.post("http://localhost:3001/orders", { items: cartItems });
      alert("Order placed successfully!");

      // Clear the cart after order placement.
      await axios.delete("http://localhost:3001/cart");

      // Redirect user to a thank-you page or order confirmation page
      navigate("/thank-you"); // Use navigate instead of history.push
    } catch (error) {
      console.error("There was an error placing the order:", error);
      alert("Failed to place the order.");
    }
  };

  return (
    <div>
      <h2>Place Your Order</h2>
      <ul>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <li key={item.id}>
              {item.name} - Quantity: {item.quantity}
            </li>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
      </ul>
      <button onClick={placeOrder} disabled={cartItems.length === 0}>
        Place Order
      </button>
    </div>
  );
}

export default PlaceOrder;
