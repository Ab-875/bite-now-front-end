import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';


const MenuList = () => {
  
  
    const [menuItems, setMenuItems] = useState([]);

  const getAllMenuItems = async () => {
    const url = `${import.meta.env.VITE_BACK_END_SERVER_URL}/menu`;

const response = await axios.get(url);
      setMenuItems(response.data);
  };
useEffect(() => {getAllMenuItems();},

 []);


   return (
    <div>
      <h2>Menu Items</h2>
      <ul>
        {menuItems.length
          ? menuItems.map((menuItem) => (
              <li key={menuItem._id}>
                <p>{menuItem.item} ${menuItem.price}</p>
                <p>{menuItem.description}</p>
              </li>
            ))
          :<h1>ENTER</h1>
      </ul>
    </div>
  );
};

export default MenuList;

