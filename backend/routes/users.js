const { register, login, logout, editProfile ,allUsers, searchUsers} = require('../controllers/users')
const { isAuthenticated } = require('../middleware/auth')

const router = require('express').Router()

router.post('/register', register)
router.post('/login', login)
router.patch('/editProfile',isAuthenticated, editProfile)
router.get('/all',isAuthenticated, allUsers)
router.get('/search/:person',isAuthenticated, searchUsers)
router.get('/logout',logout)


module.exports = router