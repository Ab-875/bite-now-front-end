import { useEffect, useState } from "react"
import axios from "axios"

const STATUSES = ["pending", "preparing", "completed", "cancelled"]

const OrderList = ({ token, role }) => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const url = import.meta.env.VITE_BACKEND_URL

    const fetchOrders = async () => {
        setLoading(true)
        setError("")
        try {
            const res = await axios.get(`${url}/order`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            const data = Array.isArray(res.data) ? res.data : []
            setOrders(data)
        } catch (event) {
            setError(event.response?.data?.error || event.response?.data?.message || event.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchOrders()
    }, [])

    const deleteOrder = async (id) => {
        await axios.delete(`${url}/order/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        setOrders((prev) => prev.filter((order) => order._id !== id))
    }

    const updateStatus = async (id, status) => {
        try {
            setOrders((prev) =>
                prev.map((order) => (order._id === id ? { ...order, status } : order))
            )
            await axios.put(
                `${url}/order/${id}`,
                { status },
                { headers: { Authorization: `Bearer ${token}` } }
            )
        } catch (event) {
            await fetchOrders()
            setError(event.response?.data?.error || event.response?.data?.message || event.message)
        }
    }

    return (
        <div>
            <h2>My Orders</h2>
            {error && <p>{error}</p>}
            {loading ? (
                <p>Loading…</p>
            ) : orders.length > 0 ? (
                <ul>
                    {orders.map((order) => (
                        <li key={order._id}>
                            <div>
                                Order #{order._id} —{" "}
                                {role === "owner" ? (
                                    <select
                                        value={order.status}
                                        onChange={(event) => updateStatus(order._id, event.target.value)}
                                    >
                                        {STATUSES.map((state) => (
                                            <option key={state} value={state}>{state}</option>
                                        ))}
                                    </select>
                                ) : (
                                    <span>{order.status}</span>
                                )}{" "}
                                — Total: {order.price}
                            </div>
                            <ul>
                                {(order.items || []).map((item, index) => (
                                    <li key={item._id || index}>
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
