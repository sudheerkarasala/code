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
import {UserModel} from '../model/userModel';
import {signupConfig} from '../utility/signUpConfig';
import {config} from '../dbconfig/connection';
import {mariadb} from '../dbconfig/dbconfig';
import {Utils} from './utils';


//Require Module import
const uuidAPIKey = require('uuid-apikey');
const crypto = require('crypto');
var mailer = require('../mailer/mail');

//Object initialization of required file
const userModel = new UserModel();
const util = new Utils();

//Status Object for success or failure case
const STATUS = {
  SUCCESS : 1,
  FAILURE : 0
}
//UserDataParser Class for User data initialization
export class UserDataParser {
  constructor(userdata) {
    this.applicant = {
      "account_type": userdata.account_type,
      "next_step": userdata.next_step
    }
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
    }
    this.address = {
      "country_id": userdata.country_id,
      "postal_code": userdata.postal_code,
      "address_line1": userdata.address_line1,
      "address_line2": userdata.address_line2,
      "city": userdata.city,
      "town": userdata.town,
      "region": userdata.region
    }
    this.login = {
      "password":userdata.password,
      "passcode_pin": userdata.passcode_pin,
      "role_id": userdata.role_id,
      "email_verified": userdata.email_verified,
      "mobile_verified": userdata.mobile_verified
    }
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
                          api_access_key: process.env.API_KEY  
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
                                response.send(data);
                              })   
                            }
                          })
                          .catch(err => {
                            conn.rollback();
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
                            response.send(data);
                          })
                        } 
                    })
                    .catch(err => {
                      conn.rollback();
                      
                      response.send({status:STATUS.FAILURE,Error:`${err}`});
                    });  
                  })
                  .catch(err => {
                    conn.rollback();
                    
                    response.send({status:STATUS.FAILURE,Error:`${err}`});
                  })
                })
                .catch(err=>{
                  conn.rollback();
                  
                  response.send({status:STATUS.FAILURE,Error:`${err}`});
                })
              })
              .catch(err=>{
                conn.rollback();
                
                response.send({status:STATUS.FAILURE,Error:`${err}`});
              })
          })
          .catch(err => {
            conn.rollback();
            
            response.send({status:STATUS.FAILURE,Error:`${err}`});
          })
        })
        .catch(err => {                    
          conn.rollback();
          
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
        return response.send({
          message: signupConfig.message.indexCountry.emailAndMobileExist,
          status: STATUS.FAILURE
        })
      } else if (contactDetails[0].email == userDataParser.contact.email){
        return response.send({
          message: signupConfig.message.indexCountry.emailExist,
          status: STATUS.FAILURE
        })
      } else {
        response.send({
          message: signupConfig.message.indexCountry.mobileExist,
          status: STATUS.FAILURE
        });
      }
    }
  })
  .catch(err=>{
   response.send({status: STATUS.FAILURE, err : `${err}`});
  })
}

// this function is used to get list of country
let getCountriesList = function (request,response) {
	let countryObject = new country(request);
	return new Promise(function (resolve, reject) {
		countryObject.getCountriesList().then(result=>{
			response.send(JSON.stringify(result));
		}).catch((err)=>{
			response.send({Error:`${err}`,status:1});
		})
	});
}

// // this function is used to get country details by Id 
// let getCountryById = function (request, response) {
// 	let countryObject = new country(request.params);
// 	return new Promise(function (resolve, reject) {
// 		getLog.getLogStatus(_.toLower(init())).then(logRes => {
// 			//To get the timestamp.
// 			getLog.getTimeStamp().then(timeStamp => {
// 				(logRes.status) ? logger.info(timeStamp.val + " : " + init() + " : " + "country_by_id block initiated.") : "";
// 				let countryName = countryObject.country_name ? countryObject.country_name : ''
// 				if(countryName) {
// 					countryObject.getCountryById(countryName).then(result => {
// 						if (typeof result[0] == 'undefined' || _.size(result) == 0) {
// 							logger.debug(customLogger(responseStatusHandler.NOT_FOUND.CODE, responseStatusHandler.NOT_FOUND.INVALID_COUNTRY));
// 							response.send({ message: configVariable.message.indexCountry.inputError, status: responseStatusHandler.NOT_FOUND.CODE });
// 						}
// 						else {
// 							(logRes.status) ? logger.info(timeStamp.val + " : " + init() + " : " + "country by id details fetched successfully.") : "";
// 							response.send(JSON.stringify(result));
// 						}
// 					}, () => {
// 						logger.debug(customLogger(responseStatusHandler.NOT_FOUND.CODE, responseStatusHandler.NOT_FOUND.FETCH_FAILURE));
// 						throw new CustomError(responseStatusHandler.NOT_FOUND.FETCH_FAILURE, responseStatusHandler.NOT_FOUND.CODE);
// 						//reject(err);
// 					}).catch(err => {
// 						response.send({status:1,Error:`${err}`});
// 					})
// 				} else {
// 					response.send({status:1,message:`invalid request`})
// 				}
				
// 			})
// 		})
// 	})
// }
