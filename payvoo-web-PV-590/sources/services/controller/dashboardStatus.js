
/**
 * dashboardStatus
 * This controller contain the methods used for dashbord status.
 * @package dashboardStatus
 * @subpackage model/dashboardStatus
 *  @author SEPA Cyper Technologies, Sekhara Suman Sahu
 */
"use strict";
const STATUS = {
  SUCCESS : 0,
  FAILURE : 1
}
//Import the Model
import { DashboardModel } from '../model/dashboardModel';
import {langEngConfig} from '../utility/lang_eng';
import {signupConfig} from '../utility/signUpConfig';
import { resolve } from 'url';
const dashboard = new DashboardModel();


//for gettng the status details of letious steps.
export const getDashboardStatus = (request, response) =>{
  let businessId = request.body.business_id;
  dashboard.getDashboardStatus(businessId)
  .then(result=>{
    if(result !=0){
      let status = {
        "status": STATUS.SUCCESS,
        "isRestricted": result[0].isRestricted,
        "type_of_business": result[0].type_of_business,
        "personal_profile": result[0].personal_profile,
        "business_owner_details": result[0].business_owner_details,
        "business_address": result[0].business_address,
        "isRestricted": result[0].isRestricted
    };
    response.send(status);
    }else {
      response.send({ message: signupConfig.message.kyb_status.isert_status, status: STATUS.SUCCESS });
    }
  })
  .catch(err=>{
    response.send({ message: signupConfig.message.kyb_status.error, status: STATUS.FAILURE });
  })
}

//for inserting business_id,type_of_business,personal_profile,business_owner_details,business_address status
export const postDashboardStatus = (request, response) => {
  dashboard.postDashboardStatus(request,response)
  .then(result=>{
    if(result){
      response.send({ msg: signupConfig.message.kyb_status.success, status: STATUS.SUCCESS });
    } else {
      response.send({ msg: signupConfig.message.kyb_status.error, status: STATUS.SUCCESS });
    }
  })
  .catch(err=>{
    response.send({ msg: signupConfig.message.kyb_status.error, status: STATUS.SUCCESS });
  });
}

//for updating status of business_id,type_of_business,personal_profile,business_owner_details,business_address
export const  patchDashboardStatus = (request, response)=> {
  let column = request.body.column;
  let status = request.body.status;
  let businessId = request.body.business_id;
  
  if (column.toLowerCase() == "business_address" && status == "1"){
    dashboard.indexCountry()
    .then(country=>{
      request.body["country"] = JSON.parse(country)
      checkAddress(request.body)
      .then(result=>{
        response.send(result);
      })
      .catch(err=>{
        response.send(err);
      })
    })
    .catch(err=>{
      response.send(err);
    })
  } else {
    dashboard.patchDashboardStatus(column,status,businessId)
    .then(result=>{
      if (result.affectedRows > 0 && result.affectedRows != "undefined") {
        response.send({ msg: langEngConfig.message.signUp.address_update, status: STATUS.SUCCESS });
      } else {
        response.send({ msg: langEngConfig.message.kyb_status.status_error, status: STATUS.FAILURE });
      }
    })
    .catch(err=>{
      response.send({ status: STATUS.FAILURE });
    })
  }
}

const checkAddress = (value)=>{
  return new Promise((resolve,reject)=>{
    let changeStatus = value;

    dashboard.getContactAndAddressDetails(changeStatus.business_id)
    .then(address=>{
      dashboard.getCompanyDetails(changeStatus.business_id)
      .then(kyc_company=>{
        if (_.size(kyc_company) > 0 && kyc_company[0].company_details && JSON.parse(kyc_company[0].company_details).formattedAddress) {
          let kybAddress = JSON.parse(kyc_company[0].company_details).formattedAddress;
          let companyAddress = address[0];
          let company = _.filter(changeStatus.country, { country_id: companyAddress.country_id })[0];

          if (kybAddress.city == companyAddress.city && _.toLower(kybAddress.zip.replace(/ +/g, "")) == _.toLower(companyAddress.postal_code.replace(/ +/g, "")) && kybAddress.cc == company.country_code) {
            changeStatus.status = "2"
          }
        }

        dashboard.patchDashboardStatus(changeStatus.column, changeStatus.status, changeStatus.business_id)
        .then(result=>{
          response.send({ msg: langEngConfig.message.signUp.address_update, status: STATUS.SUCCESS });
        })
        .catch(err=>{
          response.send({status : STATUS.FAILURE});
        })
      })
      .catch(err=>{
        reject(err);
      })
    })
    .catch(err=>{
      reject(err);
    });
  })
}
