import { Request, Response, NextFunction } from "express"
import { verifyToken } from "@backend/utils/jwt"
import UserRepository from "@backend/repositories/user.repository"
import { UnauthorizedError } from "@backend/errors/errors"

/**
 * Middleware para proteger rutas que requieren autenticación.
 *
 * @param req Request que contiene la cookie con el token JWT.
 * @param _res Response (no utilizado en este middleware).
 * @param next NextFunction para pasar al siguiente middleware o controlador.
 */
async function protectedRoute(req: Request, _res: Response, next: NextFunction) {
    try {
        // Obtención del token JWT desde las cookies
        const token = req.cookies.token
        if(!token) throw new UnauthorizedError()

        // Verificación y decodificación del token
        const decoded = verifyToken(token)
        if(!decoded) throw new UnauthorizedError()

        // Búsqueda del usuario en la base de datos
        const user = await UserRepository.findById(decoded.id)
        if (!user) throw new UnauthorizedError()
        
        // Adjuntar el usuario al objeto Request para su uso posterior
        req.user = user

        // Continuar con la ejecución de la ruta protegida
        next()
    } catch (error) {
        next(error)
    }
}

export default protectedRoute