import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PlantList.css';

const PlantList = ({ onPlantSelect }) => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const API_KEY = 'sk-1fq567dba5bb470a09245';
  const API_URL = 'https://perenual.com/api/species-list';

  const fetchPlants = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL, {
        params: {
          key: API_KEY,
          page: page
        }
      });
      
      if (page === 1) {
        setPlants(response.data.data);
      } else {
        setPlants(prevPlants => [...prevPlants, ...response.data.data]);
      }
      setCurrentPage(response.data.current_page);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching plants:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlants(1);
  }, []);

  const handleLoadMore = () => {
    fetchPlants(currentPage + 1);
  };

  if (loading && plants.length === 0) {
    return <div className="loading">Loading plants...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="plant-list-container">
      <h1>Plant Directory</h1>
      <div className="plant-grid">
        {plants.map((plant) => (
          <div 
            key={plant.id} 
            className="plant-card"
            onClick={() => onPlantSelect(plant.id)}
            role="button"
            tabIndex={0}
          >
            <div className="plant-image">
              {plant.default_image ? (
                <img
                  src={plant.default_image.thumbnail}
                  alt={plant.common_name}
                  loading="lazy"
                />
              ) : (
                <div className="no-image">No image available</div>
              )}
            </div>
            <div className="plant-info">
              <h2>{plant.common_name}</h2>
              <p className="scientific-name">{plant.scientific_name.join(', ')}</p>
              <div className="plant-details">
                <p><strong>Cycle:</strong> {plant.cycle}</p>
                <p><strong>Watering:</strong> {plant.watering}</p>
                <p><strong>Sunlight:</strong> {plant.sunlight.join(', ')}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {!loading && (
        <button className="load-more" onClick={handleLoadMore}>
          Load More Plants
        </button>
      )}
      {loading && plants.length > 0 && (
        <div className="loading">Loading more plants...</div>
      )}
    </div>
  );
};

export default PlantList; 