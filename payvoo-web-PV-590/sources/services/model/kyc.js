/**
 * kyc Model
 * kyc Model is used for fetching kyc status related functions.
 * @package kyc
 * @subpackage sources/services/model/kyc
 * @author SEPA Cyper Technologies, Satyanarayana G.
 */

"use strict";

import { DbConnMgr } from '../dbconfig/dbconfig';
const DbInstance = DbConnMgr.getInstance();

export class Kyc {
  constructor() {
    this.ERROR_CODES = {
      SUCCESS: 0,
      FAIL: 1
    }
  }
  getKycByApplicant(kycApplicantId) {
    return new Promise((resolve, reject) => {
      logger.info('Initialize  getKycByApplicant()');
      let sql = `SELECT k.kyc_status, k.kyc_transaction_id, c.applicant_id,c.email, c.mobile
      FROM kyc k
      INNER JOIN contact c
      ON k.applicant_id = c.applicant_id AND c.applicant_id =${kycApplicantId}`;

      DbInstance.executeQuery(sql).then(res => {
        logger.info('Kyc details by applicantId retrived');
        resolve(res);
      }).catch(err => {
        logger.error('Error while getting kyc information');
        reject(err);
      })
    })
  }
  checkSuccessKyc(identityStatus, transactionNumber) {
    logger.info('initiated checkSuccessKyc');
    return new Promise(function (resolve, reject) {
      var sql = `UPDATE kyc SET kyc_status = '${identityStatus}' WHERE kyc_transaction_id = '${transactionNumber}'`;

      DbInstance.executeQuery(sql).then(function (results) {
        resolve(results);
      }, function (err) {
        logger.error('Error while getting checkSuccessKyc');
        reject(err);
      }
      )
    })
  }
  checkFailureKyc(messageData, applicantId) {
    logger.info('initiated checkFailureKyc');
    return new Promise(function (resolve, reject) {
      var sql = `UPDATE kyc SET kyc_status = '${messageData}' WHERE  applicant_id = ${applicantId}`;

      DbInstance.executeQuery(sql).then(function (results) {
        resolve(results);
      }, function (err) {
        logger.error('Error while getting checkFailureKyc');
        reject(err);
      }
      )
    })
  }
  checkPayVooKycStatus(applicantId)  {
    logger.info('initiated checkPayVooKycStatus()');
    return new Promise(function (resolve, reject) {
      var sql = `SELECT kyc_status FROM kyc WHERE applicant_id = ${applicantId}`;

      DbInstance.executeQuery(sql).then(function (results) {
        resolve(results);
      }, function (err) {
        logger.error('Error while getting checkPayVooKycStatus');
        reject(err);
      }
      )
    })
  }
  getUserByApplicant(kycApplicantId) {
    return new Promise((resolve, reject) => {
      logger.info('Initialize  getUserByApplicant()');
      let sql = `SELECT a.applicant_id, a.account_type, a.next_step,
      c.email, c.first_name, c.gender, c.last_name, c.mobile,c.middle_name,c.dob,
      ad.address_line1 , ad.address_line2, ad.city, ad.country_id, ad.postal_code, ad.region, ad.town,k.kyc_status,k.kyc_transaction_id, k.kyc_vendor_id,ct.country_code as country_name
      FROM applicant a
      INNER JOIN contact c ON (a.applicant_id = c.applicant_id AND a.applicant_id = ${kycApplicantId})
      INNER JOIN address ad ON (a.applicant_id = ad.applicant_id AND ad.address_type_id =1)
      INNER JOIN country ct ON (ad.country_id = ct.country_id)
      INNER JOIN kyc k ON (a.applicant_id= k.applicant_id)`;

      DbInstance.executeQuery(sql).then(res => {
        logger.info('User details by applicantId retrived');
        resolve(res);
      }).catch(err => {
        logger.error('Error while getting User information');
        reject(err);
      })
    })
  }

  checkUser(applicantId) {
    logger.info('Initiated checkUser()');
    return new Promise(function (resolve, reject) {
      var sql = `SELECT kyc_vendor_id as id , kyc_transaction_id as TransactionNumber FROM kyc WHERE applicant_id = ${applicantId}`;

      DbInstance.executeQuery(sql).then(function (results) {
        logger.info('User details by applicantId retrived');
        resolve({ status: 1, message: 'successfully fetched user details', res: results });
      }, function (err) {
        logger.error('Error while getting user details');
        reject({ status: 0, message: 'Error while getting user details' });
      }
      )
    })
  }
  updateKycDetails(kycObj) {
    logger.info('Initiated updateKyc()');
    return new Promise(function (resolve, reject) {
      var sql = `UPDATE kyc SET kyc_transaction_id = '${kycObj.transactionNumber}' , kyc_vendor_id = '${kycObj.id}'  WHERE applicant_id = ${kycObj.applicantId}`;

      DbInstance.executeQuery(sql).then(function (results) {
        logger.info('Updating kyc successfully');
        resolve(results);
      }, function (err) {
        logger.error('Error while updating kyc');
        reject(err);
      }
      )
    })
  }
}
