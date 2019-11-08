/**
 * moneyTransfer
 * This model contains all the methods to support a successful money transfer from one currency account
 * to another.
 * @package moneyTransfer
 * @subpackage model/moneyTransfer
 * @author SEPA Cyber Technologies Sekhara Suman Sahu
 */
import {
  sqlConfig
} from '../utility/sqlService';
import {
  DbConnMgr
} from '../dbconfig/dbconfig';
import {
  langEngConfig
} from '../utility/lang_eng';
const dbInstance = DbConnMgr.getInstance();

const STATUS = {
  SUCCESS: 0,
  FAILURE: 1
}

export class MoneyTransfer {
  constructor(transDetail) {
		this.applicant_id = transDetail.applicant_id,
    this.from_account = transDetail.from_account,
    this.to_account = transDetail.to_account,
    this.account_type = transDetail.account_type,
    this.from_currency = transDetail.from_currency,
    this.from_amount = transDetail.from_amount,
    this.to_amount = transDetail.to_amount
    this.device_type = transDetail.device_type
  }
	//Method for checking minimum balance of an account before transfering money
	checkMunimumBalance(accountNo) {
	  return new Promise((resolve, reject) => {
	    let sql = `select balance,status from accounts where account_no = ${accountNo}`;
	    dbInstance.executeQuery(sql).then(results => {
	      resolve(results);
	    }).catch(err => {
	      reject(err);
	    });
	  });
	}
	deductAmnt(fromAccount, deductBalance, conn) {
		return new Promise((resolve,reject) => {
		let sql = `update accounts set balance = ${deductBalance} where account_no = ${fromAccount}`;
		conn.query(sql).then(results => {
				resolve(results);
		}).catch(err => {
				reject(err);
			});
		})
	}

  addAmnt(toAmnt, toAccount, conn){
    return new Promise((resolve, reject)=>{
      let sql = `update accounts set balance = balance + ${toAmnt}  where account_no = ${toAccount}`;

      conn.query(sql).then(result=>{
        resolve(result);
      }).catch(err=>{
        reject(err);
      })
    })
  }
	getFullName(accountNo) {
		return new Promise((resolve,reject) => {
			let sql = `select  contact.first_name,contact.last_name from contact
			           JOIN  accounts on contact.applicant_id = accounts.applicant_id
			           where accounts.account_no = ${accountNo}`;
			dbInstance.executeQuery(sql).then(results => {
				resolve(results);
			}).catch(err => {
				reject(err);
			});
		})
  }
  
	insertTransaction(applicantId, transnum,transtype,from_account,to_account, fullname,account_type,
	amount, conn) {
		return new Promise((resolve,reject) => {
		let sql = `insert into transactions (applicant_id,transaction_number,transaction_type,from_account,to_account,opposite_account_owner,account_type,amount)
               values (${applicantId},'${transnum}','${transtype}',${from_account},${to_account},'${fullname}','${account_type}',${amount})`;
    conn.query(sql).then(results => {
			  resolve(results);
		}).catch(err => {
					reject(err);
				});
			});	
  }

  getTransactionDetails(applicantId) {
			return new Promise((resolve,reject) => {
        sql1=`SELECT transaction_id,transaction_number, transaction_type, from_account ,to_account, opposite_account_owner , account_type, amount, created_on FROM transactions 
        WHERE applicant_id = ${applicantId} ORDER BY created_on DESC`;
				dbInstance.executeQuery(sql).then(results => {
					resolve(results);
				}).catch(err => {
					reject(err);
				});
			});	
  }

  transactionDetailsByAccount(account) {
    return new Promise((resolve,reject) => {
      sql1=`select * from transactions where from_account =${account} and transaction_type='DB'
      UNION
      select * from transactions where to_account =${account} and transaction_type='CR' ORDER BY created_on DESC`;
      dbInstance.executeQuery(sql).then(results => {
        resolve(results);
      }).catch(err => {
        reject(err);
      });
    });	
 }
}