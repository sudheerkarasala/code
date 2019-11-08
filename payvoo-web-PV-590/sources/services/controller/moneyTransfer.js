
/**
 * moneyTransfer
 * This controller contains all the method required to perform a successfull money transfer from one
 * currency account to another currency account.
 * @package moneyTransfer
 * @subpackage controller/moneyTransfer
 * @author SEPA Cyber Technologies Sekhara Suman Sahu
 */
import {MoneyTransfer} from '../model/moneyTransfer';
import {langEngConfig} from '../utility/lang_eng';
import {Utils} from '../utility/utils';
import {DbConnMgr} from '../dbconfig/dbconfig';
const dbInstance = DbConnMgr.getInstance();
let utils = new Utils();

const STATUS = {
  SUCCESS : 0,
  FAILURE : 1 
}

const TRANSTYPE = {
  DEBIT : 'DB',
  CREDIT : "CR"
}


//This method is to perform money transfer form one account to another account
export const AccountTransfer = (request,response)=>{
  let newTransfer = new MoneyTransfer(request.body);
  utils.isValidMoneyTransferRequest(newTransfer)
  .then(()=>{
  let transactionId = utils.generateTransNum();
  
  checkMunimumBalance(newTransfer.from_account, newTransfer.from_amount, newTransfer)
  .then(minimumBalance=>{
  
  let deductAmnt = minimumBalance.balance - newTransfer.from_amount;  
  if(minimumBalance.status == STATUS.SUCCESS){
  dbInstance.getConnObject()
  .then(conn=>{
  conn.beginTransaction()
  .then(()=>{
  deductAmount(newTransfer.from_account, deductAmnt,transactionId ,newTransfer, conn)
  .then(deductBalRes=>{                           
  if(deductBalRes.status != STATUS.FAILURE){
  //transModel.addbalance()
  addbalance(newTransfer.to_amount, newTransfer.to_account, transactionId, newTransfer, conn).then(res => {
  if(res != 0) {
    //final commit in success case
    conn.commit();
    conn.close();
    response.send({  
      status:STATUS.SUCCESS,message:langEngConfig.message.payment.trans_success
    });                                                                    
                    
  } else {
    conn.rollback();
    conn.close();
    response.send({message:langEngConfig.message.payment.trans_failed,status:STATUS.FAILURE})              
  }
  }).catch(err => {
    response.send({status:STATUS.FAILURE,message:`${err}`})
  })
  }
  })
  .catch((err)=>{
    response.send({status:STATUS.FAILURE,message:`${err}`})
   })
  })
  .catch((err)=>{
    response.send({status:STATUS.FAILURE,message:`${err}`})
  })
  })
        .catch((err)=>{
          response.send({status:STATUS.FAILURE,message:`${err}`})

        })
      } else {
        response.send({status:STATUS.FAILURE,message:checkBalance.message})
      }
    })
    .catch((err)=>{
      response.send({status:STATUS.FAILURE,message:langEngConfig.message.payment.insufficient_balance})
    })
  })
  .catch((err)=>{
    response.send({status:STATUS.FAILURE,message:`${err}`});

  });
}

//Method for checking account balance before performing money transfer
const checkMunimumBalance = (accountNo, amount, newTransfer) => {
  return new Promise((resolve, reject) => {   
  newTransfer.checkMunimumBalance(accountNo)
  .then(result => {
  if (amount > result[0].balance || result[0].status == 0) {
  if (result[0].status == 0) {
  reject({
    status: STATUS.FAILURE,
    message: `${accountNo }` + langEngConfig.message.payment.account_deactive
    });
  } else {
    reject({
    message: langEngConfig.message.payment.insufficient_balance,
    status: STATUS.FAILURE
    })
    }
  } else {
    resolve({
    message: langEngConfig.message.payment.enough_balance,
    balance: result[0].balance,
    status: STATUS.SUCCESS
    })
  }
  })
  .catch(err => {
    reject(err);
  });
  })
}

//Method for deducting balance from account
const deductAmount = (fromAccount, deductBalance, transactionId,newTransfer, conn) => {
  return new Promise((resolve, reject) => {  
  newTransfer.deductAmnt(fromAccount, deductBalance, conn)
  .then(result => {
  if (result != 0) {
  //creating the credit transaction record.
  createTransaction(newTransfer,TRANSTYPE.DEBIT, transactionId, false,conn)
  .then(() => {
    resolve({
      message: langEngConfig.message.payment.amount_deduction_success,
      status: STATUS.SUCCESS
    })
  })
  .catch(err => {  
    reject({
      status: STATUS.FAILURE
      });
    })
  } else conn.rollback();
  })
  .catch(err => {
    reject({
      message: langEngConfig.message.payment.amount_deduction_fail,
      err: `${err}`,
      status: STATUS.FAILURE
      });
    })
  })
}

//Method for adding money in receipient account
const addbalance = (toAmnt, toAccount, transactionId, newTransfer, conn) => {
return new Promise((resolve, reject) => {
  //getApplicantId(toAccount).then(getApplicantRes => {
newTransfer.addAmnt(toAmnt, toAccount, conn)
.then(addAmntRes=>{
  if(addAmntRes){
    createTransaction(newTransfer,TRANSTYPE.CREDIT, transactionId, true,conn)
    .then(()=>{
      resolve({
        message: langEngConfig.message.payment.amount_addition_success,
        status: STATUS.SUCCESS
      });
    })
    .catch(err=>{
      reject(err);
    })
  }
})
.catch(err=>{
  reject(err);
})    
  })
}

