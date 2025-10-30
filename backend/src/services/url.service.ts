import { UrlDto } from '@backend/dtos/urls/url-response.dto'
import { nanoid } from 'nanoid'
import { UrlRepository } from '@backend/repositories/url.repository'

async function createShortUrlService(originalUrl: string, customAlias?: string): Promise<UrlDto>{
    let alias: string
    let exists: boolean

    do {
        if(customAlias) alias = customAlias
        else alias = nanoid(7)

        const result = await UrlRepository.findByAlias(alias)
        exists = result !== null

        if(exists && customAlias) throw new Error('ALIAS_EXISTS')
    } while(exists)

    const newShortUrl = await UrlRepository.create(originalUrl, alias)
    
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

async function getShortUrlsByUser(idUser: number): Promise<UrlDto[]> {
    const result = await UrlRepository.getAll()

    return result
}

async function getOriginalFromShort(shortCode: string): Promise<string> {
    const result = await UrlRepository.findByAlias(shortCode)

    if(!result) throw new Error('ALIAS_DOESNT_EXIST')

    return result.original
}

async function incrementClickCount(shortCode: string) {
    await UrlRepository.incrementClickCount(shortCode)
}

async function updateOriginalUrlService(shortCode: string, newOriginalUrl: string): Promise<boolean> {
    const result = await UrlRepository.updateOriginal(shortCode, newOriginalUrl)

    return result !== null
}

export { createShortUrlService, deleteShortUrlService, getShortUrlsByUser, getOriginalFromShort, incrementClickCount, updateOriginalUrlService }