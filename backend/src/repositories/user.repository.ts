import { IUserRepository } from '@backend/types/user.types'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const UserRepository: IUserRepository = {
    findAll: () => prisma.user.findMany(),
    findByUsername: (userName: string) => prisma.user.findUnique({ where: { userName }, select: {id: true, email: true, userName: true, createdAt: true, urls: true, password:true} }),
    findById: (id: number) => prisma.user.findUnique({ where: { id }, select: {id: true, email: true, userName: true, createdAt: true, urls: true, password:true} }),
    create: (userName: string, email: string, password: string) => prisma.user.create({ data: { userName, email, password } }),
    delete: (id: number) => prisma.user.deleteMany({ where: { id: id } }),
    updateUsername: (id: number, userName: string) => prisma.user.update({ where: { id: id }, data: { userName: userName }}),
    updatePassword: (id: number, password: string) => prisma.user.update({ where: { id: id }, data: { password: password }}),
}

export default UserRepository