import { User } from "@prisma/client"

interface IUserRepository {
    findAll(): Promise<User[]>
    findById(id: number): Promise<User | null>
    findByUsername(userName: string): Promise<User | null>
    create(userName: string, email: string, password: string): Promise<User>
    delete(id: number): Promise<{ count: number }>
    updateUsername(id: number, userName: string): Promise<User>
    updatePassword(id: number, password: string): Promise<User>
}

export { IUserRepository }