import { Request, Response } from "express"
import { pruebaService } from "../services/url.service"
import { PrismaClient } from "@prisma/client"

async function handleCreateUrl(req: Request, res: Response) {
    const { originalUrl, customAlias } = req.body

    if (!originalUrl) {
        return res.status(400).json({ error: 'Se necesita introducir una URL' })
    }

    try {
        const shortUrl = await pruebaService(originalUrl, customAlias)
        res.status(201).json(shortUrl)
    } catch (error) {
        if (error instanceof Error && error.message === 'ALIAS_EXISTS') {
            return res.status(409).json({ error: 'Ese alias personalizado ya existe' })
        }

        console.error('Unexpected error:', error)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
}
function handleRedirect(req: Request, res: Response) {

}
function handleTrackClick(req: Request, res: Response) {

}
function handleCheckAvailability(req: Request, res: Response) {

}
function handleDeleteUrl(req: Request, res: Response) {

}
function handleListUrls(req: Request, res: Response) {

}

export { handleCreateUrl, handleRedirect, handleTrackClick, handleCheckAvailability, handleDeleteUrl, handleListUrls }