import { useState } from "react"
import { useAuthContext } from "./useAuthContext"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import type { SignInDTO } from "../types/authTypes"
import { signInService } from "../services/authService"

function useSignIn() {
    const [loading, setLoading] = useState(false)
    const { setAuthUser } = useAuthContext()
    const navigate = useNavigate()

    const signIn = async(obj: SignInDTO) => {
        try {
            setLoading(true)

            const { data, error } = await signInService(obj)
            if (error) throw new Error(error)

            // localStorage
            localStorage.setItem("user", JSON.stringify(data))
            // Context
            setAuthUser(data)
            // Redirección
            toast.success("¡Bienvenido "+data.userName+"!")
            navigate("/dashboard") 


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
    
    return { loading, signIn }

}

export default useSignIn