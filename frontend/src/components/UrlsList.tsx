import { useEffect, useState } from "react"
import type { UrlsListProps } from "../types/urlTypes"
import DeleteButton from "./DeleteButton"
import arrowDown from "../assets/arrowDown-icon.svg"
import arrowUp from "../assets/arrowUp-icon.svg"

function UrlsList({ urls, loading, getUrls, deleteUrl }: UrlsListProps) {
    const [openIndex, setOpenIndex] = useState<string | null>(null)

    const toggle = (index: string) => {
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
            {urls.map((url) => (
            <li key={url.short}>
                <div className="flex items-center justify-between pb-2 border-b">
                    <span className="flex-1 text-gray-700 truncate" title={url.original}>{url.original}</span>

                    <button onClick={() => toggle(url.short)} className="flex justify-center flex-1 text-gray-600 transition hover:text-black">
                        {openIndex === url.short ? 
                        <img src={arrowUp} alt="Logo" className="w-auto h-5 cursor-pointer" />
                        : 
                        <img src={arrowDown} alt="Logo" className="w-auto h-5 cursor-pointer" />
                        }
                    </button>

                    <a href={url.short} target="_blank" rel="noopener noreferrer" className="flex-1 text-right text-black truncate hover:underline" title={url.short}>
                        {url.short}
                    </a>
                </div>
                <div
                    className={`transition-all duration-700 overflow-hidden ${
                    openIndex === url.short ? "max-h-40 mt-2" : "max-h-0"
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
                    <DeleteButton deleteUrl={deleteUrl} shortCode={url.short} loading={loading} />
                    </div>
                </div>
            </li>
            ))}
        </ul>
    )
}

export default UrlsList