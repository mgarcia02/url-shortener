import axios from "axios"
import type { SignInDTO } from "../types/authTypes";

const api = axios.create({
    baseURL: 'http://localhost:3001/api/auth',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
})

async function signInService(obj: SignInDTO) {
    try {
        const response = await api.post('/signin', obj);
        return response
    } catch (e) {
        console.log(e)
        //return e.response
    }
}

async function signOutService() {
    try {
        const response = await api.post('/signout');
        return response
    } catch (e) {
        console.log(e)
        //return e.response
    }
}

export { signInService, signOutService }