import axios from "axios";
import { getToken } from "./UserServices";

export function createPaymentOrder(bookingId) {
    const token = getToken();
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
    return axios.post(`http://localhost:9090/payment/create-payment/${bookingId}`, {}, config);
}

export function verifyPayment({ bookingId, razorpayOrderId, razorpayPaymentId, razorpaySignature }) {
    const token = getToken();
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };
    return axios.post(
        "http://localhost:9090/payment/verify",
        {
            bookingId,
            razorpayOrderId,
            razorpayPaymentId,
            razorpaySignature
        },
        config
    );
}