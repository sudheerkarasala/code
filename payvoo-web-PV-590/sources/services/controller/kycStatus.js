/* 
* @kyc Controller
* @description It will get kyc (IDNow) status of a user.
* @fires It serves status for the PayVoo user from IdNow.
* @author SEPA Cyber Technologies , Satyanarayana G .
*/


import { Kyc } from '../model/kyc';
import { Utils } from '../utility/utils';
import { configVariable } from '../utility/otp';
import { sendKycStatus } from '../mailer/mail';
import { langEngConfig } from '../utility/lang_eng';

const kyc = new Kyc();

const STATUS = {
  FAILED: 1,
  SUCCESS: 0,
  VALID: 2
};

const KYC_DEFAULT_STATUS = ['SUCCESS', 'CANCELED'];

const DEFAULT_STATUS = 'PENDING';

class ValidateKycData {
  constructor(kycRequest) {
    this.kycApplicantId = kycRequest.applicant_id;
  }
	/*
	 * @function isValidKYCRequest
	 * @desc this function is to validate user kycApplicantId
	 * @param None
	 * @return True if request is valid kycApplicantId. False if request is invalid
	 * 
	 */
  isValidKYCRequest() {
    if (Utils.isEmptyObject(this.kycApplicantId)) {
      return false;
    }
    return true;
  }
}

/* Initiate controller for triggering kyc status  */
export const kycCurrentStatus = function (request, response) {
  logger.info('initialize kycCurrentStatus()');
  const validateKycData = new ValidateKycData(request.body);

  if (!validateKycData.isValidKYCRequest()) {
    logger.error('kycApplicantId not valid ');
    return response.send({ 'message': configVariable.message.invalidInput, status: STATUS.FAILED });
  }

  logger.info('Procced for _fetchUserDetails()');
  return _fetchUserDetails(validateKycData.kycApplicantId, request, response);
}

/* Sending email && mobile messages for kyc status */
export const notifyKycStatus = function (request, response) {
  logger.info('initialize notifyKycStatus()');
  return _notifyKycStatus(request.params.mobileNumber, request.params.email, request.params.status, response);
}

/* Check kyc with application id */
export const verifyKyc = function (request, response) {
  logger.info('initialize verifyKyc()');
  const validateKycData = new validateKycData(request.body);

  if (!validateKycData.isValidKYCRequest()) {
    logger.error('kycApplicantId not valid ');
    return response.send({ 'message': configVariable.message.invalidInput, status: STATUS.FAILED });
  }
  logger.info('Procced for _verifyKyc()');
  return _verifyKyc(validateKycData.kycApplicantId, response);
}



/* fetching kyc related information based on the applicantId */
const _fetchUserDetails = (applicant_id, req, res) => {
  logger.info('initiated _fetchUserDetails()');
  kyc.getKycByApplicant(applicant_id).then(results => {
    if (results.length > 0) {
      logger.info('successfully fetched getKycByApplicant()');
      let applicantId = results[0].applicant_id,
        transactionNumber = results[0].kyc_transaction_id,
        kycStatus = results[0].kyc_status,
        mobile = results[0].mobile;
      if (!KYC_DEFAULT_STATUS.includes(kycStatus) && transactionNumber) {
        logger.info('proceed for kyc if transation no exist');
        requestForKycStatus(transactionNumber, req).then(function (response) {
          if (response) {
            try {
              if (response && response.body.data && response.body.data.identificationprocess && response.body.data.identificationprocess.result) {
                kycStatusSuccess(results[0].email, mobile, response.body.data.identificationprocess.result, response.body.data.identificationprocess.reason).then(function (response) {
                  res.send(response);
                })
              }
              else {
                if (response && response.body.data && response.body.data.errors && response.body.data.errors.length > 0) {
                  kycStatusError(results[0].email, mobile, applicantId, response.body.data.errors).then(function (response) {
                    res.send(response);
                  })
                }
                else {
                  if (response.body.message.message && response.body.message.status == 0) {
                    res.send({ 'status': STATUS.FAILED, 'message': response.body.message.message });
                  }
                  else {
                    res.send({ 'status': STATUS.FAILED, 'message': `data response empty` });
                  }
                }
              }
            }
            catch (e) {
              res.send({ 'status': STATUS.FAILED, 'message': `Some thing went wrong....while requesting kycStatus` });
            }
          }
          else {
            res.send({ "status": STATUS.FAILED, "message": `Some thing went wrong....while requesting kycStatus` });
          }
        })
      }
      else if (kycStatus == DEFAULT_STATUS && !transactionNumber) {
        logger.info('kyc status return');
        res.send({ 'status': STATUS.FAILED, 'kyc_status': DEFAULT_STATUS });
      } else {
        logger.info('kyc status return');
        res.send({ 'status': STATUS.SUCCESS, 'kyc_status': kycStatus });
      }
    }
    else {
      logger.debug('No kyc data found with applicant id');
      res.send({ 'status': STATUS.FAILED, 'message': 'No kyc data found with applicant id ' })
    }
  }).catch(e => {
    logger.error('Somthing went wrong while getting response');
    res.send({ 'status': STATUS.FAILED, 'message': `Somthing went wrong while getting response` })
  })
}


