import { useState } from "react"
import { useAuthContext } from "./useAuthContext"
import { toast } from "react-toastify"
import { signOutService } from "../services/authService"

function useSignOut() {
    const [loading, setLoading] = useState(false)
    const { authUser, setAuthUser } = useAuthContext()

    const signOut = async() => {
        try {
            setLoading(true)

            const error = await signOutService()
            if (error) throw new Error(error)

            toast.success("Sesión cerrada. ¡Hasta pronto "+ authUser?.userName+"!")

            // localStorage
            localStorage.removeItem("user")
            // Context
            setAuthUser(null)

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
    
    return { loading, signOut }

}

export default useSignOut