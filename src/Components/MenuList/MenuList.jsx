import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import './MenuList.css'

const MenuList = ({ token, role }) => {
  const [menus, setMenus] = useState([])
  const [quantityById, setQuantityById] = useState({})
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const url = import.meta.env.VITE_BACKEND_URL

  useEffect(() => {
    ; (async () => {
      try {
        const res = await axios.get(`${url}/menu`)
        setMenus(Array.isArray(res.data) ? res.data : [])
      } catch (event) {
        setMenus([])
      }
    })()
  }, [])

  const addToOrders = async (menu) => {
    try {
      const quantity = Math.max(1, Number(quantityById[menu._id] ?? 1))
      const payload = { items: [{ menuItem: menu._id, quantity }] }
      await axios.post(`${url}/order`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      })
      navigate("/order")
    } catch (event) {
      setError(event.response?.data?.error || event.response?.data?.message || event.message)
      console.error("POST /order failed:", event.response?.data || event.message)
    }
  }

  return (
    <div>
      <h2>Menu Items</h2>
      {role !== "customer" && <p>You must be logged in as a customer to place orders.</p>}
      {error && <p>{error}</p>}
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
                  setQuantityById((s) => ({ ...s, [menu._id]: event.target.value }))
                }
              />
              <button
                onClick={() => addToOrders(menu)}
                disabled={role !== "customer"}
              >
                Add to Orders
              </button>
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

