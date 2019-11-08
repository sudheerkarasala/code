/**
 * businessRegistration Controller
 * businessRegistration is used to store business related data in business details table. 
 * @package businessRegistration
 * @subpackage controller\businessRegistration\businessRegistration
 * @author SEPA Cyber Technologies, Sekhara Suman Sahu , Satyanarayana G
 */

"use strict";
import { config } from '../dbconfig/connection';
import { mariadb } from '../dbconfig/dbconfig';
import { BusinessRegistration } from '../model/businessRegistration';
import { getCompanyDetails, getCompanyId } from '../controller/commonCode';
import { langEngConfig as configVariable } from '../utility/lang_eng';
var sqlConfig = require('../utility/sqlService');
var businessRegistration = new BusinessRegistration()

const STATUS = {
	SUCCESS: 0,
	FAILED: 1,
	EXISTS: 2
};

class Business {
	constructor(businessDetails) {
		this.applicant_id = businessDetails.applicant_id;
		this.country_of_incorporation = businessDetails.country_of_incorporation;
		this.business_legal_name = businessDetails.business_legal_name;
		this.trading_name = businessDetails.trading_name;
		this.registration_number = businessDetails.registration_number;
		this.incorporation_date = businessDetails.incorporation_date;
		this.business_type = businessDetails.business_type;
	}
};

let _createResponse = (message, business_id, businessDetails) => {
	return {
		message: message, business_id: business_id,
		business_country_of_incorporation: businessDetails.country_of_incorporation,
		business_legal_name: businessDetails.business_legal_name, status: STATUS.SUCCESS
	}
}

let _saveCompany = (businessInfo, arrayObj, data) => {
	return new Promise((resolve, reject) => {
		mariadb.createConnection(config).then(conn => {
			conn.beginTransaction().then(() => {
				businessRegistration.insertBusinessDetails(businessInfo).then(businessDetails => {
					let rowItems = [];
					if (_.size(arrayObj) > 0) {
						(arrayObj).forEach(function (obj) {
							let createObject = {};
							createObject.business_id = businessDetails.insertId, createObject.type = obj.type || " "
							createObject.email = obj.email, createObject.name = obj.name
							createObject.status = 0, createObject.dob = obj.dateOfBirth || " "
							createObject.percentage = obj.percentage || " ", rowItems.push(Object.values(createObject));
						});
						conn.batch(sqlConfig.signupSql.kyb_business_owner, rowItems).then((ownerInfo) => {
							if (data) {
								businessRegistration.getCompanyDetails(businessDetails.insertId, data).then((business) => {
									conn.commit();
									conn.close();
									resolve(_createResponse(configVariable.message.businessdetails.success, businessDetails.insertId, businessInfo));
								}, err => {
									conn.rollback(err);
									conn.close();
									resolve({ message: `${err}`, status: STATUS.FAILED });
								});
							} else {
								resolve(_createResponse(configVariable.message.businessdetails.success, businessDetails.insertId, businessInfo));
							}
						}).catch(err => {
							conn.rollback(err);
							conn.close();
							resolve({ message: `${err}`, status: STATUS.FAILED });
						});
					} else {
						businessRegistration.getCompanyDetails(businessDetails.insertId, data).then(businessInfo => {
							conn.commit();
							conn.close();
							resolve(_createResponse(configVariable.message.businessdetails.success, businessDetails.insertId, businessInfo));
						}, err => {
							conn.rollback(err);
							conn.close();
							resolve({ message: `${err}`, status: STATUS.FAILED });
						});
					}
				}, errorBusinessDetails => {
					conn.rollback(errorBusinessDetails);
					conn.close();
					resolve({ message: `${errorBusinessDetails}`, status: STATUS.FAILED });
				});
			});
		}).catch((err) => {
			reject({ message: `${err}`, status: STATUS.FAILED });
		});
	});
}

// this is for the creation of an object for bulk insert in business_owner table 
let _createObject = (details) => {
	return new Promise((resolve, reject) => {
		if (details.people && (_.size(details.people.director) > 0 || _.size(details.people.shareholder) > 0)) {
			var arrayObj = [];
			if (_.size(details.people.director) > 0 || _.size(details.people.shareholder) > 0) {
				if (_.size(details.people.director) > 0) {
					_.forEach(details.people.director, function (row) {
						arrayObj.push({
							"dateOfBirth": _.get(row, "dateOfBirth", ''),
							"name": _.get(row, "name", ''), "status": _.get(row, "status", ''),
							"type": "director", "email": _.get(row, "email", ''), "percentage": " "
						});
					});
				}
				if (_.size(details.people.shareholder) > 0) {
					_.forEach(details.people.shareholder, function (row) {
						arrayObj.push({
							"dateOfBirth": _.get(row, "dateOfBirth", ''), "name": _.get(row, "name", ''),
							"status": _.get(row, "status", ''), "type": "shareholder", "email": _.get(row, "email", ''),
							"percentage": _.get(row, "percentage", '')
						});
					});
				}
				if (_.size(details.people.director) + _.size(details.people.shareholder) == _.size(arrayObj)) {
					resolve({ "arrayObj": arrayObj, "details": details });
				}
			}
		} else {
			resolve({ "arrayObj": [], "details": details });
		}
	});
}

