/**
 * otpModel Model
 * otpModel is used for the get and verify otp with email and mobile id .
 * @package otpModel
 * @subpackage sources/services/model/otpModel
 * @author SEPA Cyper Technologies, Sekhara Suman Sahu.
 */

"use strict";

// import { DbConnMgr } from "../dbconfig/dbconfig";
import { DbConnMgr } from '../dbconfig/dbconfig';
const DbInstance = DbConnMgr.getInstance();


export class OTP {

	constructor() {
		this.ERROR_CODES = {
			SUCCESS: 0,
			EXPIRED: 1,
			UPDATE: 2,
		}
	}

	static checkUniqueValue(emailOrMobile) {
		return new Promise((resolve, reject) => {
			logger.info("initialize  checkUniqueValue () ");
			var sql = `select email, mobile from contact where email = '${emailOrMobile}' OR mobile = '${emailOrMobile}'`;
			DbInstance.executeQuery(sql).then(res => {
				logger.info("get checkUniqueValue  ");
				resolve(res);
			}).catch(err => {
				logger.error("error in  checkUniqueValue  ");
				reject(err);
			})
		})
	}

	//Method for getting UserID
	getUserId(referenceValue) {
		return new Promise((resolve, reject) => {
			logger.info("initialize  getUserId () ");
			var sql = `select user_id from token_validator where user_id = '${referenceValue}' OR mobile_no = '${referenceValue}'`;

			DbInstance.executeQuery(sql).then(res => {
				logger.info("get  getUserId () ");
				resolve(res);
			}).catch(err => {
				logger.error("error in   getUserId () ");
				reject(err);
			})
		})
	}

	//method to insert datavalidateEmail
	saveOTP(otpValue, emailNumber, mobileNumber, otpExpireTimeout) {
		return new Promise((resolve, reject) => {
			logger.info("initialize  saveOTP () ");
			var sql = `INSERT into token_validator (otp , user_id , mobile_no , expired) values 
		(${otpValue},'${emailNumber}','${mobileNumber}',${otpExpireTimeout})`;
			DbInstance.executeQuery(sql).then(res => {
				logger.info("get   saveOTP () ");
				resolve(res);
			}).catch(err => {
				logger.error("error in    saveOTP () ");
				reject(err);
			})
		})
	}
	//update the otp status
	updateOTP(referenceValue, oneTimePasscode, currentDate) {
		return new Promise((resolve, reject) => {
			logger.info("initialize  updateOTP ()");
			var sql = `UPDATE token_validator SET otp = ${oneTimePasscode}, otp_status = 1,created= '${currentDate}'  where user_id = '${referenceValue}' OR mobile_no = '${referenceValue}'`;

			DbInstance.executeQuery(sql).then(res => {
				logger.info("get  updateOTP ()");
				resolve(res);
			}).catch(err => {
				logger.error("get  updateOTP ()");
				reject(err);
			})
		})
	}

	//slect user data
	isValidOTP(otp, referenceValue) {
		return new Promise((resolve, reject) => {
			logger.info("initialize  isValidOTP ()");
			var sql = `select user_id,otp,otp_status,expired,mobile_no,created from token_validator where otp = '${otp}' AND (user_id = '${referenceValue}' OR mobile_no = '${referenceValue}')`;

			DbInstance.executeQuery(sql).then(res => {
				logger.info("get  isValidOTP ()");
				resolve(res);
			}).catch(err => {
				logger.info("error in   isValidOTP ()");
				reject(err);
			})
		})
	}

	//update otp status
	updateOtpStatus(rows, status) {
		return new Promise((resolve, reject) => {
			logger.info("initialize  updateOtpStatus ()");
			var sql = `UPDATE token_validator SET otp_status = ${status} where user_id = '${rows[0].user_id}' OR mobile_no = '${rows[0].mobile_no}'`;

			DbInstance.executeQuery(sql).then(res => {
				logger.info("get  updateOtpStatus ()");
				resolve(res);
			}).catch(err => {
				logger.info("error in   updateOtpStatus ()");
				reject(err);
			})
		})
	}
}
