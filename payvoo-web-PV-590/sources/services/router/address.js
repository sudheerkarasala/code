/**
 * address route
 * address route is used for the user will able to enter the address and get the address details of either
  business or operating or shipping
 * @package address
 * @subpackage router/address
 *  @author SEPA Cyper Technologies,krishnakanth.r
 */

"use strict";

//var address = require('../controller/address/address');
import { createAddress, getDetails, getAddressType, updateAddress } from '../controller/address';

//To store the details of address in database through this api
router.post('/service/address', createAddress);
router.put('/service/address', updateAddress);
router.get('/service/address/:applicant_id', getDetails);
router.get('/service/addressType', getAddressType);

module.exports = router;


