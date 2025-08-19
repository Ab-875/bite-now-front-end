import React from 'react';
import axios from 'axios';
import {deleteItem} from '../..//lib/api'

const MenuDelete = ({ItemId,getAllItems}) => {
    const handleDelete = async () => {
            await deleteItem(ItemId)
    }      
}






export default MenuDelete;
import {useEffect, useState} from "react"
import {ClipLoader} from "react-spinners"

import MenuDeleteButton from "../MenuList/MenuDeleteButton"

