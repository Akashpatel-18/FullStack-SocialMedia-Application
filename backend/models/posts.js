const mongoose = require('mongoose')

const {ObjectId} = mongoose.Schema.Types

const postSchema = new mongoose.Schema({

    caption:String,
    image:String,
    owner: {
        type: ObjectId,
        ref:'User',
    },
    likes:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'User',
        },
    ],
    comments:[
        {
            comment: {
                type: String,
            },
            postedBy: {
                type: ObjectId,
                ref:'User',
            },
            createdAt:{
                type: Date,
                default: Date.now,
            },
        },
    ],

},{timestamps:true})

module.exports = mongoose.model('Post',postSchema)