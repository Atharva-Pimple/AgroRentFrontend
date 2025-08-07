import axios from "axios";
import { getToken } from "./UserServices";

export function createBooking(bookingData) {
    const token = getToken();
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };
    
    const requestBody = {
        startDate: bookingData.startDate,
        endDate: bookingData.endDate,
        equipmentId: bookingData.equipmentId,
        totalAmount: bookingData.totalAmount
    };
    
    return axios.post("http://localhost:9090/booking", requestBody, config);
}

export function getRentedBooking() {
    const token = getToken();
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
    
    return axios.get("http://localhost:9090/booking/my-bookings", config);
}

export function checkOwnerBookings() {
    const token = getToken();
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
    return axios.get("http://localhost:9090/booking/owner", config);
}

export function acceptBooking(bookingId) {
    const token = getToken();
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
    return axios.patch(`http://localhost:9090/booking/${bookingId}/accept`, {}, config);
}

export function rejectBooking(bookingId) {
    const token = getToken();
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
    return axios.patch(`http://localhost:9090/booking/${bookingId}/reject`, {}, config);
} 