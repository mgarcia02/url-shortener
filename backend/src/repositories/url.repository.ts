import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const UrlRepository = {
    findByShortCode: (shortCode: string) => prisma.url.findUnique({ where: { short: shortCode } }),
    findByUserId: (userId: number) => prisma.url.findMany({ where: { userId: userId } }),
    getAll: () => prisma.url.findMany(),
    create: (original: string, short: string, userId: number) => prisma.url.create({ data: { original, short, userId } }),
    delete: (userId: number, short: string) => prisma.url.deleteMany({where: {userId: userId, short: short}}),
    incrementClickCount: (short: string) => prisma.url.update({ where: {short:short}, data: { clicks: { increment: 1 } } }),
    updateOriginal: (userId: number, shortCode: string, newOriginalUrl: string) => prisma.url.update({ where: { userId: userId, short: shortCode }, data: { original: newOriginalUrl }})
}

export default UrlRepository