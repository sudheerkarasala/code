

 /**
 * tokenController Controller
 * tokenController is used for secure each and every route with valid user or not  
 * data to register himself in the payvoo app.
 * @package tokenController
 * @subpackage controller/token/tokenController
 * @author SEPA Cyper Technologies, sujit.kumar.
 */
"use strict";

var generateToken = require('../../model/tokenModel')

var getSandBoxToken = function (req, res) {
    return new Promise(function (resolve, reject) {
        generateToken.obj.getSandboxMerchantByIdAndKey(req.body.member_id, req.body.api_key).then(function(result){
            if (_.size(result) > 0) {
                   var token = jwt.sign({ applicant_id: _.get(result[0], 'applicant_id'), member_id: req.body.member_id }, process.env.PASSWORD_CONFIG);
                generateToken.obj.createSandboxMerchantToken( _.get(result[0], 'applicant_id'), req.body.member_id, token, process.env.TOKEN_EXP_TIME).then(function(success){
                    resolve({ status: 1, token: token })
                },(err)=>{
                    resolve({ status: 0, message: `unauthorized access` })
                })
            } else {
                resolve({ status: 0, message: `unauthorized access` })
            }
        },(getError)=>{
            reject({ status: 0, message: `unauthorized access` })
        })
    })
}

var validateSandboxToken = function(member_id, token){
    return new Promise(function (resolve, reject) {
        generateToken.obj.isValidSandboxMerchantToken(member_id, token).then(function(result){
            if (_.size(result) >0) {
                if (new Date (result[0].created_on).getTime()+result[0].expiration_date*60000 > new Date().getTime()){
                    resolve({status:1})
                } else{
                    reject({status:0, message:"token expired "})
                }
            } else{
                reject({status:0, message:"token not valid"})
            }
        },(err)=>{
            reject({status:0, message:"token not valid"})
        })
    })
}

module.exports = {
    getSandBoxToken,
    validateSandboxToken
};