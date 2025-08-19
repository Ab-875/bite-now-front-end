import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/menu">Menu</Link>
        </li>
        <li>
          <Link to="/order">Orders</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
