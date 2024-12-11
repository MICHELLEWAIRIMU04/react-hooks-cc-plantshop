import React from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage({
  plants,
  addPlant,
  updatePlant,
  deletePlant,
  searchQuery,
  setSearchQuery,
}) {
  return (
    <main>
      <NewPlantForm addPlant={addPlant} />
      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <PlantList
        plants={plants}
        updatePlant={updatePlant}
        deletePlant={deletePlant}
      />
    </main>
  );
}

export default PlantPage;
