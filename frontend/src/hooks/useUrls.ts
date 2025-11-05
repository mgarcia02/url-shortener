import { useCallback, useState } from "react"
import { toast } from "react-toastify"
import { getUrlsByUserService } from "../services/urlService"

function useUrls() {
    const [loading, setLoading] = useState(false)
    
    const getUrls = useCallback(async() => {
        try {
            setLoading(true)

            const { data, error } = await getUrlsByUserService()
            if (error) throw new Error(error)

            return data
        } catch (e: unknown) {
            if (e instanceof Error) {
                toast.error(e.message)
            } else {
                toast.error("Error desconocido")
            }
        } finally {
            setLoading(false)
        }
    }, [])
    
    return { loading, getUrls }

}

export default useUrls