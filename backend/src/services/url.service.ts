import UrlDto from '@backend/dtos/url.dto'
import { nanoid } from 'nanoid'
import UrlRepository from '@backend/repositories/url.repository'
import { AliasAlreadyExistsError, NotFoundError } from '@backend/errors/errors'

/**
 * Servicio para crear una URL corta.
 *
 * @param userId ID del usuario autenticado o "demo-user".
 * @param originalUrl URL original que se desea acortar.
 * @param customAlias Alias personalizado opcional para la URL corta.
 * @returns Objeto UrlDto con la URL original, la corta, fecha de creación y número de clics.
 */
async function createShortUrlService(userId: number | "demo-user", originalUrl: string, customAlias?: string): Promise<UrlDto>{
    let alias: string
    let exists: boolean

    do {
        // Se usa alias personalizado si existe, de lo contrario se genera uno aleatorio
        if(customAlias) alias = customAlias
        else alias = nanoid(7)

        // Verificación de existencia del alias en el repositorio
        const result = await UrlRepository.findByShortCode(alias)
        exists = result !== null

        // Si el alias ya existe y era personalizado, se lanza error
        if(exists && customAlias) throw new AliasAlreadyExistsError()
    } while(exists)

    // Caso especial: usuario demo (no se persiste en BD)
    if (userId === "demo-user") {
        return {
            original: originalUrl,
            short: `https://rega.ly/${alias}`,
            createdAt: new Date(),
            clicks: 0,
        }
    }

    // Creación de la URL corta en la base de datos
    const newShortUrl = await UrlRepository.create(originalUrl, alias, userId)
    
    // Retorno del DTO con los datos de la URL creada
    return {
        original: newShortUrl.original,
        short: `https://rega.ly/${newShortUrl.short}`,
        createdAt: newShortUrl.createdAt,
        clicks: newShortUrl.clicks
    }
}

/**
 * Servicio para eliminar una URL corta.
 *
 * @param userId ID del usuario autenticado.
 * @param shortCode Código corto de la URL a eliminar.
 */
async function deleteShortUrlService(userId: number, shortCode: string) {
    const result = await UrlRepository.delete(userId, shortCode)
    
    // Si no se eliminó ninguna URL, se lanza error
    if (result.count <= 0) throw new NotFoundError()
}

/**
 * Servicio para obtener todas las URLs cortas de un usuario.
 *
 * @param userId ID del usuario autenticado.
 * @returns Lista de objetos UrlDto con las URLs cortas del usuario.
 */
async function getShortUrlsByUserService(userId: number): Promise<UrlDto[]> {
    // Obtención de las URLs desde el repositorio
    const result = await UrlRepository.findByUserId(userId)

    // Mapeo para incluir la URL corta completa
    const mapped = result.map(url => ({
        ...url,
        short: `https://rega.ly/${url.short}`
    }))

    // Retorno de la lista de DTOs
    return mapped
}

/**
 * Servicio para actualizar la URL original asociada a un shortCode.
 *
 * @param userId ID del usuario autenticado.
 * @param shortCode Código corto de la URL a actualizar.
 * @param newOriginalUrl Nueva URL original.
 * @returns Objeto UrlDto con la URL actualizada.
 */
async function updateUrlService(userId: number, shortCode: string, newOriginalUrl: string):Promise<UrlDto> {
    // Verificación de existencia de la URL
    const url = await UrlRepository.findByUserIdAndShortCode(userId, shortCode)
    if (!url) throw new NotFoundError()
    
    // Actualización si la URL original es diferente
    if(url && url.original !== newOriginalUrl) {
        const result = await UrlRepository.updateOriginal(userId, shortCode, newOriginalUrl)
        if (result === null) throw new NotFoundError()
    }
    
    // Obtención de la URL actualizada
    const newUrl = await UrlRepository.findByUserIdAndShortCode(userId, shortCode)
    if (!newUrl) throw new NotFoundError()
    
    // Retorno del DTO con los datos de la URL modificada
    return {
        original: newUrl.original,
        short: `https://rega.ly/${newUrl.short}`,
        createdAt: newUrl.createdAt,
        clicks: newUrl.clicks
    }
}

/**
 * Servicio para redirigir a la URL original a partir de un shortCode.
 *
 * @param shortCode Código corto de la URL.
 * @returns La URL original asociada al shortCode.
 */
async function redirectToUrlService(shortCode: string): Promise<string> {
    // Búsqueda de la URL en el repositorio
    const result = await UrlRepository.findByShortCode(shortCode)

    if(!result) throw new NotFoundError()

    // Incremento del contador de clics
    await UrlRepository.incrementClickCount(shortCode)

    // Retorno de la URL original
    return result.original
}

export { createShortUrlService, deleteShortUrlService, getShortUrlsByUserService, updateUrlService, redirectToUrlService }