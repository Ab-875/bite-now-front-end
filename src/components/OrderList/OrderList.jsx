import { useEffect, useState } from "react"
import axios from "axios"

const MenuList = ({ token, onOrderCreated }) => {
    const [menus, setMenus] = useState([])
    const [quantityById, setQuantityById] = useState({})

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/menu`)
            .then(res => setMenus(res.data))
            .catch(console.error)
    }, [])

    const addToOrders = async (menu) => {
        const qty = Math.max(1, Number(quantityById[menu._id] ?? 1))
        const payload = {
            items: [{ menuItem: menu._id, quantity: qty }],
            price: menu.price * qty
        }
        const res = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/order`,
            payload,
            { headers: { Authorization: `Bearer ${token}` } }
        )
        if (onOrderCreated) onOrderCreated(res.data)
    }

    return (
        <div>
            <h2>Menu</h2>
            <ul>
                {menus.map((menu) => (
                    <li key={menu._id}>
                        <div>{menu.item} - {menu.price}</div>
                        <div>{menu.description}</div>
                        <input
                            type="number"
                            min={1}
                            value={quantityById[menu._id] ?? 1}
                            onChange={(e) => setQuantityById(s => ({ ...s, [menu._id]: e.target.value }))}
                        />
                        <button onClick={() => addToOrders(menu)}>Add to Orders</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default MenuList
