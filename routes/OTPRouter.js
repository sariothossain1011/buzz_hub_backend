const express = require('express');
const { RecoverVerifyEmail, RecoverResetPass, RecoverVerifyOTP } = require('../controller/OTPController');
const router = express.Router()


router.get('/RecoverVerifyEmail/:email',RecoverVerifyEmail)
router.get('/RecoverVerifyOTP/:email/:otp',RecoverVerifyOTP)
router.post('/RecoverResetPass',RecoverResetPass)





module.exports = router ;