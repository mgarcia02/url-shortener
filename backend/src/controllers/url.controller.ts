import { Request, Response, NextFunction } from "express"
import { createShortUrlService, deleteShortUrlService, getShortUrlsByUserService, updateUrlService, redirectToUrlService } from "../services/url.service"
import { CreateShortUrlSchema, ShortCodeSchema, UrlSchema } from "@backend/validations/url.validation"
import { ValidationError } from "@backend/errors/errors"

async function createShortUrl(req: Request, res: Response, next: NextFunction) {
    try {
        const parseResult = CreateShortUrlSchema.safeParse(req.body)
        if (!parseResult.success) throw new ValidationError(parseResult.error?.issues[0].message)
        const { originalUrl, customAlias } = parseResult.data

        const shortUrl = await createShortUrlService( req.user.id, originalUrl, customAlias)
        return res.status(201).json(shortUrl)
    } catch (error) {
        next(error)
    }
}

async function deleteShortUrl(req: Request, res: Response, next: NextFunction) {
    try {
        const parseResult = ShortCodeSchema.safeParse(req.params)
        if (!parseResult.success) throw new ValidationError(parseResult.error?.issues[0].message)
        const { shortCode } = parseResult.data

        await deleteShortUrlService( req.user.id, shortCode)
        res.status(200).json({ message: 'URL eliminada correctamente' })      
    } catch (error) {
        next(error)
    }
}

async function getShortUrlsByUser(req: Request, res: Response, next: NextFunction) {
    try {
        const list = await getShortUrlsByUserService(req.user.id)
        res.status(200).json(list)
    } catch (error) {
        next(error)
    }

}

async function updateUrl(req: Request, res: Response, next: NextFunction) {
    try {
        const parseParams = ShortCodeSchema.safeParse(req.params)
        const parseBody = UrlSchema.safeParse(req.body)

        if (!parseBody.success) throw new ValidationError(parseBody.error?.issues[0].message)
        if (!parseParams.success) throw new ValidationError(parseParams.error?.issues[0].message)
        
        const { shortCode } = parseParams.data
        const { originalUrl } = parseBody.data

        await updateUrlService( req.user.id, shortCode, originalUrl)
        res.status(200).json({ message: 'URL actualizada correctamente' })
    } catch (error) {
        next(error)
    }
}

async function redirectToUrl(req: Request, res: Response, next: NextFunction) {
    try {
        const parseResult = ShortCodeSchema.safeParse(req.params)
        if (!parseResult.success) throw new ValidationError(parseResult.error?.issues[0].message)
        const { shortCode } = parseResult.data

        const originalUrl = await redirectToUrlService(shortCode)
        return res.redirect(originalUrl)
    } catch (error) {
        next(error)
    }
}

export { createShortUrl, deleteShortUrl, getShortUrlsByUser, updateUrl, redirectToUrl }