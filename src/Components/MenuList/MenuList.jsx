import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MenuList = () => {
  const [menuItems, setMenuItems] = useState([]);

  const getAllMenuItems = async () => {
    try {
      const url = `${import.meta.env.VITE_BACK_END_SERVER_URL}/menu`;
      const response = await axios.get(url);

      // Ensure it's an array
      const data = Array.isArray(response.data) ? response.data : [];
      setMenuItems(data);
    } catch (err) {
      console.error("Error fetching menu:", err);
      setMenuItems([]); // fallback to empty array
    }
  };

  useEffect(() => {
    getAllMenuItems();
  }, []);

  return (
    <div>
      <h2>Menu Items</h2>
      <ul>
        {Array.isArray(menuItems) && menuItems.length > 0 ? (
          menuItems.map((menuItem) => (
            <li key={menuItem._id}>
              <p>{menuItem.item} ${menuItem.price}</p>
              <p>{menuItem.description}</p>
            </li>
          ))
        ) : (
          <li>No menu items found</li>
        )}
      </ul>
    </div>
  );
};

export default MenuList;
