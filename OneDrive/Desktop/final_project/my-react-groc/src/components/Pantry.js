import React, { useState, useEffect } from "react";
import axios from "axios";

function Pantry() {
  const [pantryItems, setPantryItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [imageURL, setImageURL] = useState("");

  const fetchPantryItems = async () => {
    const response = await axios.get("http://localhost:3001/pantry");
    setPantryItems(response.data);
  };

  useEffect(() => {
    fetchPantryItems();
  }, []);

  const handleAddItem = async () => {
    try {
      await axios.post("http://localhost:3001/pantry", {
        itemName: newItem,
        quantity,
        imageURL,
      });
      fetchPantryItems(); // Refresh the list
      setNewItem("");
      setQuantity(1);
      setImageURL("");
    } catch (error) {
      console.error("Failed to add item");
    }
  };

  return (
    <div>
      <h2>Pantry Items</h2>
      {pantryItems.map((item) => (
        <div key={item.id} style={{ marginBottom: "20px" }}>
          {item.imageURL && (
            <img
              src={item.imageURL}
              alt={item.name}
              style={{ width: "100px", height: "100px", marginRight: "20px" }}
            />
          )}
          <p>
            {item.name}: {item.quantity}
          </p>
        </div>
      ))}
      <div>
        <input
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="New Item Name"
        />
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Quantity"
        />
        <input
          value={imageURL}
          onChange={(e) => setImageURL(e.target.value)}
          placeholder="Image URL"
        />
        <button onClick={handleAddItem}>Add Item</button>
      </div>
    </div>
  );
}

export default Pantry;
