import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRentedBooking } from '../services/BookingService';
import { getToken } from '../services/UserServices';
import { createPaymentOrder, verifyPayment } from '../services/PaymentService';
import { toast } from 'react-toastify';
import './MyBookings.css';

const MyBookings = () => {
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
            const response = await getRentedBooking();
            setBookings(response.data);
            setError(null);
        } catch (err) {
            console.error('Error fetching bookings:', err);
            setError('Failed to load bookings. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'PENDING':
                return 'badge-warning';
            case 'ACCEPTED':
                return 'badge-success';
            case 'REJECTED':
                return 'badge-danger';
            case 'CANCELLED':
                return 'badge-secondary';
            case 'COMPLETED':
                return 'badge-info';
            default:
                return 'badge-secondary';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'PENDING':
                return 'Pending';
            case 'ACCEPTED':
                return 'Accepted';
            case 'REJECTED':
                return 'Rejected';
            case 'CANCELLED':
                return 'Cancelled';
            case 'COMPLETED':
                return 'Completed';
            default:
                return status;
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

    const handleCancel = (bookingId) => {
        // TODO: Implement cancel booking functionality
        console.log('Cancel booking:', bookingId);
        toast.info('Cancel functionality will be implemented soon.');
    };

    const handlePay = async (bookingId) => {
        try {
            const { data } = await createPaymentOrder(bookingId);
            if (!window.Razorpay) {
                toast.error('Razorpay SDK not loaded.');
                return;
            }
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY,
                amount: data.amount * 100,
                currency: data.currency,
                name: 'Farm Equipment Rental',
                description: 'Payment for: ' + data.equipmentName,
                order_id: data.razorpayOrderId,
                handler: async function (response) {
                    try {
                        await verifyPayment({
                            bookingId: data.bookingId,
                            razorpayOrderId: response.razorpay_order_id,
                            razorpayPaymentId: response.razorpay_payment_id,
                            razorpaySignature: response.razorpay_signature
                        });
                        toast.success('Payment verification successful!');
                        fetchBookings();
                    } catch (err) {
                        toast.error(err?.response?.data?.message || 'Payment verification failed.');
                    }
                },
                prefill: {
                    name: data.name,
                    email: data.email
                },
                theme: {
                    color: '#3399cc'
                }
            };
            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Failed to initiate payment.');
        }
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading your bookings...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <p className="error-message">{error}</p>
                <button onClick={fetchBookings} className="retry-button">
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="my-bookings-container main-content mt-5">
            <div className="bookings-header">
                <h1>My Bookings</h1>
                <p>Track all your equipment rental bookings</p>
            </div>
            
            {bookings.length === 0 ? (
                <div className="no-bookings">
                    <div className="no-bookings-icon">📋</div>
                    <h3>No Bookings Found</h3>
                    <p>You haven't made any bookings yet.</p>
                    <button 
                        className="browse-equipment-btn"
                        onClick={() => navigate('/')}
                    >
                        Browse Equipment
                    </button>
                </div>
            ) : (
                <div className="bookings-grid">
                    {bookings.map((booking) => (
                        <div key={booking.id} className="booking-card">
                            <div className="booking-header">
                                <h3 className="equipment-name">{booking.equipmentName}</h3>
                                <span className={`status-badge ${getStatusBadgeClass(booking.status)}`}>
                                    {getStatusText(booking.status)}
                                </span>
                            </div>
                            
                            <div className="booking-details">
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
                                    <span className={`payment-status ${booking.paid ? 'paid' : 'unpaid'}`}>
                                        {booking.paid ? 'Paid' : 'Not Paid'}
                                    </span>
                                </div>
                            </div>
                            
                            <div className="booking-actions">
                                {(booking.status === 'ACCEPTED' || booking.status === 'PENDING') && (
                                    <button 
                                        className="action-btn cancel-btn"
                                        onClick={() => handleCancel(booking.id)}
                                    >
                                        Cancel
                                    </button>
                                )}
                                
                                {!booking.paid && booking.status === 'ACCEPTED' && (
                                    <button 
                                        className="action-btn pay-btn"
                                        onClick={() => handlePay(booking.id)}
                                    >
                                        Pay
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyBookings; 