import { Url } from "@prisma/client"

export interface IUrlRepository {
    findByShortCode(shortCode: string): Promise<Url | null>
    findByUserIdAndShortCode(userId: number, shortCode: string): Promise<Url | null>
    findByUserId(userId: number): Promise<Url[]>
    findAll(): Promise<Url[]>
    create(original: string, short: string, userId: number): Promise<Url>
    delete(userId: number, shortCode: string): Promise<{ count: number }>
    incrementClickCount(shortCode: string): Promise<Url>
    updateOriginal(userId: number, shortCode: string, newOriginalUrl: string): Promise<Url>
}