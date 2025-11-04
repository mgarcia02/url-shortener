import axios from "axios"
import type { SignUpDTO } from "../types/userTypes";

const api = axios.create({
    baseURL: 'http://localhost:3001/api/users',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
})

async function signUpService(obj: SignUpDTO) {
    try {
        const response = await api.post('/', obj);
        return response
    } catch (e) {
        console.log(e)
        //return e.response
    }
}

export { signUpService }