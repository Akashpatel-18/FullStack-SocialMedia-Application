const { getAllPosts, createPost, updatePost, deletePost, likeAndUnlike, comments, myProfile, otherProfile, loginUser, otherUser } = require('../controllers/posts')
const { isAuthenticated } = require('../middleware/auth')

const router = require('express').Router()

router.get('/loginUser',isAuthenticated ,loginUser)
router.get('/otherUser/:id',isAuthenticated, otherUser)
router.get('/all', getAllPosts)
router.get('/myProfile', isAuthenticated, myProfile)
router.get('/otherProfile/:id', isAuthenticated, otherProfile)

router.post('/create',isAuthenticated, createPost)
router.patch('/:id',isAuthenticated, updatePost)
router.delete('/:id',isAuthenticated, deletePost)

router.patch('/likeAndUnlike/:id', isAuthenticated, likeAndUnlike)
router.patch('/comment/:id', isAuthenticated, comments)

module.exports = router