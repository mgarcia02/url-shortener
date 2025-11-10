import UserRepository from "@backend/repositories/user.repository"
import UserDto from "@backend/dtos/user.dto"
import bcrypt from "bcrypt"
import { UserNotFoundError } from "@backend/errors/errors"
import { NotFoundError } from "@backend/errors/errors"

/**
 * Servicio para obtener la información de un usuario.
 *
 * @param userId ID del usuario a consultar.
 * @returns Objeto UserDto con los datos del usuario (userName, email, createdAt, urls).
 */
async function getUserService(userId: number): Promise<UserDto> {
    // Búsqueda del usuario en el repositorio
    const user = await UserRepository.findById(userId)

    // Manejo de caso en que el usuario no exista
    if(!user) throw new UserNotFoundError()
    
    // Retorno del DTO con los datos del usuario
    return {
        userName: user.userName,
        email: user.email,
        createdAt: user.createdAt,
        urls: user.urls
    }
}

/**
 * Servicio para eliminar un usuario.
 *
 * @param userId ID del usuario a eliminar.
 */
async function deleteUserService(userId: number) {
    // Eliminación del usuario en el repositorio
    const result = await UserRepository.delete(userId)
    
    // Manejo de caso en que no se elimine ningún registro
    if (result.count <= 0) throw new NotFoundError()
}

/**
 * Servicio para actualizar la información de un usuario.
 *
 * @param userId ID del usuario a actualizar.
 * @param userName Nuevo nombre de usuario opcional.
 * @param password Nueva contraseña opcional.
 * @returns Objeto UserDto con los datos actualizados del usuario.
 */
async function updateUserService(userId: number, userName?: string, password?: string): Promise<UserDto> {
    // Verificación de existencia del usuario
    const user = await UserRepository.findById(userId)
    if (!user) throw new NotFoundError()
    
    // Actualización del nombre de usuario si es diferente
    if(userName && userName !== user.userName){
        const resultUpdateUserName = await UserRepository.updateUsername(userId, userName)
        if (resultUpdateUserName === null) throw new NotFoundError()
    }

    // Actualización de la contraseña si se proporciona
    if(password){
        const hashedPassword = await bcrypt.hash(password, 10)
        const resultUpdatePassword = await UserRepository.updatePassword(userId, hashedPassword)
        if (resultUpdatePassword === null) throw new NotFoundError()
    }

    // Obtención de los datos actualizados
    const userUpdated = await UserRepository.findById(userId)
    if (!userUpdated) throw new NotFoundError()

    // Retorno del DTO con los datos actualizados
    return {
            userName: userUpdated.userName,
            email: userUpdated.email,
            createdAt: userUpdated.createdAt,
            urls: user.urls
        }    
}

export { getUserService, deleteUserService, updateUserService }