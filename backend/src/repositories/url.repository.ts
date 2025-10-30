import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const UrlRepository = {
    findByAlias: (alias: string) => prisma.url.findUnique({ where: { short: alias } }),
    //findByUserId: (id: number) => prisma.url.findUnique({ where: { user: id } }),
    getAll: () => prisma.url.findMany(),
    create: (original: string, short: string) => prisma.url.create({ data: { original, short } }),
    delete: (short: string) => prisma.url.deleteMany({where: {short: short}})
}

export { UrlRepository }