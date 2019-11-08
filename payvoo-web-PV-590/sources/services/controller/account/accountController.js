/**
 * account Controller
 * account Controller is used for the user will able to enter the account details either
  business or operating or shipping
 * @package account
 * @subpackage controller/account/account
 *  @author SEPA Cyper Technologies,krishnakanth.r
 */

"use strict";

import {Account} from '../../model/account';

import {langEngConfig} from '../../utility/lang_eng'

let account = new Account();

const STATUS = {
  SUCCESS: 0,
  FAILURE: 1
}

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
export const createAccount = (req, res) => {
  let userAccount = new UserAccountDetails(req.body);
  account.insertAccount(userAccount)
    .then(result => {
      res.json(result);
    },
      err => {
        res.json(err);
      }
    );
};

// get account by id
export const getAccounts = function (req, res) {
  const applicantId = req.params.applicantId;
  account.getAccount(applicantId)
    .then(result => {
      res.send({ msg: langEngConfig.message.accountStatus.getaccountDetail, account: result, status: STATUS.SUCCESS });
    }).catch(err => {
      res.send({ msg: langEngConfig.message.accountStatus.fail, status: STATUS.FAILURE })
    })
}

// get account by currency 
export const getByCurrency = function (request, response) {
  let applicantId = request.body.applicantId;

  account.getByCurrency(applicantId)
    .then(result => {
      if (result.length > 0) {
        response.send({ account: result, status: STATUS.SUCCESS })
      } else {
        response.send({ status: STATUS.FAILURE })
      }
    })
    .catch(err => {
      response.send(err)
    })
}

// Method for activate or deactivate an account
export const statusUpdate = (req, res) => {
  let userAccount = new UserAccountDetails(req.body);

  let { status, applicantId, currency } = userAccount
  account.activateAccount(status, applicantId, currency)
    .then(res => {
      res.json(res);
    })
    .catch(err => {
      res.json(err)
    })
};
