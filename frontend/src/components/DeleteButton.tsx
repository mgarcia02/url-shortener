import trashIcon from "../assets/trash-icon.svg"
import useUrls from "../hooks/useUrls"
import type { DeleteButtonProps } from "../types/urlTypes"

function DeleteButton({ shortCode }: DeleteButtonProps) {
    const { loading, deleteUrl } = useUrls()

    return (
        <div>
            {!loading ?
                (
                    <p onClick={() => deleteUrl(shortCode)}> <img src={trashIcon} alt="Logo" className="w-auto h-8 cursor-pointer" /></p>
                )
                :
                (
                    "Cargando..."
                )
            }
        </div>
    )
}

export default DeleteButton