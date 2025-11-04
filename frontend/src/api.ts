import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true, // importante para uso de cookies
})

export default api