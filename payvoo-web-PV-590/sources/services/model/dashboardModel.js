"use strict";
import { DbConnMgr } from "../dbconfig/dbconfig";
const dbInstance = DbConnMgr.getInstance();

const STATUS = {
  SUCCESS: 0,
  FAILURE: 1
}

const DASHBOARD_STATUS = {
  PENDING: 0,
  SUBMITTED: 1,
  VERIFIED: 2
}

export class DashboardModel {
  constructor() {

  }

  getDashboardStatus (busnessId) {
    return new Promise((resolve, reject) => {
    let sql = `select isRestricted,type_of_business,personal_profile,business_owner_details,business_address from kyb_business where business_id = ${busnessId}`

    dbInstance.executeQuery(sql)
    .then(result=>{
      resolve(result);
    })
    .catch(err=>{
      reject(err);
    });
    })
  }

  //for inserting business_id,type_of_business,personal_profile,business_owner_details,business_address status
  postDashboardStatus (businessId) {
  return new Promise((resolve, reject) => {
  let sql = `insert into kyb_business (business_id,type_of_business,personal_profile,business_owner_details,business_address)
             values (${businessId},'0','0','0','0')`;
  dbInstance.executeQuery(sql)
  then(result=>{
    resolve(result);
  })
  .catch(err=>{
    reject(err);
  });
  })
  }

  // this method is used to get country list
  indexCountry () {
	return new Promise(function (resolve, reject) {
  let sql = `select country_id, country_name, calling_code, country_code, currency, currency_symbol, status from country ORDER BY country_name ASC`;
  dbInstance.executeQuery(sql)
  .then(result=>{
    resolve(JSON.stringify(_.filter(result,{status:1})));
  })
  .catch(err=>{
    reject(err);
  })
  })
  }

  getContactAndAddressDetails(businessId){
    return new Promise((resolve, reject)=>{
      let sql = `SELECT b.applicant_id,a.address_id, a.country_id,a.address_line1,a.address_line2,a.city,a.town,a.postal_code,a.region
                 FROM business_details b, address a 
                 WHERE business_id = ${businessId} AND b.applicant_id=a.applicant_id  AND a.address_type_id =2`;

      dbInstance.executeQuery(sql)
      .then(result=>{
        resolve(result);
      })
      .catch(err=>{
        reject(err);
      })           
    })
  }

  getCompanyDetails(businessId){
    return new Promise((resolve, reject)=>{
      let sql = `select company_details from kyb_company_details where kyb_business_id  = ${businessId}`;

      dbInstance.executeQuery(sql)
      .then(result=>{
        resolve(result);
      })
      .catch(err=>{
        reject(err);
      })
    })
  }

  patchDashboardStatus(column, status, businessId){
    return new Promise((resolve, reject)=>{
      let sql = `update kyb_business set ${column.toLowerCase()}='${status}' where business_id = ${businessId}`;

      dbInstance.executeQuery(sql)
      .then(result=>{
        resolve(result);
      })
      .catch(err=>{
        reject(err);
      })
    })
  }
}