import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const UrlRepository = {
    findByAlias: (alias: string) => prisma.url.findUnique({ where: { short: alias } }),
    create: (original: string, short: string) => prisma.url.create({ data: { original, short } })
}

export { UrlRepository }