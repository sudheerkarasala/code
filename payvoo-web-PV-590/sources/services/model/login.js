/**
 * signUpModel Model
 * signUpModel is used for the modeling of user registration purpose. An individual user has to give the required 
 * data to register himself in the payvoo app.
 * @package signUpModel
 * @subpackage sources/services/model/signUpModel
 * @author SEPA Cyber Technologies, Sekhara Suman Sahu.
 */

"use strict";

import { DbConnMgr } from '../dbconfig/dbconfig';
const DbInstance = DbConnMgr.getInstance();

export class UserModel {
  constructor() {

  }
  //Method for check duplicate user data
  getContactId(email, mobile, accountType) {
    return new Promise((resolve, reject) => {
      let sql = `SELECT c.contact_id, c.email, c.mobile FROM applicant a,contact c WHERE a.account_type='${accountType}'
		AND c.applicant_id = a.applicant_id AND (c.email='${email}'
		OR c.mobile ='${mobile}')`;
      DbInstance.executeQuery(sql).then(userData => {
        resolve(userData);
      }).catch(err => {
        reject(err);
      });
    })
  }

  //Method for cheking existing email id or mobile number
  isUserExists(value, type) {
    return new Promise((resolve, reject) => {
      let sql = `select contact_id from contact where ${type} = '${value}'`;
      DbInstance.executeQuery(sql).then(userData => {
        resolve(userData);
      }).catch(err => {
        reject(err);
      });
    })
  }

  //select the password for the login 
  loginUser(email, table, role) {
    return new Promise(function (resolve, reject) {
      logger.info('loginUser initiated at userModel')
      let sql = `select password from ${table} where user_id = '${email}' and role_id = ${role}`;
      DbInstance.executeQuery(sql).then(res => {
        logger.info('Fetched Login response at userModel')
        resolve(res);
      }).catch(err => {
        logger.error('Error while fetching loginUser response')
        reject(`${err}`);
      })
    })
  }

  //this is for the check the intialpayment status
  checkInitialPayment(applicant_id) {
    return new Promise(function (resolve, reject) {
      logger.info('checkInitialPayment initiated at userModel')
      let sql = `SELECT applicant_id FROM accounts  where applicant_id = ${applicant_id}`;
      DbInstance.executeQuery(sql).then(result => {
        logger.info('Fetched checkInitialPayment info at userModel')
        resolve(result);
      }).catch(err => {
        logger.error('Error while fetching checkInitialPayment info at userModel')
        reject(`${err}`);
      })
    })
  }

  // // this function is used for create response and send back 
  responseCreation(email, roleName) {
    return new Promise(function (resolve, reject) {
      logger.info('Initiated responseCreation for login at userModel')
      let sql = `select a.applicant_id, a.account_type, a.next_step, c.email, c.first_name, c.gender, c.last_name, c.mobile,c.phone,
			ad.address_line1, ad.address_line2, ad.city, ad.country_id, ad.postal_code, ad.region, ad.town, k.kyc_status
			from applicant a, contact c, address ad, kyc k
			where a.applicant_id=c.applicant_id and a.applicant_id= ad.applicant_id and  a.account_type ='${roleName}' and a.applicant_id= k.applicant_id and c.email = '${email}'`;
      DbInstance.executeQuery(sql).then(result => {
        logger.info('Login response captured successsfully at userModel')
        resolve(result);
      }).catch((err) => {
        logger.error('Faile to capture Login response at userModel')
        reject(`${err}`);
      })

    })
  }

  // used for get business id and append in the response of signup/ login
  getBusinessId(applicant_id) {
    return new Promise(function (resolve, reject) {
      logger.info('Initiated getBusinessId for login at userModel')
      let sql = `select business_id,country_of_incorporation,business_legal_name from business_details where applicant_id = ${applicant_id}`;
      DbInstance.executeQuery(sql).then((result) => {
        logger.info('Captured business id details successsfully for login at userModel')
        resolve(result);
      }).catch((err) => {
        logger.error('Faile to capture business id response for login at userModel')
        reject(`${err}`);
      })

    });
  }

  //this is for the get the pin
  getPin(table, email) {
    return new Promise(function (resolve, reject) {
      let sql = `select passcode_pin from ${table} where user_id = '${email}'`;
      DbInstance.executeQuery(sql).then(res => {
        resolve(res);
      })
    })
  }

  getSandboxDetails(applicant_id) {
    return new Promise(function (resolve, reject) {
      let sql = `select sandbox_id,applicant_id,memberId,api_key,url,api_doc_url,redirect_url from sandbox where applicant_id = '${applicant_id}'`
      DbInstance.executeQuery(sql).then((res) => {
        resolve(res);
      }).catch(err => {
        reject(`${err}`);
      })
    })
  }
}