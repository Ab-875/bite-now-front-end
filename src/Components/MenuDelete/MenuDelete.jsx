import React from 'react';
import { deleteItem } from '../../lib/api'

const MenuDelete = ({ itemId, getAllItems }) => {
const handleDelete = async () => {
try {
await deleteItem(itemId)
await getAllItems()
} catch (error) {
console.error('Error deleting item:', error)
}
}

return (
<button onClick={handleDelete}>
Delete
</button>
)
}

export default MenuDelete