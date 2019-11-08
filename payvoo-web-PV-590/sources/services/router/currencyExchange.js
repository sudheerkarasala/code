/**
 * currencyExchange route
 * currencyExchange route is used for the user will able to enter the currencyExchange and get,update,delete and insert the currencyExchange details 
 * @package account
 * @subpackage router/currencyExchange
 *  @author SEPA Cyper Technologies,Tarangini Dola
 */
'use strict';
import {deleteCurrencyExchange,updateCurrencyExchange,getCurrencyExchange,insertCurrencyExchange} from '../controller/currencyExchange';

router.post('/service/v1/currencyExchange',insertCurrencyExchange);
router.delete('/service/v1/currencyExchange/:auto_exchange_id',deleteCurrencyExchange);
router.put('/service/v1/currencyExchange/:auto_exchange_id',updateCurrencyExchange);
router.get('/service/v1/currencyExchange/:applicant_id',getCurrencyExchange);


module.exports = router;