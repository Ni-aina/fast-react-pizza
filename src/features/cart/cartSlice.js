import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: []
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addCart (state, action) {
            // create items
            state.cart.push(action.payload);
        },
        deleteCart (state, action) {
            state.cart = state.cart.filter(item => item.pizzaId !== action.payload);
        },
        increaseItemsQuantity (state, action) {
            const item = state.cart.find(item => item.pizzaId === action.payload)
            item.quantity++;
            item.totalPrice = item.quantity * item.unitPrice;
        },
        decreaseItemsQuantity (state, action) {
            const item = state.cart.find(item => item.pizzaId === action.payload)
            item.quantity--;
            item.totalPrice = item.quantity * item.unitPrice;
            if (item.quantity === 0) cartSlice.caseReducers.deleteCart(state, action);
        },
        clearCart(state) {
            state.cart = []
        }
    }
});

export const {
    addCart,
    deleteCart,
    increaseItemsQuantity,
    decreaseItemsQuantity,
    clearCart
} = cartSlice.actions;

export default cartSlice.reducer;

export const getCart = state => state.cartReducer.cart;

export const getCartQuantityById = (id) => (state) =>
    state.cartReducer?.cart.find(item => item.pizzaId === id)?.quantity ?? 0;

export const getTotalCartQuantity = (state) =>
    state.cartReducer.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalCartPrice = (state) =>
    state.cartReducer.cart.reduce((sum, item) => sum + item.totalPrice, 0);