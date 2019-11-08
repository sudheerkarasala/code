/**
 * kyc route
 * This is a route file, where all the kycStatus && kycIdentity related services are defined. 
 * @package kyc
 * @subpackage sources\services\router\kyc
 * @author SEPA Cyper Technologies, Satyanarayana G.
 */

'use strict';

import { kycCurrentStatus , notifyKycStatus , verifyKyc} from '../controller/kycStatus';
import { createIdentity } from '../controller/kycIdentity';

router.post('/service/kyc/status', kycCurrentStatus);
router.get('/service/kyc/sendKycStatus/:mobileNumber/:email/:status', notifyKycStatus);
router.post('/service/kyc/verifyKyc', verifyKyc);
router.post('/service/kyc/identity', createIdentity);



module.exports = router;