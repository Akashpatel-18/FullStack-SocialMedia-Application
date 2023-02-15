import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

export const getUser = createAsyncThunk('getuser', async () => {
    try {
        const response = await axios.get('https://websocialfun.vercel.app/posts/loginUser')

        return response.data
    } catch (error) {
      console.log(error)
    }
})

export const searchUser = createAsyncThunk('searchuser', async (person) => {
    try {
        const response = await axios.get(`https://websocialfun.vercel.app/users/search/${person}`)
   
        return response.data
    } catch (error) {
      console.log(error)
    }
})


export const editUser = createAsyncThunk('edituser', async (formValue) => {
    try {
        const response = await axios.patch('https://websocialfun.vercel.app/users/editProfile', formValue)

        return response.data
    } catch (error) {
      console.log(error)
    }
})

export const otherUser = createAsyncThunk('otherUser', async (id) => {
    try {
        const response = await axios.get(`https://websocialfun.vercel.app/posts/otherUser/${id}`)
      
        return response.data
    } catch (error) {
      console.log(error)
    }
})

export const getAllUser = createAsyncThunk('getAllUser', async () => {
    try {
        const response = await axios.get('https://websocialfun.vercel.app/users/all')

        return response.data
    } catch (error) {
      console.log(error)
    }
})

export const getPost = createAsyncThunk('getPosts', async () => {
    try {
        const response = await axios.get('https://websocialfun.vercel.app/posts/all')

        return response.data
    } catch (error) {
        console.log(error)
    }
})

export const getOtherUserPost = createAsyncThunk('getOtherUserPosts', async (id) => {
    try {
        const response = await axios.get(`https://websocialfun.vercel.app/posts/otherProfile/${id}`)

        return response.data
    } catch (error) {
        console.log(error)
    }
})

export const createPost = createAsyncThunk('createPost', async (postData) => {

    try {
        
        const response = await axios.post('https://websocialfun.vercel.app/posts/create', postData)
       
        return response.data

    } catch (error) {
        console.log(error)
    }

})

export const updatePost = createAsyncThunk('updatePost', async ({oldpostId, data}) => {
   const id = oldpostId
 
    try {
        const response  = await axios.patch(`https://websocialfun.vercel.app/posts/${id}`, data)
      
        return response.data

    } catch (error) {
        console.log(error)
    }

})

export const likeAndUnlikePost = createAsyncThunk('likeAndUnlikePost', async (id) => {
  
  
     try {
         const response  = await axios.patch(`https://websocialfun.vercel.app/posts/likeAndUnlike/${id}`)
       
         return response.data
 
     } catch (error) {
         console.log(error)
     }
 
 })
 

export const deletePost = createAsyncThunk('deletePost', async (id) => {

    try {
        
        await axios.delete(`https://websocialfun.vercel.app/posts/${id}`)
        return id

    } catch (error) {
        console.log(error)
    }

})

export const commentPost = createAsyncThunk('commentPost', async ({id,comment}) => {
    console.log(comment)
     try {
         const response  = await axios.patch(`https://websocialfun.vercel.app/posts/comment/${id}`, comment)
        console.log(response.data)
         return response.data
 
     } catch (error) {
         console.log(error)
     }
 
 })



