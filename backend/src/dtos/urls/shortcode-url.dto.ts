import { z } from 'zod'

export const ShortCodeParamSchema = z.object({
    shortCode: z.string().min(1, 'shortUrl is required')
})

export type ShortCodeParamDto = z.infer<typeof ShortCodeParamSchema>
