/**
 * otpModel Model
 * otpModel is used for the get and verify otp with email and mobile id .
 * @package otpModel
 * @subpackage sources/services/model/otpModel
 * @author SEPA Cyper Technologies, Sekhara Suman Sahu.
 */

"use strict";
import { DbConnMgr } from '../dbconfig/dbconfig';
const DbInstance = DbConnMgr.getInstance();

export class BusinessRegistration {

  constructor() {
  }

  //this function is used for check company is exist in database or not
  checkUniqueCompany(application_id) {
    return new Promise(function (resolve, reject) {
      var sql = `select business_id from business_details where applicant_id = ${application_id}`;
      DbInstance.executeQuery(sql).then(res => {
        resolve(res);
      }).catch(err => {
        reject(err);
      })
    });
  }

  // this fnuction is used for get country code so we can check with KYB API
  getCountryCode(countryId) {
    return new Promise((resolve, reject) => {
      var sql = `select country_code from country where country_id= ${countryId}`;
      DbInstance.executeQuery(sql).then(res => {
        resolve(res);
      }).catch(err => {
        reject(err);
      });
    });
  }

  insertBusinessDetails(businessInfo) {
    return new Promise((resolve, reject) => {
      let sql = `insert into business_details (applicant_id,country_of_incorporation,business_legal_name,trading_name,registration_number,incorporation_date,business_type) values(${businessInfo.applicant_id},${businessInfo.country_of_incorporation},'${businessInfo.business_legal_name}','${businessInfo.trading_name}','${businessInfo.registration_number}','${businessInfo.incorporation_date}',${businessInfo.business_type})`;
      DbInstance.executeQuery(sql).then(res => {
        resolve(res);
      }).catch(err => {
        reject(err);
      });
    });
  }

  getCompanyDetails(kyb_business_id, company_details) {
    return new Promise((resolve, reject) => {
      let sql = `insert into kyb_company_details (kyb_business_id,company_details) values(${kyb_business_id},'${company_details}')`;
      DbInstance.executeQuery(sql).then(res => {
        resolve(res);
      }).catch(err => {
        reject(err);
      });
    })
  }

  //for getting business type
  typeOfBusiness() {
    let sql = "select business_type_id,business_type_name from business_type";
    return new Promise((resolve, reject) => {
    dbInstance.executeQuery(sql)
    .then(result => {
      resolve(result);
    })
    .catch(err=>{
      reject(err);
    });
  })
  }

  //for geting business sectors.
  typeOfSector() {
    let sql= "select business_sector_id,business_sector_name from business_sector_lov";
    return new Promise((resolve, reject) => {
    dbInstance.executeQuery(sql)
    .then(result => {
       resolve(result);
    })
    .catch(err => {
        reject(err);
    });
    })
  }

   //for fetching the data related to business sector of an alresy registerd business.
   typeOfSectorAndIndustries(business_id) {
    let sql = `select business_id,business_sector,range_of_service,website,restricted_business,selected_industries from business_sector_details where business_id=${business_id}`;
    return new Promise((resolve, reject) => {
    dbInstance.executeQuery(sql)
    .then(result => {
      resolve(result);
    })
    .catch(err => {
      reject(err);
    });
    })
  }

  //for geting business industries.
  typeOfIndustries() {
    let sql = "select business_industry_id,business_industry_name,restricted from business_industry_lov";
    return new Promise((resolve, reject) => {
    dbInstance.executeQuery(sql)
    .then(result => {
      resolve(result);
    })
    .catch(err => {
        reject(err);
      })
    });
  }

}
