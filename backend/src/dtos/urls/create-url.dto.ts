import { z } from 'zod'

export const CreateUrlSchema = z.object({
    originalUrl: z.string().url({ message: 'Must be a valid URL' }),
    customAlias: z.string().min(1).max(30).optional()
})

export type CreateUrlDto = z.infer<typeof CreateUrlSchema>