
/**
 * moneyTransfer
 * This router contains all the services related to account to account money transfer.
 * @package moneyTransfer
 * @subpackage router/moneyTransfer
 * @author SEPA Cyber Technologies Sekhara Suman Sahu
 */

import {AccountTransfer,transactionDetails} from '../controller/moneyTransfer'; 
 /* Transaction route*/
router.post('/service/v1/accountTransfer', AccountTransfer);

/* Get transaction details*/
router.get('/service/v1/transaction/:applicant_id/:account_id/:device_type',transactionDetails);
    

// /* Get transaction details*/
// router.get('/service/v1/webTransaction/:applicant_id/:account_id',((request,response)=>{
//     paymentCard.webTransDetails(request,response).then(res=>{
//         response.send(res);
//     }, (error)=>{
//         response.send(error);
//     })
// })
// )

module.exports = router;