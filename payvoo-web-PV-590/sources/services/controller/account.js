/**
 * account Controller
 * account Controller is used for creating multy currency account.
 * @package account
 * @subpackage controller/account
 *  @author SEPA Cyber Technologies, krishnakanth.r, Sekhara suman sahu
 */

"use strict";

import { Account } from '../model/account';
import { langEngConfig } from '../utility/lang_eng'
let account = new Account();

const STATUS = {
  SUCCESS: 0,
  FAILURE: 1,
  DEACTIVE: 2
};

//Class for user currency account
export class UserAccountDetails {
  constructor(accountDetails) {
    this.currency = accountDetails.currency,
      this.applicantId = accountDetails.applicantId,
      this.balance = accountDetails.balance,
      this.status = accountDetails.status,
      this.role = accountDetails.role;
  }
}


// Method for creating new currency account
export const createAccount = (request, response) => {
  logger.info('initiated');
  let userAccount = new UserAccountDetails(request.body);
  account.getAccountInfo(userAccount).then(result => {
    if (result.length == 0) {
      account.insertAccountInfo(userAccount).then(result => {
        logger.info('execution completed');
        response.send({
          status: STATUS.SUCCESS,
          message: langEngConfig.message.update.success
        });
      }, errorInInsertAccount => {
        response.send({ message: errorInInsertAccount, status: STATUS.FAILURE })
      });
    } else {
      logger.info('execution completed');
      account.updateAccountInfo(userAccount).then(result => {

      }, errorInUpdateAccount => {
        logger.info('execution completed');
        response.send({ message: errorInUpdateAccount, status: STATUS.FAILURE })
      });
    }
  }, errorInGetAccount => {
    logger.info('execution completed');
    response.send({ message: errorInGetAccount, status: STATUS.FAILURE })
  })
};

// get account by id
export const getAccounts = function (request, response) {
  logger.info('initiated');
  const applicantId = request.params.applicantId;
  account.getAccount(applicantId)
    .then(result => {
      logger.info('initiated');
      response.send(ResponseHelper.buildSuccessResponse({account:result}, ));
     // response.send({ msg: langEngConfig.message.accountStatus.getaccountDetail, account: _.filter(result, { status: 1 }), status: STATUS.SUCCESS });
    }).catch(err => {
      logger.info('execution completed');
      response.send(ResponseHelper.buildFailureResponse(langEngConfig.message.accountStatus.fail));
      //response.send({ msg: langEngConfig.message.accountStatus.fail, status: STATUS.FAILURE })
    });
}

// get account by currency 
export const getByCurrency = function (request, response) {
  logger.info('initiated');
  let applicantId = request.body.applicantId;
  account.getByCurrency(applicantId)
    .then(result => {
      if (result.length > 0) {
        logger.info('execution completed');
        response.send({ account: result, status: STATUS.SUCCESS })
      } else {
        logger.info('execution completed');
        response.send({ status: STATUS.FAILURE })
      }
    }, err => {
      logger.info('execution completed');
      response.send({ message: err, status: STATUS.FAILURE })
    });
}

// Method for activate or deactivate an account
export const statusUpdate = (request, response) => {
  logger.info('initiated');
  let userAccount = new UserAccountDetails(request.body);
  let { status, applicantId, currency } = userAccount
  account.activateAccount(status, applicantId, currency)
    .then(result => {
      if (status == 1) {
        logger.info('execution completed');
        response.send({
          status: STATUS.SUCCESS,
          message: langEngConfig.message.accountStatus.success1
        });
      } else {
        logger.info('execution completed');
        response.send({
          status: STATUS.SUCCESS,
          message: langEngConfig.message.accountStatus.success2
        });
      }
    })
    .catch(err => {
      logger.info('execution completed');
      response.send(err)
    })
};
