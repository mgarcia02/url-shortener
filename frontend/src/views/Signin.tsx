import { useState } from "react"

function Signin() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Signin con:", { email, password })
        // Aquí luego llamas a tu API con axios
    }
    return (
        <div className="max-w-md p-10 mx-auto mb-10 bg-white shadow-md rounded-xl">
            <h1 className="mb-6 text-2xl font-bold text-center">Iniciar sesión</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-black"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                Iniciar sesión
                </button>
            </form>
        </div>
    )
}

export default Signin
