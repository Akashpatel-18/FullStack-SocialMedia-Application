const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()
const path = require('path')

//config
require('dotenv').config()
mongoose.set('strictQuery', false);

//middlewares
app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
app.use(cookieParser())
app.use(cors())

//importing Routes
const postRoutes = require('./routes/posts')
const userRoutes = require('./routes/users')
const { isAuthenticated } = require('./middleware/auth')

//use Routes
app.use('/posts', postRoutes)
app.use('/users', userRoutes)

app.get('/some',isAuthenticated, (req,res) => {
    res.json(req.user)
})

//connnect to database
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("DB Connected"))
.catch((err) => console.log(err.message))

//static files
app.use(express.static(path.join(__dirname, './frontend/build')))

app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, './frontend/build/index.html'))
})

//port
const port = process.env.PORT || 8080;

//listen to the server
app.listen(port, () => {
    console.log(`server started on port ${process.env.PORT}`)
})