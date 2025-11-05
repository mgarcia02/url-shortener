import axios from "axios"
import type { SignInDTO, SignUpDTO } from "../types/authTypes";

const api = axios.create({
    baseURL: 'http://localhost:3000/api/auth',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
})

async function signInService(obj: SignInDTO) {
    try {
        const res = await api.post('/signin', obj);
        return { data: res.data, error: null }
    } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
            return { data: null, error: e.response?.data?.error?.message || "Error en la red"}
        }
        return { data: null, error: "Error desconocido"}
    }
}

async function signOutService() {
    try {
        await api.post('/signout');
    } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
            return e.response?.data?.error?.message || "Error en la red"
        }
        return "Error desconocido"
    }
}

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

export { signInService, signOutService, signUpService }