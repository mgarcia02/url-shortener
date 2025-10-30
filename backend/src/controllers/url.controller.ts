import { Request, Response } from "express"
import { CreateUrlSchema } from "@backend/dtos/urls/create-url.dto"
import { DeleteUrlSchema } from "@backend/dtos/urls/delete-url.dto"
import { createShortUrlService, deleteShortUrlService, getShortUrlsByUser } from "../services/url.service"
import { exit } from "process"

async function handleCreateUrl(req: Request, res: Response) {
    const parseResult = CreateUrlSchema.safeParse(req.body)
    if (!parseResult.success) {
        return res.status(400).json({ error: parseResult.error.format() })
    }
    const { originalUrl, customAlias } = parseResult.data

    try {
        const shortUrl = await createShortUrlService(originalUrl, customAlias)
        res.status(201).json(shortUrl)
    } catch (error) {
        if (error instanceof Error && error.message === 'ALIAS_EXISTS') {
            return res.status(409).json({ error: 'Ese alias personalizado ya existe' })
        }

        console.error('Unexpected error:', error)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
}

async function handleDeleteUrl(req: Request, res: Response) {
    const parseResult = DeleteUrlSchema.safeParse(req.params)
    if (!parseResult.success) {
        return res.status(400).json({ error: parseResult.error.format() })
    }
    const { shortCode } = parseResult.data

    try {
        const deleted = await deleteShortUrlService(shortCode)

        if(!deleted) res.status(404).json({ error: 'Alias no encontrado' })
        res.status(200).send()       
    } catch (error) {
        console.error('Unexpected error:', error)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
}

async function handleListUrls(req: Request, res: Response) {
    // Futuro habrá usuarios y se tendrá que recibir id usuario para enviar solo las del usuario
    try {
        
        const list = await getShortUrlsByUser(1)
        res.status(200).json(list)
    } catch (error) {
        console.error('Unexpected error:', error)
        res.status(500).json({ error: 'Error interno del servidor' })
    }

}

function handleRedirect(req: Request, res: Response) {

}

function handleTrackClick(req: Request, res: Response) {

}


export { handleCreateUrl, handleRedirect, handleTrackClick, handleDeleteUrl, handleListUrls }