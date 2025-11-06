interface Url {
    original: string
    short: string
    createdAt: Date
    clicks: number
}

interface UrlDto {
    original: string
    short?: string
}

export type { Url, UrlDto }