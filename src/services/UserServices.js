import axios from "axios";
import { jwtDecode } from "jwt-decode";

// const token = getToken();

export function registerUser(data){
    return axios.post("http://localhost:9090/auth/signUp", data)
}

export function loginUser(data){
    return axios.post("http://localhost:9090/auth/signIn",data);

}

export function addToken(token){
    localStorage.setItem("token",token);
}

export function removeToken(){
    localStorage.removeItem("token");
}

export function getToken(){
    return localStorage.getItem("token");

}

export function getUserRole() {
  const token = getToken();
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded?.authorities?.[0] || null; 
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
}

// Admin methods
export function getAllUsers() {
    const token = getToken();
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
    return axios.get("http://localhost:9090/farmer/users", config);
}

export function disableUser(email) {
    const token = getToken();
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
    return axios.patch(`http://localhost:9090/farmer/disable/${email}`, {}, config);
}

export function enableUser(email) {
    const token = getToken();
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
    return axios.patch(`http://localhost:9090/farmer/enable/${email}`, {}, config);
}


