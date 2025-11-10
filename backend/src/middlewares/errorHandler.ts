import { Request, Response, NextFunction } from "express";
import { AppError } from "@backend/errors/errors";

/**
 * Middleware global para manejar errores en la aplicación.
 *
 * @param e Error capturado, puede ser de cualquier tipo.
 * @param _req Request (no utilizado en este middleware).
 * @param res Response para enviar la información del error al cliente.
 * @param _next NextFunction (no utilizado, ya que este middleware finaliza la respuesta).
 * @returns Response con el objeto de error en formato JSON.
 */
function errorHandler(e: unknown, _req: Request, res: Response, _next: NextFunction) {
    // Manejo de errores personalizados que extienden AppError
    if(e instanceof AppError) {
        return res.status(e.statusCode).json({ error: { type: e.constructor.name, message: e.message } })
    }
    
    // Manejo de errores no controlados: respuesta genérica
    return res.status(500).json({ error: { type: "InternalServerError", message: "Something went wrong" } })
}

export default errorHandler
