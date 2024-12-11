import React, { useState, useEffect } from "react";
import Header from "./Header";
import PlantPage from "./PlantPage";

function App() {
  const [plants, setPlants] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch("/plants")
      .then((response) => response.json())
      .then((data) => setPlants(data));
  }, []);

  const addPlant = (newPlant) => {
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: { "Content-Type": "application/json" }, // Ensure lowercase Content-Type
      body: JSON.stringify({
        ...newPlant,
        price: parseFloat(newPlant.price), // Ensure price is sent as a number
      }),
    })
      .then((res) => res.json())
      .then((savedPlant) => {
        // Update the local plant list
        setPlants((prevPlants) => [...prevPlants, savedPlant]);
      });
  };

  const updatePlant = (id, price) => {
    fetch(`/plants/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ price }),
    })
      .then((response) => response.json())
      .then((updatedPlant) => {
        setPlants((prev) =>
          prev.map((plant) =>
            plant.id === updatedPlant.id ? updatedPlant : plant
          )
        );
      });
  };

  const deletePlant = (id) => {
    fetch(`/plants/${id}`, {
      method: "DELETE",
    }).then(() => {
      setPlants((prev) => prev.filter((plant) => plant.id !== id));
    });
  };

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app">
      <Header />
      <PlantPage
        plants={filteredPlants}
        addPlant={addPlant}
        updatePlant={updatePlant}
        deletePlant={deletePlant}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    </div>
  );
}

export default App;
