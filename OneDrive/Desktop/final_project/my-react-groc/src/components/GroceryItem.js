// GroceryItem.js
function GroceryItem({ item, handleAddToCart }) {
  return (
    <div className="grocery-item">
      <img src={item.imageURL} alt={item.name} />
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <p>${item.price}</p>
      <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
      {/* Add a "Buy" button if you have a separate purchasing mechanism */}
    </div>
  );
}

export default GroceryItem;
