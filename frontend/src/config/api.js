import axios from "axios"

export const API_BASE_URL = "https://twitter-app-2sx2.onrender.com"
// export const API_BASE_URL = "http://localhost:5454"

// export const api = axios.create({
//     baseURL: API_BASE_URL, 
//     headers: {              
//         "Authorization": `Bearer ${localStorage.getItem("jwt")}`, 
//         "Content-Type": "application/json"
//     }
// })

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});
