import { Router } from "express"
import { createShortUrl, deleteShortUrl, getShortUrlsByUser, updateUrl, redirectToUrl } from "../controllers/url.controller"

const router = Router()

router.post("/", createShortUrl);
router.get("/", getShortUrlsByUser);
router.get("/resolve/:shortCode", redirectToUrl);
router.put("/:shortCode", updateUrl);
router.delete("/:shortCode", deleteShortUrl);

export default router