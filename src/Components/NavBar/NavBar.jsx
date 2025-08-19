import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"

const Navbar = () => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            try {
                setUser(jwtDecode(token))
            } catch {
                setUser(null)
            }
        }
    }, [])

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/menu">Menu</Link>
                </li>
                <li>
                    <Link to="/order">Orders</Link>
                </li>
                {user?.role === "owner" && (
                    <li>
                        <Link to="/owner/menu">Owner Menu Manager</Link>
                    </li>
                )}
            </ul>
        </nav>
    )
}

export default Navbar
