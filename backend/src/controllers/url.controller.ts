import { Request, Response, NextFunction } from "express"
import { createShortUrlService, deleteShortUrlService, getShortUrlsByUserService, updateUrlService, redirectToUrlService } from "../services/url.service"
import { CreateShortUrlSchema, ShortCodeSchema, UrlSchema } from "@backend/validations/url.validation"
import { ValidationError } from "@backend/errors/errors"

/**
 * Controlador para crear una URL corta.
 *
 * @param req Request con los datos de la URL original, alias opcional y el ID del usuario autenticado.
 * @param res Response para devolver la URL corta generada.
 * @param next NextFunction para manejar errores.
 * @returns Response con la URL corta en formato JSON y status 201.
 */
async function createShortUrl(req: Request, res: Response, next: NextFunction) {
    try {
        // Validación de los datos recibidos en el body
        const parseResult = CreateShortUrlSchema.safeParse(req.body)
        if (!parseResult.success) throw new ValidationError(parseResult.error.issues[0].message)
        const { originalUrl, customAlias } = parseResult.data

        // Obtención del ID de usuario (o demo-user si no existe)
        const userId = req.user?.id || "demo-user"

        // Creación de la URL corta en la capa de servicio
        const shortUrl = await createShortUrlService(userId, originalUrl, customAlias)

        return res.status(201).json(shortUrl)
    } catch (error) {
        next(error)
    }
}

/**
 * Controlador para eliminar una URL corta.
 *
 * @param req Request con el shortCode de la URL a eliminar y el ID del usuario autenticado.
 * @param res Response para devolver mensaje de confirmación.
 * @param next NextFunction para manejar errores.
 * @returns Response con mensaje de éxito y status 200.
 */
async function deleteShortUrl(req: Request, res: Response, next: NextFunction) {
    try {
        // Validación de los parámetros recibidos
        const parseResult = ShortCodeSchema.safeParse(req.params)
        if (!parseResult.success) throw new ValidationError(parseResult.error.issues[0].message)
        const { shortCode } = parseResult.data

        // Eliminación de la URL en la capa de servicio
        await deleteShortUrlService( req.user.id, shortCode)

        return res.status(200).json({ message: 'URL eliminada correctamente' })      
    } catch (error) {
        next(error)
    }
}

/**
 * Controlador para obtener todas las URLs cortas de un usuario.
 *
 * @param req Request con el ID del usuario autenticado.
 * @param res Response para devolver la lista de URLs cortas.
 * @param next NextFunction para manejar errores.
 * @returns Response con listado de URLs cortas en formato JSON y status 200.
 */
async function getShortUrlsByUser(req: Request, res: Response, next: NextFunction) {
    try {
        // Obtención de todas las URLs cortas asociadas al usuario
        const list = await getShortUrlsByUserService(req.user.id)

        return res.status(200).json(list)
    } catch (error) {
        next(error)
    }

}

/**
 * Controlador para actualizar la URL original asociada a un shortCode.
 *
 * @param req Request con el shortCode en params, la nueva URL en el body y el ID del usuario autenticado.
 * @param res Response para devolver mensaje de confirmación y datos actualizados.
 * @param next NextFunction para manejar errores.
 * @returns Response con mensaje de éxito y la URL actualizada en formato JSON y status 200.
 */
async function updateUrl(req: Request, res: Response, next: NextFunction) {
    try {
        // Validación de parámetros y body
        const parseParams = ShortCodeSchema.safeParse(req.params)
        const parseBody = UrlSchema.safeParse(req.body)

        if (!parseBody.success) throw new ValidationError(parseBody.error.issues[0].message)
        if (!parseParams.success) throw new ValidationError(parseParams.error.issues[0].message)
        
        const { shortCode } = parseParams.data
        const { originalUrl } = parseBody.data

        // Actualización de la URL en la capa de servicio
        const newData = await updateUrlService( req.user.id, shortCode, originalUrl)

        return res.status(200).json({ message: 'Información actualizada correctamente' , url: newData })
    } catch (error) {
        next(error)
    }
}

/**
 * Controlador para redirigir a la URL original a partir de un shortCode.
 *
 * @param req Request con el shortCode en params.
 * @param res Response para redirigir al usuario a la URL original.
 * @param next NextFunction para manejar errores.
 * @returns Redirección a la URL original.
 */
async function redirectToUrl(req: Request, res: Response, next: NextFunction) {
    try {
        // Validación de los parámetros recibidos
        const parseResult = ShortCodeSchema.safeParse(req.params)
        if (!parseResult.success) throw new ValidationError(parseResult.error.issues[0].message)
        const { shortCode } = parseResult.data

        // Obtención de la URL original desde la capa de servicio
        const originalUrl = await redirectToUrlService(shortCode)
        
        return res.redirect(originalUrl)
    } catch (error) {
        next(error)
    }
}

export { createShortUrl, deleteShortUrl, getShortUrlsByUser, updateUrl, redirectToUrl }