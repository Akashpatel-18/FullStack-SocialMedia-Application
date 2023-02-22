import {configureStore} from '@reduxjs/toolkit'
import authSlice from './reducers/authSlice'
import postSlice  from './reducers/postSlice'

const store = configureStore({
    reducer:{
        posts: postSlice,
        auth: authSlice,
    }
})

export default store