import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const UserRepository = {
    getAll: () => prisma.user.findMany(),
    getUser: (userName: string) => prisma.user.findUnique({ where: { userName }, select: {id: true, email: true, userName: true, createdAt: true, urls: true} }),
    create: (userName: string, email: string, password: string) => prisma.user.create({ data: { userName, email, password } }),
    delete: (userName: string) => prisma.user.delete({ where: { userName: userName } }),
}

export { UserRepository }