import { UrlDto } from '@backend/dtos/urls/url.dto'
import { nanoid } from 'nanoid'
import { UrlRepository } from '@backend/repositories/url.repository'

async function createShortUrlService(originalUrl: string, customAlias?: string): Promise<UrlDto>{
    let alias: string
    let exists: boolean

    do {
        if(customAlias) alias = customAlias
        else alias = nanoid(7)

        const result = await UrlRepository.findByShortCode(alias)
        exists = result !== null

        if(exists && customAlias) throw new Error('ALIAS_EXISTS')
    } while(exists)
    // CORREGIIIIIR
    const newShortUrl = await UrlRepository.create(originalUrl, alias, 1)
    
    return {
        original: newShortUrl.original,
        short: `https://rega.ly/${newShortUrl.short}`,
        createdAt: newShortUrl.createdAt,
        clicks: newShortUrl.clicks
    }
}

async function deleteShortUrlService(shortCode: string): Promise<boolean> {
    const result = await UrlRepository.delete(shortCode)
    
    return result.count > 0
}

async function getShortUrlsByUserService(idUser: number): Promise<UrlDto[]> {
    const result = await UrlRepository.getAll()

    return result
}

async function updateUrlService(shortCode: string, newOriginalUrl: string): Promise<boolean> {
    const result = await UrlRepository.updateOriginal(shortCode, newOriginalUrl)

    return result !== null
}

async function redirectToUrlService(shortCode: string): Promise<string> {
    const result = await UrlRepository.findByShortCode(shortCode)

    if(!result) throw new Error('ALIAS_DOESNT_EXIST')

    await UrlRepository.incrementClickCount(shortCode)

    return result.original
}

export { createShortUrlService, deleteShortUrlService, getShortUrlsByUserService, updateUrlService, redirectToUrlService }