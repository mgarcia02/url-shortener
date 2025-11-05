import useAuth from "../hooks/useAuth"

function SignOutButton() {
    const { loading, signOut } = useAuth()

    return (
        <div>
            {!loading ?
                (
                    <p onClick={signOut}>Sign Out</p>
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