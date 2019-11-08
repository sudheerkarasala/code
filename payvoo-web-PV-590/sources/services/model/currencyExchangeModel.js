/**
 * currencyExchange
 * This model is used to support the currencyExchange methods.
 * @subpackage model/currencyExchangeModel
 *  @author SEPA Cyber Technologies, Tarangini Dola
 */
'use strict';
import { DbConnMgr } from '../dbconfig/dbconfig';
const dbInstance = DbConnMgr.getInstance();
const STATUS = {
    SUCCESS: 0,
    FAILURE: 1
}

export class CurrencyNotify {
    constructor(user) {
        this.applicant_id = user.applicant_id,
            this.auto_exchange_id = user.auto_exchange_id,
            this.amount = user.amount,
            this.target_amount = user.target_amount,
            this.account_no = user.account_no,
            this.from_currency = user.from_currency,
            this.to_currency = user.to_currency,
            this.exchange_status = user.exchange_status
            
    }

    currencyExchangeInfo(account_no,from_currency,to_currency,status) {
        logger.info('insertCurrencyExchange() intiated');
        return new Promise((resolve, reject) => {
            let sql = `select applicant_id from currency_exchange where account_no = ${account_no} and from_currency = '${from_currency}' and to_currency= '${to_currency}' and  exchange_status =${status}`;
            dbInstance.executeQuery(sql).then(res => {
                resolve(res)
            },
                (err) => {
                    reject(err)
                })
        })
    }

    updateCurrencyExchangeInfo(applicant_id, account_no, from_currency, to_currency, amount, target_amount, exchange_status,notify) {
        logger.info('updateCurrencyExchangeInfo() intiated');
        return new Promise((resolve, reject) => {
            let sql = `UPDATE  currency_exchange  SET applicant_id= ${applicant_id},account_no =${account_no},from_currency='${from_currency},to_currency='${to_currency}',amount=${amount},target_amount=${target_amount},exchange_status='${exchange_status}',notify='${notify}' Where account_no= ${account_no}`;
            dbInstance.executeQuery(sql).then(res => {
                logger.info('execution completed');
                resolve(res);
            }).catch(err => {
                logger.error('error while  execute the query');
                reject(err);
            })
        })
    }

    insertCurrencyExchangeInfo(applicant_id, account_no, from_currency, to_currency, amount, target_amount, exchange_status) {
        logger.info('insertCurrencyExchangeInfo() intiated');
        return new Promise((resolve, reject) => {
            let sql = `INSERT INTO currency_exchange (applicant_id,account_no,from_currency,to_currency,amount,target_amount,exchange_status,notify) 
            VALUES (${applicant_id},${account_no},'${from_currency}','${to_currency}',${amount},${target_amount},'${exchange_status}','${notify}')`;
            dbInstance.executeQuery(sql).then(res => {
                logger.info('execution completed');
                resolve(res);
            }).catch(err => {
                logger.error('error while  execute the query');
                reject(err);
            })
        })
    }

     // This method is used for get all the data from currency exchange
    getCurrencyExchange(applicant_id) {
        logger.info('getCurrencyExchange() intiated');
        return new Promise((resolve, reject) => {
            let sql = `select auto_exchange_id,account_no,from_currency,to_currency,amount,target_amount,exchange_status,notify from currency_exchange where applicant_id = '${applicant_id}'`;
            dbInstance.executeQuery(sql).then((data) => {
                logger.info('query executed');
                resolve(data);
            }).catch(err => {
                logger.error('error while  execute the query');
                reject(err);
            })
        })
    }

    // This method is used for delete the data from currency exchange
    deleteCurrencyExchange(auto_exchange_id) {
        logger.info('deleteCurrencyExchange() intiated');
        return new Promise((resolve, reject) => {
            let sql = `DELETE from  currency_exchange where auto_exchange_id='${auto_exchange_id}'`;
            dbInstance.executeQuery(sql).then((data) => {
                logger.info('execution completed');
                resolve(data);
            }).catch(err => {
                logger.error('error while execute the query');
                reject(err);
            })
        });
    }

    // This method is used for update the data from currency exchange
    updateCurrencyExchange(auto_exchange_id) {
        logger.info('updateCurrencyExchange() intiated');
        return new Promise((resolve, reject) => {
            let sql = `UPDATE currency_exchange SET amount='${amount}', target_amount='${target_amount}' WHERE auto_exchange_id='${auto_exchange_id}'`;
            dbInstance.executeQuery(sql).then((data) => {
                logger.info('execution completed');
                resolve(data);
            }).catch(err => {
                logger.error('error while execute the query')
                reject(err);

            })
        })
    }
}