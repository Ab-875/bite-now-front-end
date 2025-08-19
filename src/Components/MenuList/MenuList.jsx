import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const MenuList = ({ token }) => {
  const [menus, setMenus] = useState([])
  const [quantityById, setQuantityById] = useState({})
  const navigate = useNavigate()
  const BASE = import.meta.env.VITE_BACKEND_URL

  useEffect(() => {
    axios
      .get(`${BASE}/menu`)
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : []
        setMenus(data)
      })
      .catch(() => setMenus([]))
  }, [])

  const addToOrders = async (menu) => {
    const quantity = Math.max(1, Number(quantityById[menu._id] ?? 1))
    const payload = {
      items: [{ menuItem: menu._id, quantity }],
      price: menu.price * quantity,
    }
    await axios.post(`${BASE}/order`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    })
    navigate("/order")
  }

  return (
    <div>
      <h2>Menu Items</h2>
      <ul>
        {menus.length > 0 ? (
          menus.map((menu) => (
            <li key={menu._id}>
              <p>{menu.item} ${menu.price}</p>
              <p>{menu.description}</p>
              <input
                type="number"
                min={1}
                value={quantityById[menu._id] ?? 1}
                onChange={(event) =>
                  setQuantityById((stack) => ({ ...stack, [menu._id]: event.target.value }))
                }
              />
              <button onClick={() => addToOrders(menu)}>Add to Orders</button>
            </li>
          ))
        ) : (
          <li>No menu items found</li>
        )}
      </ul>
    </div>
  )
}

export default MenuList
