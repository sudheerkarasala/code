/**
 * address Controller
 * address Controller is used for the user will able to enter the address details either
  business or operating or shipping
 * @package address
 * @subpackage controller/address/address
 *  @author SEPA Cyper Technologies,krishnakanth.r
 */

"use strict";
import { AddressModel } from '../model/addressModel';
import { langEngConfig } from '../utility/lang_eng';

const STATUS = {
	SUCCESS: 0,
	FAILURE: 1
};

const today = new Date();
const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
const timeStamp = date + ' ' + time;
//this is for the create address 
export let createAddress = (request, response) => {
	let addressModel = new AddressModel(request.body);
	logger.info('createAddress() initiated')
	if (addressModel.applicant_id == '' || addressModel.applicant_id == 'undefined') {
		logger.debug('invalid request');
		response.send({ status: STATUS.FAILURE, message: langEngConfig.message.update.info });
	} else {
		logger.info("getContactId() called");
		addressModel.getContactId(addressModel.applicant_id).then(results => {
			if (results.length > 0) {
				logger.info("successfully fetch the results");
				let contactId = results[0].contact_id;
				addressModel.getAddressTypeId(addressModel.applicant_id, contactId, addressModel.address_type_id).then(results => {
					if (results.length > 0) {
						logger.info("successfully fetch the data");
						addressModel.updateAddress(addressModel.applicant_id, addressModel.address_type_id, addressModel.country_id, addressModel.postal_code, addressModel.address_line1, addressModel.address_line2, addressModel.city, addressModel.region, timeStamp).then(results => {
							if ((results.affectedRows) > 0) {
								logger.info("updated data successfully");
								logger.info("sent the response");
								response.send({ staus: STATUS.SUCCESS, message: langEngConfig.message.update.success });
							} else {
								logger.dubug("failed to updated");
								response.send({ status: STATUS.FAILURE, message: langEngConfig.message.update.fail });
							}

						}).catch(err => {
							logger.error("error while update the data");
							response.send({ status: STATUS.FAILURE, message: `${err}` })
						});
					} else {
						addressModel.insertAddress(addressModel.applicant_id, addressModel.address_type_id, contactId, addressModel.country_id, addressModel.postal_code, addressModel.address_line1, addressModel.address_line2, addressModel.city, addressModel.region, timeStamp).then(results => {
							if ((results.affectedRows) > 0) {
								logger.info('successfully fetech the results');
								logger.info("sent the response");
								response.send({ staus: STATUS.SUCCESS, message: langEngConfig.message.insert.success });
							} else {
								logger.dubug("failed to insert");
								response.send({ status: STATUS.FAILURE, message: langEngConfig.message.insert.fail });
							};
						}).catch(err => {
							logger.error("error while insert the data");
							response.send({ status: STATUS.FAILURE, message: `${err}` })
						});
					};

				}).catch(err => {
					logger.error("error while getting data");
					response.send({ status: STATUS.FAILURE, message: `${err}` });
				});
			};
		}).catch(err => {
			logger.error("error while getting data");
			response.send({ status: STATUS.FAILURE, message: `${err}` });
		});
	}
};

//get the details of respective person
export let getDetails = (request, response) => {
	let addressModel = new AddressModel(request.params);
	logger.info('getDetails initiated');
	let applicantId = addressModel.applicant_id;
	if (applicantId == '' && applicantId != 'undefined') {
		logger.debug('invalid request');
		return response.send({ status: STATUS.FAILURE, message: langEngConfig.message.update.info });
	} else {
		logger.info("getAddressDetails() called")
		addressModel.getAddressDetails(applicantId).then(results => {
			if ((_.size(results)) > 0) {
				logger.info("successfully fetch the data");
				let data = [];
				_.forEach(results, function (result, key) {
					addressModel.getCountryName(result.country_id).then(values => {
						if (_.size(values) > 0) {
							logger.info("successfully fetch the countryName");
							results[key].country_name = values[0].country_name;
							data.push(results[key]);
							if (results.length == data.length) {
								logger.info("sent the response");
								response.send({ status: STATUS.SUCCESS, message: langEngConfig.message.get.success, data: data })
							}
						} else {
							logger.debug("failed while getting country name");
							response.send({ status: STATUS.FAILURE, message: langEngConfig.message.get.fail })
						}
					}).catch(err => {
						logger.error("error while getting country name");
						response.send({ status: STATUS.FAILURE, message: `${err}` })
					});
				});

			} else {
				logger.dubug("failed while getting data");
				response.send({ status: STATUS.FAILURE, message: langEngConfig.message.get.fail })
			}
		}).catch(err => {
			logger.error("error while getting data");
			response.send({ status: STATUS.FAILURE, message: `${err}` })
		});
	}
}
//Update address of the respective person 
export let updateAddress = (request, response) => {
	let addressModel = new AddressModel(request.body);
	logger.info('updateAddress() initiated')
	if (addressModel.applicant_id != 'undefined' && addressModel.applicant_id && addressModel.address_type_id && addressModel.address_type_id != 'undefined') {
		addressModel.updateAddress(addressModel.applicant_id, addressModel.address_type_id, addressModel.country_id, addressModel.postal_code, addressModel.address_line1, addressModel.address_line2, addressModel.city, addressModel.region, timeStamp).then(results => {
			if ((results.affectedRows) > 0) {
				logger.info("updated data successfully");
				logger.info("sent the response");
				response.send({ status: STATUS.SUCCESS, message: `${langEngConfig.message.update.success}` })
			} else {
				logger.dubug("failed to updated");
				response.send({ status: STATUS.FAILURE, message: langEngConfig.message.update.fail })
			}
		}).catch(err => {
			logger.error("error while update the data")
			response.send({ status: STATUS.FAILURE, message: `${err}` })
		});
	} else {
		logger.debug("invalid request");
		response.send({ status: STATUS.SUCCESS, message: langEngConfig.message.update.info })
	}
}


//Method for fetching all the address_type available
export let getAddressType = (request, response) => {
	let addressModel = new AddressModel(request);
	logger.info('getAddressType() initiated')
	addressModel.getAddressType().then(res => {
			logger.info("response sent")
			// response.send({
			//  message: langEngConfig.message.address_type.success,
			//  address_type: res,
			//  status: STATUS.SUCCESS
			// });
			response.send(ResponseHelper.buildSuccessResponse({ address_type: res }, langEngConfig.message.address_type.success))
	}).catch(err => {
			logger.error("error while getting data");
			response.send({ message: `${err}`, status: STATUS.FAILURE })
	})
}

// //Method for fetching all the address_type available
// export let getAddressType = (request, response) => {
// 	let addressModel = new AddressModel(request);
// 	logger.info('getAddressType() initiated')
// 	addressModel.getAddressType().then(res => {
// 		logger.info("response sent")
// 		response.send({
// 			message: langEngConfig.message.address_type.success,
// 			address_type: res,
// 			status: STATUS.SUCCESS
// 		});
// 	}).catch(err => {
// 		logger.error("error while getting data");
// 		response.send({ message: `${err}`, status: STATUS.FAILURE })
// 	})
// }
