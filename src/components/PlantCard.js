import React, { useState } from "react";

function PlantCard({ plant, updatePlant, deletePlant }) {
  const [inStock, setInStock] = useState(true);

  const toggleInStock = () => {
    setInStock(!inStock);
  };

  const handlePriceChange = () => {
    const newPrice = prompt("Enter new price:", plant.price);
    if (newPrice && !isNaN(newPrice)) {
      updatePlant(plant.id, parseFloat(newPrice));
    }
  };

  const handleDelete = () => {
    deletePlant(plant.id);
  };

  return (
    <li className="card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: {plant.price}</p>
      <button onClick={handlePriceChange}>Edit Price</button>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={toggleInStock}>
        {inStock ? "In Stock" : "Out of Stock"}
      </button>
    </li>
  );
}

export default PlantCard;
