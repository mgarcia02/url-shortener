import { Request, Response, NextFunction } from "express"
import { getUserService, deleteUserService, updateUserService } from "@backend/services/user.service"
import { UpdateUserSchema } from "@backend/validations/user.validation"
import { ValidationError } from "@backend/errors/errors"

/**
 * Controlador para obtener la información de un usuario.
 *
 * @param req Request con el ID del usuario autenticado.
 * @param res Response para devolver los datos del usuario.
 * @param next NextFunction para manejar errores.
 * @returns Response con la información del usuario en formato JSON y status 200.
 */
async function getUser(req: Request, res: Response, next: NextFunction) {
    try {
        // Obtención de los datos del usuario desde la capa de servicio
        const user = await getUserService(req.user.id)

        return res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

/**
 * Controlador para eliminar un usuario.
 *
 * @param req Request con el ID del usuario autenticado.
 * @param res Response para devolver mensaje de confirmación.
 * @param next NextFunction para manejar errores.
 * @returns Response con mensaje de éxito y status 200.
 */
async function deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
        // Eliminación del usuario en la capa de servicio
        await deleteUserService(req.user.id)
        return res.status(200).json({ message: 'Usuario eliminado correctamente' })
    } catch (error) {
        next(error)
    }
}

/**
 * Controlador para actualizar la información de un usuario.
 *
 * @param req Request con los nuevos datos del usuario (userName, password).
 * @param res Response para devolver mensaje de confirmación y datos actualizados.
 * @param next NextFunction para manejar errores.
 * @returns Response con mensaje de éxito y el usuario actualizado en formato JSON y status 200.
 */
async function updateUser(req: Request, res: Response, next: NextFunction) {
    try {
        // Validación de los datos recibidos en el body
        const parseResult = UpdateUserSchema.safeParse(req.body)
        if (!parseResult.success) throw new ValidationError(parseResult.error.issues[0].message)
        const { userName, password } = parseResult.data

        // Actualización de los datos del usuario en la capa de servicio
        const newData = await updateUserService( req.user.id, userName, password)
        
        res.status(200).json({ message: 'Información actualizada correctamente' , user: newData })
    } catch (error) {
        next(error)
    }
}

export { getUser, deleteUser, updateUser }