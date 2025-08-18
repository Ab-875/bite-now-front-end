import { useState } from 'react';


const App = () => {
  const [title, setTitle] = useState('');
  const [item, setitem] = useState('');
  const [price, setprice] = useState('');
  const [description, setdescription] = useState('');

  const handleitemChange = (event) => {
    setitem(event.target.value);
  };

  const handlepriceChange = (event) => {
    setprice(event.target.value);
  };
  const handledescriptionChange = (event) => {
    setdescription(event.target.value);
  };

  return (
    <>
      <h2>{title}</h2>
      <form>
        <label htmlFor="item">item: </label>
        <input
          id="item"
          value={item}
          onChange={handleitemChange}
        />
        <input
          id="price"
          value={price}
          onChange={handlepriceChange}
        />
        <input
          id="description"
          value={description}
          onChange={handledescriptionChange}
        />

      </form>
    </>
  );
};

export default App;