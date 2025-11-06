import { useAuthContext } from "../hooks/useAuthContext"
import UrlsList from "../components/UrlsList"

function Dashboard() {
    const { authUser } = useAuthContext()
    
    return (
        <div className="max-w-3xl p-8 mx-auto">
            <div className="flex flex-col items-center gap-10 mb-24 text-center">
                <div className="flex items-center gap-2 px-3 py-1 border rounded-full border-neutral-200 bg-neutral-50">
                    <span className={`w-2 h-2 rounded-full animate-pulse ${authUser ? "bg-green-500" : "bg-red-500"}`}></span>
                    <p>{authUser ? authUser.userName : "Unregistered"}</p>
                </div>
                
                <h1 className="text-4xl font-bold text-gray-900">
                    Acorta tus enlaces en segundos
                </h1>
                <p className="text-lg text-gray-600">
                    Crea URLs cortas y fáciles de compartir al instante.
                    Prueba la herramienta sin registrarte o regístrate para guardar y gestionar tus enlaces con persistencia.
                </p>
            </div>
            <div className="flex flex-col gap-5 p-10 mb-10 bg-white shadow-md rounded-xl">
                <form className="flex flex-col w-full gap-2">
                    <div className="flex">
                        <input
                        type="url"
                        placeholder="Introduce tu URL"
                        className="w-3/4 px-4 py-2 border border-gray-300 rounded-l-xl focus:outline-none focus:ring-1 focus:ring-black"
                        />
                        
                        <button
                        type="submit"
                        className="w-1/4 font-semibold text-white transition-colors duration-500 bg-black rounded-r-xl hover:bg-gray-800"
                        >
                        Crear short url
                        </button>
                    </div>
                    <input
                    type="alias"
                    placeholder="Introduce alias personalizado"
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-black"
                    />
                </form>
            </div>
            <div className="p-10 mb-10 bg-white shadow-md rounded-xl">
                {authUser ? <UrlsList /> : <p className="py-6 text-center text-gray-500">Debes iniciar sesión para ver tus URLs</p>}
            </div>
        </div>
        
    )
}

export default Dashboard
