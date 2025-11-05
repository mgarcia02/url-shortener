import { Request, Response, NextFunction } from "express"
import { signUpService, signInService, signOutService } from "@backend/services/auth.service"
import { SignInSchema, SignUpSchema } from "@backend/validations/auth.validation"
import { ValidationError } from "@backend/errors/errors"
import { generateToken } from "@backend/utils/jwt"

async function signUp(req: Request, res: Response, next: NextFunction) {

    try {
        const parseResult = SignUpSchema.safeParse(req.body)
        if (!parseResult.success) throw new ValidationError(parseResult.error?.issues[0].message)
        const { userName, email, password } = parseResult.data

        const { id, userDto } = await signUpService(userName, email, password)

        generateToken(id, res)

        return res.status(201).json(userDto)
    } catch (error) {
        next(error)
    }
}

async function signIn(req: Request, res: Response, next: NextFunction) {
    try {
        const parseResult = SignInSchema.safeParse(req.body)
        if (!parseResult.success) throw new ValidationError(parseResult.error?.issues[0].message)
        const { userName, password } = parseResult.data

        const { id, userDto } = await signInService(userName, password)

        generateToken(id, res)

        return res.status(200).json(userDto)
    } catch (error) {
        next(error)
    }
}

async function signOut(_req: Request, res: Response, next: NextFunction) {
    try {
        await signOutService(res)
        return res.status(200).json({ message: 'Logged out seccesfully' })
    } catch (error) {
        next(error)
    }
}

export { signUp, signIn, signOut }