import { Router } from "express"
import { handleCreateUrl, handleRedirect, handleTrackClick, handleCheckAvailability, handleDeleteUrl, handleListUrls } from "../controllers/url"

const router = Router()

router.post("/urls", handleCreateUrl)
router.get("/:shortCode", handleRedirect)
router.get("/:shortCode/track", handleTrackClick)
router.get("/availability/:code", handleCheckAvailability)
router.delete("/urls/:shortCode", handleDeleteUrl)
router.get("/urls", handleListUrls)

export default router