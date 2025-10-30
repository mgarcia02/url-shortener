import { z } from 'zod'

export const ValidateUrlSchema = z.object({
    originalUrl: z
        .string()
        .url('Debe ser una URL válida')
        .min(1, 'originalUrl no puede estar vacío')
})

export type ValidateUrlDto = z.infer<typeof ValidateUrlSchema>
