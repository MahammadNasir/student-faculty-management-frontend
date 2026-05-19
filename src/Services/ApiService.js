import axios from 'axios'

const API_BASE_URL = "http://localhost:8080";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "content-Type": "application/json"
    }
})

export default api;