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
}

interface UrlFormProps {
    createUrl: (obj: UrlDto) => Promise<void>
    loading: boolean
}

interface WarningTooltipProps {
    isAuth: boolean
    hasNoUrls: boolean
}

export type { Url, UrlDto, UrlsListProps, UrlFormProps, WarningTooltipProps }