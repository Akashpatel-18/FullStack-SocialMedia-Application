const jwt = require('jsonwebtoken')
const User = require('../models/user')

exports.isAuthenticated = async (req,res,next) => {
    try {
        
        const {websocial} = req.cookies
        if(!websocial){
            return res.status(401).json({
                message:"login to continue"
            })
        }

        const decoded = await jwt.verify(websocial, process.env.JWT_SECRET)

        req.user = await User.findById(decoded.id)
        next()

    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
} 