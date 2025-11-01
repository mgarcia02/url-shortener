import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const UserRepository = {
    getAll: () => prisma.user.findMany(),
    getUserByUsername: (userName: string) => prisma.user.findUnique({ where: { userName }, select: {id: true, email: true, userName: true, createdAt: true, urls: true, password:true} }),
    getUserById: (id: number) => prisma.user.findUnique({ where: { id }, select: {id: true, email: true, userName: true, createdAt: true, urls: true, password:true} }),
    create: (userName: string, email: string, password: string) => prisma.user.create({ data: { userName, email, password } }),
    delete: (userName: string) => prisma.user.delete({ where: { userName: userName } }),
}

export default UserRepository