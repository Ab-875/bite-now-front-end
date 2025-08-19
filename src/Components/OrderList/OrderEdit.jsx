import { useEffect, useState } from "react"

const OrderEdit = ({ order, onSave, onCancel }) => {
  const [items, setItems] = useState(order.items || [])

  useEffect(() => { setItems(order.items || []) }, [order])

  const updateQty = (index, quantity) => {
    setItems(prev => prev.map((item, count) => count === index ? { ...item, quantity: Number(quantity) } : item))
  }

  const updateNotes = (index, notes) => {
    setItems(prev => prev.map((item, count) => count === index ? { ...item, notes } : item))
  }

  return (
    <div>
      <h3>Edit Order</h3>
      {items.map((item, i) => (
        <div key={item._id || i}>
          <span>{item.menuItem?.item || item.menuItem?.name || "Item"}</span>
          <input
            type="number"
            min={1}
            value={item.quantity || 1}
            onChange={(e) => updateQty(i, e.target.value)}
          />
          <input
            type="text"
            placeholder="Notes"
            value={item.notes || ""}
            onChange={(e) => updateNotes(i, e.target.value)}
          />
        </div>
      ))}
      <button onClick={() => onSave({ ...order, items })}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  )
}

export default OrderEdit
