import React from 'react';
import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import { deleteCart } from './cartSlice';

const DeleteItem = ({ pizzaId }) => {
    const dispatch = useDispatch();

    return (
        <Button type="small"
            onClick={()=>dispatch(deleteCart(pizzaId))}
        >
            Delete
        </Button>
    );
};

export default DeleteItem;