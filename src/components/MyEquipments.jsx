import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getOwnedEquipments } from '../services/EquipmentService';
import { getToken } from '../services/UserServices';
import './MyEquipments.css';

const MyEquipments = () => {
  const [equipments, setEquipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate('/signin');
    } else {
      fetchOwnedEquipments();
    }
    // eslint-disable-next-line
  }, [navigate]);

  const fetchOwnedEquipments = async () => {
    try {
      setLoading(true);
      const response = await getOwnedEquipments();
      setEquipments(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load your equipments. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-equipments-container main-content mt-5">
      <div className="equipments-header">
        <h1>My Equipments</h1>
        <p>All equipments you have listed for rent</p>
        <div className="equipments-actions">
          <button className="action-btn add-btn" onClick={() => navigate('/add-equipment')}>Add New Equipment</button>
          <button className="action-btn bookings-btn" onClick={() => navigate('/equipment-bookings')}>Check Bookings</button>
        </div>
      </div>
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading your equipments...</p>
        </div>
      ) : error ? (
        <div className="error-container">
          <p className="error-message">{error}</p>
          <button onClick={fetchOwnedEquipments} className="retry-button">Try Again</button>
        </div>
      ) : equipments.length === 0 ? (
        <div className="no-equipments">
          <div className="no-equipments-icon">🚜</div>
          <h3>No Equipments Found</h3>
          <p>You haven't listed any equipments for rent yet.</p>
        </div>
      ) : (
        <div className="equipments-grid">
          {equipments.map(equip => (
            <div key={equip.id} className="equipment-card">
              <div className="card-image-container">
                <img src={equip.imageUrl} alt={equip.name} className="equipment-image" onError={e => {e.target.src = 'https://via.placeholder.com/300x200?text=Equipment+Image'}} />
                <div className={`availability-badge ${equip.available ? 'available' : 'unavailable'}`}>{equip.available ? 'Available' : 'Unavailable'}</div>
              </div>
              <div className="card-content">
                <h3 className="equipment-name">{equip.name}</h3>
                <p className="equipment-description">{equip.description}</p>
                <div className="card-footer">
                  <div className="price-container">
                    <span className="price-label">Rental Price:</span>
                    <span className="price">₹{equip.rentalPrice}/day</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyEquipments;