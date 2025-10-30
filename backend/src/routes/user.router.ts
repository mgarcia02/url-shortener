import { Router } from "express"
import { createUser } from "@backend/controllers/user.controller"

const router = Router()

router.post("/", createUser)
router.get("/me", )
router.put("/:id", )
router.delete("/:id", )

export default router