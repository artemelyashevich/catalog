import { createSlice, createAsyncThunk, AnyAction, PayloadAction } from "@reduxjs/toolkit"
import instance from '../../axios'
import { ICar } from "../../Interfaces/Interfaces"


export const fetchAllCars = createAsyncThunk<ICar[], ISetFilter>(
    'cars/fetchAllCars',
    async (param) => {
        const response = await instance.get(`/posts?${param.type === '' ? '' : 'type=' + param.type}`)
        return response.data
    }
)

export const fetchCarsByType = createAsyncThunk<ICar[], string>(
    'cars, fetchCarsByType',
    async (val) => {
        const response = await instance.get(`/posts?type=${val}`)
        return response.data
    }
)

const isError = (action: AnyAction) => {
    return action.type.endsWith('rejected')
}

type CarState = {
    list: ICar[];
    loading: boolean;
    error: string | null;
    filter: {
        q: string,
        type: string
    };
}

type ISetFilter = {
    q: string;
    type: string
}

const initialState: CarState = {
    list: [],
    loading: false,
    error: null,
    filter: {
        q: '',
        type: ''
    },
}

const carSlice = createSlice({
    name: 'cars',
    initialState,
    reducers: {
        setFilter(state, action: PayloadAction<ISetFilter>) {
            state.filter = {
                ...state.filter,
                q: action.payload.q,
                type: action.payload.type
            }
            console.log(state.filter);

        }
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
            .addCase(fetchCarsByType.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchCarsByType.fulfilled, (state, action) => {
                state.list = action.payload
                state.loading = false
            })
            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                state.error = action.payload
                state.loading = false
            })
    }
})

export const { setFilter } = carSlice.actions
export default carSlice.reducer

