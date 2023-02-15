const Post = require('../models/posts')
const User = require('../models/user')
const mongoose = require('mongoose')

//solve
exports.loginUser = async(req,res) => {
    try {
        
        const user = await User.findById(req.user._id)

        res.status(200).json(user)

    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

//solve
exports.otherUser = async(req,res) => {
    try {
        
        const user = await User.findById(req.params.id)

        res.status(200).json(user)

    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

//solve
exports.getAllPosts = async (req,res) => {

    try {
        
        const posts = await Post.find().populate("comments.postedBy", "_id name avatar").populate("owner")
    
        res.status(200).json(posts)

    } catch (error) {
        res.status(404).json({message:error.message})
    }

}

//solve
exports.myProfile = async(req,res) => {
    try {
        
        const post = await Post.find({owner:req.user._id}).populate("owner").populate("comments.postedBy", "_id name avatar")

        res.status(200).json(post)

    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

//solve
exports.otherProfile = async(req,res) => {
    try {
        
        const post = await Post.find({owner:req.params.id}).populate("owner").populate("comments.postedBy", "_id name avatar")

        res.status(200).json(post)

    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

// Create Post
exports.createPost = async (req,res) => {

       try {
        
        const user = await User.findById(req.user._id, {_id:1,name:1,avatar:1})
        const {caption, image } = req.body
        const owner = user
        const newPost = await Post.create({caption, image, owner})
        
         await User.findByIdAndUpdate(req.user._id, {$push : {posts : newPost._id}})
        
        res.status(201).json(newPost)

    } catch (error) {
        res.status(409).json({message:error.message})
    }

}

// Delete Post
exports.deletePost = async (req, res) => {


    try {
        const post = await Post.findById(req.params.id)

        if(!post){
           return res.status(404).json({message:"post not found"})
        }

        if(post.owner.toString() !== req.user._id.toString()){
            return res.status(401).json({message: "unAuthorized"})
        }

        await Post.findByIdAndRemove(req.params.id)

        await User.findByIdAndUpdate(req.user._id, {$pull : {posts : req.params.id}})

        res.json({message:"post deleted"})

    } catch (error) {
        res.status(404).json({message:"something went wrong"})
    }

}

// Update Post
exports.updatePost = async (req, res) => {

    try {

        const post = await Post.findById(req.params.id)

        if(!post){
           return res.status(404).json({message:"post not found"})
        }

        if(post.owner.toString() !== req.user._id.toString()){
            return res.status(401).json({message: "unAuthorized"})
        }

        const result =  await Post.findByIdAndUpdate(req.params.id, req.body, {new:true}).populate("owner", "_id name avatar")

        res.json(result)

    } catch (error) {
        res.status(404).json({message:"something went wrong"})
    }

}

// like & unlike Post
exports.likeAndUnlike = async(req,res) => {
    try {
        
        const post = await Post.findById(req.params.id)
        if(!post){
            return res.status(404).json({message:"post not found"})
        }
       
        if(post.likes.includes(req.user._id)){
            const unlikePost = await Post.findByIdAndUpdate(req.params.id, {$pull : {likes : req.user._id}}, {new : true}).populate("owner", "_id name avatar")

            res.status(200).json(unlikePost)
        }else {
            const likePost = await Post.findByIdAndUpdate(req.params.id, {$push : {likes : req.user._id}}, {new : true}).populate("owner", "_id name avatar")

            res.status(200).json(likePost)
        }

    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

// comments
exports.comments = async (req,res) => {
    try {
        const post = await Post.findById(req.params.id)
        if(!post){
            return res.status(404).json({message:"post not found"})
        }

        // const message = {
        //     comment : req.body.comment,
        //     postedBy : req.user._id,
        // }



        const result = await Post.findByIdAndUpdate(
            req.params.id,
            {$push : {comments : {comment : req.body.comment, postedBy : req.user._id}}},
            { new : true }
        ).populate("owner", "_id name avatar").populate("comments.postedBy", "_id name avatar")
          
        res.status(200).json(result)

    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

