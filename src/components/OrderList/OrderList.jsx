import axios from "axios"
import { useState, useEffect } from "react"


const OrderList = () => {

    const [order, setOrder] = useState()

    const getAllOrders = async () => {
        console.log(import.meta.env.VITE_BACKEND_URL)
        const url = `${import.meta.env.VITE_BACKEND_URL}/order`
        const response = await axios.get(url)
        console.log(response)
        setOrder(response.data)
    }

    return (
        <>

        </>
    )
}

export default OrderList