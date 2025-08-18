import React from 'react';
import axios from 'axios';
import {deleteItem} from '../..//lib/api'

const MenuDelete = ({petId,getAllItems}) => {
    const handleDelete = async () => {
            await deleteItem(ItemId)
    }       getAllItems()
}






export default MenuDelete;
import {useEffect, useState} from "react"
import {ClipLoader} from "react-spinners"

import MenuDeleteButton from "../MenuList/MenuDeleteButton"


const MenuList = () => {
    const [items, setItems] = useState([])

    const getAllItems = async () => {
        // const url = ""
        console.log(import.meta.env.VITE_BACKEND_URL)
        const url = `${import.meta.env.VITE_BACKEND_URL}/items`

        const response = await axios.get(url)
        console.log(response)
        setItems(response.data)
    }
    useEffect(() => {getAllItems()

    },[])
  return (
    <button onClick={()=> handleDelete}>Delete</button>
  );
}


export default ItemList