const OrderItem = ({ order, onEdit, onDelete }) => {
    return (
        <li>
            <div>Order #{order._id} — {order.status} — Total: {order.price}</div>
            <ul>
                {order.items?.map((item) => (
                    <li key={item._id || (item.menuItem?._id || Math.random())}>
                        {(item.menuItem && (item.menuItem.item || item.menuItem.name)) || "Item"} x {item.quantity || 1}
                        {item.notes ? ` - ${item.notes}` : ""}
                    </li>
                ))}
            </ul>
            <button onClick={() => onEdit(order)}>Edit</button>
            <button onClick={() => onDelete(order._id)}>Delete</button>
        </li>
    )
}

export default OrderItem