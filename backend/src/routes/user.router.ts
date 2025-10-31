import { Router } from "express"
import { createUser, getUser } from "@backend/controllers/user.controller"
import protectedRoute from "@backend/middlewares/protectedRoute"

const router = Router()

router.post("/", createUser)
router.get("/me", protectedRoute, getUser)
//router.put("/:id", )
//router.delete("/:id", )

export default router