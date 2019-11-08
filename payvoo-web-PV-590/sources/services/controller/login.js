/**
 * loginController Controller
 * loginController is used for authentication of user to allow to enter into payvoo app.
 * it will go to  validate  the user email and password then only it will allow into payvoo
 * @package loginController
 * @subpackage controller/login/loginController
 * @author SEPA Cyper Technologies, Sekhara Suman Sahu.
 */
"use strict";

import { UserModel } from '../model/login';
//var userModel = require('../../model/userModel');
import { loginConfig } from '../utility/loginConfig';
import { TokenModel } from '../model/tokenManager';
const tokenModel = new TokenModel
const userModel = new UserModel();
//  this is the common login function for both business_users and personal
export const loginUser = (request, response) => {
  logger.info('loginUser router initiated')
  return new Promise((resolve, reject) => {
    let email = request.body.email;
    let pwd = request.body.password;
    let mpin = request.body.mpin;
    let account_type = request.body.account_type;
    let role = 1;
    let roleName = "personal";
    let table = 'user_login';
    let token =  uuidv1()+Math.floor(new Date() / 1000);
    const status = {
      success: 0,
      failure: 1
    }
    if (account_type && typeof (account_type) != 'undefined') {
      if (_.toLower(account_type) != "personal") {
        table = 'business_users';
        (_.toLower(account_type) == "business") ? (roleName = "business", role = 2) : (roleName = "sandbox", role = 7);
      }
    } else {
      logger.debug('Email not found')
      response.send({ status: status.failure, message: loginConfig.message.emailNotFound });
    }
    if (typeof (email) == 'undefined' || email == "") {
      logger.debug('Email not found')
      return response.send({ message: loginConfig.message.emailNotFound, status: status.failure });
    }
    var data = {
      Token: jwt.sign({ email: email }, process.env.PASSWORD_CONFIG),
      client_auth: jwt.sign({ email: email }, process.env.PASSWORD_CONFIG1, { expiresIn: 60 * 30 }),
      member_id: process.env.CLIENT_ID,
      api_access_key: process.env.API_KEY,
      status: status.success, message: "login successfull",
      'x-auth-token': token
    }
     if (pwd != "" && typeof (pwd) != 'undefined') {
      userModel.loginUser(email, table, role).then(loginRes => {
        if (_.size(loginRes) > 0) {
          if (hashPassword.verify(pwd, loginRes[0].password)) {
            // var data = {
            //   Token: jwt.sign({ email: email }, process.env.PASSWORD_CONFIG),
            //   client_auth: jwt.sign({ email: email }, process.env.PASSWORD_CONFIG1, { expiresIn: 60 * 30 }),
            //   member_id: process.env.CLIENT_ID,
            //   api_access_key: process.env.API_KEY,
            //   status: status.success, message: "login successfull",
            //   'x-auth-token': token
            // }
            createResponse(email, roleName, data).then((data) => {
              tokenModel.saveToken(JSON.parse(data).userInfo.applicant_id,token).then(saveToken=>{
                userModel.checkInitialPayment(JSON.parse(data).userInfo.applicant_id).then(result => {
                  if (_.size(result) > 0) {
                      logger.info('Initial payments TRUE')
                      let results = JSON.parse(data);
                      delete results.userInfo.applicant_id;
                      results.userInfo.initialPayment = true
                      return response.send(ResponseHelper.buildSuccessResponse(results,responseStatusHandler.SUCCESS.LOGIN_SUCCESS))

                      //return response.send(results);
                  } else {
                      logger.info('Initial payments FALSE')
                      let results = JSON.parse(data);
                      delete results.userInfo.applicant_id;
                      results.userInfo.initialPayment = false
                      //response.send(results);
                      response.send(ResponseHelper.buildSuccessResponse(results,responseStatusHandler.SUCCESS.LOGIN_SUCCESS))
                  }
              }).catch(err => {
                  //response.send({ message: `${err}`, status: status.failure })
                  logger.debug(customLogger(responseStatusHandler.NOT_FOUND.CODE, responseStatusHandler.NOT_FOUND.TOKEN_FAILURE));
                  throw new CustomError(responseStatusHandler.NOT_FOUND.TOKEN_FAILURE, responseStatusHandler.NOT_FOUND.CODE);
                  //response.send(ResponseHelper.buildFailureResponse(responseStatusHandler.NOT_FOUND.FETCH_FAILURE))
              })
              }).catch((err) => {
                response.send({ message: `${err}`, status: status.failure })
              })
              
            }).catch((err) => {
              //response.send(ResponseHelper.buildFailureResponse(responseStatusHandler.NOT_FOUND.FETCH_FAILURE))
              logger.debug(customLogger(responseStatusHandler.NOT_FOUND.CODE, responseStatusHandler.NOT_FOUND.TOKEN_FAILURE));
              throw new CustomError(responseStatusHandler.NOT_FOUND.TOKEN_FAILURE, responseStatusHandler.NOT_FOUND.CODE);
              //response.send({ message: `${err}`, status: status.failure })
            })
          } else {
            logger.debug('Password invalid')
            response.send({ message: loginConfig.message.passwordInvalid, status: status.failure })
          }
        } else {
          logger.debug('Email not found')
          response.send({ message: loginConfig.message.emailNotFound, status: status.failure })
        }

      }).catch(err => {
        //response.send(ResponseHelper.buildFailureResponse(responseStatusHandler.NOT_FOUND.FETCH_FAILURE))
        logger.error(customLogger(responseStatusHandler.NOT_FOUND.CODE, responseStatusHandler.NOT_FOUND.TOKEN_FAILURE));
        throw new CustomError(responseStatusHandler.NOT_FOUND.TOKEN_FAILURE, responseStatusHandler.NOT_FOUND.CODE);
        //response.send({ status: status.failure, message: `${err}` })
      })
    } if (mpin && typeof (mpin) != 'undefined') {
      // login with MPIN
      //myPool.query(`select passcode_pin from ${table} where user_id = '${email}'`).then(res => {
      userModel.getPin(table, email).then(res => {
        if (_.size(res) > 0 && mpin == res[0].passcode_pin) {
          createResponse(email, roleName, data).then((data) => {
            userModel.checkInitialPayment(JSON.parse(data).userInfo.applicant_id).then((result) => {
              if (_.size(result) > 0) {
                if (_.size(result) > 0) {
                  data.userInfo.initialPayment = true
                } else {
                  data.userInfo.initialPayment = false
                }
                return response.send(ResponseHelper.buildSuccessResponse(JSON.parse(data),responseStatusHandler.SUCCESS.MPIN_LOGIN_SUCCESS))
                //return response.send(data)
                //response.send(ResponseHelper.buildSuccessResponse(data,responseStatusHandler.SUCCESS.MPIN_LOGIN_SUCCESS))
                //return response.send(data);
              } else {
                return response.send(ResponseHelper.buildSuccessResponse(JSON.parse(data),responseStatusHandler.SUCCESS.MPIN_LOGIN_SUCCESS))
              }
            }).catch((err) => {
              //response.send(ResponseHelper.buildFailureResponse(responseStatusHandler.NOT_FOUND.FETCH_FAILURE))
              logger.debug(customLogger(responseStatusHandler.NOT_FOUND.CODE, responseStatusHandler.NOT_FOUND.TOKEN_FAILURE));
              throw new CustomError(responseStatusHandler.NOT_FOUND.TOKEN_FAILURE, responseStatusHandler.NOT_FOUND.CODE);
              //response.send({ message: `${err}`, status: status.failure })
            })
          }).catch((err) => {
            //response.send(ResponseHelper.buildFailureResponse(responseStatusHandler.NOT_FOUND.FETCH_FAILURE))
            logger.debug(customLogger(responseStatusHandler.NOT_FOUND.CODE, responseStatusHandler.NOT_FOUND.TOKEN_FAILURE));
            throw new CustomError(responseStatusHandler.NOT_FOUND.TOKEN_FAILURE, responseStatusHandler.NOT_FOUND.CODE);
            //response.send({ message: `${err}`, status: status.failure })
          })
        } else {
          logger.debug('Password invalid')
          return response.send(ResponseHelper.buildFailureResponse(loginConfig.message.passwordInvalid));
         // return response.send({ message: loginConfig.message.passwordInvalid, status: status.failure })
        }
      })
    }
  })
}
let createResponse = function (email, roleName, data) {
  return new Promise(function (resolve, reject) {
    userModel.responseCreation(email, roleName).then(result => {
      if (_.size(result) > 0) {
        data.userInfo = {
          applicant_id: result[0].applicant_id,
          email: result[0].email,
          gender: result[0].gender,
          mobile: result[0].mobile,
          phone: result[0].phone,
          first_name: result[0].first_name,
          last_name: result[0].last_name,
          account_type: result[0].account_type,
          kycStatus: result[0].kyc_status,
          country_id: result[0].country_id
        }
        if (_.toLower(result[0].account_type) == "personal") {
          logger.info('User type : ' + _.toLower(result[0].account_type));
          logger.info(_.toLower(result[0].account_type) + ' user response wrapper');
          data.userInfo.first_name = result[0].first_name,
            data.userInfo.last_name = result[0].last_name,
            data.userInfo.next_step = result[0].next_step,
            data.userInfo.address_line1 = result[0].address_line1,
            data.userInfo.address_line2 = result[0].address_line2,
            data.userInfo.city = result[0].city,
            data.userInfo.postal_code = result[0].postal_code,
            data.userInfo.region = result[0].region,
            data.userInfo.town = result[0].town
          logger.debug(_.toLower(result[0].account_type) + ' login success');
          resolve(JSON.stringify(data))
        } else {
          if (_.toLower(result[0].account_type) == "business") {
            logger.info('User type : ' + _.toLower(result[0].account_type));
            logger.info(_.toLower(result[0].account_type) + ' user response wrapper');
            userModel.getBusinessId(result[0].applicant_id).then(business_Id => {
              if (_.size(business_Id) > 0) {
                data.userInfo["business_Id"] = business_Id[0].business_id,
                  data.userInfo["business_country_of_incorporation"] = business_Id[0].country_of_incorporation,
                  data.userInfo["business_legal_name"] = business_Id[0].business_legal_name
                logger.info(_.toLower(result[0].account_type) + 'login success');
                resolve(JSON.stringify(data))
              } else {
                data.userInfo["business_Id"] = null,
                  data.userInfo["business_country_of_incorporation"] = null,
                  data.userInfo["business_legal_name"] = null
                logger.debug(_.toLower(result[0].account_type) + ' login success');
                resolve(JSON.stringify(data))
              }
            }).catch((err) => {
              logger.error('Error while fetching bussiness details');
              reject(err);
            })
          } else {
            logger.info('User type : ' + _.toLower(result[0].account_type));
            logger.info(_.toLower(result[0].account_type) + ' user response wrapper');
            userModel.getSandboxDetails(result[0].applicant_id).then((result) => {
              //console.log(result);
              if (_.size(result) > 0) {
                data.isSandbox = 'true'
                data.sandBoxInfo = result[0]
                data.sandBoxInfo.url = `${process.env.SANDBOX_URL}/mock/service/v1`
                data.sandBoxInfo.api_doc_url = `${process.env.SANDBOX_API_DOC_URL}`
                logger.info(_.toLower(result[0].account_type) + ' login success');
                resolve(JSON.stringify(data))
              }
              else {
                logger.debug(_.toLower(result[0].account_type) + ' login success');
                resolve(JSON.stringify(data))
              }
            });
          }
        }
      } else {
        logger.debug('login success with empty results');
        resolve(JSON.stringify(data))
      }
    }).catch(err => {
      logger.error('Error while fetching logging user');
      reject(err);
    })
  })
}
