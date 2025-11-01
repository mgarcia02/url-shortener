import { z } from "zod"

const CreateUserSchema = z.object({
    userName: z
        .string()
        .min(3, "El nombre de usuario debe tener al menos 3 caracteres")
        .max(20, "El nombre de usuario no puede superar los 20 caracteres")
        .regex(/^[a-zA-Z0-9-_]+$/, "El nombre de usuario solo puede contener letras, números, guiones y guiones bajos"),
    email: z
        .string()
        .min(1, "El email es obligatorio")
        .email("Debe ser un email válido"),
    password: z
        .string()
        .min(6, "La contraseña debe tener al menos 6 caracteres")
        .max(100, "La contraseña no puede superar los 100 caracteres")
})

export { CreateUserSchema }
