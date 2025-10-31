import { Router } from "express"
import { createUser, getUser } from "@backend/controllers/user.controller"

const router = Router()

router.post("/", createUser)
router.get("/me", getUser)
//router.put("/:id", )
//router.delete("/:id", )

export default router