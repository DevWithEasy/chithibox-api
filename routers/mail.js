const { sentMail, getAllMail, getMail, updateMail } = require('@controller/mail')

const router = require('express').Router()

router.post('/sent/:id',sentMail)
router.get('/me/mail/:id',getAllMail)
router.get('/mail/:id',getMail)
router.put('/mail/:id',updateMail)

module.exports = router