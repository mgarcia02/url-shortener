import { Response } from "express"
import UserDto from "@backend/dtos/users/user.dto"
import UserRepository from "@backend/repositories/user.repository"
import bcrypt from "bcrypt"
import { generateToken } from "@backend/utils/jwt"

async function loginService(userName: string, password:string, res:Response): Promise<UserDto> {
    const user = await UserRepository.getUserByUsername(userName)
    const isPasswordCorrect = await bcrypt.compare(password, user?.password || "")

    if(!user || !isPasswordCorrect) throw new Error('INVALID_USERNAME_OR_PASSWORD')


    generateToken(user.id, res)

    return {
        userName: user.userName,
        email: user.email,
        createdAt: user.createdAt,
        urls: user.urls
    }

}

async function logoutService(res: Response) {
    res.cookie("token", "", {maxAge:0})
}

export { loginService, logoutService }