import useSignOut from "../hooks/useSignOut"

function SignOutButton() {
    const { loading, signOut } = useSignOut()

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