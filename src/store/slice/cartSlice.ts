import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ICar } from "../../Interfaces/Interfaces";


type CartState = {
    cartItems: ICar[];
    cartTotalQuantity: number;
    cartTotalPrice: number;
}

const initialState: CartState = {
    cartItems: [],
    cartTotalQuantity: 0,
    cartTotalPrice: 0,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCartFromLS(state) {
            if (JSON.parse(localStorage.getItem('cart') || '[]') !== null) {
                state.cartItems = JSON.parse(localStorage.getItem('cart') || '[]')
                state.cartItems.forEach(element => {
                    state.cartTotalPrice += element.price
                });
            }
        },
        addToCart(state, action: PayloadAction<ICar>) {
            state.cartTotalQuantity += 1
            state.cartTotalPrice += action.payload.price
            state.cartItems.push(action.payload)
            localStorage.setItem('cart', JSON.stringify(state.cartItems))
        },
        removeFromCart(state, action: PayloadAction<ICar>) {
            state.cartTotalQuantity -= 1
            state.cartTotalPrice -= action.payload.price
            let index: number = state.cartItems.findIndex(item => item.id === action.payload.id)
            state.cartItems.splice(index, 1)
            localStorage.setItem('cart', JSON.stringify(state.cartItems))
        },
        removeAllFromCart(state) {
            state.cartTotalPrice = 0
            state.cartTotalQuantity = 0
            state.cartItems.length = 0
            localStorage.setItem('cart', JSON.stringify(state.cartItems))
        }
    }
})

export const { addToCart, removeFromCart, addToCartFromLS, removeAllFromCart } = cartSlice.actions
export default cartSlice.reducer
