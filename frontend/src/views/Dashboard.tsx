import { useAuthContext } from "../hooks/useAuthContext"
import UrlsList from "../components/UrlsList"
import UrlFrom from "../components/UrlForm"
import useUrls from "../hooks/useUrls"
import warningIcon from "../assets/warning-icon.svg"

function Dashboard() {
    const { authUser } = useAuthContext()
    const { urls, loading, getUrls, createUrl, deleteUrl } = useUrls()
    
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
                <UrlFrom createUrl={createUrl} loading={loading} />
            </div>
            <div className="p-10 mb-10 bg-white shadow-md rounded-xl">
                {
                    !!authUser || urls.length === 0 ? 
                    null : (
                    <div className="flex justify-center mb-10">
                        <img title="Demo: las URLs no funcionarán hasta que te registres" src={warningIcon} alt="Logo" className="w-auto h-5 cursor-pointer" />
                    </div>
                    )
                    
                }
                <UrlsList urls={urls} loading={loading} getUrls={getUrls} deleteUrl={deleteUrl} />
            </div>
        </div>
        
    )
}

export default Dashboard
