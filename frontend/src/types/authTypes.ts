// Estructura de lo que se envia al backend
interface SignInDTO {
    userName: string
    password: string
}

// Define el tipo de usuario
interface AuthUser {
    userName: string
    email: string
}

// Define el tipo del contexto
interface AuthContextType {
    authUser: AuthUser | null
    setAuthUser: (user: AuthUser | null) => void
}

export type { SignInDTO, AuthUser, AuthContextType }