import jwt from 'jsonwebtoken'
import { JwtPayload } from 'jsonwebtoken'
import { Response } from 'express'
import { JWT_SECRET } from '@backend/config'

function generateToken(userId: number, res: Response) {
    const token = jwt.sign({id: userId}, JWT_SECRET, {expiresIn: "1h"})

    res.cookie("token", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true, // Prevent XSS attacks cross-site scripting attacks
        sameSite: "strict", // CSRF attacks cross-site request forgery attacks
        secure: process.env.NODE_ENV === "production"
    })
}

function verifyToken(token: string): JwtPayload | null {
    try {
        return jwt.verify(token, JWT_SECRET) as JwtPayload
    } catch {
        return null
    }
}

export { generateToken, verifyToken}