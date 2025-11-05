import { Response } from "express"
import UserRepository from "@backend/repositories/user.repository"
import bcrypt from "bcrypt"
import { InvalidCredentialsError, UserAlreadyExistsError } from "@backend/errors/errors"
import { SignupResult, signInResult } from "@backend/types/auth.types"

async function signUpService(userName: string, email: string, password: string): Promise<SignupResult> {
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

async function signInService(userName: string, password:string):Promise<signInResult> {
    const user = await UserRepository.findByUsername(userName)
    const isPasswordCorrect = await bcrypt.compare(password, user?.password || "")

    if(!user || !isPasswordCorrect) throw new InvalidCredentialsError()

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

async function signOutService(res: Response) {
    res.cookie("token", "", {maxAge:0})
}

export { signUpService, signInService, signOutService }