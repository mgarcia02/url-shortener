import useAuth from "../hooks/useAuth"

function DeleteButton() {
    const { loading, signOut } = useAuth()

    return (
        <div>
            {!loading ?
                (
                    <p onClick={signOut}>Eliminar</p>
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