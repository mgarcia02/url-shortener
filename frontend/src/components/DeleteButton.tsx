import trashIcon from "../assets/trash-icon.svg"
import type { DeleteButtonProps } from "../types/urlTypes"

function DeleteButton({deleteUrl, shortCode, loading}: DeleteButtonProps) {

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