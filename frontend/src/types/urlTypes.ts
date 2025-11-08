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

export interface UrlsContextType {
    urls: Url[]
    setUrls: React.Dispatch<React.SetStateAction<Url[]>>
}

interface DeleteButtonProps {
    shortCode: string
}

export type { Url, UrlDto, DeleteButtonProps }