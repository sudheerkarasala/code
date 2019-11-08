/**
 * otp route
 * This is a route file, where the otp related services are defined. 
 * @package otp
 * @subpackage sources\services\router\otp
 * @author SEPA Cyper Technologies, Sujit kumar.
 */

"use strict";

var otpController = require('../controller/otp');

// router for otp
router.post('/service/generateOtp',  otpController.generateOTP);
router.post('/service/verifyOtp', otpController.verifyOTP);

module.exports = router;