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
