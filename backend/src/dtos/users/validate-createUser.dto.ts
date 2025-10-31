import { z } from 'zod'

export const ValidateCreateUserSchema = z.object({
    email: z.string().email('Debe ser un email válido'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres').max(30, 'La contraseña no puede superar los 30 caracteres'),
    name: z.string().min(1, 'El nombre no puede estar vacío').max(50, 'El nombre no puede superar los 50 caracteres')
})

export type ValidateCreateUserDto = z.infer<typeof ValidateCreateUserSchema>