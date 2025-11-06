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

interface UrlsListProps {
    urls: Url[]
    loading: boolean
    getUrls: () => Promise<void>
    deleteUrl: (short: string) => Promise<void>
}

interface UrlFormProps {
    createUrl: (obj: UrlDto) => Promise<void>
    loading: boolean
}

interface DeleteButtonProps {
    deleteUrl: (short: string) => Promise<void>
    shortCode: string
    loading: boolean
}

export type { Url, UrlDto, UrlsListProps, UrlFormProps, DeleteButtonProps }