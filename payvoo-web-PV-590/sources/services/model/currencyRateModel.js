/**
 * currencyRateModel
 * this is used for the check the current currency rates and also show the convertamount with multiple Currency
 * @package currencyRateModel
 * @subpackage model/currencyRateModel
 *  @author SEPA Cyper Technologies,krishnakanth.r
 */
"use strict";
import { DbConnMgr } from '../dbconfig/dbconfig';
const DbInstance = DbConnMgr.getInstance();
export class CurrencyRate {
    constructor(user) {
        this.applicant_id = user.applicant_id;
        this.isConvert = user.isConvert;
        this.from_currency = user.from_currency;
        this.amount = user.amount;
        this.check_rates_id = user.check_rates_id;
    }
    currencyRate(applicantId, isConvert) {
        return new Promise((resolve, reject) => {
            logger.info("currencyRate() initiated");
            let sql = `select from_currency,to_currency,check_rates_id from check_rates where applicant_id = ${applicantId} and isConvert=${isConvert}`;
            DbInstance.executeQuery(sql).then(result => {
                logger.info("query executed");
                resolve(result);
            }).catch(err => {
                logger.error("error while  execute the query");
                reject(err);
            });
        })
    }
    convertionAmount(applicantId, isConvert) {
        return new Promise((resolve, reject) => {
            logger.info("currencyRate() initiated");
            let sql = `select from_currency,check_rates_id from check_rates where applicant_id = ${applicantId} and isConvert=${isConvert}`;
            DbInstance.executeQuery(sql).then(result => {
                logger.info("query executed");
                resolve(result);
            }).catch(err => {
                logger.error("error while  execute the query");
                reject(err);
            });
        })
    }
    deleteCurrencyRate(id) {
        return new Promise((resolve, reject) => {
            logger.info("currencyRate() initiated");
            let sql = `DELETE from  check_rates where check_rates_id=${id}`;
            DbInstance.executeQuery(sql).then(result => {
                logger.info("query executed");
                resolve(result);
            }).catch(err => {
                logger.error("error while  execute the query");
                reject(err);
            });
        })
    }
    selectRate(applicant_id, from_currency, to_currency, isConvert) {
        return new Promise((resolve, reject) => {
            let sql = `select check_rates_id from check_rates where applicant_id=${applicant_id} and isConvert=${isConvert} and from_currency='${from_currency}' and to_currency='${to_currency}'`;
            DbInstance.executeQuery(sql)
                .then(results => {
                    resolve(results);
                })
                .catch(err => {
                    reject(err);
                });
        })
    }
    addRate(applicant_id, from_currency, to_currency, isConvert, created_on) {
        return new Promise((resolve, reject) => {
            let sql = `insert into check_rates (applicant_id,from_currency,to_currency,isConvert,created_on)
               values (${applicant_id},'${from_currency}','${to_currency}',${isConvert},'${created_on}')`;

            DbInstance.executeQuery(sql)
                .then(checkRateRes => {
                    resolve(checkRateRes);
                })
                .catch(err => {
                    reject(err);
                });
        })
    }
}
// obj.currencyRate = function (currency_object, response) {
//     return new Promise(function (resolve, reject) {
//         if (currency_object.isConvert == 0) {
//             //this is for the current currency rates
//             myPool.query(sqlConfig.currencyRateSql.selectQuery, [currency_object.applicant_id, currency_object.isConvert]).then(arrayList => {
//                 if (arrayList.length > 0) {
//                     var result = [];
//                      _.forEach(arrayList, function (row, key) {
//                         kycEntry.currencyExchange(row.from_currency, row.to_currency).then(list => {
//                             //fixer.latest({ base: row.from_currency, symbols: row.to_currency }).then(list => {
//                             const obj = {};
//                             obj.from_currency = row.from_currency;
//                             obj.to_currency = row.to_currency;
//                             obj.check_rates_id = row.check_rates_id;
//                             obj.rates = list.rate;
//                             result.push(obj);
//                             if (arrayList.length == result.length) {
//                                 resolve({ status: 1, message: configVariable.message.currency.success, data: result });
//                             }
//                         }).catch(err => {
//                             resolve({ status: 0, message: `${err}` });
//                         })
//                     });
//                 } else {
//                     resolve({ status: 0, message: configVariable.message.currency.fail });
//                 }
//             }).catch(err => {
//                 resolve({ status: 0, message: `${err}` });
//             })
//         } else if (currency_object.isConvert == 1) {
//             //this is for show the convert amount with multiple Currency
//             myPool.query(sqlConfig.currencyRateSql.selctConvertQuery, [currency_object.applicant_id, currency_object.isConvert]).then(arrayList => {
//                 if (arrayList.length > 0) {
//                     // var result = [];
//                     if (currency_object.from_currency != "undefined" && currency_object.from_currency && currency_object.amount) {
//                         ConvertRate(arrayList, currency_object.from_currency, currency_object.amount).then(res => {
//                             resolve(res);
//                         }).catch(err => {
//                             resolve({ status: 0, message: `${err}` });
//                         })

