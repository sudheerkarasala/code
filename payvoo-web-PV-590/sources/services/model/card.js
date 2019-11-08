
/**
 * card
 * This is is to model the data related to card information.
 * @package card
 * @subpackage sources/services/model/card
 * @author SEPA Cyber Technologies Sekhara Suman Sahu
 */

import { DbConnMgr } from '../dbconfig/dbconfig';
const dbInstance = DbConnMgr.getInstance();

export class Card {
  constructor() {

  }

  //Method for checking duplicate card.
  isDuplicatCard(cardnum, applicantId) {
    logger.info('initiated');
    return new Promise((resolve, reject) => {
      let sql = `select payment_cards_id , status from payment_cards where card_number = ${cardnum} and applicant_id = ${applicantId}`;
      dbInstance.executeQuery(sql)
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  //Method to check number of card.
  isFirstCard(applicantId) {
    logger.info('initiated');
    return new Promise((resolve, reject) => {
      let sql = `select count(payment_cards_id) as cards from payment_cards where applicant_id = ${applicantId}`;
      dbInstance.executeQuery(sql)
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  //Method for inserting card details in payment_cards table
  insertCardData(applicantId, cardType, nameOnCard, cardNumber, cardCvv, cardMonth, CardYear, status, defaultCard) {
    logger.info('initiated');
    return new Promise((resolve, reject) => {
      let sql = `insert into payment_cards (applicant_id,card_type,name_on_card,card_number,card_cvv,card_month,card_year,status,default_card)
             values (${applicantId},'${cardType}','${nameOnCard}','${cardNumber}','${cardCvv}',${cardMonth},${CardYear}, ${status}, ${defaultCard})`;
      dbInstance.executeQuery(sql)
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  //Method to update card status
  deleteCard(cardId, enableOrDisable) {
    logger.info('initiated');
    return new Promise((resolve, reject) => {
      let sql = `Update payment_cards set status = ${enableOrDisable}  where payment_cards_id = ${cardId}`;
      dbInstance.executeQuery(sql)
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  //Method to get all the cards saved by an user
  getAllCards(applicantId) {
    logger.info('initiated');
    return new Promise((resolve, reject) => {
      let sql = `select payment_cards_id,card_type,name_on_card,card_number,card_cvv,card_month,card_year,status,default_card from payment_cards where applicant_id = ${applicantId}`;
      dbInstance.executeQuery(sql)
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}

// /*Method for getting the balance of an User from wallet*/
// obj.getWalletBalance = (request, response) => {
//     return new Promise((resolve, reject) => {
//         myPool.query(sqlConfig.paymentsSql.Get_wallet_balance, [request.params.applicant_id]).then(res => {
//             if (res != 0) {
//                 resolve({
//                     message: langEngConfig.message.payment.wallet_balance_success,
//                     wallet_balance: res,
//                     status: 1
//                 });
//             } else {
//                 reject({
//                     message: langEngConfig.message.payment.wallet_applicant_id_error,
//                     status: 0
//                 });
//             }
//         }, (err) => {
//             reject(err);
//         })
//     })
// }

// // Method for store target currency value in the table 
// obj.currencyExchange = function (req, res) {
//     return new Promise((resolve, reject) => {
//         var status = req.body.exchange_status ? 1 : 0
//         myPool.query(`select applicant_id from currency_exchange where account_no = ${req.body.account_no} and from_currency = '${req.body.from_currency}' and to_currency= '${req.body.to_currency}' and  exchange_status =${status}`).then(res => {
//             if (_.size(res) > 0) {
//                 myPool.query(sqlConfig.paymentsSql.update_currency_exchange, [req.body.applicant_id, req.body.account_no, _.toUpper(req.body.from_currency), _.toUpper(req.body.to_currency), req.body.amount, req.body.target_amount, req.body.exchange_status, !req.body.exchange_status, req.body.account_no]).then(res => {
//                     if (res != 0) {
//                         if (req.body.exchange_status) {
//                             resolve({
//                                 message: langEngConfig.message.payment.exchange_success, status: 1
//                             });
//                         } else {
//                             resolve({
//                                 message: langEngConfig.message.payment.alert_success, status: 1
//                             });
//                         }
//                     } else {
//                         reject({
//                             message: langEngConfig.message.payment.exchange_error, status: 0
//                         });
//                     }
//                 }, (err) => {
//                     reject(err);
//                 })
//             } else {
//                 myPool.query(sqlConfig.paymentsSql.insert_currency_exchange, [req.body.applicant_id, req.body.account_no, _.toUpper(req.body.from_currency), _.toUpper(req.body.to_currency), req.body.amount, req.body.target_amount, req.body.exchange_status, true]).then(res => {
//                     if (res != 0) {
//                         if (req.body.exchange_status) {
//                             resolve({
//                                 message: langEngConfig.message.payment.exchange_success, status: 1
//                             });
//                         } else {
//                             resolve({
//                                 message: langEngConfig.message.payment.alert_success, status: 1
//                             });
//                         }
//                     } else {
//                         reject({
//                             message: langEngConfig.message.payment.exchange_error, status: 0
//                         });
//                     }
//                 }, (err) => {
//                     reject(err);
//                 })
//             }
//         },
//             (err) => {
//                 reject(err)
//             })
//     })
// }

// obj.alerts = class {
//     constructor(request) {
//         this.applicant_id = request.params.applicant_id,
//             this.auto_exchange_id = request.params.auto_exchange_id,
//             this.amount = request.body.amount,
//             this.target_amount = request.body.target_amount
//     }
// }

// // This method is used for get all the data from currency exchange
// obj.getCurrencyExchange = function (priceAlert, response) {
//     return new Promise((resolve, reject) => {
//         myPool.query(sqlConfig.paymentsSql.get_currencyExchange, [priceAlert.applicant_id]).then((data) => {
//             if (data.length > 0) {
//                 var i = 0
//                 _.forEach(data, function (row) {
//                     kycEntry.currencyExchange(row.from_currency, row.to_currency).then(function (value) {
//                         i++; row["currency_rate"] = value.rate;
//                         if (_.size(data) == i) {
//                             resolve({ message: langEngConfig.message.payment.get_success, status: 1, data });
//                         }
//                     })
//                 })
//             }
//             else {
//                 resolve({ message: langEngConfig.message.payment.get_fail, status: 0 });
//             }
//         }).catch(err => {
//             reject({ message: langEngConfig.message.payment.get_id, status: 0 });
//         })
//     })
// }

// // This method is used for delete the data from currency exchange
// obj.deleteCurrencyExchange = function (priceAlert, response) {
//     return new Promise((resolve, reject) => {

//         myPool.query(sqlConfig.paymentsSql.delete_currencyExchange, [priceAlert.auto_exchange_id]).then((data) => {
//             if (data.affectedRows == 1)
//                 resolve({ message: langEngConfig.message.payment.delete_success, status: 1 });
//             else
//                 resolve({ message: langEngConfig.message.payment.delete_fail, status: 0 });
//         }).catch(err => {

//             reject({ message: langEngConfig.message.payment.delete_fail, status: 0 });
//         })
//     })
// }

// //method for inserting record into chek_rates table
// obj.checkRate = (request, response) => {
//     return new Promise((resolve, reject) => {
//         if(request.body.isConvert == 0 || request.body.isConvert == 1) {        
//             let sqlQuery;
//             let data;
//             (request.body.isConvert == 0) ? (sqlQuery = sqlConfig.paymentSql.select_currency_rate, data = [request.body.applicant_id, request.body.from_currency, request.body.to_currency, request.body.isConvert]) : (sqlQuery = sqlConfig.paymentSql.select_currency_convertion, data = [request.body.applicant_id, request.body.from_currency, request.body.isConvert]);
//                 myPool.query(sqlQuery, data).then(results => {
//                 if (_.size(results) > 0) {
//                     resolve({ status: 0, message: langEngConfig.message.payment.check_rates_fail1 })
//                 } else {
//                     myPool.query(sqlConfig.paymentSql.insert_check_rates, [
//                         request.body.applicant_id,
//                         request.body.from_currency,
//                         request.body.to_currency,
//                         request.body.isConvert,
//                         new Date()
//                     ]).then(res => {
//                         if (res != 0) {
//                             resolve({ message: langEngConfig.message.payment.check_rate_succ, status: 1 });
//                         } else {
//                             reject({ message: langEngConfig.message.payment.check_rates_fail, status: 0 });
//                         }
//                     }).catch(err => {
//                         reject({ err: `${err}`, status: 0 });
//                     })
//                 }

//             }).catch(err => {
//                 resolve({ err: `${err}`, status: 0 })
//             })
//         } else {
//             resolve({status:0,message:langEngConfig.message.payment.check_rates_fail2})
//         }
//     })
// }

// // This method is used for update the data from currency exchange
// obj.updateCurrencyExchange = function (priceAlert, response) {
//     return new Promise((resolve, reject) => {
//         myPool.query(sqlConfig.paymentsSql.update_currencyExchange, [priceAlert.amount, priceAlert.target_amount, priceAlert.auto_exchange_id]).then((data) => {
//             if (data.affectedRows > 0) {
//                 resolve({ message: langEngConfig.message.payment.update_success, status: 1, data });
//             }
//             else {
//                 resolve({ message: langEngConfig.message.payment.update_fail, status: 0 });
//             }
//         }).catch(err => {
//             reject({ message: langEngConfig.message.payment.update_data, status: 0 });

//         })
//     })
// }



// //Method for removing a record from check_rates table
// obj.deleteCheckRate = (request, response) => {
//     return new Promise((resolve, reject) => {
//         myPool.query(sqlConfig.paymentSql.delete_check_rates, [
//             request.params.check_rate_id
//         ]).then(res => {
//             if (res.affectedRows != 0) {
//                 resolve({ message: langEngConfig.message.payment.check_rate_del_succ, status: 1 });
//             } else {
//                 reject({ message: langEngConfig.message.payment.check_rate_del_fail, status: 0 });
//             }
//         }).catch(err => {
//             reject({ message: langEngConfig.message.payment.check_rate_del_fail, status: 0 });
//         })
//     })
// }


// // Method for peer transfer
// obj.peerTransfer = (request, response) => {
//     return new Promise((resolve, reject) => {
//         myPool.query(`select * from accounts where applicant_id =${request.body.applicant_id_to} AND currency = '${request.body.currency}'`).then(to_account_data => {
//             myPool.query(`select * from accounts where applicant_id =${request.body.applicant_id_from} `).then(from_account_data => {
//                 if (_.size(to_account_data) > 0) {
//                     var createObject = {
//                         body: {
//                             "applicant_id": request.body.applicant_id_from,
//                             "from_account": from_account_data[0].account_no,
//                             "to_account": to_account_data[0].account_no,
//                             "account_type": "wallet",
//                             "from_amount": request.body.amount,
//                             "to_amount": request.body.amount
//                         }
//                     }
//                     obj.transaction(createObject).then(function (message) {
//                         resolve(message)
//                     }, function (err) {
//                         reject(err)
//                     })
//                 } else {
//                     reject({ message: langEngConfig.message.accountStatus.account_notfound, status: 0 });
//                 }
//             }).catch(err => {
//                 reject({ message: langEngConfig.message.payment.duplicate_card_query_err, status: 0 });
//             })
//         }).catch(err => {
//             reject({ message: langEngConfig.message.payment.duplicate_card_query_err, status: 0 });
//         })
//     })
// }


// module.exports = { obj };