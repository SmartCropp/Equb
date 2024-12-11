const express = require('express');
const router = express.Router();

const paymentController=require('../controllers/paymentcontroller')

router.post('/createpayment',paymentController.CreatePayment_Post)
router.get('/verifypayment/tx_ref',paymentController.VerifyPayment_Get)

module.exports=router