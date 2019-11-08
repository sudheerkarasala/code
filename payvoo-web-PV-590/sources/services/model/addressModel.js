/**
 * addressModel
 * this is used for the insert  the address details of person in database and get the data from database
 * @package addressModel
 * @subpackage model/addressModel
 *  @author SEPA Cyper Technologies,krishnakanth.r
 */
"use strict";

import { DbConnMgr } from '../dbconfig/dbconfig';
const DbInstance = DbConnMgr.getInstance();


export class AddressModel {
	constructor(user) {
		this.applicant_id = user.applicant_id;
		this.address_type_id = user.address_type_id;
		this.country_id = user.country_id;
		this.postal_code = user.postal_code;
		this.address_line1 = user.address_line1;
		this.address_line2 = user.address_line2;
		this.city = user.city;
		this.region = user.region
	}
	//this is for getting contact_id;
	getContactId(applicantId) {
		return new Promise((resolve, reject) => {
			logger.info('getContactId() initiated');
			let sql = `select contact_id from contact where applicant_id=${applicantId}`;
			DbInstance.executeQuery(sql).then(result => {
				logger.info("query executed");
				resolve(result);
			}).catch(err => {
				logger.error("error while  execute the query");
				reject(err);
			});
		});
	}
	//this is method for getting  address_type_id
	getAddressTypeId(applicantId, contactId, addressTypeID) {
		return new Promise((resolve, reject) => {
			logger.info('getAddressTypeId() initiated');
			let sql = `select address_type_id from address where applicant_id=${applicantId} and contact_id =${contactId} and address_type_id = ${addressTypeID}`;
			DbInstance.executeQuery(sql).then(result => {
				logger.info("query executed");
				resolve(result);
			}).catch(err => {
				logger.error("error while  execute the query");
				reject(err);
			});
		});
	}
	//this is for the insert address details in database
	insertAddress(applicantId, addressTypeId, contactId, countryId, postalCode, addressLine1, addrssLine2, city, region, timeStamp) {
		return new Promise((resolve, reject) => {
			logger.info('insertAddress() initiated');
			let sql = `INSERT INTO address (contact_id,applicant_id,country_id,address_type_id,postal_code,address_line1,address_line2,city,region,created_on) VALUES (${contactId},${applicantId},${countryId},${addressTypeId},'${postalCode}','${addressLine1}','${addrssLine2}','${city}','${region}','${timeStamp}')`;
			DbInstance.executeQuery(sql).then(result => {
				logger.info("query executed");
				resolve(result);
			}).catch(err => {
				logger.error("error while  execute the query");
				reject(err);
			});
		});
	}
	//this is for the update the address details
	updateAddress(applicantId, addressTypeId, countryId, postalCode, addressLine1, addrssLine2, city, region, timeStamp) {
		return new Promise((resolve, reject) => {
			logger.info(' updateAddress() initiated');
			let sql = `UPDATE address SET country_id = ${countryId},postal_code = '${postalCode}',address_line1 = '${addressLine1}',address_line2 = '${addrssLine2}',city = '${city}',region = '${region}',updated_on = '${timeStamp}' WHERE applicant_id = ${applicantId} and address_type_id = ${addressTypeId}`;
			// console.log(sql);
			DbInstance.executeQuery(sql).then(result => {
				logger.info("query executed");
				resolve(result);
			}).catch(err => {
				logger.error("error while  execute the query");
				reject(err);
			})
		});
	}
	//this is for the get the addressDetails of respective person
	getAddressDetails(applicantId) {
		return new Promise((resolve, reject) => {
			logger.info('getAddressDetails() initiated');
			let sql = `SELECT * FROM address WHERE applicant_id = '${applicantId}'`;
			DbInstance.executeQuery(sql).then(results => {
				logger.info("query executed");
				resolve(results);
			}).catch(err => {
				logger.error("error while  execute the query");
				reject(err);
			});
		});
	}
	//this is for the get the country name 
	getCountryName(countryId) {
		return new Promise((resolve, reject) => {
			logger.info('getCountryName() initiated');
			let sql = `SELECT country_name FROM country WHERE country_id = '${countryId}'`;
			DbInstance.executeQuery(sql).then(results => {
				logger.info("query executed");
				resolve(results);
			}).catch(err => {
				logger.error("error while  execute the query");
				reject(err);
			});
		});
	}
	//this is for the addressType details
	getAddressType() {
		return new Promise((resolve, reject) => {
			logger.info(' getAddressType() initiated');
			let sql = `select address_type_id,address_type from address_type`;
			DbInstance.executeQuery(sql).then(results => {
				logger.info("query executed");
				resolve(results);
			}).catch(err => {
				logger.error("error while  execute the query");
				reject(err);
			});
		})
	}

}
