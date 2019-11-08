
import { Kyc } from '../model/kyc';
import { Utils } from '../utility/utils';
import { configVariable } from '../utility/otp';
import { sendKycStatus } from '../mailer/mail';
import { langEngConfig } from '../utility/lang_eng';

const kyc = new Kyc();

const STATUS = {
  FAILED: 1,
  SUCCESS: 0,
  VALID: 2,
  UN_AUTHORIZED: 403
};

const KYC_DEFAULT_STATUS = ['SUCCESS', 'CANCELED'];

const DEFAULT_STATUS = 'PENDING';

class ValidateKycData {
  constructor(kycRequest) {
    this.kycApplicantId = kycRequest.applicant_id;
  }
	/**
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

/* Initiate controller for triggering kyc identity  */

export const createIdentity = function (request, response) {
  logger.info('initialize createIdentity()');
  const validateKycData = new ValidateKycData(request.body);
  if (!validateKycData.isValidKYCRequest()) {
    logger.error('kycApplicantId not valid ');
    return response.send({ 'message': configVariable.message.invalidInput, status: STATUS.FAILED });
  }

  logger.info('Proceed for _fetchUserKycDetails()');
  return _fetchUserKycDetails(validateKycData.kycApplicantId, request, response);
}


/* fetching kyc related information based on the applicantId */
const _fetchUserKycDetails = (applicant_id, req, res) => {
  logger.info('Initiated _fetchUserKycDetails()');
  kyc.getUserByApplicant(applicant_id).then(results => {
    if (results.length > 0) {
      logger.info('Successfully fetched getUserByApplicant()');
      let applicantId = results[0].applicant_id, identInfo = prepareIdentData(results[0]);
      kyc.checkUser(applicantId).then(response => {
        if (response.status == 1 && response.res[0].id && response.res[0].TransactionNumber) {
          logger.info('User Identified and return existing Identity Info');
          res.send({ "status": STATUS.FAILED, "data": response.res[0] })
        }
        else {
          requestForIdentId(identInfo, req).then(function (res1) {
            logger.info('Proceed for identity creation')
            if (res1 && res1.body.status == 1) {
              logger.info('Identity response captured and Initiate Request')
              if (!results[0].kyc_transaction_id && results[0].kyc_status == 'PENDING' && !results[0].kyc_vendor_id) {
                logger.debug('Send initiate Request as email')
                sendKycStatus(results[0].email, results[0].mobile, `${langEngConfig.message.email.messageInitiated}`).then((message) => { }, (error) => { })
              }
              let updateKycModel = { "transactionNumber": res1.body.data.transactionNumber, "id": res1.body.data.id, "applicantId": applicantId };
              kyc.updateKycDetails(updateKycModel).then(results => {
                if (_.size(results) > 0) {
                  logger.info('Identity response captured')
                  res.send(res1.body)
                }
                else {
                  logger.error('Identity response failure , while updating')
                  res.send({ message: langEngConfig.message.kyc.operationError, status: STATUS.FAILED })
                }
              }).catch(err => {
                logger.error('Some thing went wrong , While updating kyc details')
                res.send({ status: STATUS.FAILED, message: `Some thing went wrong , While updating kyc details` });
              })
            }

            else {
              if (res1 && res1.body.status == STATUS.UN_AUTHORIZED) {
                logger.debug('Unauthorized user')
                res.send({ status: STATUS.FAILED, message: langEngConfig.message.kyc.authError });
              }
              else {
                if (res1.body.status == 0) {
                  logger.debug('Some thing faile to getting')
                  res.send({ status: STATUS.FAILED, message: res1.body.message })
                }
                else {
                  logger.debug('Please provide header mandatory field')
                  res.send({ status: STATUS.FAILED, message: langEngConfig.message.kyc.headerError })
                }
              }
            }
          }).catch(err => {
            logger.error('Some thing went wrong ,.......')
            res.send({ status: STATUS.FAILED, message: `Some thing went wrong ,.........` });
          })
        }
      }).catch(err => {
        logger.error('Some thing went wrong , While verifying user')
        res.send({ status: STATUS.FAILED, message: `Some thing went wrong , While verifying user` });
      });
    }
    else {
      logger.debug('No user found')
      res.json({ status: 0, message: langEngConfig.message.kyc.noDataError })
    }
  }).catch(err => {
    res.send({ status: 0, message: `Some thing went wrong , While getting user details` });
  })
}

/* Request for identCreation with user details */
var requestForIdentId = function (userInfo, req) {
  logger.info('Identity museService request initiated');
  return new Promise((resolve, reject) => {
    request({
      method: 'post',
      headers: { "accept": "application/json", "authorization": req.headers["authorization"], "member_id": req.headers["member_id"], "api_access_key": req.headers["api_access_key"], "client_auth": req.headers["client_auth"] },
      url: `http://${process.env.GATEWAY_URL}:${process.env.GATEWAY_PORT}/kyc_idnow/kycId`,
      body: userInfo,
      json: true,
    }, function (err, res1) {
      if (res1) {
        logger.info('Identity museService success');
        resolve(res1)
      } else {
        logger.info('Identity museService failure');
        reject(err)
      }
    })
  });
}

function prepareIdentData(ident) {
  let birthDate = (ident.dob).toISOString().slice(0, 10);
  return {
    "result": {
      "birthday": birthDate,
      "birthplace": "",
      "city": ident.city,
      "country": (ident.country_name != 'UK') ? ident.country_name : 'GB',
      "custom1": ident.address_line1,
      "custom2": "",
      "custom3": "",
      "email": ident.email,
      "firstname": ident.first_name,
      "gender": ident.gender,
      "lastname": ident.last_name,
      "mobilephone": ident.mobile,
      "nationality": (ident.country_name != 'UK') ? ident.country_name : 'GB'
    }
  }
}
