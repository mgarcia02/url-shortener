import { Request, Response } from "express"
import { loginService, logoutService } from "@backend/services/auth.service"

async function login(req: Request, res: Response) {
    const { userName, password } = req.body
    try {
        const user = await loginService(userName, password, res)
        res.status(200).json(user)
    } catch (error) {
        if (error instanceof Error && error.message === 'INVALID_USERNAME_OR_PASSWORD') {
            return res.status(400).json({error:"Invalid username or password"})
        }
        console.error('Unexpected error:', error)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
}

async function logout(req: Request, res: Response) {
    try {
        await logoutService(res)
        res.status(200).json({ message: 'Logged out seccesfully' })
    } catch (error) {
        console.error('Unexpected error:', error)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
}

export { login, logout }