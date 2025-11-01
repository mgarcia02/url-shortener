import { Request, Response, NextFunction } from "express"
import { createUserService, getUserService } from "@backend/services/user.service"
import { CreateUserSchema } from "@backend/validations/user.validation"
import { ValidationError } from "@backend/errors/errors"
import { generateToken } from "@backend/utils/jwt"

async function createUser(req: Request, res: Response, next: NextFunction) {

    try {
        const parseResult = CreateUserSchema.safeParse(req.body)
        if (!parseResult.success) throw new ValidationError(parseResult.error?.issues[0].message)
        const { userName, email, password } = parseResult.data

        const { id, userDto } = await createUserService(userName, email, password)

        generateToken(id, res)

        return res.status(201).json(userDto)
    } catch (error) {
        next(error)
    }
}

async function getUser(req: Request, res: Response, next: NextFunction) {
    try {
        const user = await getUserService(req.user.id)
        return res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

export { createUser, getUser }