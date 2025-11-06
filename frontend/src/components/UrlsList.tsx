import { useEffect, useState } from "react"
import type { UrlsListProps } from "../types/urlTypes"
import DeleteButton from "./DeleteButton"

function UrlsList({ urls, loading, getUrls }: UrlsListProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index)
    }
    
    useEffect(() => {
        const fetchData = async () => { await getUrls() }

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
        <ul className="space-y-6">
            {urls.map((url, index) => (
            <li key={url.short}>
                <div className="flex items-center justify-between pb-2 border-b">
                    <span className="flex-1 text-gray-700 truncate" title={url.original}>{url.original}</span>

                    <button onClick={() => toggle(index)} className="flex-1 text-gray-500 transition hover:text-black">
                        {openIndex === index ? "▲" : "▼"}
                    </button>

                    <a href={url.short} target="_blank" rel="noopener noreferrer" className="flex-1 text-right text-black truncate hover:underline" title={url.short}>
                        {url.short}
                    </a>
                </div>
                <div
                    className={`transition-all duration-700 overflow-hidden ${
                    openIndex === index ? "max-h-40 mt-2" : "max-h-0"
                    }`}
                >
                    <div className="flex items-center justify-between text-sm text-gray-600">
                    <div>
                        <p><strong>Clicks:</strong> {url.clicks}</p>
                        <p>
                        <strong>Creada:</strong>{" "}
                        {new Date(url.createdAt).toLocaleString()}
                        </p>
                    </div>
                    <DeleteButton />
                    </div>
                </div>
            </li>
            ))}
        </ul>
    )
}

export default UrlsList