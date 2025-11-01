import UserRepository from "@backend/repositories/user.repository"
import UserDto from "@backend/dtos/user.dto"
import bcrypt from "bcrypt"
import { UserAlreadyExistsError, UserNotFoundError } from "@backend/errors/errors"
import { SignupResult } from "@backend/types/auth.types"

async function createUserService(userName: string, email: string, password: string): Promise<SignupResult> {
    const user = await UserRepository.getUserByUsername(userName)
    if(user) throw new UserAlreadyExistsError()

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await UserRepository.create(userName, email, hashedPassword)

    return {
        id: newUser.id,
        userDto: {
            userName: newUser.userName,
            email: newUser.email,
            createdAt: newUser.createdAt
        }
    }
}

async function getUserService(userId: number): Promise<UserDto> {
    const user = await UserRepository.getUserById(userId)

    if(!user) throw new UserNotFoundError()
    
    console.log(user)
    return {
        userName: user.userName,
        email: user.email,
        createdAt: user.createdAt,
        urls: user.urls
    }
}

export { createUserService, getUserService }