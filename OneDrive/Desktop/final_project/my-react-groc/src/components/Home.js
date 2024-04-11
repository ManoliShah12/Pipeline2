// Home.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import GroceryItem from "./GroceryItem";

function Home({ handleAddToCart }) {
  const [groceryItems, setGroceryItems] = useState([]);

  useEffect(() => {
    const fetchGroceryItems = async () => {
      try {
        const response = await axios.get("http://localhost:3001/groceries");
        setGroceryItems(response.data);
        console.log("items");
      } catch (error) {
        console.error("Error fetching grocery items:", error);
        // Set state to display an error message if needed
      }
    };
    fetchGroceryItems();
  }, []);

  return (
    <div className="grocery-list">
      {groceryItems.map((item) => (
        <GroceryItem
          key={item.id}
          item={item}
          handleAddToCart={handleAddToCart}
        />
      ))}
    </div>
  );
}

export default Home;
