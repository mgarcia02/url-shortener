import useUrls from "../hooks/useUrls"
import { useEffect, useState } from "react"
import type { Url } from "../types/urlTypes"

function UrlsList() {
    const [urls, setUrls] = useState<Url[]>([])
    const { loading, getUrls } = useUrls()

    useEffect(() => {
        const fetchData = async () => {
        const data = await getUrls()
        if (data) setUrls(data)
        }
        fetchData()
    }, [getUrls])

    if (loading) return <p>Cargando URLs...</p>

    if (urls.length === 0) {
        return (
            <div className="py-6 text-center text-gray-500">
                <p>No has creado ninguna URL todavía.</p>
                <p>¡Empieza creando tu primer enlace corto!</p>
            </div>
        )
    }

    return (
        <ul className="space-y-4">
            {urls.map((url) => (
            <li
                key={url.short}
                className="flex items-center justify-between pb-2 border-b"
            >
                <span className="text-gray-700 truncate">{url.original}</span>
                <a
                href={url.short}
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:underline"
                >
                {url.short}
                </a>
            </li>
            ))}
        </ul>
    )
}

export default UrlsList