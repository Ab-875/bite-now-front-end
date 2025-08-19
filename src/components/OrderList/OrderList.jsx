import { useEffect, useState } from "react"
import axios from "axios"
import OrderItem from "./OrderItem"
import OrderEdit from "./OrderEdit"

const OrderList = ({ token }) => {
    const [orders, setOrders] = useState([])
    const [editing, setEditing] = useState(null)
    const [loading, setLoading] = useState(true)

    const fetchOrders = async () => {
        setLoading(true)
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/order`,
                { headers: { Authorization: `Bearer ${token}` } }
            )
            setOrders(res.data)
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchOrders()
    }, [])

    const deleteOrder = async (id) => {
        await axios.delete(
            `${import.meta.env.VITE_BACKEND_URL}/order/${id}`,
            { headers: { Authorization: `Bearer ${token}` } }
        )
        setOrders(prev => prev.filter(o => o._id !== id))
    }

    const recalcPrice = (items) => {
        return items.reduce((sum, it) => {
            const price = Number(it.menuItem?.price || 0)
            const qty = Number(it.quantity || 1)
            return sum + price * qty
        }, 0)
    }

    const saveOrder = async (updated) => {
        const price = recalcPrice(updated.items)
        const body = { items: updated.items, price }
        const res = await axios.put(
            `${import.meta.env.VITE_BACKEND_URL}/order/${updated._id}`,
            body,
            { headers: { Authorization: `Bearer ${token}` } }
        )
        setOrders(prev => prev.map(o => (o._id === updated._id ? res.data : o)))
        setEditing(null)
    }

    return (
        <div>
            <h2>My Orders</h2>
            {editing && <OrderEdit order={editing} onSave={saveOrder} onCancel={() => setEditing(null)} />}
            {loading ? <p>Loading…</p> : (
                <ul>
                    {orders.map(o => (
                        <OrderItem key={o._id} order={o} onEdit={setEditing} onDelete={deleteOrder} />
                    ))}
                    {!orders.length && <p>No orders yet.</p>}
                </ul>
            )}
        </div>
    )
}

export default OrderList
