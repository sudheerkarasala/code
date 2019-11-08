/**
 * signUpController Controller
 * signUpController is used for the user registration purpose. An individual user has to give the required 
 * data to register himself in the payvoo app.
 * @package signUpController
 * @subpackage controller/signUP/signUpController
 * @author SEPA Cyber Technologies, Sekhara Suman Sahu.
 */

"use strict";

//Required file import.
import {UserModel} from '../model/signUp';
import {signupConfig} from '../utility/signUp';
import {config} from '../dbconfig/connection';
import {mariadb} from '../dbconfig/dbconfig';
import {Utils} from '../utility/utils';
import {TokenModel} from '../model/tokenManager';
const tokenModel = new TokenModel();
//Require Module import
const uuidAPIKey = require('uuid-apikey');
const crypto = require('crypto');
var mailer = require('../mailer/mail');

//Object initialization of required file
const userModel = new UserModel();
const util = new Utils();

//Status Object for success or failure case
const STATUS = {
  SUCCESS : 0,
  FAILURE : 1
}
//UserDataParser Class for User data initialization
export class UserDataParser {
  constructor(userdata) {
    this.applicant = {
      "account_type": userdata.account_type,
      "next_step": userdata.next_step
    };
    this.contact = {
      "first_name": userdata.first_name,
      "middle_name": userdata.middle_name,
      "last_name": userdata.last_name,
      "email": userdata.email,
      "gender": userdata.gender,
      "dob": userdata.dob,
      "telephone": userdata.telephone,
      "mobile": userdata.mobile,
      "phone": userdata.phone ? userdata.phone : '',
    };
    this.address = {
      "country_id": userdata.country_id,
      "postal_code": userdata.postal_code,
      "address_line1": userdata.address_line1,
      "address_line2": userdata.address_line2,
      "city": userdata.city,
      "town": userdata.town,
      "region": userdata.region
    };
    this.login = {
      "password":userdata.password,
      "passcode_pin": userdata.passcode_pin,
      "role_id": userdata.role_id,
      "email_verified": userdata.email_verified,
      "mobile_verified": userdata.mobile_verified
    };
    this.applicant_id = userdata.applicant_id;
    this.token =  uuidv1()+Math.floor(new Date() / 1000);
  }
}

