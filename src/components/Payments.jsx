import React, { useEffect, useState } from 'react';
import { getEquipmentPayments } from '../services/PaymentService';
import { getToken } from '../services/UserServices';
import { useNavigate } from 'react-router-dom';
import './Payments.css';

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate('/signin');
    } else {
      fetchPayments();
    }
  }, [navigate]);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const response = await getEquipmentPayments();
      setPayments(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load payments. Please try again later.');
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

  return (
    <div className="payments-container main-content mt-5">
      <div className="payments-header">
        <h1>Equipment Payments</h1>
        <p>All payments received for your equipment rentals</p>
      </div>
      
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading payments...</p>
        </div>
      ) : error ? (
        <div className="error-container">
          <p className="error-message">{error}</p>
          <button onClick={fetchPayments} className="retry-button">Try Again</button>
        </div>
      ) : payments.length === 0 ? (
        <div className="no-payments">
          <div className="no-payments-icon">💰</div>
          <h3>No Payments Found</h3>
          <p>No payments have been received yet for your equipment rentals.</p>
        </div>
      ) : (
        <div className="payments-grid">
          {payments.map(payment => (
            <div key={payment.bookingId} className="payment-card">
              <div className="payment-header">
                <h3 className="equipment-name">{payment.equipmentName}</h3>
                <span className="payment-status">Paid</span>
              </div>
              
              <div className="payment-details">
                <div className="detail-row">
                  <span className="detail-label">Renter:</span>
                  <span className="detail-value">{payment.renter}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Amount:</span>
                  <span className="detail-value amount">₹{payment.amount}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Payment ID:</span>
                  <span className="detail-value payment-id">{payment.paymentId}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Order ID:</span>
                  <span className="detail-value order-id">{payment.orderId}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Booking ID:</span>
                  <span className="detail-value booking-id">#{payment.bookingId}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Payments;
