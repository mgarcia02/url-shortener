import useAuth from "../hooks/useAuth"

function SignOutButton() {
    const { loading, signOut } = useAuth()

    return (
        <div>
            {!loading ?
                (
                    <p onClick={signOut} className="cursor-pointer">Sign Out</p>
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