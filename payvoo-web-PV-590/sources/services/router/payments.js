/**
 * payments route
 * This is a route file, we call payment request to marchent . 
 * @package payments
 * @subpackage sources\services\router\payments
 * @author SEPA Cyper Technologies, Satyanarayana G.
 */

'use strict';

import { addMoney } from '../controller/payments';

/*Router for create payments request from payvoo and send response to payvoo via GateWay */

router.post('/service/payment/addMoney', addMoney);

module.exports = router;

