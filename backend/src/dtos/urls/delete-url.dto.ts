import { z } from 'zod'

export const DeleteUrlSchema = z.object({
    shortCode: z.string().min(1, 'shortUrl is required')
})

export type DeleteUrlDto = z.infer<typeof DeleteUrlSchema>
