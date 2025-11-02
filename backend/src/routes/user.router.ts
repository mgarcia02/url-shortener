import { Router } from "express"
import { createUser, deleteUser, getUser, updateUser } from "@backend/controllers/user.controller"
import protectedRoute from "@backend/middlewares/protectedRoute"

const router = Router()

router.post("/", createUser)
router.get("/me", protectedRoute, getUser)
router.delete("/", protectedRoute, deleteUser)
router.put("/", protectedRoute, updateUser )

export default router