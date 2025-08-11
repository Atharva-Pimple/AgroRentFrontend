import React, { useEffect, useState } from 'react';
import { checkOwnerBookings, acceptBooking, rejectBooking } from '../services/BookingService';
import { getToken } from '../services/UserServices';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './MyEquipmentBookings.css';

const MyEquipmentBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate('/signin');
    } else {
      fetchBookings();
    }
  }, [navigate]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await checkOwnerBookings();
      setBookings(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load bookings. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleAccept = async (id) => {
    try {
      const res = await acceptBooking(id);
      toast.success(res.data.message || 'Request accepted');
      fetchBookings();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to accept booking.');
    }
  };
  const handleReject = async (id) => {
    try {
      const res = await rejectBooking(id);
      toast.success(res.data.message || 'Request rejected');
      fetchBookings();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to reject booking.');
    }
  };

  return (
    <div className="my-equip-bookings-container main-content mt-5">
      <div className="equip-bookings-header">
        <h1>Bookings for My Equipments</h1>
        <p>All booking requests for your listed equipments</p>
      </div>
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading bookings...</p>
        </div>
      ) : error ? (
        <div className="error-container">
          <p className="error-message">{error}</p>
          <button onClick={fetchBookings} className="retry-button">Try Again</button>
        </div>
      ) : bookings.length === 0 ? (
        <div className="no-bookings">
          <div className="no-bookings-icon">📋</div>
          <h3>No Bookings Found</h3>
          <p>No one has booked your equipments yet.</p>
        </div>
      ) : (
        <div className="equip-bookings-grid">
          {bookings.map(booking => (
            <div key={booking.id} className="equip-booking-card">
              <div className="equip-booking-header">
                <h3 className="equipment-name">{booking.eqipmentName}</h3>
                <span className={`status-badge ${booking.status.toLowerCase()}`}>{booking.status}</span>
              </div>
              <div className="equip-booking-details">
                <div className="detail-row">
                  <span className="detail-label">Renter:</span>
                  <span className="detail-value">{booking.renterName}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Start Date:</span>
                  <span className="detail-value">{formatDate(booking.startDate)}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">End Date:</span>
                  <span className="detail-value">{formatDate(booking.endDate)}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Total Amount:</span>
                  <span className="detail-value amount">₹{booking.totalAmount}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Payment Status:</span>
                  <span className={`payment-status ${booking.paid ? 'paid' : 'unpaid'}`}>{booking.paid ? 'Paid' : 'Not Paid'}</span>
                </div>
              </div>
              {booking.status === 'PENDING' && (
                <div className="equip-booking-actions">
                  <button className="action-btn accept-btn" onClick={() => handleAccept(booking.id)}>Accept</button>
                  <button className="action-btn reject-btn" onClick={() => handleReject(booking.id)}>Reject</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyEquipmentBookings;