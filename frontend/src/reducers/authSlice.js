import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

export const register = createAsyncThunk('/register', async({formValue,navigate, toast}, {rejectWithValue}) => {
    try {
        
        const response = await axios.post('https://websocialfun.vercel.app/users/register', formValue)
        toast.success("Register Successful")
        navigate('/')
        return response.data

    } catch (error) {
        return rejectWithValue(error.response.data)
    }
}) 

export const login = createAsyncThunk('/login', async({formValue,navigate, toast}, {rejectWithValue}) => {
    try {
        
        const response = await axios.post('https://websocialfun.vercel.app/users/login', formValue)
        toast.success("Login Successful")
        navigate('/')
        return response.data

    } catch (error) {
        return rejectWithValue(error.response.data)
    }
}) 

export const logOut = createAsyncThunk('logout', async ({navigate, toast}) => {
    try {
        await axios.get('https://websocialfun.vercel.app/users/logout')
        localStorage.clear()
        toast.success("logout Successful")
        navigate('/login')
    } catch (error) {
      console.log(error)
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState : {
        loading: false,
        user: null,
        error: "",
    },
    reducers: {
       deleteError(state) {
        state.error = ""
       },
       setUser(state, action) {
        state.user = action.payload
       }
    },
    extraReducers: (builder) => {
        builder.addCase(register.pending, (state) => {
            state.loading = true
        })
        builder.addCase(register.fulfilled, (state, action) => {
            state.loading = false
            localStorage.setItem('profile', JSON.stringify(action.payload))
            state.user = action.payload
        })
        builder.addCase(register.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload.message
        })
        builder.addCase(login.pending, (state) => {
            state.loading = true
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.loading = false
            localStorage.setItem('profile', JSON.stringify(action.payload))
            state.user = action.payload
        })
        builder.addCase(login.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload.message
        })
            builder.addCase(logOut.pending, (state) => {
        })
        builder.addCase(logOut.fulfilled, (state, action) => {
            state.loading = false
            state.user = ''
        })
        builder.addCase(logOut.rejected, (state) => {
            state.loading = false
        })
    }
})

export default authSlice.reducer;
export const {deleteError, setUser} = authSlice.actions