const postSlice = createSlice({
    name:'posts',
    initialState: {
        user:'',
        posts: [],
        allUser:[],
        bijoUser:'',
        otherPosts:[],
        searchUser:[],
    },
    extraReducers: (builder) => {
        builder.addCase(getUser.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload
        })
        builder.addCase(getUser.rejected, (state) => {
            state.loading = false
        })

        builder.addCase(searchUser.pending, (state) => {
            state.loading = true
        })
        builder.addCase(searchUser.fulfilled, (state, action) => {
            state.loading = false
            state.searchUser = action.payload
        })
        builder.addCase(searchUser.rejected, (state) => {
            state.loading = false
        })

        builder.addCase(editUser.pending, (state) => {
            state.loading = true
        })
        builder.addCase(editUser.fulfilled, (state, action) => {
            state.loading = false
             state.user = state.user._id === action.payload._id ? action.payload : state.user
            state.bijoUser = state.bijoUser._id === action.payload._id ? action.payload : state.bijoUser
            state.allUser = state.allUser.map(user => user._id === action.payload._id ? action.payload : user)
            state.otherPosts = state.otherPosts.map(post => {
                if(post.owner._id === action.payload._id){
                    post.owner.name = action.payload.name
                    post.owner.avatar = action.payload.avatar

                    return post
                }else{
                    return post
                }
            })
            state.posts = state.posts.map(post => {
                if(post.owner._id === action.payload._id){
                    post.owner.name = action.payload.name
                    post.owner.avatar = action.payload.avatar

                    return post
                }else{
                    return post
                }
            })
        })
        builder.addCase(editUser.rejected, (state) => {
            state.loading = false
        })
        builder.addCase(otherUser.pending, (state) => {
            state.loading = true
        })
        builder.addCase(otherUser.fulfilled, (state, action) => {
            state.loading = false
            state.bijoUser = action.payload
        })
        builder.addCase(otherUser.rejected, (state) => {
            state.loading = false
        })
        builder.addCase(getAllUser.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getAllUser.fulfilled, (state, action) => {
            state.loading = false
            state.allUser = action.payload
        })
        builder.addCase(getAllUser.rejected, (state) => {
            state.loading = false
        })
        builder.addCase(getPost.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getPost.fulfilled, (state, action) => {
            state.loading = false
            state.posts = action.payload
        })
        builder.addCase(getPost.rejected, (state) => {
            state.loading = false
        })
        builder.addCase(getOtherUserPost.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getOtherUserPost.fulfilled, (state, action) => {
            state.loading = false
            state.otherPosts = action.payload
        })
        builder.addCase(getOtherUserPost.rejected, (state) => {
            state.loading = false
        })
        builder.addCase(createPost.pending, (state) => {
            state.loading = true
        })
        builder.addCase(createPost.fulfilled, (state, action) => {
            state.loading = false
            state.posts = [...state.posts, action.payload]
            state.otherPosts = [...state.otherPosts, action.payload]

        })
        builder.addCase(createPost.rejected, (state) => {
            state.loading = false
        })
        builder.addCase(updatePost.pending, (state) => {
            state.loading = true
        })
        builder.addCase(updatePost.fulfilled, (state, action) => {
            state.loading = false
            state.posts = state.posts.map(post => post._id === action.payload._id ? action.payload : post)
            state.otherPosts = state.otherPosts.map(post => post._id === action.payload._id ? action.payload : post)
        })
        builder.addCase(updatePost.rejected, (state) => {
            state.loading = false
        })
        builder.addCase(deletePost.pending, (state) => {
            state.loading = true
        })
        builder.addCase(deletePost.fulfilled, (state, action) => {
       
            state.loading = false
            state.posts = state.posts.filter(post => post._id !== action.payload)
            state.otherPosts = state.otherPosts.filter(post => post._id !== action.payload)
        })
        builder.addCase(deletePost.rejected, (state) => {
            state.loading = false
        })
        builder.addCase(commentPost.pending, (state) => {
            state.loading = true
        })
        builder.addCase(commentPost.fulfilled, (state, action) => {
            state.loading = false
            state.posts = state.posts.map(post => post._id === action.payload._id ? action.payload : post)
        })
        builder.addCase(commentPost.rejected, (state) => {
            state.loading = false
        })
        // builder.addCase(likeAndUnlikePost.pending, (state) => {
        //     state.loading = true
        // })
        builder.addCase(likeAndUnlikePost.fulfilled, (state, action) => {
            state.loading = false
            state.posts = state.posts.map(post => post._id === action.payload._id ? action.payload : post)
            state.otherPosts = state.otherPosts.map(post => post._id === action.payload._id ? action.payload : post)
        })
        builder.addCase(likeAndUnlikePost.rejected, (state) => {
            state.loading = false
        })
    
    }
})

export default postSlice.reducer