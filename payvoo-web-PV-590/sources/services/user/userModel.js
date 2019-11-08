/**
 * signUpModel Model
 * signUpModel is used for the modeling of user registration purpose. An individual user has to give the required 
 * data to register himself in the payvoo app.
 * @package signUpModel
 * @subpackage sources/services/model/signUpModel
 * @author SEPA Cyber Technologies, Sekhara Suman Sahu.
 */

"use strict";

import { DbConnMgr } from "../dbconfig/dbconfig";
import {forgotStatus} from './mail';

const DbInstance = DbConnMgr.getInstance();

export class User {
  constructor() {

  }

  // // used for forgot password 
  forgotPassword(business_type, email) {
    return new Promise(function (resolve, reject) {
      var sql = `SELECT user_id FROM ${business_type} WHERE user_id  = "${email}"`
      DbInstance.executeQuery(sql).then(res => {
        resolve(res);
      }).catch(err => {
        reject(err);
      })
    });
  }

  sendResetLink(email,accountType, userId) {
    return new Promise(function (resolve, reject) {
    var link = `http://${process.env.FORGOT_PASSWORD_URL}:4200/#/${accountType}-forgot/${userId}`
      forgotStatus(email,link, accountType).then(function (data) {
        resolve(data)
      }, function (err) {
        reject(err)
      })
    })
  }

  resetPassword(business_type, password, email) {
    return new Promise(function (resolve, reject) {
      let sql = `update ${business_type} set password = '${hashPassword.generate(password)}' where user_id = '${email}'`;
      DbInstance.executeQuery(sql).then(res => {
        resolve(res);
      }).catch(err => {
        reject(err);
      })
    });
  }


  // used for reset password  not in beta 
  updatePassword(business_type, newPassword, code) {
    return new Promise(function (resolve, reject) {
      let sql = `update ${business_type} set password = '${hashPassword.generate(newPassword)}' where user_id = '${code}'`
      DbInstance.executeQuery(sql).then(res => {
        resolve(res);
      }).catch(err => {
        reject(err);
      })
    });
  }

  // used for change password from profile page   not in beta 
  changePassword(business_type, applicant_id) {
    return new Promise(function (resolve, reject) {
      var sql = `SELECT password FROM ${business_type} WHERE applicant_id = ${applicant_id}`
      DbInstance.executeQuery(sql).then(res => {
        resolve(res);
      }).catch(err => {
        reject(err);
      })
    });
  }

  // used for save password from profile page   not in beta 
  saveNewPassword(business_type, newPassword) {
    return new Promise(function (resolve, reject) {
      let sql = `update ${business_type} set password = '${hashPassword.generate(newPassword)}' where applicant_id = ${req.body.applicant_id}`;
      DbInstance.executeQuery(sql).then(res => {
        resolve(res);
      }).catch(err => {
        reject(err);
      })
    })
  }

  
}

