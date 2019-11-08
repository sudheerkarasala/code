
/**
 * authentication controller
 * This is a controller file, where the authentication signup related data is entered.
 * @package authentication
 * @subpackage sources\services\controller\authentication\authentication
 * @author SEPA Cyber Technologies, Tarangini dola , Satyanarayana G
 */
"use strict";
//init current file location.
const obj = {
    'fileName' : 'Controller.authentication.authentication'
};

var generateToken = require("../../model/tokenModel");
var getLog = require('../../utility/consoleLog');

obj.authenticate = function (member_id, api_key) {
    return new Promise(function (resolve, reject) {
        //To check the status
        getLog.getLogStatus(_.toLower(obj.fileName)).then(logRes => {
            //To get the timestamp.
            //log
            (logRes.status) ? logger.info(`${obj.fileName}` + " : authentication controller initiated.") : "";

            generateToken.obj.getSandboxMerchantByIdAndKey(member_id, api_key).then(function (result) {
                //log
                (logRes.status) ? logger.info(`${obj.fileName}` + " : Response received from model/tokenModel/getSandboxMerchantByIdAndKey().") : "";
                if (_.size(result) > 0) {
                    //JWT token generation
                    var token = jwt.sign({ applicant_id: _.get(result[0], 'applicant_id'), member_id: member_id }, process.env.PASSWORD_CONFIG);

                    //log
                    (logRes.status) ? logger.info(`${obj.fileName}` + " : " + "JWT Token created.") : "";

                    generateToken.obj.createSandboxMerchantToken(_.get(result[0], 'applicant_id'), member_id, token, process.env.TOKEN_EXP_TIME).then(function (success) {

                        //log
                        (logRes.status) ? logger.info(`${obj.fileName}` + " : " + "Response received from model/tokenModel/createSandboxMerchantToken().") : "";


                        //log
                        (logRes.status) ? logger.info(`${obj.fileName}` +" : " + "Response sent for success case in authentication controller.") : "";
                        //log
                        (logRes.status) ? logger.info(`${obj.fileName}` + " : " + "authentication controller execution completed.") : "";

                        resolve({ status: responseStatusHandler.SUCCESS.CODE, token: token })
                    }, () => {
                        logger.debug(customLogger(responseStatusHandler.NOT_FOUND.CODE, responseStatusHandler.NOT_FOUND.TOKEN_FAILURE));
                        throw new CustomError(responseStatusHandler.NOT_FOUND.TOKEN_FAILURE, responseStatusHandler.NOT_FOUND.CODE);
                    }).catch(e => {
                        //log
                        (logRes.status) ? logger.info(`${obj.fileName}` + " : " + "Error in catch block of model/tokenModel/createSandboxMerchantToken() execution.") : "";
                        reject(e);
                    })
                } else {
                    if (_.size(result) == 0) {
                        logger.debug(customLogger(responseStatusHandler.NOT_FOUND.CODE, responseStatusHandler.NOT_FOUND.INVALID_USER));
                        throw new CustomError(responseStatusHandler.NOT_FOUND.INVALID_USER);
                    }
                }
            }, () => {
                logger.error(customLogger(responseStatusHandler.NOT_FOUND.CODE, responseStatusHandler.NOT_FOUND.FETCH_FAILURE));
                throw new CustomError(responseStatusHandler.NOT_FOUND.FETCH_FAILURE, responseStatusHandler.NOT_FOUND.CODE);
            }).catch(e => {
                //log
                (logRes.status) ? console.debug(`${obj.fileName}` + " : " + "Error in catch block of model/tokenModel/getSandboxMerchantByIdAndKey() execution.") : "";

                reject(e);

            })
        })
    })
}



module.exports = {
    obj
}
