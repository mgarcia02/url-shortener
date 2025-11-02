import { User } from "@prisma/client"
import { Prisma } from "@prisma/client"

type UserWithUrls = Prisma.UserGetPayload<{
    include: { urls: true }
}>

interface IUserRepository {
    findAll(): Promise<User[]>
    findById(id: number): Promise<UserWithUrls | null>
    findByUsername(userName: string): Promise<UserWithUrls | null>
    create(userName: string, email: string, password: string): Promise<User>
    delete(id: number): Promise<{ count: number }>
    updateUsername(id: number, userName: string): Promise<User>
    updatePassword(id: number, password: string): Promise<User>
}

export { IUserRepository, UserWithUrls }