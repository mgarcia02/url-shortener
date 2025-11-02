import UserRepository from "@backend/repositories/user.repository"
import UserDto from "@backend/dtos/user.dto"
import bcrypt from "bcrypt"
import { UserAlreadyExistsError, UserNotFoundError } from "@backend/errors/errors"
import { SignupResult } from "@backend/types/auth.types"
import { NotFoundError } from "@backend/errors/errors"

async function createUserService(userName: string, email: string, password: string): Promise<SignupResult> {
    const user = await UserRepository.findByUsername(userName)
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
    const user = await UserRepository.findById(userId)

    if(!user) throw new UserNotFoundError()
    
    console.log(user)
    return {
        userName: user.userName,
        email: user.email,
        createdAt: user.createdAt,
        urls: user.urls
    }
}

async function deleteUserService(userId: number) {
    const result = await UserRepository.delete(userId)
    
    if (result.count <= 0) throw new NotFoundError()
}

async function updateUserService(userId: number, userName?: string, password?: string): Promise<UserDto> {
    const user = await UserRepository.findById(userId)
    if (!user) throw new NotFoundError()
    
    if(userName && userName !== user.userName){
        const resultUpdateUserName = await UserRepository.updateUsername(userId, userName)
        if (resultUpdateUserName === null) throw new NotFoundError()
    }

    if(password){
        const hashedPassword = await bcrypt.hash(password, 10)
        const resultUpdatePassword = await UserRepository.updatePassword(userId, hashedPassword)
        if (resultUpdatePassword === null) throw new NotFoundError()
    }

    const userUpdated = await UserRepository.findById(userId)
    if (!userUpdated) throw new NotFoundError()

    return {
            userName: userUpdated.userName,
            email: userUpdated.email,
            createdAt: userUpdated.createdAt,
            urls: user.urls
        }    
}

export { createUserService, getUserService, deleteUserService, updateUserService }