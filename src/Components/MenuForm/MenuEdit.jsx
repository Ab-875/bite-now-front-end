import { useEffect, useState } from "react"
import axios from "axios"

const MenuEdit = ({ token, item, onSaved, onCancel }) => {
  const [form, setForm] = useState({ item: "", price: "", description: "" })

  useEffect(() => {
    setForm({
      item: item.item ?? "",
      price: item.price ?? "",
      description: item.description ?? ""
    })
  }, [item])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((stack) => ({ ...stack, [name]: value }))
  }

  const save = async (event) => {
    event.preventDefault()
    const res = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/menu/${item._id}`,
      form,
      { headers: { Authorization: `Bearer ${token}` } }
    )
    onSaved && onSaved(res.data)
  }

  return (
    <form onSubmit={save}>
      <h4>Edit Menu Item</h4>
      <input name="item" value={form.item} onChange={handleChange} required />
      <input name="price" type="number" value={form.price} onChange={handleChange} required />
      <textarea name="description" value={form.description} onChange={handleChange} required />
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  )
}

export default MenuEdit
