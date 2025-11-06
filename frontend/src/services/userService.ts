import axios from "axios"

const api = axios.create({
    baseURL: 'http://localhost:3000/api/users',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
})

async function infoUserService() {
    try {
        const res = await api.get('/');
        return { data: res.data, error: null }
    } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
            return { data: null, error: e.response?.data?.error?.message || "Error en la red"}
        }
        return { data: null, error: "Error desconocido"}
    }
}


export { infoUserService }