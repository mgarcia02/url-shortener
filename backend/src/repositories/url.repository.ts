import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const UrlRepository = {
    findByAlias: (alias: string) => prisma.url.findUnique({ where: { short: alias } }),
    //findByUserId: (id: number) => prisma.url.findUnique({ where: { user: id } }),
    getAll: () => prisma.url.findMany(),
    create: (original: string, short: string) => prisma.url.create({ data: { original, short } }),
    delete: (short: string) => prisma.url.deleteMany({where: {short: short}}),
    incrementClickCount: (short: string) => prisma.url.update({ where: {short:short}, data: { clicks: { increment: 1 } } }),
    updateOriginal: (shortCode: string, newOriginalUrl: string) => prisma.url.update({ where: { short: shortCode }, data: { original: newOriginalUrl }})
}

export { UrlRepository }