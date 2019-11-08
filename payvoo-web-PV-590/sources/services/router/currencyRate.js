/**
 * currencyRate
 * this is used for the check the current currency rates and also show the convertamount with multiple Currency
 * @package currencyRate
 * @subpackage router/currencyRate
 *  @author SEPA Cyper Technologies,krishnakanth.r
 */
"use strict";

import {currencyRate,deleteCurrencyRate,addRate} from '../controller/currencyRate';

router.post('/service/v1/currencyRate', currencyRate);
//insert rates or convertion data in database
router.post('/service/v1/checkRate',addRate);
   
// This method is used for delete cuurencyRates
router.delete('/service/v1/currencyRate/:check_rates_id', deleteCurrencyRate);
  

module.exports=router;