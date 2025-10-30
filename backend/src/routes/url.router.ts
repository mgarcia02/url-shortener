import { Router } from "express"
import { handleCreateUrl, handleRedirect, handleDeleteUrl, handleUpdateUrl, handleListUrls } from "../controllers/url.controller"

const router = Router()

router.post("/urls", handleCreateUrl)
router.delete("/urls/:shortCode", handleDeleteUrl)
router.get("/urls", handleListUrls)
router.put("/urls/:shortCode", handleUpdateUrl)
router.get("/:shortCode", handleRedirect)

export default router