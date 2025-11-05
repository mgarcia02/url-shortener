import { createContext, useState } from 'react';
import type { AuthContextType, AuthUser } from '../types/authTypes';

const AuthContext = createContext<AuthContextType | undefined>(undefined)

function AuthContextProvider({ children }: { children: React.ReactNode }) {
    const storedUser = localStorage.getItem("user")
    const initialUser = storedUser ? JSON.parse(storedUser) : null

    const [authUser, setAuthUser] = useState<AuthUser | null>(initialUser)

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    )
}


export { AuthContext, AuthContextProvider }