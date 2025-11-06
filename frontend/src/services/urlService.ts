import axios from "axios"
import type { UrlDto } from "../types/urlTypes";

const api = axios.create({
    baseURL: 'http://localhost:3000/api/urls',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
})

async function getUrlsByUserService() {
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

async function createUrlService(obj: UrlDto, auth: boolean) {
    try {
        const res = auth
            ? await api.post("/", { originalUrl: obj.original, customAlias: obj.short })
            : await api.post("/demo", { originalUrl: obj.original, customAlias: obj.short })

        return { data: res.data, error: null }
    } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
            return { data: null, error: e.response?.data?.error?.message || "Error en la red"}
        }
        return { data: null, error: "Error desconocido"}
    }
}

async function deleteUrlService(shortCode: string) {
    try {
        const res = await api.delete(`/${shortCode}`);
        return { data: res.data, error: null }
    } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
            return { data: null, error: e.response?.data?.error?.message || "Error en la red"}
        }
        return { data: null, error: "Error desconocido"}
    }
}

export { getUrlsByUserService, createUrlService, deleteUrlService }