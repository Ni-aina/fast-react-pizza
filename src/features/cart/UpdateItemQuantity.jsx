import React from 'react';
import Button from "../../ui/Button";
import { useDispatch } from 'react-redux';
import { 
    decreaseItemsQuantity, 
    increaseItemsQuantity 
} from './cartSlice';

const UpdateItemQuantity = ({ pizzaId, currentQuantity }) => {
    const dispatch = useDispatch();
    return (
        <div className="flex gap-2 items-center md:gap-3">
            <Button type="round" onClick={()=> dispatch(decreaseItemsQuantity(pizzaId))}>-</Button>
            <span className="text-sm font-medium">{ currentQuantity }</span>
            <Button type="round" onClick={()=> dispatch(increaseItemsQuantity(pizzaId))}>+</Button>
        </div>
    );
};

export default UpdateItemQuantity;