/**
 * businessSignup Controller
 * businessSignup is used to store business related data in business details table. It also has the
 * service by usingwhich we can get the Business sector data and another API for Business type data.
 * Also an API for storing sector, Range of service , and website details of business in DB table called
 * business_sector_details.
 * data to register himself in the payvoo app.
 * @package businessSignup
 * @subpackage controller\businessSignup\businessSignup
 * @author SEPA Cyper Technologies, Sekhara Suman Sahu , Satyanarayana G
 */
"use strict";

var businessModel = require('../../model/businessModel');

//for business registration with Kyb
var businessSignUp = function (request, response) {
  return new Promise((resolve, reject) => {
    var businesModelObject = new businessModel.obj.newBusiness(request);

    businessModel.obj.businessSignUp(businesModelObject, request).then(res => {
      resolve(res);
    }, (err) => {
      reject(err);
    })
  })
}

//for storing sector,website,industries and services related data. 
var postSectorAndIndustries = function (request, response) {
  return new Promise((resolve, reject) => {
    businessModel.obj.postSectorAndIndustries(request, response).then(res => {
      resolve(res);
    }, (err) => {
      reject(err);
    })
  })
}


//for updating business sector details table data
var patchSectorAndIndustries = function (request, response) {
  return new Promise((resolve, reject) => {
    businessModel.obj.patchSectorAndIndustries(request, response).then(res => {
      resolve(res);
    }, (err) => {
      reject(err);
    })
  })
}

//for updating status of business_id,type_of_business,personal_profile,business_owner_details,business_address
var patchStatus = function (request, response) {
    return new Promise((resolve, reject) => {
        businessModel.obj.patchStatus(request,response).then(res=>{
            resolve(res);
        },(err)=>{
            reject(err);
        })
    })
}

//for business registration with Kyb
var businessSignUpKyb = function (request, response) {
  return new Promise((resolve, reject) => {
    businessModel.obj.businessSignUpKyb(request, response).then(res => {
      resolve(res);
    }, (err) => {
      reject(err);
    })
  })
}
module.exports = {
    businessSignUp,
    postSectorAndIndustries,
   // getAccountVerificationStatus,
   // postStatus,
    patchStatus,
    businessSignUpKyb,
    patchSectorAndIndustries
}

