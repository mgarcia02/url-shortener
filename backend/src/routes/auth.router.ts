import { Router } from "express"
import { signUp, signIn, signOut } from "@backend/controllers/auth.controller"
import protectedRoute from "@backend/middlewares/protectedRoute"

const router = Router()

router.post("/", signUp)
router.post("/signin", signIn)
router.post("/signout", protectedRoute, signOut)

export default router