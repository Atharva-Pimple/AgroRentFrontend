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

export function addEquipment(formData) {
    const token = getToken();
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    };
    return axios.post("http://localhost:9090/equipment", formData, config);
}

export function updateEquipment(equipmentId, formData) {
    const token = getToken();
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    };
    return axios.put(`http://localhost:9090/equipment/${equipmentId}`, formData, config);
}

export function deleteEquipmentById(equipmentId) {
    const token = getToken();
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
    return axios.delete(`http://localhost:9090/equipment/${equipmentId}`, config);
}

export function deleteEquipment() {
    const token = getToken();
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
    return axios.delete(`http://localhost:9090/equipment/delete`, config);
}