//Method for user registretion
export const registerUser = (request, response) => {
//Data initialization with Class object from request body  
const userDataParser = new UserDataParser(request.body);

/*Set login table , role and address type based on user account type*/
var userLoginTable = signupConfig.sql.insert_userLogin;
var roleId = 1;
var address_type_id = 1;

if (_.toLower(userDataParser.applicant.account_type) == "business") {
  userLoginTable = signupConfig.sql.insert_businessLogin;
  roleId = 2;
  address_type_id = null;
}
if (_.toLower(userDataParser.applicant.account_type) == "sandbox") {
  userLoginTable = signupConfig.sql.insert_businessLogin;
  roleId = 7;
  address_type_id = null;
}

let accountType = "Sandbox";
if (_.toLower(userDataParser.applicant.account_type) === "personal") {
  accountType = "Personal"
}

if (_.toLower(userDataParser.applicant.account_type) === "business") {
  accountType = "Business"
}

//Check the contactid if user is already exist based upon emial and mobile number.(For unique email, mobile number)
userModel.getContactId(userDataParser.contact.email, userDataParser.contact.mobile, accountType)
  .then(contactDetails => {
    if(contactDetails.length == 0) { 
    // If no data found means its a first time user  
    mariadb.createConnection(config)
    .then(conn => {
      conn.query("SET autocommit=0")
      .then(() => {
        //get a data base connection and start transaction
        conn.beginTransaction()
        .then(() => {
          //Insert into applicant table
          userModel.createApplicant(conn,userDataParser.applicant.account_type,userDataParser.applicant.next_step)
          .then(applicantResult => {
            tokenModel.saveToken(applicantResult.insertId,userDataParser.token).then(saveToken=>{
            //Insert into contact table with applicant id got from above query
            userModel.createContact(conn,applicantResult.insertId, userDataParser.contact.first_name, userDataParser.contact.middle_name, userDataParser.contact.last_name, userDataParser.contact.email, userDataParser.contact.gender, userDataParser.contact.dob, userDataParser.contact.telephone, userDataParser.contact.mobile, userDataParser.contact.phone)
              .then(contactRes => {
                //Insert into addresss table with contact id got from above query
                userModel.createAddress(conn,applicantResult.insertId,contactRes.insertId,address_type_id, userDataParser.address.country_id,userDataParser.address.postal_code, userDataParser.address.address_line1, userDataParser.address.address_line2, userDataParser.address.city, userDataParser.address.town, userDataParser.address.region)
                .then(addressRes => {
                  //Password hashing
                  let password=hashPassword.generate(userDataParser.login.password);
                  //Insert into user_login table for authentication
                  userModel.createUser(userLoginTable,conn,userDataParser.contact.email,applicantResult.insertId,password,userDataParser.login.passcode_pin,roleId)
                  .then(userRes=>{
                    ////Insert into kyc table
                    userModel.insertKycDetails(conn,applicantResult.insertId)
                    .then(kycRes =>{
                      if(_.toLower(userDataParser.applicant.account_type) === 'business'){
                        //By default create a "EUR" currency account for user
                        userModel.createCurrencyAccount(conn,applicantResult.insertId,roleId)
                        .then(currenyAccountRes=>{})
                        .catch(err=>{});
                      }
                        let apiKey = uuidAPIKey.create();
                        let memberId = crypto.randomBytes(6).toString('hex');
                        const url = process.env.SANDBOX_URL;
                        const api_doc_url = process.env.SANDBOX_API_DOC_URL;
                        const redirect_url = process.env.SANDBOX_REDIRECT_URL;

                        //Authentication parameters
                        let data = {
                          Token: jwt.sign({email: userDataParser.contact.email},process.env.PASSWORD_CONFIG),
                          status: STATUS.SUCCESS,
                          message: signupConfig.message.signUp.success,
                          client_auth: jwt.sign({email: userDataParser.contact.email},process.env.PASSWORD_CONFIG1),
                          member_id: process.env.CLIENT_ID,
                          api_access_key: process.env.API_KEY,
                          'x-auth-token': userDataParser.token
                        };
                        //If registration for Sanbox insert into sanbox related table and give proper response
                        if (_.toLower(userDataParser.applicant.account_type) === "sandbox") {
                          userModel.createSandboxUser(conn,applicantResult.insertId, memberId, apiKey.apiKey, url, api_doc_url, redirect_url)
                          .then(sandRes => {
                            if (sandRes.affectedRows > 0){
                              //send welcome mail
                              mailer.signupMail(userDataParser.contact.email,userDataParser.contact.first_name, userDataParser.contact.last_name)
                              .then((resolve) => {})
                              .catch((err)=>{});
                              
                              //create response object
                              util.signUpResObject(data,applicantResult.insertId,userDataParser.contact,userDataParser.address,userDataParser.applicant)
                              .then(data => { 
                                conn.commit();
                                conn.close();
                                response.send(ResponseHelper.buildSuccessResponse(data,));
                                //response.send(data);
                              })   
                            }
                          })
                          .catch(err => {
                            conn.rollback();
                            conn.close();
                            response.send({status:STATUS.FAILURE,Error:`${err}`});
                          }) 
                        } else {
                           //send welcome mail
                          mailer.signupMail(request.body.email, request.body.first_name, request.body.last_name)
                          .then((resolve)=>{})
                          .catch(err=>{});
                          //create response object
                          util.signUpResObject(data,applicantResult.insertId,userDataParser.contact,userDataParser.address,userDataParser.applicant)
                          .then(data=>{
                            conn.commit();
                            conn.close();
                            response.send(ResponseHelper.buildSuccessResponse(data,));
                            //response.send(data);
                          })
                        } 
                    })
                    .catch(err => {
                      conn.rollback();
                      conn.close();
                      response.send({status:STATUS.FAILURE,Error:`${err}`});
                    });  
                  })
                  .catch(err => {
                    conn.rollback();
                    conn.close();
                    response.send({status:STATUS.FAILURE,Error:`${err}`});
                  })
                })
                .catch(err=>{
                  conn.rollback();
                  conn.close();
                  response.send({status:STATUS.FAILURE,Error:`${err}`});
                })
              })
              .catch(err=>{
                conn.rollback();
                conn.close();
                response.send({status:STATUS.FAILURE,Error:`${err}`});
              })
           }, err => {
            conn.rollback();
            response.send({status:STATUS.FAILURE,Error:`${err}`});
           });
          })
          .catch(err => {
            conn.rollback();
            conn.close();
            response.send({status:STATUS.FAILURE,Error:`${err}`});
          })
        })
        .catch(err => {                    
          conn.rollback();
          conn.close();
          response.send({status:STATUS.FAILURE,Error:`${err}`});                    
        })
      })
      .catch(err => {
        response.send({status:STATUS.FAILURE,Error:`${err}`});
      })
    })
    .catch(err => {
      response.send({status:STATUS.FAILURE,Error:`${err}`});
    })    
    } else {
      //Check for duplicate email mobile and generate propper response.
      if(contactDetails[0].email == userDataParser.contact.email && contactDetails[0].mobile == userDataParser.contact.mobile){
        return response.send(ResponseHelper.buildFailureResponse(signupConfig.message.signUp.emailAndMobileExist));
        // return response.send({
        //   message: signupConfig.message.signUp.emailAndMobileExist,
        //   status: STATUS.FAILURE
        // })
      } else if (contactDetails[0].email == userDataParser.contact.email){
        return response.send(ResponseHelper.buildFailureResponse(signupConfig.message.signUp.emailExist));
        // return response.send({
        //   message: signupConfig.message.signUp.emailExist,
        //   status: STATUS.FAILURE
        // })
      } else {
         response.send(ResponseHelper.buildFailureResponse(signupConfig.message.signUp.mobileExist));
        // response.send({
        //   message: signupConfig.message.signUp.mobileExist,
        //   status: STATUS.FAILURE
        // });
      }
    }
  })
  .catch(err=>{
   response.send({status: STATUS.FAILURE, err : `${err}`});
  })
}


