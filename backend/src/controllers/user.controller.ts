import { Request, Response, NextFunction } from "express"
import { getUserService, deleteUserService, updateUserService } from "@backend/services/user.service"
import { UpdateUserSchema } from "@backend/validations/user.validation"
import { ValidationError } from "@backend/errors/errors"

async function getUser(req: Request, res: Response, next: NextFunction) {
    try {
        const user = await getUserService(req.user.id)
        return res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

async function deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
        await deleteUserService(req.user.id)
        return res.status(200).json({ message: 'Usuario eliminado correctamente' })
    } catch (error) {
        next(error)
    }
}

async function updateUser(req: Request, res: Response, next: NextFunction) {
    try {
        const parseResult = UpdateUserSchema.safeParse(req.body)
        if (!parseResult.success) throw new ValidationError(parseResult.error.issues[0].message)
        const { userName, password } = parseResult.data

        const newData = await updateUserService( req.user.id, userName, password)
        res.status(200).json({ message: 'Información actualizada correctamente' , user: newData })
    } catch (error) {
        next(error)
    }
}

export { getUser, deleteUser, updateUser }