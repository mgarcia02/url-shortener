import { Response } from "express"
import UserRepository from "@backend/repositories/user.repository"
import bcrypt from "bcrypt"
import { InvalidCredentialsError } from "@backend/errors/errors"
import { LoginResult } from "@backend/types/auth.types"

async function loginService(userName: string, password:string):Promise<LoginResult> {
    const user = await UserRepository.getUserByUsername(userName)
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

async function logoutService(res: Response) {
    res.cookie("token", "", {maxAge:0})
}

export { loginService, logoutService }