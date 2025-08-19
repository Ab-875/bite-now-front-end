import { useEffect, useState } from "react"
import axios from "axios"
import MenuItem from "./MenuItem"

const MenuList = ({ token, onAddToCart }) => {
  const [menu, setMenu] = useState([])

  const getAllMenu = async () => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/menus`
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` }
    })
    console.log("Fetched menu:", response.data)
    setMenu(response.data)
  }

  useEffect(() => {
     getAllMenu()
  }, [])

  return (
    <div>
      <h2>Menu</h2>
      {menu.map(item => (
        <MenuItem key={item._id} item={item} onAddToCart={onAddToCart} />
      ))}
    </div>
  )
}

export default MenuList