import { Response } from "express"
import UserRepository from "@backend/repositories/user.repository"
import bcrypt from "bcrypt"
import { InvalidCredentialsError, UserAlreadyExistsError } from "@backend/errors/errors"
import { SignupResult, signInResult } from "@backend/types/auth.types"

/**
 * Servicio para registrar un nuevo usuario.
 *
 * @param userName Nombre de usuario único.
 * @param email Correo electrónico del usuario.
 * @param password Contraseña en texto plano que será encriptada.
 * @returns Objeto con el ID del nuevo usuario y un DTO con sus datos básicos.
 */
async function signUpService(userName: string, email: string, password: string): Promise<SignupResult> {
    // Comprobación de existencia previa del usuario
    const user = await UserRepository.findByUsername(userName)
    if(user) throw new UserAlreadyExistsError()

    // Encriptación de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10)

    // Creación del nuevo usuario en la base de datos
    const newUser = await UserRepository.create(userName, email, hashedPassword)

    // Retorno del DTO con los datos del usuario creado
    return {
        id: newUser.id,
        userDto: {
            userName: newUser.userName,
            email: newUser.email,
            createdAt: newUser.createdAt
        }
    }
}

/**
 * Servicio para autenticar a un usuario existente.
 *
 * @param userName Nombre de usuario.
 * @param password Contraseña en texto plano.
 * @returns Objeto con el ID del usuario y un DTO con sus datos y URLs asociadas.
 */
async function signInService(userName: string, password:string):Promise<signInResult> {
    // Búsqueda del usuario en la base de datos
    const user = await UserRepository.findByUsername(userName)

    // Validación de la contraseña
    const isPasswordCorrect = await bcrypt.compare(password, user?.password || "")

    // Manejo de credenciales inválidas
    if(!user || !isPasswordCorrect) throw new InvalidCredentialsError()

    // Retorno del DTO con los datos del usuario autenticado
    return {
        id: user.id,
        userDto: {
            userName: user.userName,
            email: user.email,
            createdAt: user.createdAt,
            urls: user.urls
        }
    }
}

/**
 * Servicio para cerrar sesión de un usuario.
 *
 * @param res Response para modificar las cookies de la sesión.
 */
async function signOutService(res: Response) {
    // Eliminación de la cookie del token para invalidar la sesión
    res.cookie("token", "", {maxAge:0})
}

export { signUpService, signInService, signOutService }