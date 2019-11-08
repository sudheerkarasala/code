/**
 * businessSignUp route
 * This is a route file, where all the business related services such as, for registering business, businessIndustries,
 * and business sector details as well as to get the business type and sector type also defined. 
 * @package businessSignUp
 * @subpackage router\businessSignUp
 * @author SEPA Cyber Technologies, Sekhara Suman Sahu , Satyanarayana G.
 */

"use strict";

import {
  postSectorAndIndustries,
  patchSectorAndIndustries
} from '../controller/businessSignup/businessRegistration';
import {
  businessSignUp,
  businessSignUpWithoutKyb,
  typeOfBusiness,
  typeOfSector,
  typeOfSectorAndIndustries,
  typeOfIndustries
} from '../controller/businessRegistration'

//route for business registration service.
router.post('/service/businessRegistration', businessSignUp);

router.post('/service/businessRegistrationWithOutKyb', businessSignUpWithoutKyb);

// foute for get business sector industries details
router.post('/service/businessSectorIndustriesDetails', postSectorAndIndustries);

//route for updating business_sector_details.
router.patch('/service/businessSectorIndustriesDetails', patchSectorAndIndustries);

//route for get business_type service.
router.get('/service/businessType', typeOfBusiness);

//route for get sector_type service.
router.get('/service/sectorType', typeOfSector);

//route for getting business_sector_details.
router.post('/service/businessSectorIndustriesDetails', typeOfSectorAndIndustries);

//route for get businessIndustries service.
router.get('/service/businessIndustries', typeOfIndustries);


module.exports = router;
