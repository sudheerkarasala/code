/**
 * currencyRateModel
 * this is used for the check the current currency rates and also show the convertamount with multiple Currency
 * @package currencyRateModel
 * @subpackage model/currencyRateModel
 *  @author SEPA Cyper Technologies,krishnakanth.r
 */
"use strict";
import { langEngConfig } from '../utility/lang_eng';
import { currencyExchange } from '../controller/commonCode';
import { CurrencyRate } from '../model/currencyRateModel';
const STATUS = {
	SUCCESS: 0,
	FAILURE: 1
}

export let currencyRate = (request, response) => {
	let currencyRate = new CurrencyRate(request.body);
	logger.info("currencyRate() initiated");
	if (currencyRate.applicant_id == "" || currencyRate.applicant_id == "undefined") {
		return response.send({ status: STATUS.FAILURE, message: langEngConfig.message.currency.fail2 });
	}
	if (currencyRate.isConvert != 0 && currencyRate.isConvert != 1) {
		return response.send({ status: STATUS.FAILURE, message: langEngConfig.message.currency.fail2 });
	}
	if (currencyRate.isConvert == 0) {
		//this is for the current currency rates
		logger.info("rates function initiated");
		currencyRate.currencyRate(currencyRate.applicant_id, currencyRate.isConvert).then(ratesRes => {
			if (ratesRes.length > 0) {
				logger.info("successfully get result");
				var result = [];
				var currencyExchangeRate = [];
				_.forEach(ratesRes, function (row, key) {
					currencyExchangeRate.push(currencyExchange(row.from_currency, row.to_currency, row.check_rates_id));
				});
				Promise.all(currencyExchangeRate).then(arrayList => {
					logger.info("currencyExchange() initiated");
					_.forEach(arrayList, (list) => {
						const obj = {};
						obj.from_currency = list.from;
						obj.to_currency = list.to;
						obj.check_rates_id = list.checkRates_id;
						obj.rates = list.rate;
						result.push(obj);
					})
					logger.info("response sent");
					return response.send({ status: STATUS.SUCCESS, message: langEngConfig.message.currency.success, data: result });
				}).catch(err => {
					logger.error("error while getting rates results");
					return response.send({ status: STATUS.FAILURE, message: `${err}` })
				})
			} else {
				logger.info("failed to get results");
				response.send({ status: STATUS.FAILURE, message: langEngConfig.message.currency.fail });
			}
		}).catch(err => {
			logger.error("error while getting results");
			return response.send({ status: STATUS.FAILURE, message: `${err}` });
		})
	}
	if (currencyRate.isConvert == 1) {
		//this is for show the convert amount with multiple Currency
		logger.info("conversition function initiated");
		currencyRate.convertionAmount(currencyRate.applicant_id, currencyRate.isConvert).then(convertRes => {
			if (convertRes.length > 0) {
				logger.info("successfully get result");
				if (currencyRate.from_currency != "undefined" && currencyRate.from_currency && currencyRate.amount) {
					convertRate(convertRes, currencyRate.from_currency, Number(currencyRate.amount)).then(res => {
						logger.info("response send");
						return response.send({ res });
					}).catch(err => {
						response.send({ status: STATUS.FAILURE, message: `${err}` });
					})

				} else {
					const unique = _.uniqBy(convertRes, function (list) {
						return list.from_currency;
					});
					var result = [];
					_.forEach(unique, function (row, key) {
						const obj = {};
						obj.to_currency = row.from_currency;
						obj.exchanged_amount = 0;
						obj.check_rates_id = row.check_rates_id;
						result.push(obj);
						if (result.length == unique.length) {
							return response.send({ status: STATUS.SUCCESS, message: langEngConfig.message.currency.success, data: result })
						}
					})
				}
			} else {
				response.send({ status: STATUS.FAILURE, message: langEngConfig.message.currency.fail });
			}
		}).catch(err => {
			response.send({ status: STATUS.FAILURE, message: `${err}` })
		})
	}
}

