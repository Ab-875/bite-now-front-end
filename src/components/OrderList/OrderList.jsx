import axios from "axios"
import { useState, useEffect } from "react"
import OrderItem from "../OrderItem/OrderItem"


const OrderList = ({token}) => {

    const [orders, setOrders] = useState([])

    const getAllOrders = async () => {
        console.log(import.meta.env.VITE_BACKEND_URL)
        const url = `${import.meta.env.VITE_BACKEND_URL}/order`
        const response = await axios.get(url, {
            headers: { Authorization: `Bearer ${token}` }
        })
        console.log(response)
        setOrders(response.data)
    }

    useEffect(() => {
        getAllOrders()
    }, [])

    return (
        <>
            <div>
                <ul>
                    {
                        orders.length
                            ?
                            orders.map((order) => {
                                return (
                                    <>
                                        <div>
                                            <h2>My Orders</h2>
                                            {orders.map((order) => {
                                                <OrderItem key={order._id} order={order} />
                                            })}
                                        </div>
                                    </>
                                )
                            })
                            :
                            <p>Loading</p>
                    }
                </ul>
            </div>
        </>
    )
}

export default OrderList