/**
 * currencyExchange Controller
 * currencyExchange Controller is used for get the alert when the currencys are changed
 * @subpackage controller\currencyExchange
 *  @author SEPA Cyber Technologies, Tarangini Dola
 */
'use strict';

import { CurrencyNotify } from '../model/currencyExchangeModel';
import { currencyExchange } from '../controller/commonCode';
import { langEngConfig } from '../utility/lang_eng';
const STATUS = {
    SUCCESS: 0,
    FAILURE: 1
}

export const insertCurrencyExchange = (request, response) => {
    let currencyNotify = new CurrencyNotify(request.body);
    logger.info('getCurrencyExchange() intiated');
    var status = currencyNotify.exchange_status ? 1 : 0
    currencyNotify.currencyExchangeInfo(currencyNotify.account_no, currencyNotify.from_currency, currencyNotify.to_currency, status).then(res => {
        if (_.size(res) > 0) {
            currencyNotify.updateCurrencyExchangeInfo(currencyNotify.applicant_id, currencyNotify.account_no, currencyNotify.from_currency, currencyNotify.to_currency, currencyNotify.amount, currencyNotify.target_amount, status, !status).then(res => {
                if (res != 0) {
                    if (currencyNotify.exchange_status) {
                        response.send({
                            message: langEngConfig.message.payment.exchange_success, status: STATUS.SUCCESS
                        });
                    } else {
                        response.send({
                            message: langEngConfig.message.payment.alert_success, status: STATUS.SUCCESS
                        });
                    }
                } else {
                    response.send({
                        message: langEngConfig.message.payment.exchange_error, status: STATUS.FAILURE
                    });
                }
            }, (err) => {
                response.send(err);
            })
        } else {
            currencyNotify.insertCurrencyExchangeInfo(currencyNotify.applicant_id, currencyNotify.account_no, currencyNotify.from_currency, currencyNotify.to_currency, currencyNotify.amount, currencyNotify.target_amount, currencyNotify.exchange_status, !currencyNotify.exchange_status).then(res => {
                if (res != 0) {
                    if (currencyNotify.exchange_status) {
                        response.send({
                            message: langEngConfig.message.payment.exchange_success, status: STATUS.SUCCESS
                        });
                    } else {
                        response.send({
                            message: langEngConfig.message.payment.alert_success, status: STATUS.SUCCESS
                        });
                    }
                } else {
                    response.send({
                        message: langEngConfig.message.payment.exchange_error, status: STATUS.FAILURE
                    });
                }
            }, (err) => {
                response.send(err);
            })
        }
    }, (err) => {
        response.send(err);
    })

}

//Method for getting the currency exchange details actions
export const getCurrencyExchange = (request, response) => {
    let currencyNotify = new CurrencyNotify(request.body);
    logger.info('getCurrencyExchange() intiated');
        currencyNotify.getCurrencyExchange(currencyNotify.applicant_id).then((data => {
            if (data.length > 0) {
                var i = 0
                _.forEach(data, function (row) {
                    currencyExchange(row.from_currency, row.to_currency, null).then(function (value) {
                        i++; row["currency_rate"] = value.rate;
                        if (_.size(data) == i) {
                            response.send({ message: langEngConfig.message.payment.get_success, status: STATUS.SUCCESS, data });
                        }
                    })
                })
            }
            else {
                response.send({ message: langEngConfig.message.payment.get_fail, status: STATUS.FAILURE });
            }
        }), (err) => {
            logger.error('error while insert the data')
            response.send(err);
        })
    
}

//Method for deleteing the currency exchange details 
export const deleteCurrencyExchange = (request, response) => {
    let currencyNotify = new CurrencyNotify(request.body);
    logger.info('deleteCurrencyExchange() intiated');
    currencyNotify.deleteCurrencyExchange(currencyNotify.auto_exchange_id).then(result => {
        if (result == 0) {
            logger.info('data deleted successfully');
            response.send({ message: langEngConfig.message.payment.delete_success, status: STATUS.SUCCESS });
        } else {
            logger.info('failed to delete')
            response.send({ message: langEngConfig.message.payment.delete_fail, status: STATUS.FAILURE })
        }
    }).catch(err => {
        logger.error("error while delete the data")
        response.send({ message: `${err}`, status: STATUS.FAILURE })
    })
}

//Method for deleteing the currency exchange details 
export const updateCurrencyExchange = (request, response) => {
    let currencyNotify = new CurrencyNotify(request.body);
    logger.info('updateCurrencyExchange() intiated');
    currencyNotify.updateCurrencyExchange(currencyNotify.auto_exchange_id).then(data => {
        if (data.affectedRows > 0) {
            logger.info('updated data successfully');
            response.send({ message: langEngConfig.message.payment.update_success, status: STATUS.SUCCESS });
        }
        else {
            logger.info('failed to updated')
            response.send({ message: langEngConfig.message.payment.update_fail, status: STATUS.SUCCESS });
        }
    }).catch(err => {
        logger.error("error while update the data")
        response.send({ message: `${err}`, status: STATUS.FAILURE })
    })
}



