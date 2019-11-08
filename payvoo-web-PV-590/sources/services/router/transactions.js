/**
 * trasactions
 * This is a route file, where the identid related service is defined. 
 * @package transactions
 * @subpackage sources\services\router\transactions
 * @author SEPA Cyper Technologies, Satyanarayana G,Krishnakanth R
 */

"use strict"
import { transaction,
getTransaction,
transactionVolume,
getTransactionVolume }  from '../controller/transaction';

 
router.post('/service/countryTransaction', transaction);
router.post('/service/getcountryTransactions', getTransaction);
router.post('/service/transactionVolume', transactionVolume);
router.post('/service/gettransactionVolumes', getTransactionVolume);

module.exports = router;




