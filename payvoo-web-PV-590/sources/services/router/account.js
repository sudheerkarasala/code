/**
 * account route
 * account route is used for the user will able to enter the account and get the account details of either
  business or operating or shipping
 * @package account
 * @subpackage router/account
 *  @author SEPA Cyper Technologies,krishnakanth.r
 */


import {createAccount, statusUpdate, getAccounts, getByCurrency} from "../controller/account";

// Route for creating new currency account
router.post("/service/v1/account", createAccount);
router.get('/service/v1/account/:applicantId', getAccounts)
router.post('/service/v1/getByCurrency', getByCurrency)
router.patch("/service/v1/account", statusUpdate);

module.exports = router;