//                     } else {                        
//                         const unique = _.uniqBy(arrayList, function (list) {
//                             return list.from_currency;
//                         });
//                         var result = [];
//                         //console.log(unique);
//                         _.forEach(unique, function (row, key) {
//                             const obj = {};
//                             obj.to_currency = row.from_currency;
//                             obj.exchanged_amount = 0;
//                             obj.check_rates_id = row.check_rates_id;
//                             result.push(obj);
//                             if (result.length == unique.length) {
//                                 resolve({ status: 1, message: configVariable.message.currency.success, data: result })
//                             }
//                         })
//                     }

//                 } else {
//                     resolve({ status: 0, message: configVariable.message.currency.fail });
//                 }
//             }).catch(err => {
//                 resolve({ status: 0, message: `${err}` })
//             })
//         } else {
//             resolve({ status: 0, message: configVariable.message.currency.fail2 })
//         }
//     })
// }

// var ConvertRate = function (arrayList, from_currency, amount) {
//     return new Promise(function (resolve, reject) {
//         const unique = _.uniqBy(arrayList, function (list) {
//             return list.from_currency;
//         });
//         var convertId = _.filter(unique, function (list) {
//             return list.from_currency == from_currency;

//         });
//         if (convertId.length > 0) {
//             var dataList = _.filter(unique, function (list) {
//                 return list.from_currency !== from_currency;
//             });
//             if (dataList.length > 0) {
//                 var result = [];
//                 const request = {};
//                 request.to_currency = from_currency;
//                 request.exchanged_amount = amount;
//                 request.check_rates_id = convertId[0].check_rates_id;
//                 result.push(request);
//                 _.forEach(dataList, function (row, key) {
//                     kycEntry.currencyExchange(from_currency, row.from_currency).then(list => {
//                         // fixer.latest({ base: from_currency, symbols: row.from_currency }).then(list => {
//                         const obj = {};
//                         obj.to_currency = row.from_currency;
//                         // obj.exchanged_amount = ((list.rates[row.from_currency]) * (amount));
//                         obj.exchanged_amount = ((list.rate) * (amount));
//                         obj.check_rates_id = row.check_rates_id;
//                         result.push(obj);
//                         if (dataList.length == (result.length) - 1) {
//                             resolve({ status: 1, message: configVariable.message.currency.success, data: result });
//                         }
//                     }).catch(err => {
//                         resolve({ status: 0, message: `${err}` });
//                     })
//                 });
//             } else {
//                 const result = [];
//                 const request = {};
//                 request.to_currency = from_currency;
//                 request.exchanged_amount = amount;
//                 request.check_rates_id = convertId[0].check_rates_id;
//                 result.push(request);
//                 resolve({ status: 1, message: configVariable.message.currency.fail4, data: result });
//             }
//         } else {
//             resolve({ status: 0, message: configVariable.message.currency.fail3 })
//         }

//     })
// }
// // This method is used for delete the data from rates
// obj.deleteCurrencyRate = function (currency_object, response) {
//     return new Promise(function (resolve, reject) {
//         myPool.query(sqlConfig.currencyRateSql.deleteQuery, [currency_object.check_rates_id]).then((data) => {
//             if (data.affectedRows > 0)
//                 resolve({ message: configVariable.message.currency.success1, status: 1 });
//             else
//                 resolve({ message: configVariable.message.currency.fail1, status: 0 });

//         }).catch(err => {
//             reject({ message: `${err}`, status: 0 });
//         })

//     });
// }


// module.exports = { obj }