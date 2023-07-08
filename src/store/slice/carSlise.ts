import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import instance from '../../axios'
import { CarI } from "../../Interfaces/CarInterface"


export const fetchAllCars = createAsyncThunk<CarI[]>(
    'cars/fetchAllCars',
    async () => {
        const response = await instance.get('/posts')
        return response.data
    }
)


type CarState = {
    list: CarI[];
    loading: boolean;
    error: string | null;   
}

const initialState: CarState = {
    list: [],
    loading: false,
    error: null,
}

const carSlice = createSlice({
    name: 'cars',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllCars.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchAllCars.fulfilled, (state, action) => {
                state.list = action.payload
                state.loading = false
            })
    }
})

export default carSlice.reducer