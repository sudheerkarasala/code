
//var paymentConfig = require('../utility/payment');
var sqlConfig = require('../utility/sqlService');
var commonCode = require("../controller/kycEntry/kycEntry")
var config = require("../dbconfig/dbconfig").config
// new cronJob('* * * * * *', function () {
//   console.log("hihihi")
// }, null, true, 'America/Los_Angeles');

new cronJob('0 9 * * *', function () {
    autoExchange();
    notification();
}, null, true, null);

var autoExchange = function () {
    return new Promise(function (resolve, reject) {
        myPool.query(` select * from currency_exchange`).then((arrayList, err) => {
            _.forEach(_.filter(arrayList, { exchange_status: 1 }), function (row) {
                commonCode.currencyExchange(row.from_currency, row.to_currency).then(function (list) {
                    if (list.rate > row.target_amount) {
                        myPool.query(`select * from accounts where applicant_id = ${row.applicant_id}`).then((accountInfo) => {
                            var fromAccountInfo = _.filter(accountInfo, { currency: row.from_currency });
                            var toAccountNumber = _.filter(accountInfo, { currency: row.to_currency });
                            if (_.size(fromAccountInfo) > 0 && _.size(toAccountNumber) > 0) {
                                var createObject = {
                                    body: {
                                        "applicant_id": row.applicant_id,
                                        "from_account": fromAccountInfo[0].account_no,
                                        "to_account": toAccountNumber[0].account_no,
                                        "account_type": "wallet",
                                        "from_amount": row.amount,
                                        "to_amount": row.amount * list.rate
                                    }
                                }
                                transaction(createObject).then(function (res) {
                                    if (res.status == 1) {
                                        changeStatus(0, row.auto_exchange_id).then(function (status) {
                                            sendMobileNotification(row.applicant_id, "you amount is excahnge successfully").then(function (message) {
                                                console.log("balance exchange successfully")
                                            }, (err) => {
                                                console.log("balance exchange successfully, but issue in send message")
                                            })
                                        }, (statusError) => {
                                            console.log("error in update status", statusError)
                                        })
                                    } else {
                                        console.log("error in transaction status")
                                    }
                                }, (errTrans) => {
                                    console.log("error in transaction")
                                })
                            } else {
                                console.log("account not found")
                            }
                        }, (err) => {
                            console.log("error in select accounts", err)
                        })
                    }
                }, (err) => {
                    console.log("error in crontab currency exchange ")
                });
            })
        })
    })
}


var notification = function () {
    return new Promise(function (resolve, reject) {
        myPool.query(` select * from currency_exchange`).then((arrayList, err) => {
            _.forEach(_.filter(arrayList, { exchange_status: 1 }), function (row) {
                fixer.latest({ symbols: row.to_currency }).then(function (list) {
                    if (list.rates[row.to_currency] > row.target_amount) {
                        myPool.query(`select * from accounts where applicant_id = ${row.applicant_id}`).then((accountInfo) => {
                            sendMobileNotification(row.applicant_id, "your amount reached to the exchange target").then(function (message) {
                                console.log("balance exchange successfully")
                            }, (err) => {
                                console.log("balance exchange successfully, but issue in send message")
                            })

                        }, (err) => {
                            console.log("error in select accounts", err)
                        })
                    }
                }, (err) => {
                    console.log("error in crontab currency exchange ")
                });
            })
        })
    })
}

//Method for generating unique transaction number
var getTransNumber = () => {
    return Math.floor(Math.random() * 10000000000);
}

var transaction = function (request, response) {
    // common transaction number for one pair of 'DB' & 'CR'
    return new Promise((resolve, reject) => {
        var transactionNumber = getTransNumber();
        checkMunimumBalance(request.body.from_account, request.body.from_amount).then(checkBalance => {
            var deductbalanceAmount = checkBalance.balance - request.body.from_amount;
            if (checkBalance.status == 1) {
                mariadb.createConnection(config).then(conn => {
                    conn.query("SET autocommit=0").then(res => {
                        conn.beginTransaction().then(() => {
                            deductBalance(request.body, deductbalanceAmount, transactionNumber, conn).then(deductBal => {
                                if (deductBal.status != 0) {
                                    addbalance(request.body, transactionNumber, conn).then(res => {
                                        if (res != 0) {
                                            conn.commit();
                                            conn.query('SET autocommit = 1').then(res => {
                                                resolve({ status: 1 });
                                            }, (err) => {
                                                reject({ status: 0 });
                                            })
                                        } else {
                                            conn.rollback();
                                            conn.query('SET autocommit = 1').then(res => {
                                                reject({ status: 1 });
                                            }, (err) => {
                                                reject({ status: 0 });
                                            })
                                        }
                                    })
                                }
                            }, (deductError) => {
                                reject({ status: 0 });
                            })
                        }).catch(err => {
                            reject({ status: 0 });
                        })
                    }).catch(err => {
                        reject({ status: 0 });
                    })
                }).catch(err => {
                    reject({ status: 0 });
                })
            } else {
                reject({ status: 0 });
            }
        }).catch(err => {
            reject({ status: 0 });
        })
    })
}

