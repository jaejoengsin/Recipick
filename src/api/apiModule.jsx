import axios from "axios";


const apiClient = axios.create({
    baseURL: "http://172.21.100.198:8080",
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});

export default apiClient;

