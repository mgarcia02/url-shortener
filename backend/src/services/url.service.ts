import { UrlDto } from '@backend/dtos/url.dto'
import { nanoid } from 'nanoid'
import { UrlRepository } from '@backend/repositories/url.repository'

async function pruebaService(originalUrl: string, customAlias?: string): Promise<UrlDto>{
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

export { pruebaService }