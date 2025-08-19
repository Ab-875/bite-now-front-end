import axios from "axios"
import { useState, useEffect } from "react"
import OrderItem from "../OrderItem/OrderItem"

const OrderList = ({ token }) => {
    const [orders, setOrders] = useState([])

    const getAllOrders = async () => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/order`
            const response = await axios.get(url, {
                headers: { Authorization: `Bearer ${token}` },
            })
            console.log(response)
            setOrders(response.data)
        } catch (err) {
            console.error("Error fetching orders:", err)
        }
    }

    useEffect(() => {
        getAllOrders()
    }, [])

    return (
        <div>
            <h2>My Orders</h2>
            {orders.length ? (
                <ul>
                    {orders.map((order) => (
                        <OrderItem key={order._id} order={order} />
                    ))}
                </ul>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}

export default OrderList
