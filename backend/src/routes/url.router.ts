import { Router } from "express"
import { createShortUrl, deleteShortUrl, getShortUrlsByUser, updateUrl, redirectToUrl } from "../controllers/url.controller"
import protectedRoute from "@backend/middlewares/protectedRoute";

const router = Router()

router.post("/", createShortUrl);
router.get("/",protectedRoute, getShortUrlsByUser);
router.get("/resolve/:shortCode", redirectToUrl);
router.put("/:shortCode",protectedRoute,  updateUrl);
router.delete("/:shortCode",protectedRoute,  deleteShortUrl);

export default router