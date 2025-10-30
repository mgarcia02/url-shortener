import { Router } from "express"
import { handleCreateUrl, handleRedirect, handleTrackClick, handleDeleteUrl, handleListUrls } from "../controllers/url.controller"

const router = Router()

router.post("/urls", handleCreateUrl)
router.delete("/urls/:shortCode", handleDeleteUrl)
router.get("/urls", handleListUrls)
router.get("/:shortCode", handleRedirect)
router.get("/:shortCode/track", handleTrackClick)

export default router