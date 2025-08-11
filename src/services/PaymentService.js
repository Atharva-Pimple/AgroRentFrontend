import axios from "axios";
import { getToken } from "./UserServices";

const API_URL = "http://localhost:9090/payment";

export function createPaymentOrder(bookingId) {
    const token = getToken();
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
    return axios.post(`${API_URL}/create-payment/${bookingId}`, {}, config);
}

export function verifyPayment(verificationData) {
    const token = getToken();
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };
    return axios.post(`${API_URL}/verify`, verificationData, config);
}

export function getEquipmentPayments() {
    const token = getToken();
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
    return axios.get(`${API_URL}/Equipments/payments`, config);
}