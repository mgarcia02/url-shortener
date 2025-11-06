import useUrls from "../hooks/useUrls"
import { useState } from "react"


function UrlFrom() {
    const [short, setShortUrl] = useState("")
    const [original, setOriginalUrl] = useState("")

    const { loading, createUrl } = useUrls()

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault()
        await createUrl({original, short})
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col w-full gap-2">
            <div className="flex">
                <input
                type="url"
                placeholder="Introduce tu URL"
                className="w-3/4 px-4 py-2 border border-gray-300 rounded-l-xl focus:outline-none focus:ring-1 focus:ring-black"
                value={original}
                onChange={(e) => setOriginalUrl(e.target.value)}
                />
                
                <button
                type="submit"
                className="w-1/4 font-semibold text-white transition-colors duration-500 bg-black rounded-r-xl hover:bg-gray-800"
                >
                {loading ? "Cargando..." : "Crear short url"}
                </button>
            </div>
            <input
            type="alias"
            placeholder="Introduce alias personalizado"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-black"
            value={short}
            onChange={(e) => setShortUrl(e.target.value)}
            />
        </form>
    )
}

export default UrlFrom