import { useState } from "react";
import axios from "axios";

const RestaurantForm = ({ setFormIsShown }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        isOpen: false,  
        rating: '',
        menu: ""
    });

    const handleChange = (event) => {
        const { name, type, value} = event.target;
        setFormData({
            ...formData,
            [name]: type === 'boolean' 
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        console.log("Form submitted:", formData);
        setIsSubmitting(false);
    };

    return (
        <div>
            <h2>Add a Restaurant</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Restaurant Name</label>
                <input
                    id="name"
                    name="name"
                    type="string"
                    onChange={handleChange}
                    value={formData.name}
                />

                <label htmlFor="isOpen">Is the restaurant open? </label>
                <input
                    id="isOpen"
                    name="isOpen"
                    type="boolean"
                    onChange={handleChange}
                    checked={formData.isOpen}
                />

                <label htmlFor="rating">Rating (0-5)</label>
                <input
                    id="rating"
                    name="rating"
                    type="number"
                    min="0"
                    max="5"
                    onChange={handleChange}
                    value={formData.rating}
                />

                <label htmlFor="menu">Menu</label>
                <input
                    id="menu"
                    name="menu"
                    type="string"
                    onChange={handleChange}
                    value={formData.menu}
                />

                {isSubmitting ? <p>Submitting...</p> : <button type="submit">Submit</button>}
            </form>

            //Create a form that allows you to enter details that match the formData 
            // Create a function that allows you to change form data 
            //On submitting the form, run a function that handles the submitted data
            // Map through the data of formData to display the details 

<div>
  {formData.name (
    <div>
      <h3>Submitted Restaurant Details:</h3>
      <p><strong>Name:</strong> {formData.name}</p>
      <p><strong>Is Open?</strong> {formData.isOpen}</p>
      <p><strong>Rating:</strong> {formData.rating}</p>
      <p><strong>Menu:</strong> {formData.menu}</p>
    </div>
  )}
</div>

    );
};

export default RestaurantForm;
