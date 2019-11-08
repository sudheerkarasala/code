/**
 * businessModel
 * this is used for the insert  the business details of person in database and get the data from database
 * @package businessModel
 * @subpackage model/businessModel
 *  @author SEPA Cyper Technologies,krishnakanth.r
 */
"use strict";

import { DbConnMgr } from '../dbconfig/dbconfig';
import { langEngConfig } from '../utility/lang_eng';
const dbInstance = DbConnMgr.getInstance();

const STATUS = {
  SUCCESS: 0,
  FAILURE: 1
}

export class BusinessDetails {
  constructor() {

  }

  //for storing sector,website,industries and services related data.
  saveBusinesDetails(businessId, businessSectorId, rangeOfService, website, restrictedBusiness, selectedIndustries){    
  return new Promise((resolve, reject) => {
  let sql = `insert into business_sector_details (business_id,business_sector,range_of_service,website,restricted_business,selected_industries)
             values (${businessId},${businessSectorId},${rangeOfService},${website},${restrictedBusiness},
             ${selectedIndustries})`;
  dbInstance.executeQuery(sql)
  .then(result=>{
    resolve(result);
  })
  .catch(err=>{
    reject(err);
  });
  })
  }

  //method for checking is restricted business
  isRestrictedBusiness(selectedIndustries){
    return new Promise((resolve, reject)=>{
      let sql = `SELECT business_industry_id FROM business_industry_lov  WHERE  business_industry_id IN (${selectedIndustries}) AND  restricted = 1`;

      dbInstance.executeQuery(sql)
      .then(result=>{
        resolve(result);
      })
      .catch(err=>{
        reject(err);
      })
    })
  }

  //method for updating business sectore details table
  setBusinessSectorDetails(restrictedBusiness, businessId){
    return new Promise((resolve, reject)=>{
      let sql = `UPDATE business_sector_details SET restricted_industries = ${restrictedBusiness} WHERE business_id = ${businessId}`;

      dbInstance.executeQuery(sql)
      .then(result=>{
        resolve(result);
      })
      .catch(err=>{
        reject(err);
      })
    })
  }

  //method for updating kyb business table
  setkybBusiness(businessId){
    return new Promise((resolve, reject)=>{
      let sql = `update  kyb_business set isRestricted = 1 where business_id = ${businessId}`;

      dbInstance.executeQuery(sql)
      .then(result=>{
        resolve(result);
      })
      .catch(err=>{
        reject(err);
      })
    })
  }

  updateBusinessDetails(column, value, business_id) {
  return new Promise((resolve, reject) => {
  let sql = `UPDATE business_sector_details SET ${column} = '${value}' where business_id = ${business_id}`;

  dbInstance.executeQuery(sql)
  .then(result=>{
    resolve(result);
  })
  .catch(err=>{
    reject(err);
  })
  })
  }

  getBusinessDetails(businessId){
    return new Promise((resolve, reject)=>{
      let sql = `select business_id,business_sector,range_of_service,website,restricted_business,selected_industries from business_sector_details where business_id = ${businessId}`;

      dbInstance.executeQuery(sql)
      .then(result=>{
        resolve(result);
      })
      .catch(err=>{
        reject(err);
      })
    })
  }

  // getSectorAndIndustries = function (request, response) {
  //       return new Promise((resolve, reject) => {
  //           myPool.query(`${sqlConfig.signupSql.select_business_sector_details} = ${request.body.business_id}`).then(res => {
  //               if (res[0]) {
  //                   resolve({
  //                       message: `${configVariable.message.businessdetails.fetchsuccess} = ${res[0].business_id}`,
  //                       business_sector: res[0].business_sector,
  //                       range_of_service: res[0].range_of_service,
  //                       website: res[0].website,
  //                       restricted_business: res[0].restricted_business,
  //                       selected_industries: res[0].selected_industries,
  //                       status: 1
  //                   })
  //               }
  //               else {
  //                   reject({ message: `${configVariable.message.businessdetails.fetcherror}`, status: 0 });
  //               }
  //           }).catch(err => {
  //               reject({ err: `${err}`, status: 0 });
  //           })
  //       })

}            
