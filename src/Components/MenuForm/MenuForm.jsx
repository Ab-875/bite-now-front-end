import { useState } from "react"
import axios from "axios"

const MenuForm = ({ token, onCreated }) => {
  const [formData, setFormData] = useState({
    item: "",
    price: "",
    description: ""
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/menu`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setFormData({ item: "", price: "", description: "" })
      if (onCreated) onCreated(response.data)
    } catch (err) {
      console.error("Error creating menu:", err)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Menu Item</h2>
      <input
        type="text"
        name="item"
        placeholder="Item name"
        value={formData.item}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        required
      />
      <button type="submit">Add</button>
    </form>
  )
}

export default MenuForm
