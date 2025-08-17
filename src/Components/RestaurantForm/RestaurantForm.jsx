import { useState } from "react"
import axios from "axios"



const RestaurantForm = ({ setFormIsShown }) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        isOpen: '',
        rating: '',
        menu:""
    })


}
export default RestaruantForm