//Method for cheking existing email id or mobile number
export const isUserExists = (request, response)=>{
  const value = request.body.value;
  let type = 'mobile';

  if(value.includes("@")){
    type = 'email';
  }

  userModel.isUserExists(value, type)
  .then(result=>{
    if(_.size(result) > 0){
      if(type === 'email'){
        response.send(ResponseHelper.buildSuccessResponse({},signupConfig.message.signUp.emailExist));
       // response.send({msg : signupConfig.message.signUp.emailExist, status : STATUS.SUCCESS});
      } else {
        response.send(ResponseHelper.buildSuccessResponse({},signupConfig.message.signUp.mobileExist));
       // response.send({msg : signupConfig.message.signUp.mobileExist, status : STATUS.SUCCESS});
      }
    } else {
      response.send(ResponseHelper.buildFailureResponse(signupConfig.message.signUp.valueDoesntAExist));
      //response.send({msg:signupConfig.message.signUp.valueDoesntAExist, status:STATUS.FAILURE})
    }
  })
  .catch(err=>{
    response.send({status: STATUS.FAILURE, Error: err});
  })
}

export const kycEntry = (request, response) => {
  const userDataParser = new UserDataParser(request.body);
  userModel.kycEntry(userDataParser.applicant_id).then(result => {
    if (result.affectedRows > 0) {
      response.send({ status: STATUS.SUCCESS })
    } else {
      response.send({ status: STATUS.FAILURE })
    }
  }, err => {
    response.send({ status: STATUS.FAILURE })
  })
}
