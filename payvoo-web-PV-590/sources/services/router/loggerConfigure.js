/**
 * loggerConfigure route
 * This is a route file, where the loggerConfigure related services are defined. 
 * @package otp
 * @subpackage sources\services\router\loggerConfigure
 * @author SEPA Cyper Technologies, Satyanaraayna G.
 */

"use strict";

var loggerController = require('../controller/loggerConfigure');

// router for loggerConfigure
router.post('/service/log/updateConfiguration',  loggerController.updateConfiguration);


module.exports = router;