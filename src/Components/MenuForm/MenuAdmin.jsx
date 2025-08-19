import { useEffect, useState } from "react"
import axios from "axios"
import MenuForm from "./MenuForm"
import MenuEdit from "./MenuEdit"

const MenuAdmin = ({ token }) => {
    const [items, setItems] = useState([])
    const [editing, setEditing] = useState(null)
    const BASE = import.meta.env.VITE_BACKEND_URL

    const fetchMenus = async () => {
        const res = await axios.get(`${BASE}/menu`)
        const data = Array.isArray(res.data) ? res.data : []
        setItems(data)
    }

    useEffect(() => { fetchMenus() }, [])

    const handleCreated = (created) => {
        setItems((prev) => [created, ...prev])
    }

    const startEdit = (item) => setEditing(item)
    const cancelEdit = () => setEditing(null)

    const savedEdit = (updated) => {
        setItems((prev) => prev.map((item) => (item._id === updated._id ? updated : item)))
        setEditing(null)
    }

    const handleDelete = async (id) => {
        await axios.delete(`${BASE}/menu/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        setItems((prev) => prev.filter((item) => item._id !== id))
    }

    return (
        <div>
            <h2>Owner Menu Manager</h2>

            <MenuForm token={token} onCreated={handleCreated} />

            {editing && (
                <MenuEdit token={token} item={editing} onSaved={savedEdit} onCancel={cancelEdit} />
            )}

            <h3>All Menu Items</h3>
            <ul>
                {items.length ? items.map((menu) => (
                    <li key={menu._id}>
                        <div>{menu.item} - {menu.price}</div>
                        <div>{menu.description}</div>
                        <button onClick={() => startEdit(menu)}>Edit</button>
                        <button onClick={() => handleDelete(menu._id)}>Delete</button>
                    </li>
                )) : <li>No menu items</li>}
            </ul>
        </div>
    )
}

export default MenuAdmin
