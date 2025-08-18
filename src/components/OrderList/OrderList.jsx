import axios from "axios"
import { useState, useEffect } from "react"


const OrderList = () => {

    const [orders, setOrder] = useState([])

    const getAllOrders = async () => {
        console.log(import.meta.env.VITE_BACKEND_URL)
        const url = `${import.meta.env.VITE_BACKEND_URL}/order`
        const response = await axios.get(url)
        console.log(response)
        setOrder(response.data)
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
                                    <h1>{order.foodItem}</h1>
                                    <li>
                                        <p>{order.price}</p>
                                        <p>{order.description}</p>
                                        <p>{order.notes}</p>
                                        <p>{order.status}</p>
                                    </li>
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