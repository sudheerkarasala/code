
/**
 * businessOwner route
 * This is a route file, where all the businessOwner related services are defined. 
 * @package businessOwner
 * @subpackage sources\services\router\businessOwner
 * @author SEPA Cyber Technologies, Tarangini Dola , Satyanarayana G
 */

"use strict";

import { saveBusinessOwner, getStakeholdersInfo, getBusinessOwnersById, addBusinessOwner, getBusinessOwnersByCId, updateBusinessOwnerStatus, updateBusinessOwner, deleteBusinessOwnerKyb, getBusinessOwnerDetails } from '../controller/businessOwner'

router.post('/service/businessOwner', saveBusinessOwner);
router.get('/service/businessOwners/:id/:type', getStakeholdersInfo);
router.get('/service/businessOwners/:business_id', getBusinessOwnersById);
router.post('/service/businessOwners', addBusinessOwner);
router.get('/service/businessOwnersContact/:contact_id', getBusinessOwnersByCId);
router.patch('/service/businessOwners', updateBusinessOwnerStatus);
router.put('/service/businessOwners', updateBusinessOwner);
router.delete('/service/businessOwners/:kyb_document_id/:type', deleteBusinessOwnerKyb);
router.get('/service/businessOwnerDetails/:token', getBusinessOwnerDetails);


module.exports = router;
