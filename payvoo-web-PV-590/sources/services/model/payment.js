/**
 * payment Model
 * payment Model is used for fetching kyc status related functions.
 * @package kyc
 * @subpackage sources/services/model/payment
 * @author SEPA Cyper Technologies, Satyanarayana G.
 */

'use strict';

import { DbConnMgr } from '../dbconfig/dbconfig';
const DbInstance = DbConnMgr.getInstance();

export class Payment {
  constructor() {
    this.ERROR_CODES = {
      SUCCESS: 0,
      FAIL: 1
    }
  }
  getUserCardDetails(applicant_id, payment_cards_id) {
    return new Promise((resolve, reject) => {
      logger.info('Initialize  getUserCardDetails()');
      let sql = `SELECT a.applicant_id, a.account_type, a.next_step,
      c.email, c.first_name, c.gender, c.last_name, c.mobile,c.middle_name,c.dob,
      ad.address_line1 , ad.address_line2, ad.city, ad.country_id, ad.postal_code, ad.region, ad.town,pc.card_number,pc.card_month, pc.card_year, pc.card_cvv, pc.name_on_card ,pc.card_type ,ct.currency ,ct.calling_code as telnocc, ct.country_code , ct.country_code as country_name
      FROM applicant a
      INNER JOIN contact c ON (a.applicant_id = c.applicant_id AND a.applicant_id = ${applicant_id})
      INNER JOIN address ad ON (a.applicant_id = ad.applicant_id AND ad.address_type_id = 1)
      INNER JOIN country ct ON (ad.country_id = ct.country_id)
      INNER JOIN payment_cards pc ON (a.applicant_id= pc.applicant_id) AND pc.payment_cards_id = ${payment_cards_id}`;
      DbInstance.executeQuery(sql).then(res => {
        logger.info('getUserCardDetails successfully retrived');
        resolve(res);
      }).catch(err => {
        logger.error('Error while getUserCardDetails Fail');
        reject(err);
      })
    })
  }

  insertPayment(responseData) {
    return new Promise((resolve, reject) => {
      logger.info('Initialize  insertPayment()');
      let sql = `INSERT INTO payments (applicant_id,paymentsid,status,payment_Brand,payment_Mode,first_Name,last_Name,amount,currency,description,result,card,customer,transaction_details,created
        ,merchant_Transaction_Id,remark,trans_Status,tmpl_amount,tmpl_currency,eci,checksum,order_Description,company_Name,merchant_contact) 
        VALUES (${responseData.applicant_id}, ${responseData.paymentId}, '${responseData.status}', '${responseData.paymentBrand}', '${responseData.paymentMode}', '${responseData.firstName}', '${responseData.lastName}',
          ${responseData.amount}, '${responseData.currency}', '${responseData.descriptor}', '${responseData.result}', '${responseData.card}', '${responseData.customer}', '${responseData.transaction_details}',
          '${responseData.timestamp}', '${responseData.merchantTransactionId}', '${responseData.remark}', '${responseData.transactionStatus}', ${responseData.tmpl_amount},
          '${responseData.tmpl_currency}', '${responseData.eci}', '${responseData.checksum}', '${responseData.orderDescription}', '${responseData.companyName}', '${responseData.merchantContact}')`;

          DbInstance.executeQuery(sql).then(res => {
        logger.info('insertPayment successfully retrived');
        resolve({ status: 1, message: 'payment successfully done' });
      }).catch(err => {
        logger.error('Error while insertPayment fail');
        reject({ status: 0, message: 'payment failure' });
      })
    })
  }
  updateAccountDetails(applicantId, account_number, currency, role, paymentReference, paymentAmount) {
    let accountData = {};

    accountData.applicantId = applicantId;
    accountData.accountNumber = account_number;
    accountData.paymentAmount = paymentAmount;
    accountData.currency = currency;
    accountData.role = role;
    accountData.amount = paymentReference.amount;
    accountData.paymentObj = paymentReference;

    return new Promise(function (resolve, reject) {
      logger.info('Initialize  updateAccountDetails()');
      let sql_select = `SELECT paymentsid , applicant_id , status ,payment_Brand,  payment_Mode , amount, currency , transaction_details FROM payments WHERE applicant_id = ${accountData.applicantId} AND paymentsid = ${accountData.paymentObj.paymentId} `
      DbInstance.executeQuery(sql_select).then(function (paymentObject) {
        let sql_update = `UPDATE accounts SET balance = balance + ${accountData.paymentAmount} WHERE applicant_id = ${accountData.applicantId} AND account_no = ${accountData.accountNumber}`;
        DbInstance.executeQuery(sql_update).then(function (accountObject) {
          logger.info('updateAccountDetails() success');
          resolve({ 'status': 1, 'message': 'account updated successfully', 'paymentObject': paymentObject[0], 'accountObject': accountObject })
        }, function (err) {
          logger.info('updateAccountDetails() failure');
          reject({ 'status': 0, 'message': `Error while updating account details` })
        }
        )
      }, function (err) {
        logger.info('selection fail while , updateAccountDetails()');
        reject({ 'status': 0, 'message': `Error while inserting account details` })
      }
      )
    })
  }

  insertTransactionDetails(paymentsid, applicant_id, transactionHolderName, account_id, amount, inputCurrency, transactionObj) {
    let transactionDetailObj = {};

    transactionDetailObj.payments_id = paymentsid;
    transactionDetailObj.applicant_id = applicant_id;
    transactionDetailObj.transactionHolderName = transactionHolderName;
    transactionDetailObj.amount = amount;
    transactionDetailObj.account_id = account_id;
    transactionDetailObj.inputCurrency = inputCurrency;
    transactionDetailObj.paymentType = (transactionObj.paymentType == 'DB') ? 'CR' : 'DB';
    transactionDetailObj.paymentBrand = transactionObj.paymentBrand;
    return new Promise((resolve, reject) => {
      logger.info('Initialize  insertPayment()');
      let sql = `INSERT INTO transactions (applicant_id,transaction_number,from_account,to_account,opposite_account_owner,account_type,transaction_type,amount) VALUES (${transactionDetailObj.applicant_id}, ${transactionDetailObj.payments_id}, ${transactionDetailObj.account_id}, ${transactionDetailObj.account_id}, '${transactionDetailObj.transactionHolderName}', '${transactionDetailObj.paymentBrand}', '${transactionDetailObj.paymentType}', ${transactionDetailObj.amount})`;
      DbInstance.executeQuery(sql).then(res => {
        logger.info('insertPayment successfully retrived');
        resolve({ "status": 1, "message": `${transactionDetailObj.amount} ${transactionDetailObj.inputCurrency}s added to wallet successfully` });
      }).catch(err => {
        logger.error('Error while insertPayment fail');
        reject({ "status": 0, "message": `Fail to add walet amount` });
      })
    })
  }

}
