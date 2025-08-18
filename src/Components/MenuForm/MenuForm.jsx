import { useState } from 'react';

const App = () => {
  const [title, setTitle] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
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

      </form>
    </>
  );
};

export default App;