import { useState } from 'react';

const MenuForm = () => {
  const [item, setItem] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const handleItemChange = (event) => {
    setItem(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newMenuItem = { item, price, description };
    console.log(newMenuItem);
    setItem('');
    setPrice('');
    setDescription('');
  };

  return (
    <div>
    <h2>Add New Menu Item</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="item">Item Name: </label>
          <input
            id="item"
            value={item}
            onChange={
                handleItemChange
            }
            placeholder="Enter menu item name"
          />
        </div>


    <div>
          <label htmlFor="price">Price: </label>
          <input
            id="price"
            type="number"
            value={price}
            onChange={handlePriceChange}
            placeholder="Enter price"
          />
        </div>
        <div>
          <label htmlFor="description">Description: </label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Enter description"
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default MenuForm;
