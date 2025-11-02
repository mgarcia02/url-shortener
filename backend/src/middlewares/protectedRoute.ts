import { Request, Response, NextFunction } from "express"
import { verifyToken } from "@backend/utils/jwt"
import UserRepository from "@backend/repositories/user.repository"
import { UnauthorizedError } from "@backend/errors/errors"

async function protectedRoute(req: Request, _res: Response, next: NextFunction) {
    try {
        const token = req.cookies.token
        if(!token) throw new UnauthorizedError()

        const decoded = verifyToken(token)
        if(!decoded) throw new UnauthorizedError()

        const user = await UserRepository.findById(decoded.id)
        if (!user) throw new UnauthorizedError()
        
        req.user = user

        next()
    } catch (error) {
        next(error)
    }
}

export default protectedRoute