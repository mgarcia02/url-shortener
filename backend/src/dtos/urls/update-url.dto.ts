import { z } from 'zod'

export const UpdateUrlBodySchema = z.object({
    originalUrl: z
        .string()
        .url('Debe ser una URL válida')
        .min(1, 'originalUrl no puede estar vacío')
})

export type UpdateUrlBodyDto = z.infer<typeof UpdateUrlBodySchema>
