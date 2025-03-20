import React, { useState } from 'react';
import PlantList from './components/PlantList';
import PlantDetails from './components/PlantDetails';
import './App.css';

function App() {
  const [selectedPlantId, setSelectedPlantId] = useState(null);

  const handlePlantSelect = (plantId) => {
    setSelectedPlantId(plantId);
  };

  const handleBackToList = () => {
    setSelectedPlantId(null);
  };

  return (
    <div className="app">
      {selectedPlantId ? (
        <>
          <button className="back-button" onClick={handleBackToList}>
            ← Back to Plant List
          </button>
          <PlantDetails id={selectedPlantId} />
        </>
      ) : (
        <PlantList onPlantSelect={handlePlantSelect} />
      )}
    </div>
  );
}

export default App; 