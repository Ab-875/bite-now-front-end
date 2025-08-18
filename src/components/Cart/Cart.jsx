import { useState } from "react"
import axios from "axios"

const Cart = ({ cartItems, setCartItems }) => {

    const handleCheckout = async () => {
        const token = localStorage.getItem("token")
        const order = {
            items: cartItems.map((item) => ({ menuItem: item._id, quantity: 1 }))
        }

        const url = `${import.meta.env.VITE_BACKEND_URL}/order`

        await axios.post(url), order, {headers: { Authorization: `Bearer ${token}`}}

        setCartItems([])
    }

    

    return (
        <>
            <div>
                <h2>Cart</h2>
                <ul>
                    {cartItems.maps((item) => {
                        return (
                            <>
                                <li key={item._id}>{item.item} - ${item.price}</li>
                            </>
                        )
                    })}
                </ul>
                <button onClick={handleCheckout}>Checkout</button>
            </div>
        </>
    )
}

export default Cart