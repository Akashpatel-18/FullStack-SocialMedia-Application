const User = require('../models/user') 
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.register = async(req,res) => {

    try {
        
        const {name, email, avatar, password} = req.body
        const olduser = await User.findOne({email})

        if(olduser){
            return res.status(400).json({
                message:"User already exists"
            })
        }

        const hashPassword = await bcrypt.hash(password, 12)
        const user = await User.create({
            name,
            email,
            password:hashPassword,
            avatar
        })

        const token = jwt.sign({email: user.email, id: user._id}, process.env.JWT_SECRET)

        res.status(201).cookie("websocial",token,{
            expires: new Date(Date.now() + 90*24*60*60*1000),
            httpOnly:true,
        }).json({
            user
        })

    } catch (error) {
        res.status(500).json({message:error.message})
    }

}

exports.login = async(req,res) => {
try {
    
    const {email, password} = req.body

    const user = await User.findOne({email})

    if(!user){
        return res.status(404).json({message:"User doesn't exist"})
    }

    const checkPassword = await bcrypt.compare(password, user.password)
    
    if(!checkPassword){
        return res.status(400).json({message:"Invalid Credentials"})
    }

    const token = jwt.sign({email: user.email, id: user._id}, process.env.JWT_SECRET)

    res.status(200).cookie("websocial",token,{
        expires: new Date(Date.now() + 90*24*60*60*1000),
        httpOnly:true,
    }).json({
        user
    })

} catch (error) {
    
}
}

exports.allUsers = async (req,res) => {
    try {
        
        const user = await User.find()
        res.status(200).json(user)

    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

exports.searchUsers = async (req,res) => {
    try {

        const user = await User.find({name : {$regex : req.params.person, $options : 'i'}})
        res.status(200).json(user)

    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

exports.editProfile = async (req,res) => {
    try {

        const user = await User.findById(req.user._id,{_id:1,name:1,email:1,avatar:1})
        const {name, avatar, email } = req.body

        if(name){
            user.name = name;
        }

        if(avatar){
            user.avatar = avatar;
        }

        if(email){
            user.email = email;
        }

        await user.save()

        res.status(200).json(user)

    } catch (error) {
        res.status(500).json({
            message:error.mesage
        })
    }
}

exports.logout = async (req,res) => {
    try {
        res.status(200).cookie("websocial",null,{expires: new Date(Date.now()),httpOnly:true }).json({
            mesage: "logged out",
        })
    } catch (error) {
        res.status(500).json({
            message:error.message,
        })
    }
}