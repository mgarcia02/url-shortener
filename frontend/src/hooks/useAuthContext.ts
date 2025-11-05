import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"

// Hook personalizado para usar el contexto
function useAuthContext() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuthContext debe usarse dentro de AuthContextProvider")
    }
    return context
}

export { useAuthContext }