import { configureStore } from "@reduxjs/toolkit";
import carSlise from "./slice/carSlise";

const store = configureStore({
    reducer: {
        cars: carSlise,
    }
})

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch