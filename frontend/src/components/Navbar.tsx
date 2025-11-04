import { Link } from "react-router-dom"
import logo from "../assets/full-logo.svg"

function Navbar() {
    return (
        <nav className="fixed flex items-center justify-around w-full py-10 mx-auto bg-white/80 backdrop-blur-sm">
            <Link to="/dashboard"><img src={logo} alt="Logo" className="w-auto h-10" /></Link>
            <div className="flex gap-20 rounded-full">
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
            </div>
        </nav>
    )
}

export default Navbar