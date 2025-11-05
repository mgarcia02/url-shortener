import axios from "axios"
import type { SignUpDTO } from "../types/userTypes";

const api = axios.create({
    baseURL: 'http://localhost:3000/api/users',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
})

async function signUpService(obj: SignUpDTO) {
    try {
        const res = await api.post('/', obj);
        return { data: res.data, error: null }
    } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
            return { data: null, error: e.response?.data?.error?.message || "Error en la red"}
        }
        return { data: null, error: "Error desconocido"}
    }
}


export { signUpService }