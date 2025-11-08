import { useContext } from "react"
import { UrlsContext } from "../contexts/UrlsContext"

// Hook personalizado para usar el contexto
function useUrlsContext() {
    const context = useContext(UrlsContext)
    if (!context) {
        throw new Error("useUrlsContext debe usarse dentro de UrlsContextProvider")
    }
    return context
}

export { useUrlsContext }