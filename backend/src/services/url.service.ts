import UrlDto from '@backend/dtos/url.dto'
import { nanoid } from 'nanoid'
import UrlRepository from '@backend/repositories/url.repository'
import { AliasAlreadyExistsError, NotFoundError } from '@backend/errors/errors'

async function createShortUrlService(userId: number, originalUrl: string, customAlias?: string): Promise<UrlDto>{
    let alias: string
    let exists: boolean

    do {
        if(customAlias) alias = customAlias
        else alias = nanoid(7)

        const result = await UrlRepository.findByShortCode(alias)
        exists = result !== null

        if(exists && customAlias) throw new AliasAlreadyExistsError()
    } while(exists)

    const newShortUrl = await UrlRepository.create(originalUrl, alias, userId)
    
    return {
        original: newShortUrl.original,
        short: `https://rega.ly/${newShortUrl.short}`,
        createdAt: newShortUrl.createdAt,
        clicks: newShortUrl.clicks
    }
}

async function deleteShortUrlService(userId: number, shortCode: string) {
    const result = await UrlRepository.delete(userId, shortCode)
    
    if (result.count <= 0) throw new NotFoundError()
}

async function getShortUrlsByUserService(userId: number): Promise<UrlDto[]> {
    const result = await UrlRepository.findByUserId(userId)

    return result
}

async function updateUrlService(userId: number, shortCode: string, newOriginalUrl: string):Promise<UrlDto> {
    const url = await UrlRepository.findByUserIdAndShortCode(userId, shortCode)
    if (!url) throw new NotFoundError()
    
    if(url && url.original !== newOriginalUrl) {
        const result = await UrlRepository.updateOriginal(userId, shortCode, newOriginalUrl)
        if (result === null) throw new NotFoundError()
    }
    
    const newUrl = await UrlRepository.findByUserIdAndShortCode(userId, shortCode)
    if (!newUrl) throw new NotFoundError()
    
    return {
        original: newUrl.original,
        short: `https://rega.ly/${newUrl.short}`,
        createdAt: newUrl.createdAt,
        clicks: newUrl.clicks
    }
}

async function redirectToUrlService(shortCode: string): Promise<string> {
    const result = await UrlRepository.findByShortCode(shortCode)

    if(!result) throw new NotFoundError()

    await UrlRepository.incrementClickCount(shortCode)

    return result.original
}

export { createShortUrlService, deleteShortUrlService, getShortUrlsByUserService, updateUrlService, redirectToUrlService }