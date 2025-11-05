import { useState } from "react"
import useSignIn from "../hooks/useSignIn"

function Signin() {
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")

    const { loading, signIn } = useSignIn()

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault()
        await signIn({userName, password})
    }
    
    return (
        <div className="max-w-md p-10 mx-auto mb-10 bg-white shadow-md rounded-xl">
            <h1 className="mb-6 text-2xl font-bold text-center">Iniciar sesión</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Nombre de usuario"
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-black"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-black"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    type="submit"
                    className="w-full px-4 py-2 font-semibold text-white transition-colors duration-500 bg-black rounded-xl hover:bg-gray-800"
                >
                {loading ? "Cargando..." : "Iniciar sesión"}
                </button>
            </form>
        </div>
    )
}

export default Signin
