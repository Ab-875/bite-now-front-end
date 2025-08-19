import { useEffect, useState } from "react"
import axios from "axios"

const OrderList = ({ token }) => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const BASE = import.meta.env.VITE_BACKEND_URL

    const fetchOrders = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`${BASE}/order`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            const data = Array.isArray(res.data) ? res.data : []
            setOrders(data)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchOrders()
    }, [])

    const deleteOrder = async (id) => {
        await axios.delete(`${BASE}/order/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        setOrders((prev) => prev.filter((order) => order._id !== id))
    }

    return (
        <div>
            <h2>My Orders</h2>
            {loading ? (
                <p>Loading…</p>
            ) : orders.length > 0 ? (
                <ul>
                    {orders.map((order) => (
                        <li key={order._id}>
                            <div>
                                Order #{order._id} — {order.status} — Total: {order.price}
                            </div>
                            <ul>
                                {(order.items || []).map((item, i) => (
                                    <li key={item._id || i}>
                                        {(item.menuItem && item.menuItem.item) || "Item"} x{" "}
                                        {item.quantity || 1}
                                        {item.notes ? ` - ${item.notes}` : ""}
                                    </li>
                                ))}
                            </ul>
                            <button onClick={() => deleteOrder(order._id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No orders yet.</p>
            )}
        </div>
    )
}

export default OrderList
