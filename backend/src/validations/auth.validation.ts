import { z } from "zod"

const LoginSchema = z.object({
    userName: z.string().min(1, "El nombre de usuario es obligatorio"),
    password: z.string().min(1, "La contraseña es obligatoria")
})

export { LoginSchema }