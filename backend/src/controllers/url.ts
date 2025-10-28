import { Request, Response } from "express"
import { pruebaService } from "../services/url"

function handleCreateUrl(req: Request, res: Response) {
    const p = pruebaService()
    res.send(p)
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