//Method for creting an account to account transfer transaction record
const createTransaction = (newTransfer, transType, transactionNumber, flag,conn) => {
//transaction number.
let transnum = transactionNumber;
let account = 0;
  return new Promise((resolve, reject) => {
  transType == 'DB' ? account = newTransfer.to_account : account = newTransfer.from_account;  
  //getting the full name
  getFullName(account, newTransfer)
  .then(fullnameRes => {
   let fullname = fullnameRes.full_name;
   let transtype = transType;
   let applicantId = newTransfer.applicant_id;
   let amount = (flag) ? newTransfer.from_amount : newTransfer.to_amount
   //inserting the transaction record
  newTransfer.insertTransaction(applicantId, transnum,transtype, newTransfer.from_account, newTransfer.to_account, fullname, newTransfer.account_type,amount , conn)
  .then(transRes => {
    if (transRes != 0) {
      resolve({
        message: langEngConfig.message.payment.trans_record_succ,
        status: STATUS.SUCCESS
      });
    } else {
      //Rollback the transaction and enable the auto commit in failure case
      conn.rollback();
      reject({
        message: langEngConfig.message.payment.trans_record_fail,
        status: STATUS.FAILURE
        });
        }
  })
  .catch(err => {
    conn.rollback();  
    reject({
      message: langEngConfig.message.payment.trans_record_fail,
      err: `${err}`,
      status: 0
    });
  })
  })
.catch(err=>{

    })
  })
}

//Method for getting full name by using account no
const getFullName = (accountNo,newTransfer) => {
  return new Promise((resolve, reject) => {
  newTransfer.getFullName(accountNo)
  .then(result => {
    resolve({
        message: langEngConfig.message.payment.fullname_success,
        full_name: result[0].first_name + ' ' + result[0].last_name,
        status: STATUS.SUCCESS
      })
  })
  .catch(err => {
    reject({
        err: `${err}`,
        status: STATUS.FAILURE
      });
  })
  })
}

//Method for getting receiver's applicant_id
let getApplicantId = ((accountNo) => {
    return new Promise((resolve, reject) => {
        myPool.query(sqlConfig.paymentSql.getApplicantId, [accountNo]).then(res => {
            if (res != 0) {
                resolve({
                    message: langEngConfig.message.payment.receiver_applicantid_success,
                    recipient_applicant_id: res[0].applicant_id,
                    recipient_currency: res[0].currency,
                    status: 1
                });
            } else {
                reject({
                    message: langEngConfig.message.payment.receiver_applicantid_error,
                    status: 0
                });
            }
        })
    })
})


//Method for getting transaction details of an account number
export let transactionDetails = (request, response) => {
  let newTransfer = new Transfer(request.params);  
      if (_.toLower(newTransfer.account_id) == "all") {
         newTransfer.getTransactionDetails(newTransfer.applicant_id).then(res => {
              if (res != 0) {
                if(_.toLower(newTransfer.device_type) == "web"){
                  createResponse(res).then(function (list) {
                      response.send({
                          message: langEngConfig.message.payment.transaction_detail_fetch_success, transaction_details: list,
                          status:STATUS.SUCCESS
                      });
                  })
                } else {
                  response.send({message: langEngConfig.message.payment.transaction_detail_fetch_success, transaction_details: res,
                    status:STATUS.SUCCESS})
                  
                }
              } else {
                  response.send({
                      message: langEngConfig.message.payment.transaction_detail_fetch_error, status:STATUS.FAILURE
                  });
              }
          }).catch(err => {
              response.send({message: `${err}`, status:STATUS.FAILURE })
          })
      } else {
         newTransfer.transactionDetailsByAccount(newTransfer.account_id).then(res => {
              if (res != 0) {
                if(_.toLower(newTransfer.device_type) == "web") {
                  createResponse(res).then(function (list) {                 
                      response.send({
                          message: langEngConfig.message.payment.transaction_detail_fetch_success, transaction_details: list,
                          status:STATUS.SUCCESS
                      });
                  })
                } else {
                  response.send({message: langEngConfig.message.payment.transaction_detail_fetch_success, transaction_details: res,
                    status:STATUS.SUCCESS})

                }
              } else {
                  reject({
                      message: langEngConfig.message.payment.transaction_detail_fetch_error, status:STATUS.FAILURE
                  });
              }
          }).catch(err => {
              reject({ message: `${err}`, status:STATUS.FAILURE })
          })
      }

  
}


let createResponse = function (res) {
  return new Promise((resolve, reject) => {
      var i = 0;
      _.forEach(res, function (row) {
          i++
          row.created_on = dateFormat(row.created_on, 'dd-mm-yyyy')
          row["created_on_with_time"] = dateFormat(row.created_on, "dd-mm-yyyy, h:MM:ss TT")
      })
      if (_.size(res) == i) {
          var array = []
          var y = 0
          _.forEach(_.uniqBy(res, 'created_on'), function (rowData) {
              y++
              var obj = {}
              obj["created_on"] = rowData.created_on;
              obj.data = _.filter(res, { created_on: rowData.created_on });
              array.push(obj);
          })
          if (_.size(_.uniqBy(res, 'created_on')) == y) {
              resolve(array)
          }
      }
  })
}
