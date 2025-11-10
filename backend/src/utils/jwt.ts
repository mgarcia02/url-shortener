import jwt from 'jsonwebtoken'
import { JwtPayload } from 'jsonwebtoken'
import { Response } from 'express'
import { JWT_SECRET } from '@backend/config'

/**
 * Genera un token JWT para un usuario y lo almacena en una cookie segura.
 *
 * @param userId ID del usuario autenticado.
 * @param res Response para enviar la cookie al cliente.
 */
function generateToken(userId: number, res: Response) {
    // Creación del token JWT con expiración de 1 hora
    const token = jwt.sign({id: userId}, JWT_SECRET, {expiresIn: "1h"})

    // Configuración de la cookie que contiene el token
    res.cookie("token", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true, // Previene ataques XSS (cross-site scripting)
        sameSite: "strict", // Previene ataques CSRF (cross-site request forgery)
        secure: process.env.NODE_ENV === "production"
    })
}

/**
 * Verifica y decodifica un token JWT.
 *
 * @param token Token JWT a verificar.
 * @returns JwtPayload si el token es válido, o null si es inválido.
 */
function verifyToken(token: string): JwtPayload | null {
    try {
        // Verificación y decodificación del token
        return jwt.verify(token, JWT_SECRET) as JwtPayload
    } catch {
        // Retorno null si el token no es válido o ha expirado
        return null
    }
}

export { generateToken, verifyToken}