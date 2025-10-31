import { Request, Response } from "express"
import { createUserService, getUserService } from "@backend/services/user.service"

async function createUser(req: Request, res: Response) {
    const { userName, email, password } = req.body

    try {
        const user = await createUserService(userName, email, password, res)
        res.status(201).json(user)
    } catch (error) {
        if (error instanceof Error && error.message === 'USER_EXISTS') {
            return res.status(409).json({ error: 'Este usuario ya existe' })
        }
        console.error('Unexpected error:', error)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
}

async function getUser(req: Request, res: Response) {
    const { userName } = req.body

    try {
        const user = await getUserService(userName)
        res.status(200).json(user)
    } catch (error) {
        if (error instanceof Error && error.message === 'USER_DOESNT_EXIST') {
            return res.status(409).json({ error: 'Este usuario no existe' })
        }
        console.error('Unexpected error:', error)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
}

export { createUser, getUser }