//Method for checking minimum balance before transfering money
var checkMunimumBalance = ((accountNo, amount) => {
    return new Promise((resolve, reject) => {
        myPool.query(sqlConfig.paymentSql.get_minimum_balance, accountNo).then(minBalance => {
            if (amount > minBalance[0].balance || minBalance[0].status == 0) {
                if (minBalance[0].status == 0) {
                    resolve({ status: 0 })
                }
                else {
                    reject({ status: 0 });
                }
            } else {
                resolve({ status: 1, balance: minBalance[0].balance })
            }
        }).catch(err => {
            reject({
                err: `${err}`
            });
        })
    })
});


//Method for deducting balance
var deductBalance = ((account, deductbalanceAmount, transactionNumber, conn) => {
    return new Promise((resolve, reject) => {
        conn.query(sqlConfig.paymentSql.deduct_balance, [deductbalanceAmount, account.from_account
        ]).then(res => {
            if (res != 0) {
                createTransaction(account, 'CR', transactionNumber, conn, false).then(res => {
                    resolve({ status: 1 });
                }).catch(err => {
                    reject({ err: `${err}` });
                })
            } else {
                conn.rollback();
                conn.query('SET autocommit = 1').then(res => {
                    resolve({ status: 0 });
                }, (err) => {
                    reject({ err: `${err}` });
                })
            }
        }).catch(err => {
            reject({ status: 0 });
        })
    })
})

//Method for getting receiver's applicant_id
var getApplicantId = ((accountNo) => {
    return new Promise((resolve, reject) => {
        myPool.query(sqlConfig.paymentSql.getApplicantId, [accountNo]).then(res => {
            if (res != 0) {
                resolve({
                    recipient_applicant_id: res[0].applicant_id,
                    recipient_currency: res[0].currency,
                    status: 1
                });
            } else {
                reject({ status: 0 });
            }
        })
    })
})


//Method for adding money in receipient account
var addbalance = ((request, transactionNumber, conn) => {
    var amt = request.to_amount;
    var acc = request.to_account;
    return new Promise((resolve, reject) => {
        getApplicantId(request.to_account).then(getApplicantRes => {
            conn.query(sqlConfig.paymentSql.addBalance, [amt, acc]).then(res => {
                request.applicant_id = getApplicantRes.recipient_applicant_id;
                createTransaction(request, 'DB', transactionNumber, conn, true).then(res => {
                    if (res != 0) {
                        resolve({ status: 1 });
                    } else {
                        conn.rollback();
                        conn.query('SET autocommit = 1').then(res => {
                            resolve({ status: 0 });
                        }, (err) => {
                            reject({ err: `${err}` });
                        })
                    }
                })
            }).catch(err => {
                reject({ err: `${err}` });
            })
        }).catch(err => {
            reject({ status: 0 });
        })
    })
})

//Method for getting full name by using account no
var getFullName = (accountNo, transType) => {
    var account = 0;
    //Get the full name based upon transaction type
    transType == 'DB' ? account = accountNo.to_account : account = accountNo.from_account;
    return new Promise((resolve, reject) => {
        myPool.query(sqlConfig.paymentSql.getFullname, [account]).then(res => {
            resolve({ full_name: res[0].first_name + ' ' + res[0].last_name, status: 1 })
        }).catch(err => {
            reject({ err: `${err}`, status: 0 });
        })
    })
}


//Method for creating a transaction record
var createTransaction = ((account, transType, transactionNumber, conn, flag) => {
    var transnum = transactionNumber;
    return new Promise((resolve, reject) => {
        getFullName(account, transType).then(res => {
            var fullname = res.full_name;
            var transtype = transType;
            var applicantId = account.applicant_id;
            var amount = (flag) ? account.from_amount : account.to_amount
            conn.query(sqlConfig.paymentSql.insert_transaction, [
                applicantId, transnum, account.from_account, account.to_account, fullname, account.account_type, transtype, amount,
            ]).then(res => {
                if (res != 0) {
                    resolve({ status: 1 });
                } else {
                    conn.rollback();
                    conn.query('SET autocommit = 1').then(res => {
                        reject({ status: 0 });
                    }, (err) => { reject({ err: `${err}` }); })
                }
            }).catch(err => {
                conn.rollback();
                conn.query('SET autocommit = 1').then(res => {
                    reject({ status: 0 });
                }, (err) => { reject({ err: `${err}` }); })
            })
        }).catch(getNameError => {
            reject({ status: 0 });
        })
    })
})


// this method  for change status 
var changeStatus = function (value, id) {
    return new Promise((resolve, reject) => {
        myPool.query(`update currency_exchange set exchange_status =${value} where auto_exchange_id = ${id}`).then(message => {
            resolve(message)
        }).catch(err => {
            reject(err);
        })
    })
}

// this method for send mobile notification
var sendMobileNotification = function (id, message) {
    return new Promise((resolve, reject) => {
        myPool.query(`select mobile from contact where applicant_id = ${id}`).then(res => {
            commonCode.mobileOtp(res[0].mobile, message).then((result) => {
                resolve(true);
            }).catch((error) => {
                resolve({ message: error, status: 0, expire: 0 });
            });
        }).catch(err => {
            reject(err);
        })
    })
}

