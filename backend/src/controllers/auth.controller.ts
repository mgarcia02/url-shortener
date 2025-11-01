import { Request, Response, NextFunction } from "express"
import { loginService, logoutService } from "@backend/services/auth.service"
import { LoginSchema } from "@backend/validations/auth.validation"
import { ValidationError } from "@backend/errors/errors"
import { generateToken } from "@backend/utils/jwt"

async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const parseResult = LoginSchema.safeParse(req.body)
        if (!parseResult.success) throw new ValidationError(parseResult.error?.issues[0].message)
        const { userName, password } = parseResult.data

        const { id, userDto } = await loginService(userName, password)

        generateToken(id, res)

        return res.status(200).json(userDto)
    } catch (error) {
        next(error)
    }
}

async function logout(_req: Request, res: Response, next: NextFunction) {
    try {
        await logoutService(res)
        return res.status(200).json({ message: 'Logged out seccesfully' })
    } catch (error) {
        next(error)
    }
}

export { login, logout }