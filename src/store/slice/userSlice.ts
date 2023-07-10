import { createSlice, createAsyncThunk, AnyAction, PayloadAction } from "@reduxjs/toolkit"
import { IUser } from "../../Interfaces/Interfaces"
import instance from "../../axios"

export const fetchRegisterUser = createAsyncThunk<IUser, IUser>(
    'user/fetchRegisterUser',
    async (user) => {
        const response = await instance.post('/register', user)

        localStorage.setItem('user', JSON.stringify(response.data))
        return response.data
    }
)

export const fetchLoginUser = createAsyncThunk<IUser, IUser>(
    'user/fetchLoginUser',
    async (user) => {
        const response = await instance.post('/login', user)
        localStorage.setItem('user', JSON.stringify(response.data))
        return response.data
    }
)

const isError = (action: AnyAction) => {
    return action.type.endsWith('rejected')
}

type userState = {
    user: IUser;
    loading: boolean;
    error: string | null;
    isAuth: boolean;
}

const initialState: userState = {
    user: {
        name: '',
        email: '',
        balance: 0,
        photo: '',
        products: [],

    },
    loading: false,
    isAuth: false,
    error: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout(state) {
            state.isAuth = !state.isAuth
            localStorage.removeItem('user')
        },
        setIsAuth(state) {
            state.isAuth = true;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRegisterUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchRegisterUser.fulfilled, (state, action) => {
                state.user = action.payload.user
                state.loading = false
                localStorage.setItem('user', JSON.stringify(state.user.user))
                state.isAuth = true
            })
            .addCase(fetchLoginUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchLoginUser.fulfilled, (state, action) => {
                state.user = action.payload
                localStorage.setItem('user', JSON.stringify(state.user.user))
                state.loading = false
                state.isAuth = true
            })
            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                state.error = action.payload
                state.loading = false
            })
    }
})

export const { logout, setIsAuth } = userSlice.actions
export default userSlice.reducer