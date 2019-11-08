/**
 * checkRate
 * This model file is used for checkRate related services.
 * @package checkRate
 * @subpackage sources/services/model/checkRate
 * @author SEPA Cyber Technologies Sekhara Suman Sahu, Shashank Singu.
 */

import { DbConnMgr } from '../dbconfig/dbconfig';
const dbInstance = DbConnMgr.getInstance();

export class CheckRateModel {
  constructor() {

   }
  
  deleteCheckRate(check_rate_id) {
    return new Promise((resolve, reject) => {
    let sql = `delete from check_rates where check_rates_id = ${check_rate_id}`
    dbInstance.executeQuery(sql)
    .then(result => {
      resolve(result)
    })
    .catch(err=>{
      reject(err);
    })
  })
}

  checkRate (applicant_id, from_currency, to_currency, isConvert , created_on){
    return new Promise((resolve, reject) => {
    let sql = `insert into check_rates (applicant_id,from_currency,to_currency,isConvert,created_on)
               values (${applicant_id},${from_currency},${to_currency},${isConvert},${created_on})`;
        
    dbInstance.executeQuery(sql)
    .then(checkRateRes=>{
      resolve(checkRateRes);
    })
    .catch(err=>{
      reject(err);
      });
     })
   }
}