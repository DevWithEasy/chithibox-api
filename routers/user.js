const { signup, signin, check, me } = require('../controllers/user')

const router = require('express').Router()

router.post('/signup',signup)
router.post('/signin',signin)
router.get('/check',check)
router.get('/me/:id',me)

module.exports = router