let convertRate = function (convertRes, from_currency, amount) {
	logger.info("convertRate initiated");
	return new Promise(function (resolve, reject) {
		const unique = _.uniqBy(convertRes, function (list) {
			return list.from_currency;
		});
		var convertId = _.filter(unique, function (list) {
			return list.from_currency == from_currency;

		});
		if (convertId.length > 0) {
			var dataList = _.filter(unique, function (list) {
				return list.from_currency !== from_currency;
			});
			if (dataList.length > 0) {
				var result = [];
				const request = {};
				request.to_currency = from_currency;
				request.exchanged_amount = amount;
				request.check_rates_id = convertId[0].check_rates_id;
				result.push(request);
				var currencyExchangeRate = [];
				_.forEach(dataList, function (row, key) {
					currencyExchangeRate.push(currencyExchange(from_currency, row.from_currency, row.check_rates_id));
				});
				Promise.all(currencyExchangeRate).then(arrayList => {
					logger.info("currencyExchange() initiated");
					_.forEach(arrayList, (list) => {
						const obj = {};
						obj.to_currency = list.to;
						obj.exchanged_amount = ((list.rate) * (amount));
						obj.check_rates_id = list.checkRates_id;
						result.push(obj);
					})
					resolve({ status: STATUS.SUCCESS, message: langEngConfig.message.currency.success, data: result });

				}).catch(err => {
					logger.error("error while getting rates");
					reject(err);
				})
			} else {
				const result = [];
				const request = {};
				request.to_currency = from_currency;
				request.exchanged_amount = amount;
				request.check_rates_id = convertId[0].check_rates_id;
				result.push(request);
				//resolve(result);
				resolve({ status: STATUS.SUCCESS, message: langEngConfig.message.currency.success, data: result })
			}
		} else {
			// reject(err);
			resolve({ status: STATUS.FAILURE, message: langEngConfig.message.currency.fail3 })
		}
	})
}
// This method is used for delete the data from rates
export let deleteCurrencyRate = (request, response) => {
	logger.info("deleteCurrencyRate() initiated");
	let currencyRate = new CurrencyRate(request.params);
	currencyRate.deleteCurrencyRate(currencyRate.check_rates_id).then((result) => {
		if (result.affectedRows > 0) {
			logger.info("successfully deleted");
			response.send({ message: langEngConfig.message.currency.success1, status: STATUS.SUCCESS });
		} else {
			logger.debug("failed to delete");
			response.send({ message: langEngConfig.message.currency.fail1, status: STATUS.FAILURE });
		}

	}).catch(err => {
		response.send({ message: `${err}`, status: STATUS.FAILURE });
	})
}
//crrate a rates or convertion record in database
export let addRate = (request, response) => {
	logger.info("addRate() initiated");
	let currencyRate = new CurrencyRate(request.body);
	if (currencyRate.applicant_id == "" || currencyRate.applicant_id == "undefined") {
		return response.send({ status: STATUS.FAILURE, message: langEngConfig.message.currency.fail2 });
	}
	if (currencyRate.isConvert != 0 && currencyRate.isConvert != 1) {
		return response.send({ status: STATUS.FAILURE, message: langEngConfig.message.currency.fail2 });
	}
	currencyRate.selectRate(currencyRate.applicant_id, currencyRate.from_currency, currencyRate.to_currency, currencyRate.isConvert).then(results => {
		if (results.length > 0) {
			response.send({ message: langEngConfig.message.payment.check_rates_fail1, status: STATUS.FAILURE });
		} else {
			var today = new Date();
			let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
			let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
			let createdOn = date + ' ' + time;
			currencyRate.addRate(currencyRate.applicant_id, currencyRate.from_currency, currencyRate.to_currency, currencyRate.isConvert, createdOn)
				.then(result => {
					if (result.affectedRows > 0) {
						response.send({ message: langEngConfig.message.payment.check_rate_succ, status: STATUS.SUCCESS });
					} else {
						response.send({ message: langEngConfig.message.payment.check_rates_fail, status: STATUS.FAILURE });
					}
				})
				.catch(err => {
					response.send({ status: STATUS.FAILURE, message:`${err}` });
				})
		}
	}).catch(err => {
		response.send({ status: STATUS.FAILURE, message:`${err}` });
	})
}

