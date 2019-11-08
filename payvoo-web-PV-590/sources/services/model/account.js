/**
 * account
 * This model is used to support the account controller methods.
 * @package account
 * @subpackage model/account
 *  @author SEPA Cyber Technologies, krishnakanth.r, Sekhara suman sahu
 */
"use strict";

import { DbConnMgr } from "../dbconfig/dbconfig";
const dbInstance = DbConnMgr.getInstance();


export class Account {
  constructor() { }

  getAccountInfo(userAccount) {
    return new Promise((resolve, reject) => {
      let { currency, applicantId, balance, status, role } = userAccount
      let sql = `SELECT currency,applicant_id, balance FROM accounts WHERE currency="${currency}" AND applicant_id=${applicantId}`;
      dbInstance.executeQuery(sql).then(result => {
        resolve(_.filter(result, { status: 1 }))
      }, err => {
        reject(err)
      });
    });
  }

  updateAccountInfo(userAccount) {
    return new Promise((resolve, reject) => {
      let { currency, applicantId, balance, status, role } = userAccount
      let sql = `UPDATE accounts SET status=${status},role_id=${role},balance=${balance} WHERE currency="${currency}" AND applicant_id=${applicantId}`;
      dbInstance.executeQuery(sql).then(result => {
        resolve(_.filter(result, { status: 1 }))
      }, err => {
        reject(err)
      });
    });
  }

  insertAccountInfo(userAccount) {
    return new Promise((resolve, reject) => {
      let { currency, applicantId, balance, status, role } = userAccount
      let sql = `INSERT INTO accounts (currency,status,applicant_id,role_id,balance) VALUES("${currency}",${status},${applicantId},${role},${balance})`;
      dbInstance.executeQuery(sql).then(result => {
        resolve(_.filter(result, { status: 1 }))
      }, err => {
        reject(err)
      });
    });
  }

  getAccount(applicantId) {
    return new Promise((resolve, reject) => {
      let sql = `select account_no,currency,status,applicant_id,role_id,balance from accounts where applicant_id= ${applicantId}`;
      dbInstance.executeQuery(sql)
        .then(result => {
          resolve(result)
        }, err => {
          reject(err)
        });
    });
  }

  getByCurrency(applicantId) {
    return new Promise((resolve, reject) => {
      dbInstance.executeQuery(`select account_no,currency,status,applicant_id,role_id,balance from accounts where applicant_id=${applicantId} `).then((res) => {
        resolve(res)
      }, err => {
        reject({ err });
      });
    });
  }

  //method for activate or deactivate account
  activateAccount(status, applicantId, currency) {
    return new Promise((resolve, reject) => {
      let sql = `UPDATE accounts SET status=${status} WHERE applicant_id=${applicantId} AND currency="${currency}"`;
      dbInstance.executeQuery(sql)
        .then((result) => {
          resolve(result);
        }, err => {
          reject(`${err}`);
        });
    });
  }
}
