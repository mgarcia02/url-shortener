import { Request, Response, NextFunction } from "express"
import { signUpService, signInService, signOutService } from "@backend/services/auth.service"
import { SignInSchema, SignUpSchema } from "@backend/validations/auth.validation"
import { ValidationError } from "@backend/errors/errors"
import { generateToken } from "@backend/utils/jwt"

/**
 * Controlador para registrar un nuevo usuario.
 * 
 * @param req Request con los datos de registro (userName, email, password).
 * @param res Response para devolver el usuario creado y el token.
 * @param next NextFunction para manejar errores.
 * @returns Response con el usuario creado en formato JSON y status 201.
 */
async function signUp(req: Request, res: Response, next: NextFunction) {

    try {
        // Validación de los datos recibidos en el body
        const parseResult = SignUpSchema.safeParse(req.body)
        if (!parseResult.success) throw new ValidationError(parseResult.error?.issues[0].message)
        const { userName, email, password } = parseResult.data

        // Creación del usuario en la capa de servicio
        const { id, userDto } = await signUpService(userName, email, password)

        // Generación y creación de cookie que contiene token JWT
        generateToken(id, res)

        return res.status(201).json(userDto)
    } catch (error) {
        next(error)
    }
}

/**
 * Controlador para iniciar sesión de un usuario.
 *
 * @param req Request con las credenciales (userName, password).
 * @param res Response para devolver el usuario autenticado y el token.
 * @param next NextFunction para manejar errores.
 * @returns Response con el usuario autenticado en formato JSON y status 200.
 */
async function signIn(req: Request, res: Response, next: NextFunction) {
    try {
        // Validación de las credenciales recibidas
        const parseResult = SignInSchema.safeParse(req.body)
        if (!parseResult.success) throw new ValidationError(parseResult.error?.issues[0].message)
        const { userName, password } = parseResult.data

        // Autenticación del usuario en la capa de servicio
        const { id, userDto } = await signInService(userName, password)

        // Generación y creación de cookie que contiene token JWT
        generateToken(id, res)

        return res.status(200).json(userDto)
    } catch (error) {
        next(error)
    }
}

/**
 * Controlador para cerrar sesión de un usuario.
 *
 * @param _req Request (no se utiliza en este caso).
 * @param res Response para devolver el mensaje de logout.
 * @param next NextFunction para manejar errores.
 * @returns Response con un mensaje de confirmación y status 200.
 */
async function signOut(_req: Request, res: Response, next: NextFunction) {
    try {
        // Invalidación del token y cierre de sesión
        await signOutService(res)
        
        return res.status(200).json({ message: 'Logged out seccesfully' })
    } catch (error) {
        next(error)
    }
}

export { signUp, signIn, signOut }