const OrderItem = ({ order }) => {
    return (
        <>
            <div>
                <h2>Order #{order._id}</h2>
                <p>Status: {order.status}</p>
                <ul>
                    {order.items.map((item) => {
                        <li key={item.menuItem._id}>
                            {item.menuItem.item} x{item.quantity} - ${item.menuItem.price}
                        </li>
                    })}
                </ul>
            </div>
        </>
    )
}

export default OrderItem