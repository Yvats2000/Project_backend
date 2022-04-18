const router = require('express').Router();
const auth = require('../controllers/auth')
const cities = require('../controllers/location')
const {protect} = require('../middleware/auth')

router.post('/register', auth.register)

router.post('/login', auth.login)


router.get('/profile', protect, auth.getuserProfile)

router.get('/location', cities.location)

router.get('/emailSend', auth.emailSend);

router.get('/forgetPassword', auth.forgetPassword)


module.exports=router;