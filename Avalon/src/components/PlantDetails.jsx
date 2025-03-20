import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PlantDetails.css';

const PlantDetails = ({ id }) => {
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = 'sk-1fq567dba5bb470a09245';
  const API_URL = 'https://perenual.com/api/species/details';

  useEffect(() => {
    const fetchPlantDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/${id}`, {
          params: {
            key: API_KEY
          }
        });
        setPlant(response.data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching plant details:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPlantDetails();
    }
  }, [id]);

  if (loading) {
    return <div className="loading">Loading plant details...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!plant) {
    return <div className="error">No plant details found</div>;
  }

  return (
    <div className="plant-details-container">
      <div className="plant-header">
        <h1>{plant.common_name}</h1>
        <p className="scientific-name">{plant.scientific_name.join(', ')}</p>
        {plant.other_name && plant.other_name.length > 0 && (
          <p className="other-names">Also known as: {plant.other_name.join(', ')}</p>
        )}
      </div>

      <div className="plant-content">
        <div className="plant-image-section">
          {plant.default_image && (
            <img
              src={plant.default_image.regular_url}
              alt={plant.common_name}
              className="main-image"
            />
          )}
        </div>

        <div className="plant-info-section">
          <div className="info-card">
            <h2>Basic Information</h2>
            <p><strong>Type:</strong> {plant.type || 'Not specified'}</p>
            <p><strong>Cycle:</strong> {plant.cycle || 'Not specified'}</p>
            <p><strong>Watering:</strong> {plant.watering || 'Not specified'}</p>
            <p><strong>Sunlight:</strong> {plant.sunlight.join(', ') || 'Not specified'}</p>
            {plant.dimension && <p><strong>Dimensions:</strong> {plant.dimension}</p>}
          </div>

          <div className="info-card">
            <h2>Growing Information</h2>
            <p><strong>Growth Rate:</strong> {plant.growth_rate || 'Not specified'}</p>
            <p><strong>Care Level:</strong> {plant.care_level || 'Not specified'}</p>
            {plant.maintenance && <p><strong>Maintenance:</strong> {plant.maintenance}</p>}
            <p><strong>Indoor:</strong> {plant.indoor ? 'Yes' : 'No'}</p>
          </div>

          {plant.description && (
            <div className="info-card">
              <h2>Description</h2>
              <p className="description">{plant.description}</p>
            </div>
          )}

          <div className="info-card">
            <h2>Characteristics</h2>
            <div className="characteristics">
              <div className="characteristic">
                <span className="label">Drought Tolerant:</span>
                <span className={`value ${plant.drought_tolerant ? 'yes' : 'no'}`}>
                  {plant.drought_tolerant ? 'Yes' : 'No'}
                </span>
              </div>
              <div className="characteristic">
                <span className="label">Salt Tolerant:</span>
                <span className={`value ${plant.salt_tolerant ? 'yes' : 'no'}`}>
                  {plant.salt_tolerant ? 'Yes' : 'No'}
                </span>
              </div>
              <div className="characteristic">
                <span className="label">Thorny:</span>
                <span className={`value ${plant.thorny ? 'yes' : 'no'}`}>
                  {plant.thorny ? 'Yes' : 'No'}
                </span>
              </div>
              <div className="characteristic">
                <span className="label">Invasive:</span>
                <span className={`value ${plant.invasive ? 'yes' : 'no'}`}>
                  {plant.invasive ? 'Yes' : 'No'}
                </span>
              </div>
            </div>
          </div>

          {plant.hardiness && (
            <div className="info-card">
              <h2>Hardiness Zone</h2>
              <p>Zone {plant.hardiness.min} to {plant.hardiness.max}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlantDetails; 