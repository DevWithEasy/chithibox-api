const { sentMail, getAllMail, getMail, updateMail } = require('../controllers/mail')

const router = require('express').Router()

router.post('/sent/:id',sentMail)
router.get('/me/:id',getAllMail)
router.get('/:id',getMail)
router.put('/:id',updateMail)

module.exports = router