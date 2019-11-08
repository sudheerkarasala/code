/**
 * log Controller
 * log is used to store all the request and response generating for each transaction in database.
 * @package log
 * @subpackage sources/services/controller/log/log
 * @author SEPA Cyper Technologies, Sekhara Suman Sahu.
 */

"use strict";

var configVariable = require('../../utility/signUpConfig');

//method for storing log in data base
var saveLog = function (req , res, status){
    return new Promise(function (resolve, reject) {
        myPool.query(configVariable.sql.insert_logs,[
            req.body.email,status,JSON.stringify(req.body),JSON.stringify(res)
        ]).then(logres=>{
            //console.log(logres);
            resolve(logres);
        }).catch(err=>{
            //console.log(err);
            reject(err);
        })
    });
}

//method for geting logs
var getLog = function (req, res){
    return new Promise(function (resolve, reject) {
        myPool.query(configVariable.sql.get_logs).then(logres=>{
            if(logres != 0){
                resolve({status : 1, logs:logres});
            }else {
                reject({status : 0, message : configVariable.message.business_type.error});
            }
        }).catch(err=>{
            reject({status : 0, message : configVariable.message.business_type.error, err: err});
        })
    });
}

module.exports = {
    saveLog,
    getLog
}