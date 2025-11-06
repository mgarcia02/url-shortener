import { useCallback, useState } from "react"
import { useAuthContext } from "./useAuthContext"
import type { Url, UrlDto } from "../types/urlTypes"
import { toast } from "react-toastify"
import { createUrlService, getUrlsByUserService } from "../services/urlService"

function useUrls() {
    const { authUser } = useAuthContext()
    const [urls, setUrls] = useState<Url[]>([])
    const [loading, setLoading] = useState(false)
    
    const getUrls = useCallback(async() => {
        try {
            setLoading(true)
            if (authUser) {
                const { data, error } = await getUrlsByUserService()
                if (error) throw new Error(error)
                setUrls(data)
            } else {
                const stored = localStorage.getItem("urls")
                setUrls(stored ? JSON.parse(stored) : [])
            }
        } catch (e: unknown) {
            if (e instanceof Error) {
                toast.error(e.message)
            } else {
                toast.error("Error desconocido")
            }
        } finally {
            setLoading(false)
        }
    }, [authUser])

    const createUrl = async(obj: UrlDto) => {
        try {
            setLoading(true)

            const { data, error } = await createUrlService(obj, !!authUser)
            if (error) throw new Error(error)

            if (!authUser) {
                // Leer lo que ya hay en localStorage
                const stored = localStorage.getItem("urls")
                const urls: Url[] = stored ? JSON.parse(stored) : []

                // Validar que no exista ya el mismo alias/short
                const exists = urls.some(u => u.short === data.short)
                if (exists) {
                    toast.error("Ese alias ya existe en tu lista demo")
                    return
                }

                // Añadir la nueva URL
                const updated = [...urls, data]
                localStorage.setItem("urls", JSON.stringify(updated))

                // Actualizar estado local
                setUrls(updated)
            } else {
                // Usuario autenticado → backend ya valida duplicados
                setUrls(prev => [...prev, data])
            }

        } catch (e: unknown) {
            if (e instanceof Error) {
                toast.error(e.message)
            } else {
                toast.error("Error desconocido")
            }
        } finally {
            setLoading(false)
        }
    }
    
    return { urls, loading, getUrls, createUrl }

}

export default useUrls