let _callKyb = (countryCode, legalName, businessInfo, request, response) => {
	getCompanyId(countryCode, legalName, request).then(companyInfo => {
		if (Array.isArray(companyInfo.data) && _.size(companyInfo.data) > 0) {
			getCompanyDetails(companyInfo.data[0].id, 'full', request).then((details) => {
				_createObject(details).then((arrayObj) => {
					_saveCompany(businessInfo, arrayObj.arrayObj, arrayObj.details).then((message) => {
						return response.send(message);
					}, (error) => {
						return response.send(error);
					});
				});
			}, (error) => {
				return response.send({ message: error, status: STATUS.FAILED });
			});
		} else {
			if (companyInfo.status != 1) {
				return response.send({ message: companyInfo.message, status: STATUS.FAILED });
			}
			return response.send({ message: configVariable.message.businessOwner.company_not_found, status: STATUS.FAILED });
		}
	}, errorInCountryId => {
		return response.send({ message: errorInCountryId, status: STATUS.FAILED });
	});
}

//for business registration with Kyb
let businessSignUp = (request, response) => {
	const business = new Business(request.body);
	businessRegistration.checkUniqueCompany(business.applicant_id).then(companyInfo => {
		if (_.size(companyInfo) > 0) {
			// will change the message 
			response.send({ message: `company already registered with applicant_id  `, status: STATUS.EXISTS });
		} else {
			businessRegistration.getCountryCode(business.country_of_incorporation).then(countryInfo => {
				if (countryInfo.lenght == 0) {
					response.send({ message: configVariable.message.businessOwner.country_notfound, status: STATUS.FAILED });
				} else {
					return _callKyb(countryInfo[0].country_code, business.business_legal_name, business, request, response);
				}
			}, errorInCountryInfo => {
				response.send({ message: `${errorInCountryInfo}`, status: STATUS.FAILED });
			});
		}
	}, (errorInCompanyInfo => {
		response.send({ message: `${errorInCompanyInfo}`, status: STATUS.FAILED });
	}));
}


//for business registration with Kyb
let businessSignUpWithoutKyb = (request, response) => {
	const business = new Business(request.body);
	businessRegistration.checkUniqueCompany(business.applicant_id).then((details) => {
		if (_.size(details) > 0) {
			response.send({ message: configVariable.message.businessOwner.company_already_exist, status: STATUS.EXISTS });
		} else {
			_saveCompany(business, [], null).then(companyDetails => {
				response.send(companyDetails);
			}, err => {
				response.send({ message: err, status: STATUS.FAILED });
			});
		}
	}, (error) => {
		response.send(error)
	});
}

//for getting business type
export const typeOfBusiness = function (request, response) {
  logger.info('typeOfBusiness intiated');
  businessRegistration.typeOfBusiness()
  .then(result =>{
		if(result !=0){
			logger.info('typeOfBusiness excution completed');
			response.send(_.filter(result, { business_type_name: "SANDBOX" }));
		}else {
			logger.info('typeOfBusiness excution completed');
			response.send({status : STATUS.FAILED });
		}
  })
  .catch(error=>{
    logger.error(error)
    response.send({status : STATUS.FAILED });
  })
}

//for geting business sectors.
export const typeOfSector = function (request, response) {
  logger.info('typeOfSector intiated')
  businessRegistration.typeOfSector()
  .then(result => {
		logger.info('typeOfSector excution completed');
		if(result){
			response.send(result);
		}else {
			logger.info('typeOfSector excution completed');
			response.send({status : STATUS.FAILED});
		}
  })
  .catch(error=>{
    logger.error(error)
    response.send({err:error, status:STATUS.FAILED});
  })
}

//for fetching the data related to business sector of an alresy registerd business.
export const typeOfSectorAndIndustries = function (request, response) {
  logger.info('typeOfSectorAndIndustries intiated')
  let businessSignup = new BusinessSignup(request.body);
  let { business_id } = businessSignup
  businessRegistration.typeOfSectorAndIndustries(business_id)
  .then(result => {
		logger.info('typeOfSectorAndIndustries excution completed');
		if(result){
			response.send({
				message: `${configVariable.message.businessdetails.fetchsuccess} = ${result[0].business_id}`,
				business_sector: result[0].business_sector,
				range_of_service: result[0].range_of_service,
				website: result[0].website,
				restricted_business: result[0].restricted_business,
				selected_industries: result[0].selected_industries,
				status: STATUS.SUCCESS
			})
		}else {
			logger.info('typeOfSectorAndIndustries excution completed');
			response.send({ message: `${configVariable.message.businessdetails.fetcherror}`, status: STATUS.FAILURE });
		}
  })
  .catch(error=>{
    logger.error(error)
    response.send({err:error, status: STATUS.FAILED});
  })
}

//for geting business industries.
export const typeOfIndustries = function (request, response) {
  logger.info('typeOfIndustries initiated');
  businessRegistration.typeOfIndustries()
    .then(result => {
			if(result){
				logger.info('execution completed');
				response.send({ msg: configVariable.message.industries.success, industries: result, status: STATUS.SUCCESS });
			}else{
				logger.info('execution completed');
				response.send({ status: STATUS.FAILURE });
			}
    })
    .catch(error=>{
      logger.error(error)
      response.send({ err: error,status: STATUS.FAILURE });
    })

}

export {
	businessSignUp,
	businessSignUpWithoutKyb
}

