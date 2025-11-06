import { useCallback, useState } from "react"
import { useAuthContext } from "./useAuthContext"
import type { Url, UrlDto } from "../types/urlTypes"
import { toast } from "react-toastify"
import { createUrlService, deleteUrlService, getUrlsByUserService } from "../services/urlService"

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

    const deleteUrl = async(short: string) => {
        try {
            setLoading(true)

            if (!authUser) {
                // Leer lo que ya hay en localStorage
                const stored = localStorage.getItem("urls")
                const urls: Url[] = stored ? JSON.parse(stored) : []

                // Filtrar la URL que tenga ese short
                const updated = urls.filter(u => u.short !== short)

                // Guardar en localStorage
                localStorage.setItem("urls", JSON.stringify(updated))

                // Actualizar estado local
                setUrls(updated)
                toast.success("URL eliminada de la lista demo")
            } else {
                const { data, error } = await deleteUrlService(short)
                if (error) throw new Error(error)
                // Usuario autenticado, el backend ya la borró
                setUrls(prev => prev.filter(u => u.short === short ? false : true))
                toast.success(data.message)
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
    
    return { urls, loading, getUrls, createUrl, deleteUrl }

}

export default useUrls