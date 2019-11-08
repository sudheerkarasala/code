/**
 * merchantRouter 
 * This is a route defines merchent related routes implementation. 
 * @package merchantRouter
 * @subpackage sources\services\router\merchantRouter
 * @author SEPA Cyper Technologies, Sujith ,Satya.
 */
"use strict";

var mockapiControler = require('../controller/mockApis/mockController')

var validateMember = require('../utility/validate')

/* Return authorized payments info as json response  */
router.post("/all/payments", validateMember.validate, (request, response) => {
    mockapiControler.fetchPaymentsMock(request, response).then(success => {
        response.send(success)
    }, (errorResponse) => {
        response.send(errorResponse)
    })
})


module.exports = router;
