import { Router } from "express"
import { login, logout } from "@backend/controllers/auth.controller"
import protectedRoute from "@backend/middlewares/protectedRoute"

const router = Router()

router.post("/login", login)
router.post("/logout", protectedRoute, logout)

export default router