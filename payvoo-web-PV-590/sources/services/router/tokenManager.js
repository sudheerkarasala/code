/**
 * tokenManager route
 * This is a route file, where the token related services are defined. 
 * @package otp
 * @subpackage sources\services\router\tokenManager
 * @author SEPA Cyber Technologies, Sujit kumar.
 */

"use strict";
import { isTokenValid, refreshToken } from '../controller/tokenManager'
// router for  token
//router.post('/service/validateToken',isTokenValid);
router.post('/service/refreshToken', refreshToken);

module.exports = router;