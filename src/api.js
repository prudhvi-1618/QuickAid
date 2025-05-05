import axios from 'axios'

// "https://quick-ambulance-api-gateway.onrender.com/",
// const BASE_URL ="https://quick-ambulance-login-logout.onrender.com"
let api = axios.create({
    baseURL:import.meta.env.VITE_API_URL,
    withCredentials: true,
})

export default api;