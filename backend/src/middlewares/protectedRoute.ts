import { Request, Response, NextFunction } from "express"
import { verifyToken } from "@backend/utils/jwt"
import UserRepository from "@backend/repositories/user.repository"

async function protectedRoute(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.cookies.token
        if(!token) {
            return res.status(401).json({error:"Unauthorized - No Token Provided"})
        }

        const decoded = verifyToken(token)
        if(!decoded) {
            return res.status(401).json({error:"Unauthorized - Invalid Token"})
        }

        const user = await UserRepository.getUserById(decoded.id)
        
        req.user = user

        next()
    } catch (error) {
        console.log("ERROR (Error in protectRoute middleware):", error)
        return res.status(500).json({error:"Internal Server Error"})
    }
}

export default protectedRoute