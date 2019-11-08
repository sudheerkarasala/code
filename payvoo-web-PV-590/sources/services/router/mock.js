/**
 * mock route 
 * This is a route defines merchent/mock related routes implementation. 
 * @package mock route
 * @subpackage sources\services\router\mock route
 * @author SEPA Cyper Technologies, Sujith ,Satya.
 */

"use strict";

var mockapiControler = require('../controller/mockApis/mockController');
var checkValidUser = require('../model/tokenModel')

router.get("/getAllPayments", mockapiControler.checkValidUser, mockapiControler.fetchPaymentsMock)
router.post("/payments", mockapiControler.checkValidUser, mockapiControler.addMoney)
router.post("/login", mockapiControler.userLogin)
router.post("/userRegistration", mockapiControler.saveUser);
router.post("/card", mockapiControler.saveCard)
router.get("/card/:applicant_id", mockapiControler.getCard)


module.exports = router;
