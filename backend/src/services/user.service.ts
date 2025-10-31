import { UserRepository } from "@backend/repositories/user.repository"
import { UserDto } from "@backend/dtos/users/user.dto"
import bcrypt from "bcrypt"

async function createUserService(userName: string, email: string, password: string): Promise<UserDto> {
    const user = await UserRepository.getUser(userName)
    if(user) throw new Error('USER_EXISTS')

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await UserRepository.create(userName, email, hashedPassword)

    return {
        userName: newUser.userName,
        email: newUser.email,
        createdAt: newUser.createdAt,
    }
}

async function getUserService(userName: string): Promise<UserDto> {
    const user = await UserRepository.getUser(userName)

    if(!user) throw new Error('USER_DOESNT_EXIST')

    return {
        userName: user.userName,
        email: user.email,
        createdAt: user.createdAt,
        urls: user.urls
    }
}

export { createUserService, getUserService }