/* Request for kyc status from ident server request */
const requestForKycStatus = function (transactionNumber, req) {
  logger.info('Request initiated for kyc trigger for access museService');
  return new Promise((resolve, reject) => {
    request({
      method: 'post',
      headers: { 'accept': 'application/json', 'authorization': req.headers['authorization'], 'member_id': req.headers['member_id'], 'api_access_key': req.headers['api_access_key'], 'client_auth': req.headers['client_auth'] },
      url: `http://${process.env.GATEWAY_URL}:${process.env.GATEWAY_PORT}/kyc_idnow/kycStatus`,
      body: {
        'transactionnumber': transactionNumber
      },
      json: true
    }, function (error, response) {
      if (response) {
        logger.info('Request success for kyc trigger for access museService');
        resolve(response)
      }
      logger.error('Request fail for kyc trigger for access museService');
      reject(error)
    })
  });
}

/* Request for kyc status from ident server success response */
const kycStatusSuccess = function (email, mobile, identityStatus, identityReason) {
  logger.info('Capturing kyc success response');
  return new Promise((resolve, reject) => {
    kyc.checkSuccessKyc(identityStatus, transactionNumber).then((results, err) => {
      if (!err && identityStatus == 'CANCELED') {
        logger.info('Return kyc success response');
        resolve({ 'status': STATUS.SUCCESS, 'kyc_status': identityStatus, 'reason': identityReason })
        logger.info('Sending emil in kyc implementation Success');
        sendKycStatus(email, mobile, ` ${identityReason}`).then((message) => { }, (error) => { })
      }
      if (!err && identityStatus == 'SUCCESS') {
        logger.info('Return kyc success response');
        logger.info('Sending emil in kyc implementation Success');
        sendKycStatus(email, mobile, ` ${identityStatus}`).then((message) => { }, (error) => { })
        resolve({ 'status': STATUS.SUCCESS, 'kyc_status': identityStatus })
      }
      if (err) {
        logger.info('Return kyc success response , But failure ');
        reject({ 'status': STATUS.FAILED, message: langEngConfig.message.kyc.operationError })
      }
      logger.info('Return kyc success response');
      resolve({ 'status': STATUS.SUCCESS, 'kyc_status': identityStatus })
    }).catch(err => {
      resolve({ 'status': STATUS.FAILED, 'message': `Somthing went wrong while getting response` })
    })
  });
}

/* Request for kyc status from ident server error response */
const kycStatusError = function (email, mobile, applicantId, identityError) {
  logger.info('Capturing kyc error response');
  return new Promise((resolve, reject) => {
    if ((typeof identityError[0].cause === 'string' || identityError[0].cause instanceof String) && (identityError[0].cause).includes('FRAUD_SUSPICION')) {
      logger.info('Sending emil in kyc implementation Fail');
      sendKycStatus(email, mobile, `${langEngConfig.message.email.messageFraud} `).then((message) => { }, (error) => { })
    }
    let messageData = (identityError[0].cause == 'OBJECT_NOT_FOUND') ? identityError[0].key : identityError[0].cause;
    kyc.checkFailureKyc(messageData, applicantId).then((results, err) => {
      if (!err && results) {
        logger.info('Return kyc fail response');
        resolve({ 'status': STATUS.VALID, 'serverResponse': identityError, 'message': (identityError[0].cause == 'OBJECT_NOT_FOUND') ? identityError[0].key : langEngConfig.message.kyc.apiError })
      }
      logger.info('Return kyc fail response');
      resolve({ status: STATUS.FAILED, kyc_status: langEngConfig.message.kyc.noDataError })
    }).catch(err => {
      reject({ status: STATUS.FAILED, message: `Somthing went wrong while getting response` })
    })
  });
}

/* Check kyc with application id */
const _verifyKyc = function (applicantId, res) {
  logger.info(`Initiated _checkPayVooKyc`);
  kyc.checkPayVooKycStatus(applicantId)
    .then((results, err) => {
      if (!err && results.length == 0) {
        logger.debug(`No records found with applicantId`);
        res.send({ status: STATUS.FAILED, kyc_status: langEngConfig.message.kyc.noDataError })
      } else {
        logger.info(`successfully return kyc details`);
        res.send({ status: STATUS.SUCCESS, kyc_status: results[0].kyc_status })
      }
    })
    .catch(err => {
      logger.error(`successfully return kyc details`);
      res.send({ status: STATUS.FAILED, message: `Somthing went wrong while getting response` })
    });
}


/* Sending email && mobile messages for kyc status */
const _notifyKycStatus = function (email, mobile, status, res) {
  logger.info(`Initiated sendKycStatus`);
  sendKycStatus(email, status).then(function (message) {
  }, function (error) {
    logger.error(`Sending email failure at sendKycStatus`);
    res.send({ message: langEngConfig.message.email.failure, status: STATUS.FAILED, expire: STATUS.FAILED });
  })
  commonCode.mobileOtp(mobile, `${langEngConfig.message.email.messageInitiated} ${status}`).then((result) => {
    logger.info(`Successfully sent mobile otp at sendKycStatus`);
    res.send({ status: STATUS.SUCCESS, message: langEngConfig.message.mobile.success });
  }).catch((error) => {
    logger.error(`Sending email failure at sendKycStatus`);
    res.send({ message: langEngConfig.message.mobile.failure, status: STATUS.FAILED, expire: STATUS.FAILED });
  });
}

