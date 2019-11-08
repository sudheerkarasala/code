/**
 * commonCode
 * commonCode for currencyExcahnge and MobileOtp
 * @package kycEntry
 * @subpackage controller/kycEmtry/kycEntry
 *  @author SEPA Cyper Technologies,krishnakanth.r
 */


"use strict";

let currencyExchange = function (from, to, checkRates_id) {
  return new Promise(function (resolve, reject) {
    fixer.latest({ base: from, symbols: [to] }).then((rate) => {
      resolve({ rate: rate.rates[to], status: 1, from: from, to: to, checkRates_id: checkRates_id })
    }, (err) => {
      resolve({ rate: 0, status: 0 })
    });
  })
}

let mobileOtp = function (phone, message) {
  return new Promise((resolve, reject) => {
    request({
      method: "get",
      url: `https://gate.mobica.bg/send.php?user=${process.env.MOBICAUSER}&pass=${process.env.MOBICAPASS}&phone=${phone}&message=${message}&from=test&route=false`,
      json: true
    }, function (error, response) {
      if (error) {
        reject(error)
      } else if (response.body.status == 1004) {
        resolve(response)
      } else {
        reject(response.body)
      }

    })
  });
}

// this method is used to call kyd API to get company details
let getCompanyDetails = function (companyId, dataSet, req) {
  return new Promise((resolve, reject) => {
    request({
      method: 'post',
      headers: { "accept": "application/json", "authorization": req.headers["authorization"], "member_id": req.headers["member_id"], "api_access_key": req.headers["api_access_key"], "client_auth": req.headers["client_auth"] },
      url: `http://${process.env.GATEWAY_URL}:${process.env.GATEWAY_PORT}/companyDetail`,
      body: {
        "kyb": {
          "companyId": companyId, "dataSet": dataSet
        }
      },
      json: true,
    }, function (err, res) {
      if (res) {
        if (_.get(res.body, "data.success") == false) {
          reject({ message: _.get(res.body, "data.message"), status: 0 })
        } else {
          resolve(res.body.data)
        }
      } else {
        reject(err)
      }

    })

  });
}

// this method is used for call KYB api to get company ID 
let getCompanyId = function (countryCode, companyName, req) {
  return new Promise((resolve, reject) => {
    request({
      method: 'post',
      headers: { "accept": "application/json", "authorization": req.headers["authorization"], "member_id": req.headers["member_id"], "api_access_key": req.headers["api_access_key"], "client_auth": req.headers["client_auth"] },
      url: `http://${process.env.GATEWAY_URL}:${process.env.GATEWAY_PORT}/companyId`,
      body: {
        "kyb": {
          "countryCode": countryCode, "companyName": companyName
        }
      },
      json: true,
    }, function (err, res) {
      if (res) {
        resolve(res.body)
      } else {
        reject(err)
      }

    })

  });
}


export {
  currencyExchange,
  mobileOtp,
  getCompanyDetails,
  getCompanyId
}

