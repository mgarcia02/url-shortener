import { Request, Response, NextFunction } from "express";
import { AppError } from "@backend/errors/errors";

function errorHandler(e: unknown, _req: Request, res: Response, _next: NextFunction) {
    if(e instanceof AppError) {
        return res.status(e.statusCode).json({ error: { type: e.constructor.name, message: e.message } })
    }
    return res.status(500).json({ error: { type: "InternalServerError", message: "Something went wrong" } })
}

export default errorHandler
