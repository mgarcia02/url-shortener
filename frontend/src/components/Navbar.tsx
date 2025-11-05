import { Link } from "react-router-dom"
import logo from "../assets/full-logo.svg"
import { useAuthContext } from "../hooks/useAuthContext"
import SignOutButton from "./SignOutButton"

function Navbar() {
    const { authUser } = useAuthContext()

    return (
        <nav className="fixed flex items-center justify-around w-full py-10 mx-auto bg-white/80 backdrop-blur-sm">
            <Link to="/dashboard"><img src={logo} alt="Logo" className="w-auto h-10" /></Link>
            <div className="flex items-center rounded-full gap-14">
                {
                    authUser ? <SignOutButton />
                    :
                    <>
                        <Link to="/signin">Sign in</Link>
                        <Link className="p-2 border-2 rounded-xl" to="/signup">Sign up</Link>
                    </>
                }
                
            </div>
        </nav>
    )
}

export default Navbar