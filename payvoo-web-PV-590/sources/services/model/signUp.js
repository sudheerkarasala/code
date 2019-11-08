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
	createApplicant(conn, account_type, next_step) {
		return new Promise((resolve, reject) => {
			let sql = `insert into applicant (account_type,next_step) values ('${account_type}','${next_step}')`;
			conn.query(sql).then(applicantRes => {
				resolve(applicantRes)
			}).catch(err => {
				reject(err);
			})
		})
	}
	createContact(conn, applicantId, first_name, middle_name, last_name, email, gender, dob, telephone, mobile, phone) {
		return new Promise((resolve, reject) => {
			let sql = `insert into contact (applicant_id,first_name,middle_name,last_name,email,gender,dob,telephone,mobile,phone) values (${applicantId},'${first_name}','${middle_name}','${last_name}','${email}','${gender}','${dob}','${telephone}','${mobile}','${phone}')`;
			conn.query(sql).then(contactResult => {
				resolve(contactResult);
			}).catch(err => {
				reject(err);
			})
		})
	}

	createAddress(conn, applicantId, contactId, address_type_id, country_id, postal_code, address_line1, address_line2, city, town, region) {
		return new Promise((resolve, reject) => {
			let sql = `insert into address (country_id,address_type_id,postal_code,address_line1,address_line2,applicant_id,city,town,region,contact_id) values (${country_id}, ${address_type_id},'${postal_code}','${address_line1}','${address_line2}',${applicantId},'${city}','${town}','${region}',${contactId})`;
			conn.query(sql).then(addressResult => {
				resolve(addressResult);
			}).catch(err => {
				reject(err);
			})
		})
	}
	createUser(userLoginTable, conn, email, applicantId, password, passcode_pin, roleId) {
		return new Promise((resolve, reject) => {
			//let sql=`"insert into user_login (user_id,applicant_id,password,passcode_pin,role_id,email_verified,mobile_verified) values ('${email}','${applicantId}','${password}','${passcode_pin}','${roleId}',1,1)"`;
			conn.query(userLoginTable, [email, applicantId, password, passcode_pin, roleId, 1, 1]).then(userResult => {
				resolve(userResult);
			}).catch(err => {
				reject(err);
			})
		})

	}
	insertKycDetails(conn, applicantId) {
		return new Promise((resolve, reject) => {
			let sql = `insert into kyc (applicant_id) values (${applicantId})`;
			conn.query(sql).then(kycResult => {
				resolve(kycResult);
			}).catch(err => {
				reject(err);
			})
		})
	}
	createCurrencyAccount(conn, applicantId, roleId) {
		return new Promise((resolve, reject) => {
			let sql = `insert into accounts (applicant_id,role_id,currency,status,balance) values(${applicantId},${roleId},"EUR",1,0)`;
			conn.query(sql).then(accountResult => {
				resolve(accountResult);
			}).catch(err => {
				reject(err);
			})
		})

	}
	createSandboxUser(conn, applicantId, memberId, apiKey, url, api_doc_url, redirect_url) {
		return new Promise((resolve, reject) => {
			let sql = `insert into sandbox (applicant_id,memberId,api_key,url,api_doc_url,redirect_url) values (${applicantId},'${memberId}','${apiKey}','${url}','${api_doc_url}','${redirect_url}')`;
			conn.query(sql).then(userResult => {
				resolve(userResult);
			}).catch(err => {
				reject(err);
			})
		})

	}

	//select the password for the login 
	loginUser(email, table, role) {
		return new Promise(function (resolve, reject) {
			let sql = `select password from ${table} where user_id = '${email}' and role_id = ${role}`;
			DbInstance.executeQuery(sql).then(res => {
				resolve(res);
			}).catch(err => {
				reject(`${err}`);
			})
		})
	}


	//this is for the check the intialpayment status
	checkInitialPayment(applicant_id) {
		return new Promise(function (resolve, reject) {
			let sql = `SELECT applicant_id FROM accounts  where applicant_id = ${applicant_id}`;
			DbInstance.executeQuery(sql).then(result => {
				resolve(result);
			}).catch(err => {
				reject(`${err}`);
			})
		})
	}

	// // this function is used for create response and send back 
	responseCreation(email, roleName) {
		return new Promise(function (resolve, reject) {
			let sql = `select a.applicant_id, a.account_type, a.next_step, c.email, c.first_name, c.gender, c.last_name, c.mobile,c.phone,
			ad.address_line1, ad.address_line2, ad.city, ad.country_id, ad.postal_code, ad.region, ad.town, k.kyc_status
			from applicant a, contact c, address ad, kyc k
			where a.applicant_id=c.applicant_id and a.applicant_id= ad.applicant_id and  a.account_type ='${roleName}' and a.applicant_id= k.applicant_id and c.email = '${email}'`;
			DbInstance.executeQuery(sql).then(result => {
				resolve(result);
			}).catch((err) => {
				reject(`${err}`);
			})

		})
	}

	// used for get business id and append in the response of signup/ login
	getBusinessId(applicant_id) {
		return new Promise(function (resolve, reject) {
			let sql = `select business_id,country_of_incorporation,business_legal_name from business_details where applicant_id = ${applicant_id}`;
			DbInstance.executeQuery(sql).then((result) => {
				resolve(result);
			}).catch((err) => {
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

	kycEntry(id) {
		return new Promise(function (resolve, reject) {
			let sql = `insert into kyc(applicant_id) values(${id})`;
			DbInstance.executeQuery(sql).then((res) => {
				resolve(res);
			}).catch(err => {
				reject(`${err}`);
			})
		})
	}
}

