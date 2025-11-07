import useAuth from "../hooks/useAuth"

function SignOutButton() {
    const { loading, signOut } = useAuth()

    return (
        <div>
            {!loading ?
                (
                    <p onClick={signOut} className="cursor-pointer hover:text-gray-500">Sign Out</p>
                )
                :
                (
                    "Cargando..."
                )
            }
        </div>
    )
}

export default SignOutButton