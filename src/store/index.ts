import { configureStore } from "@reduxjs/toolkit";
import carSlice from "./slice/carSlice";
import cartSlice from "./slice/cartSlice";
import userSlice from "./slice/userSlice";

const store = configureStore({
    reducer: {
        cars: carSlice,
        cart: cartSlice,
        user: userSlice
    }
})

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch