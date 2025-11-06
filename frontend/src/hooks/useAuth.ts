import { useState } from "react"
import { useAuthContext } from "./useAuthContext"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

import type { SignInDTO, SignUpDTO } from "../types/authTypes"
import { signInService, signUpService, signOutService } from "../services/authService"


function useAuth() {
    const [loading, setLoading] = useState(false)
    const { authUser, setAuthUser } = useAuthContext()
    const navigate = useNavigate()

    const signUp = async(obj: SignUpDTO) => {
        try {
            setLoading(true)

            const { data, error } = await signUpService(obj)
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

    const signOut = async() => {
        try {
            setLoading(true)

            const error = await signOutService()
            if (error) throw new Error(error)

            toast.success("Sesión cerrada. ¡Hasta pronto "+ authUser?.userName+"!")

            // localStorage
            localStorage.removeItem("user")
            localStorage.removeItem("urls")
            // Context
            setAuthUser(null)

        } catch (e: unknown) {
            toast.error(e instanceof Error ? e.message : "Error desconocido")
        } finally {
            setLoading(false)
        }
    }
    
    return { loading, signUp, signIn, signOut }

}

export default useAuth