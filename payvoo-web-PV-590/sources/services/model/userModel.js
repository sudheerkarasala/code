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
	//}
		// obj.userRegistration = function (newData, result) {
	// 	return new Promise(function (resolve, reject) {
	// 		mariadb.createConnection(config).then(conn => {
	// 			conn.beginTransaction().then(() => {
	// 				conn.query(signupConfig.sql.insert_applicant, [newData.account_type, newData.next_step]).then((applicantResponse) => {
	// 					resolve({
	// 						id: applicantResponse.insertId,
	// 						connection: conn
	// 					});
	// 				}).catch((err) => {
	// 					conn.rollback(err);
	// 					conn.close();
	// 					reject(`${err}`);
	// 				})
	// 			}).catch(err => {
	// 				reject(`${err}`);
	// 			})
	// 		}).catch(err => {
	// 			reject(`${err}`);
	// 		})
	// 	});
	// }
	// //insert data into contact table
	// obj.userContact = function (newData, conn, id) {
	// 	return new Promise(function (resolve, reject) {
	// 		conn.query(signupConfig.sql.insert_contact,
	// 			[id, newData.first_name, newData.middle_name, newData.last_name, newData.email, newData.gender, newData.dob, newData.telephone, newData.mobile, newData.phone]).then((conRes) => {
	// 			resolve({
	// 				contactId: conRes.insertId
	// 			})
	// 		}).catch(err => {
	// 			conn.rollback(err);
	// 			conn.close();
	// 			reject(`${err}`);
	// 		})
	// 	})
	// }
	// //insert data into address table
	// obj.userAddress = function (newData, conn, address_type_id, id, contactId) {
	// 	return new Promise(function (resolve, reject) {
	// 		conn.query(signupConfig.sql.insert_address,
	// 			[newData.country_id, address_type_id, newData.postal_code, newData.address_line1, newData.address_line2, id, newData.city,
	// 				newData.town, newData.region, contactId
	// 			]).then((addRes) => {
	// 			resolve({
	// 				addressId: addRes.insertId
	// 			});
	// 		}).catch(err => {
	// 			conn.rollback(err);
	// 			conn.close();
	// 			reject(`${err}`);
	// 		})
	// 	})
	// }
	// //insert data into business_users or user_login based upon account type and kyc and account table
	// obj.userLogin = function (newData, conn, userLogin, id, roleId) {
	// 	return new Promise(function (resolve, reject) {
	// 		conn.query(userLogin,
	// 			[newData.email, id, hashPassword.generate(newData.password),
	// 				newData.passcode_pin, roleId, 1, 1
	// 			]).then((userlogRes) => {
	// 			conn.query(signupConfig.sql.insert_kyc, [id]).then(kycRes => {
	// 				conn.query(signupConfig.sql.insert_account, [id, roleId, "EUR", 1, 0]).then(accountRes => {
	// 					resolve(accountRes);
	// 				}).catch(err => {
	// 					conn.rollback(err);
	// 					conn.close();
	// 					reject(`${err}`);
	// 				})
	// 			}).catch(err => {
	// 				conn.rollback(err);
	// 				conn.close();
	// 				reject(`${err}`);
	// 			})
	// 		}).catch(err => {
	// 			conn.rollback(err);
	// 			conn.close();
	// 			reject(`${err}`);
	// 		})
	// 	})
	// }
	// //insert data into sandbox table
	// obj.userSandbox = function (newData, conn, id, memberId, apiKey, url, api_doc_url, redirect_url) {
	// 	return new Promise(function (resolve, reject) {
	// 		conn.query(signupConfig.sql.insert_sandbox, [id, memberId, apiKey, url, api_doc_url, redirect_url]).then((result) => {
	// 			resolve(result);
	// 		}).catch(err => {
	// 			conn.rollback(err);
	// 			conn.close();
	// 			reject(`${err}`);
	// 		})
	// 	})
	// }
	// obj.connectionCommit = function (conn) {
	// 	return new Promise(function (resolve, reject) {
	// 		conn.commit();
	// 		conn.close();
	// 	})
	// }
	// //this method is used for check email or phone no is exists or not 
	// obj.checkDuplicateRecord = function (newData, accountType) {
	// 	return new Promise(function (resolve, reject) {
	// 		myPool.query(`SELECT c.contact_id, c.email, c.mobile FROM applicant a,contact c WHERE a.account_type='${accountType}'
	// 	AND c.applicant_id = a.applicant_id AND (c.email='${newData.email}'
	// 	OR c.mobile =${newData.mobile})`).then(res => {
	// 			resolve(res);
	// 		}).catch(err => {
	// 			console.log(err);
	// 			reject(`${err}`);
	// 		})
	// 	})
	// }


	// // this method is used for check unique value 
	// obj.checkUnique = function (data, column) {
	// 	return new Promise(function (resolve, reject) {
	// 		myPool.query(`SELECT COUNT(*) as row FROM contact WHERE ${column} = '${data}'`).then((result) => {
	// 			resolve(result);
	// 		}).catch(err => {
	// 			reject(`${err}`);
	// 		})
	// 	})
	// }
	//select the password for the login 
	loginUser(email, table, role) {
		logger.info('loginUser initiated at userModel')
		return new Promise(function (resolve, reject) {
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

	// // check input is valid or not 
	// obj.uniqueInput = function (check, value) {
	// 	return new Promise(function (resolve, reject) {
	// 		myPool.query(`select contact_id from contact where ${check}  = '${value}'`).then(res => {
	// 			resolve(res);
	// 		}).catch(err => {
	// 			reject(`${err}`);
	// 		})
	// 	});
	// }

	// // used to get user details 
	// obj.getUserdetails = function (email) {
	// 	return new Promise(function (resolve, reject) {
	// 		//query for get the user details
	// 		myPool.query(sqlInjecter.config.sql, [email]).then(results => {
	// 			resolve(results)
	// 		}).catch(err => {
	// 			reject(`${err}`);
	// 		})
	// 	})
	// }

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
	// // used for forgot password 
	// obj.forgotPassword = function (req) {
	// 	return new Promise(function (resolve, reject) {
	// 		let business_type = (req.body.account_type === 'business' || req.body.account_type === 'sandbox') ? `business_users` : `user_login`;
	// 		myPool.query(`SELECT user_id FROM ${business_type} WHERE user_id  = "${req.body.email}"`).then((result, err) => {
	// 			if (err) {
	// 				reject({
	// 					"message": `${err}`,
	// 					status: 0
	// 				});
	// 			} else {
	// 				if (result.length > 0) {
	// 					mailer.forgotStatus(result[0].user_id, `http://${process.env.FORGOT_PASSWORD_URL}:4200/#/${req.body.account_type}-forgot/${encrypt(result[0].user_id)} , ${req.body.account_type}`).then(function (data) {
	// 						if (data.status == 1) {
	// 							resolve({
	// 								"message": `Email sent to ${req.body.email} , please re-set new password `,
	// 								status: 1
	// 							});
	// 						}
	// 					}, function () {
	// 						resolve({
	// 							message: "Email sending failure",
	// 							status: 0,
	// 							expire: 0
	// 						});
	// 					})

	// 				} else {
	// 					reject({
	// 						"message": `There is no user with  ${req.body.email} , please verify`,
	// 						status: 0
	// 					});
	// 				}
	// 				// resolve(result);
	// 			}
	// 		}).then(() => {
	// 			resolve({
	// 				"message": `Email sent to ${req.body.email} , please re-set new password `,
	// 				status: 1
	// 			});
	// 		})
	// 	});
	// }

	// // sendbox details as Email

	// obj.sandBoxDetailsEmail = function (req) {
	// 	return new Promise(function (resolve, reject) {
	// 		const email = req.body.email;
	// 		const applicant_id = req.body.applicant_id;
	// 		if (email != 'undefined') {
	// 			myPool.query(`${loginsignupConfig.sql.select_sandbox_info}`, [applicant_id]).then((result, err) => {
	// 				if (err) {
	// 					reject({
	// 						"message": `${err}`,
	// 						status: 0
	// 					});
	// 				} else {
	// 					if (result.length > 0) {
	// 						mailer.sandBoxInfo(email, result[0], process.env.SANDBOX_API_DOC_URL).then(function (data) {
	// 							if (data.status == 1) {
	// 								resolve({
	// 									"message": `${loginsignupConfig.message.emailSuccess} : ${email}`,
	// 									status: 1
	// 								});
	// 							}
	// 						}, function () {
	// 							resolve({
	// 								message: loginsignupConfig.message.emailFail,
	// 								status: 0
	// 							});
	// 						})

	// 					} else {
	// 						reject({
	// 							"message": `${loginsignupConfig.message.errorMessage}`,
	// 							status: 0
	// 						});
	// 					}
	// 				}
	// 			}).then(() => {
	// 				resolve({
	// 					"message": `${loginsignupConfig.message.emailSuccess} : ${email}`,
	// 					status: 1
	// 				});
	// 			})
	// 		} else {
	// 			reject({
	// 				status: 0,
	// 				message: loginsignupConfig.message.noDataError
	// 			})
	// 		}
	// 	});
	// }

	// // used for reset password 
	// obj.updatePassword = function (req) {
	// 	let business_type = (req.params.type === 'business' || req.params.type === 'sandbox') ? `business_users` : `user_login`;
	// 	return new Promise(function (resolve, reject) {
	// 		let sql = `update ${business_type} set password = '${hashPassword.generate(req.body.newPassword)}' where user_id = '${decrypt(req.params.code)}'`
	// 		myPool.query(sql).then((result, err) => {
	// 			if (err) {
	// 				reject({
	// 					"message": `${err}`,
	// 					status: 0
	// 				});
	// 			} else {
	// 				resolve({
	// 					"message": `New Password Updated successfully`,
	// 					status: 1,
	// 					data: result
	// 				});
	// 			}
	// 		});
	// 	});
	// }

	// // used for change password from profile page 
	// obj.changePassword = function (req) {
	// 	return new Promise(function (resolve, reject) {
	// 		let business_type = (req.body.account_type === 'business' || req.body.account_type === 'sandbox') ? `business_users` : `user_login`;
	// 		myPool.query(`SELECT password FROM ${business_type} WHERE applicant_id = ${req.body.applicant_id}`).then((result) => {
	// 			if (result.length > 0) {
	// 				if (hashPassword.verify(req.body.oldPassword, result[0].password)) {
	// 					let sql = `update ${business_type} set password = '${hashPassword.generate(req.body.newPassword)}' where applicant_id = ${req.body.applicant_id}`
	// 					myPool.query(sql).then((result, err) => {
	// 						if (err) {
	// 							reject({
	// 								"message": `${err}`,
	// 								status: 0
	// 							});
	// 						} else {
	// 							resolve({
	// 								"message": `Password changed successfully`,
	// 								status: 1
	// 							});
	// 						}
	// 					});
	// 				} else {
	// 					reject({
	// 						"message": `Please enter valid old password`,
	// 						status: 0
	// 					});
	// 				}
	// 			}
	// 		}, function (err) {
	// 			reject({
	// 				"message": `${err}`,
	// 				status: 0
	// 			});
	// 		})
	// 	});
	// }

	// obj.resetPassword = function (req) {
	// 	return new Promise(function (resolve, reject) {
	// 		let business_type = (req.body.account_type === 'business' || req.body.account_type === 'sandbox') ? `business_users` : `user_login`;
	// 		if (req.body.password && req.body.password != 'undefined') {
	// 			let sql = `update ${business_type} set password = '${hashPassword.generate(req.body.password)}' where user_id = '${decrypt(req.body.id)}'`
	// 			myPool.query(sql).then((result, err) => {
	// 				if (err) {
	// 					reject({
	// 						"message": `${err}`,
	// 						status: 0
	// 					});
	// 				} else {
	// 					resolve({
	// 						"message": `Password changed successfully`,
	// 						status: 1
	// 					});
	// 				}
	// 			});
	// 		} else {
	// 			reject({
	// 				"message": `Please enter valid  password`,
	// 				status: 0
	// 			});
	// 		}
	// 	});
	// }

	// const encrypt = function (text) {
	// 	const cipher = crypto.createCipher('aes-256-cbc', 'd6F3Efeq')
	// 	const crypted = cipher.update(text, 'utf8', 'hex')
	// 	crypted += cipher.final('hex');
	// 	return crypted;
	// }

	// const decrypt = function (text) {
	// 	const decipher = crypto.createDecipher('aes-256-cbc', 'd6F3Efeq')
	// 	const dec = decipher.update(text, 'hex', 'utf8')
	// 	dec += decipher.final('utf8');
	// 	return dec;
	// }
}

	// module.exports = {
	// 	obj
	// }