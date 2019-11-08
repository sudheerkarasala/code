/**
 * otp route
 * This is a route fil. 
 * @package otp
 * @subpackage sources\services\router
 * @author SEPA Cyper Technologies.
 */

"use strict";

var countryController = require('../controller/country');
//import {isTokenValid} from '../controller/tokenManager'

// router for country
router.get('/service/country', countryController.getCountriesList);
router.get('/service/country/:country_name', countryController.getCountryByName);
router.get('/service/v1/statusCurrency', countryController.getStatusCurrency);



module.exports = router;