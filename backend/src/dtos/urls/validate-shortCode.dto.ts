import { z } from 'zod'

export const ValidateShortCodeSchema = z.object({
    shortCode: z.string().min(1, 'shortUrl is required')
})

export type ValidateShortCodeDto = z.infer<typeof ValidateShortCodeSchema>
