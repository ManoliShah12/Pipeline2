import React, { useState, useEffect } from "react";
import axios from "axios";

function CheckoutScreen() {
  const [cartItems, setCartItems] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const { data } = await axios.get("http://localhost:3001/cart");
        setCartItems(data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  const placeOrder = async () => {
    try {
      // Assuming your backend expects an array of items for the order.
      // Adjust according to your API's requirements.
      await axios.post("http://localhost:3001/orders", { items: cartItems });
      setOrderPlaced(true);
      setCartItems([]); // Clear cart items on successful order placement
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place the order.");
    }
  };

  if (orderPlaced) {
    return <div>Your order has been placed successfully!</div>;
  }

  return (
    <div>
      <h2>Checkout</h2>
      {cartItems.length > 0 ? (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.name} - Quantity: {item.quantity}
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty.</p>
      )}
      <button onClick={placeOrder} disabled={cartItems.length === 0}>
        Place Order
      </button>
    </div>
  );
}

export default CheckoutScreen;
