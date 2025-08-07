import axios from "axios";
import { getToken } from "./UserServices";

export function getAllEquipment() {
    const token = getToken();
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
    
    return axios.get("http://localhost:9090/equipment", config);
}

export function getSingleEquipment(equipmentId) {
    const token = getToken();
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
    
    return axios.get(`http://localhost:9090/equipment/${equipmentId}`, config);
}

export function getOwnedEquipments() {
    const token = getToken();
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
    return axios.get("http://localhost:9090/equipment/owned", config);
}

export function addEquipment(equipmentData) {
    const token = getToken();
    const formData = new FormData();
    formData.append('name', equipmentData.name);
    formData.append('description', equipmentData.description);
    formData.append('image', equipmentData.image);
    formData.append('rentalPrice', equipmentData.rentalPrice);
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    };
    return axios.post("http://localhost:9090/equipment", formData, config);
} 