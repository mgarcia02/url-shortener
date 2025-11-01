import { z } from "zod"

const CreateShortUrlSchema = z.object({
    originalUrl: z.string()
        .url("Debe ser una URL válida")
        .min(1, "La URL original es obligatoria"),
    customAlias: z
        .string()
        .min(1)
        .regex(/^[a-zA-Z0-9-_]+$/, "El alias solo puede contener letras, números, guiones y guiones bajos")
        .optional()
})

const ShortCodeSchema = z.object({
    shortCode: z
        .string()
        .min(1, "El código corto es obligatorio")
        .regex(/^[a-zA-Z0-9-_]+$/, "El código corto solo puede contener letras, números, guiones y guiones bajos")
})

const UrlSchema = z.object({
    originalUrl: z
        .string()
        .url("Debe ser una URL válida")
        .min(1, "La URL original es obligatoria")
})

export { CreateShortUrlSchema, ShortCodeSchema, UrlSchema }