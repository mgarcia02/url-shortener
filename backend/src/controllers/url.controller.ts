import { Request, Response } from "express"
import { ValidateCreateUrlSchema } from "@backend/dtos/urls/validate-createUrl.dto"
import { ValidateShortCodeSchema  } from "@backend/dtos/urls/validate-shortCode.dto"
import { ValidateUrlSchema } from "@backend/dtos/urls/validate-Url.dto"
import { createShortUrlService, deleteShortUrlService, getShortUrlsByUserService, updateUrlService, redirectToUrlService } from "../services/url.service"

async function createShortUrl(req: Request, res: Response) {
    const parseResult = ValidateCreateUrlSchema.safeParse(req.body)
    if (!parseResult.success) {
        return res.status(400).json({ error: parseResult.error.format() })
    }
    const { originalUrl, customAlias } = parseResult.data

    try {
        const shortUrl = await createShortUrlService( req.user.id, originalUrl, customAlias)
        res.status(201).json(shortUrl)
    } catch (error) {
        if (error instanceof Error && error.message === 'ALIAS_EXISTS') {
            return res.status(409).json({ error: 'Ese alias personalizado ya existe' })
        }

        console.error('Unexpected error:', error)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
}

async function deleteShortUrl(req: Request, res: Response) {
    // comprobar en el service que solo puede eliminar urls suyas
    const parseResult = ValidateShortCodeSchema.safeParse(req.params)
    if (!parseResult.success) {
        return res.status(400).json({ error: parseResult.error.format() })
    }
    const { shortCode } = parseResult.data

    try {
        const deleted = await deleteShortUrlService(shortCode)

        if(!deleted) res.status(404).json({ error: 'Alias no encontrado' })
        res.status(200).json({ message: 'URL eliminada correctamente' })      
    } catch (error) {
        console.error('Unexpected error:', error)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
}

async function getShortUrlsByUser(req: Request, res: Response) {
    try {
        const list = await getShortUrlsByUserService(req.user.id)
        res.status(200).json(list)
    } catch (error) {
        console.error('Unexpected error:', error)
        res.status(500).json({ error: 'Error interno del servidor' })
    }

}

async function updateUrl(req: Request, res: Response) {
    const parseParams = ValidateShortCodeSchema.safeParse(req.params)
    const parseBody = ValidateUrlSchema.safeParse(req.body)

    if (!parseParams.success || !parseBody.success) {
        return res.status(400).json({
        error: {
            params: parseParams.success ? null : parseParams.error.format(),
            body: parseBody.success ? null : parseBody.error.format()
        }
        })
    }

    const { shortCode } = parseParams.data
    const { originalUrl } = parseBody.data

    try {
        const updated = await updateUrlService(shortCode, originalUrl)

        if(!updated) res.status(404).json({ error: 'Alias no encontrado' })
        res.status(200).json({ message: 'URL actualizada correctamente' })
    } catch (error) {
        console.error('Unexpected error:', error)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
}

async function redirectToUrl(req: Request, res: Response) {
    const parseResult = ValidateShortCodeSchema.safeParse(req.params)
    if (!parseResult.success) {
        return res.status(400).json({ error: parseResult.error.format() })
    }
    const { shortCode } = parseResult.data

    try {
        const originalUrl = await redirectToUrlService(shortCode)

        return res.redirect(originalUrl)
    } catch (error) {
        if (error instanceof Error && error.message === 'ALIAS_DOESNT_EXIST') {
            return res.status(409).json({ error: 'URL no encontrada' })
        }

        console.error('Unexpected error:', error)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
}

export { createShortUrl, deleteShortUrl, getShortUrlsByUser, updateUrl, redirectToUrl }