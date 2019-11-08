
/**
 * businessOwner controller
 * This is a controller file, where the businessOwner signup related data is entered.
 * @package businessOwner
 * @subpackage sources\services\controller\businessOwner\businessOwner
 * @author SEPA Cyber Technologies, Tarangini dola , Satyanarayana G
 */
"use strict";

import { config } from '../dbconfig/connection';
import { mariadb } from '../dbconfig/dbconfig';
import { langEngConfig as configVariable } from '../utility/lang_eng';
import { BusinessOwner } from '../model/businessOwner';
const registerBusinessOwner = new BusinessOwner();

const STATUS = {
  FAILED: 1,
  SUCCESS: 0
};
const OWNERTYPE = {
  DIRECTOR: 'director',
  BUSINESSOWNER: 'businessowner',
  SHAREHOLDER: 'shareholder'
}
class Owner {
  constructor(request) {
    this.ownerDetails = {
      "first_name": request.body.first_name ? request.body.first_name : '',
      "last_name": request.body.last_name ? request.body.last_name : '',
      "email": request.body.email ? request.body.email : '',
      "gender": request.body.gender ? request.body.gender : '',
      "dob": request.body.dob ? request.body.dob : '',
      "mobile": request.body.mobile ? request.body.mobile : '',
      "business_id": request.body.business_id ? request.body.business_id : '',
      "business_owner_type": request.body.business_owner_type ? request.body.business_owner_type : '',
      "percentage": request.body.percentage ? request.body.percentage : '',
      "status": request.body.status ? request.body.status : '',
      "type": request.body.type ? request.body.type : '',
      "kyb_bisiness_owner_id": request.body.kyb_bisiness_owner_id ? request.body.kyb_bisiness_owner_id : '',
    };
    this.id = request.params.id;
    this.type = request.params.type;
    this.contact_id = request.params.contact_id;
    this.kyb_document_id = request.params.kyb_document_id;
    this.token = request.params.token;
  }
}

/**
 * @function saveBusinessOwner
 * @desc this function is to save businessOwner
 * @param None
 * @return return response 
 * 
 */

var saveBusinessOwner = (request, response) => {
  mariadb.createConnection(config).then(conn => {
    logger.info('connection created for save business owner');
    conn.beginTransaction().then(() => {
      logger.info('transaction start');
      const owner = new Owner(request);
      registerBusinessOwner.saveApplicant('business').then(applicant => {
        logger.info('business application save in db');
        registerBusinessOwner.saveContact(applicant.insertId, owner.ownerDetails).then(contact => {
          logger.info('business contact save in db');
          registerBusinessOwner.saveBusinessOwner(contact.insertId, owner.ownerDetails).then(owner => {
            logger.info('business registerBusinessOwner save in db and commit ');
            conn.commit(); conn.close();
            logger.info('create a response for save business owner ');
            response.send({ message: ` ${configVariable.message.businessOwner.success}`, status: STATUS.SUCCESS, applicantId: applicant.insertId });
          }, (err) => {
            logger.error('error in saveBusinessOwner');
            conn.rollback(err); conn.close();
            response.send({ message: configVariable.message.businessOwner.fail, status: STATUS.FAILED });
          });

        }, (err) => {
          logger.error('error in saveContact');
          conn.rollback(err); conn.close();
          response.send({ message: configVariable.message.businessContact.fail, status: STATUS.FAILED });
        });
      }, (err) => {
        logger.error('error in save businessApplicant');
        conn.rollback(err); conn.close();
        response.send({ message: configVariable.message.businessApplicant.fail, status: STATUS.FAILED });
      });
    }).catch((err) => {
      logger.error('error in beginTransaction');
      response.send({ message: `${err}`, status: STATUS.FAILED });
    });
  }).catch((err) => {
    logger.error('error in createConnection');
    response.send({ message: `${err}`, status: STATUS.FAILED });
  })
}

var _createIndexResponse = (list, value) => {
  return new Promise((resolve, reject) => {
    if (_.size(list) > 0) {
      logger.info('insert is Kyc flag  ');
      _.forEach(list, function (row) {
        row['isKyc'] = false
      });
      logger.info('check size of shareHolder ');
      if (_.size(_.filter(list, { type: OWNERTYPE.SHAREHOLDER })) > 0) {
        logger.info('inside block of SHAREHOLDER > 0 ');
        var max = Math.max.apply(Math, list.map(function (o) { return o['percentage']; }))
        logger.info('check percentage of shareholder');
        _.forEach(_.filter(list, { percentage: `${Math.max.apply(Math, _.filter(list, { type: OWNERTYPE.SHAREHOLDER }).map(function (o) { return o['percentage']; }))}` }), function (row) {
          row['isKyc'] = true
        });
      }
      logger.info('check size of BUSINESSOWNER ');
      if (_.size(_.filter(list, { type: OWNERTYPE.BUSINESSOWNER })) > 0) {
        logger.info(' BUSINESSOWNER  >0');
        _.filter(list, { type: OWNERTYPE.BUSINESSOWNER })[0]["isKyc"] = true
      }
      setTimeout(function () {
        if (value == OWNERTYPE.DIRECTOR) {
          logger.info(' if type director check size of director ');
          if (_.size(_.filter(list, { type: OWNERTYPE.DIRECTOR })) > 0) {
            logger.info('create a response for director ');
            resolve({ directors: _.filter(list, { type: OWNERTYPE.DIRECTOR }), status: STATUS.SUCCESS });
          }
          logger.warn('create a response if size of director is < 1 ');
          resolve({ directors: _.filter(list, { type: OWNERTYPE.DIRECTOR }), status: STATUS.FAILED });

        } else if (value == OWNERTYPE.SHAREHOLDER) {
          logger.info('create a response for shareholder ');
          if (_.size(_.filter(list, { type: OWNERTYPE.SHAREHOLDER })) > 0) {
            logger.info('create a response for shareholder ');
            resolve({ shareholder: _.filter(list, { type: OWNERTYPE.SHAREHOLDER }), status: STATUS.SUCCESS });
          }
          logger.warn('create a response if size of shareholder is < 1 ');
          resolve({ shareholder: _.filter(list, { type: OWNERTYPE.SHAREHOLDER }), status: STATUS.FAILED });
        } else if (value == OWNERTYPE.BUSINESSOWNER) {
          logger.info('create a response for businessOwner ');
          if (_.size(_.filter(list, { type: OWNERTYPE.BUSINESSOWNER })) > 0) {
            logger.info('create a response for businessOwner ');
            resolve({ businessowner: _.filter(list, { type: OWNERTYPE.BUSINESSOWNER }), status: STATUS.SUCCESS });
          }
          logger.warn('create a response if size of businessOwner is < 1 ');
          resolve({ businessowner: _.filter(list, { type: OWNERTYPE.BUSINESSOWNER }), status: STATUS.FAILED });
        } else if (value == 'all') {
          logger.info('create a response for director, shareholder and businessowner ');
          resolve({ businessowner: _.filter(list, { type: OWNERTYPE.BUSINESSOWNER }), shareholder: _.filter(list, { type: OWNERTYPE.SHAREHOLDER }), directors: _.filter(list, { type: OWNERTYPE.DIRECTOR }), status: STATUS.SUCCESS });
        }
        logger.warn('create a response in record not found ');
        resolve({ message: configVariable.message.businessOwner.recordNotFound, status: STATUS.SUCCESS });
      }, 300)
    } else {
      logger.warn('create a response in record not found ');
      reject({ message: configVariable.message.businessOwner.recordNotFound, status: STATUS.FAILED });
    }
  });

}

/**
 * @function getStakeholdersInfo
 * @desc this function used for get list of director shareholder and business Owner 
 * @param None
 * @return return with list of business owner  
 * 
 */

var getStakeholdersInfo = function (request, response) {
  logger.info('initialize  getStakeholdersInfo funxtion');
  const owner = new Owner(request);
  logger.info('create request and call registerBusinessOwner.getStakeholdersInfo function ');
  registerBusinessOwner.getStakeholdersInfo(owner.id).then((ownerList => {
    logger.info('get response from   registerBusinessOwner.getStakeholdersInfo  and call _createIndexResponse ');
    _createIndexResponse(ownerList, owner.type).then(result => {
      logger.info('get response from _createIndexResponse and send to user ');
      response.send(result);
    }, err => {
      logger.error('error in _createIndexResponse ');
      response.send(`${err}`);
    });
  }), (err) => {
    logger.error(' registerBusinessOwner.getStakeholdersInfo(owner.id)');
    response.send(`${err}`);
  });
}

/**
 * @function getBusinessOwners
 * @desc this function used for get business details by id 
 * @param None
 * @return return with details of business owner
 * 
 */

var getBusinessOwnersById = function (request, response) {
  logger.info('initialize  getBusinessOwnersById and call  registerBusinessOwner.getBusinessOwnersById');
  registerBusinessOwner.getBusinessOwnersById(request.params.business_id).then((ownerDetails => {
    logger.info('get response from  registerBusinessOwner.getBusinessOwnersById and check size of response');
    if (ownerDetails[0] && _.size(ownerDetails) > 0) {
      logger.info(' size of response > 0');
      response.send({ businessOwnerContact: ownerDetails, status: STATUS.SUCCESS, message: `${configVariable.message.businessOwnerContact.success}` });
    } else {
      logger.warn(' size of response < 1');
      response.send({ message: `${configVariable.message.businessOwnerContact.success1}`, status: STATUS.SUCCESS, businessOwnerContact: ownerDetails });
    }
  }), (err) => {
    logger.error(' error in  registerBusinessOwner.getBusinessOwnersById');
    response.send({ message: `${configVariable.message.businessOwnerContact.fail}`, status: STATUS.FAILED });
  });
}

var _validateTotalSharePercentage = function (data, value) {
  return new Promise((resolve, reject) => {
    logger.info('initialize _validateTotalSharePercentage');
    var input = 0, iteration = 0;
    if (_.size(data) > 0) {
      logger.info('if  size of shareholder > 0 in _validateTotalSharePercentage block ');
      _.forEach(data, function (row) {
        iteration++;
        input = input + _.toInteger(row.percentage)
      });
      if (iteration == _.size(data)) {
        logger.info('if iteration ==   _.size(data) then check  the % of shareholder  ');
        if (input + value > 100) {
          logger.info('if shareholder is greater >100 create a response  ');
          resolve({ value: false, message: configVariable.message.businessOwner.errorShareholderRange, totalShareholder: input })
        } else {
          logger.warn('if shareholder is greater < 100 create a response  ');
          resolve({ value: true })
        }
      }
    } else {
      logger.warn('if  size of shareholder < 0 in _validateTotalSharePercentage block ');
      resolve({ value: true })
    }
  });
}


var _isEmailExists = (mail, flag, type, id, value) => {
  return new Promise((resolve, reject) => {
    logger.info('initialize _isEmailExists');
    if (flag) {
      logger.info('if flag is true  call method  registerBusinessOwner.getKybBusinessOwner(id, mail)  ');
      registerBusinessOwner.getKybBusinessOwner(id, mail).then((data) => {
        logger.info('get response of registerBusinessOwner.getKybBusinessOwner(id, mail)  and check condition  ');
        if ((type == OWNERTYPE.BUSINESSOWNER && _.size(_.filter(data, { type: OWNERTYPE.BUSINESSOWNER })) == 0 && _.size(_.filter(data, { type: OWNERTYPE.DIRECTOR })) <= 1) || (type == OWNERTYPE.BUSINESSOWNER && _.size(_.filter(data, { type: OWNERTYPE.BUSINESSOWNER })) == 0 && _.size(_.filter(data, { type: OWNERTYPE.SHAREHOLDER })) <= 1)) {
          logger.info('if condition true send value true ');
          resolve({ value: true });
        } else if (_.size(data) > 0) {
          logger.warn('if_.size(data) > 0 send value false ');
          resolve({ value: false });
        } else {
          logger.info('send true');
          resolve({ value: true });
        }
      })
    } else {
      logger.info('if flag is false ');
      if (_.includes(type, OWNERTYPE.DIRECTOR)) {
        logger.info('if type director send true ');
        resolve({ value: true });
      } else {
        if (_.isInteger(_.toInteger(value))) {
          logger.info('if iteration is completed  call method  registerBusinessOwner.getKybBusinessOwner(id)');
          registerBusinessOwner.getKybBusinessOwner(id).then((data) => {
            logger.info('get response of  registerBusinessOwner.getKybBusinessOwner(id) and call  _validateTotalSharePercentage()');
            _validateTotalSharePercentage(data, _.toInteger(value)).then((message) => {
              logger.info('get response of   _validateTotalSharePercentage() and resolve ');
              resolve(message);
            })
          })
        } else {
          logger.warn('(_.isInteger(_.toInteger(value)) false');
          resolve({ value: false, message: configVariable.message.businessOwner.inputPercentageError });
        }
      }
    }
  })

}

/**
 * @function addBusinessOwner
 * @desc this function used for add director , shareholder and business owner 
 * @param None
 * @return return with the message and status code 
 * 
 */

var addBusinessOwner = function (request, response) {
  let list = request.body.list[0];
  let business_id = request.body.business_id;
  global.type = list.type;
  logger.info('addBusinessOwner () and check _isEmailExists()');
  _isEmailExists(list.email, true, type, business_id, list.percentage).then((result) => {
    logger.info('get response of _isEmailExists() and check result.value ');
    if (result.value) {
      logger.info(' result.value  true ');
      if (_.includes(type, OWNERTYPE.BUSINESSOWNER)) {
        logger.info(' if owner type is business owner  call  registerBusinessOwner.getStakeholdersInfo(business_id) to get list  ');
        registerBusinessOwner.getStakeholdersInfo(business_id).then((ownerList => {
          logger.info(' get response of  registerBusinessOwner.getStakeholdersInfo(business_id) and call _createIndexResponse ()  ');
          _createIndexResponse(ownerList, OWNERTYPE.BUSINESSOWNER).then(List => {
            logger.info(' get response of l _createIndexResponse ()  and check size  ');
            if (_.size(List.businessowner) > 0) {
              logger.info(' if _.size(List.businessowner) > 0 create a response and send   ');
              response.send({ message: configVariable.message.businessOwner.already_added, status: STATUS.FAILED });
            } else {
              logger.info(' if _.size(List.businessowner) == 0 call  registerBusinessOwner.saveKybBusinessOwner ()');
              registerBusinessOwner.saveKybBusinessOwner(business_id, OWNERTYPE.BUSINESSOWNER, list.email, list.first_name + ',' + list.last_name, list.status, list.dob, list.percentage).then(message => {
                logger.info('get response of  registerBusinessOwner.saveKybBusinessOwner ()');
                response.send({ message: configVariable.message.businessOwner.businessOwner, status: STATUS.SUCCESS });
              }, (err) => {
                logger.error('error in get response of  registerBusinessOwner.saveKybBusinessOwner ()');
                response.send({ message: configVariable.message.businessOwner.updateError, status: STATUS.FAILED });
              });
            }
          }, err => {
            logger.error('error in get response of  _createIndexResponse()');
            response.send({ message: configVariable.message.businessOwner.updateError, status: STATUS.FAILED });
          });
        }), (err) => {
          logger.error('error in get response of  registerBusinessOwner.getStakeholdersInfo(business_id)');
          response.send(`${err}`);
        });
      } else {
        lgger.info(' if owner type is not business owner _isEmailExists()  ');
        _isEmailExists(list.email, false, type, business_id, list.percentage).then((data) => {
          if (data.value) {
            lgger.info('get response of _isEmailExists() call  registerBusinessOwner.saveKybBusinessOwner()');
            registerBusinessOwner.saveKybBusinessOwner(business_id, OWNERTYPE.BUSINESSOWNER, list.email, list.first_name + ',' + list.last_name, list.status, list.dob, list.percentage).then(message => {
              lgger.info('get response of  registerBusinessOwner.saveKybBusinessOwner()');
              if (_.includes(type, OWNERTYPE.DIRECTOR)) {
                lgger.info('if type is director create a response and send ');
                response.send({ message: configVariable.message.businessOwner.directorAdded, status: STATUS.SUCCESS });
              } else {
                lgger.info('if type is not director create a response and send ');
                response.send({ message: configVariable.message.businessOwner.shareholderAdded, status: STATUS.SUCCESS });
              }
            }, (err) => {
              lgger.error(' registerBusinessOwner.saveKybBusinessOwner () ');
              response.send({ message: configVariable.message.businessOwner.updateError, status: STATUS.FAILED });
            })
          } else {
            lgger.error('_isEmailExists()');
            response.send({ message: data.message, status: STATUS.FAILED, totalShareholder: data.totalShareholder })
          }
        });
      }
    } else {
      logger.warn('if result.value false  ');
      response.send({ message: configVariable.message.businessOwner.emailExists, status: STATUS.FAILED });
    }
  });
}

/**
 * @function getBusinessOwnersByCId
 * @desc this function used for get business Owner by contact id  
 * @param None
 * @return return with the details of business owner 
 * 
 */

var getBusinessOwnersByCId = function (request, response) {
  const owner = new Owner(request);
  logger.info('initialize getBusinessOwnersByCId and call  registerBusinessOwner.getBusinessOwnersByCId()');
  registerBusinessOwner.getBusinessOwnersByCId(owner.contact_id).then((ownerDetails => {
    logger.info('get response from registerBusinessOwner.getBusinessOwnersByCId() and check size ');
    if (ownerDetails[0] && _.size(ownerDetails) > 0) {
      logger.info('size >0 create a response  ');
      response.send({ businessOwnerContact: ownerDetails, status: STATUS.SUCCESS, message: `${configVariable.message.businessOwnerContact.success}` });
    } else {
      logger.warn('size  == 0 create a response  ');
      response.send({ message: `${configVariable.message.businessOwnerContact.success1}`, status: STATUS.SUCCESS, businessOwnerContact: ownerDetails });
    }
  }), (err) => {
    logger.error('error in  registerBusinessOwner.getBusinessOwnersByCId(owner.contact_id) ');
    response.send({ message: `${configVariable.message.businessOwnerContact.fail}`, status: STATUS.FAILED });
  });
}

/**
 * @function updateBusinessOwnerStatus
 * @desc this function used for updateBusinessOwnerStatus   
 * @param None
 * @return return with message along with status code 
 * 
 */

// update status of shareholder and directors 
var updateBusinessOwnerStatus = function (request, response) {
  logger.info('initialize updateBusinessOwnerStatus ()  and call   registerBusinessOwner.updateBusinessOwnerStatus() ');
  const owner = new Owner(request);
  registerBusinessOwner.updateBusinessOwnerStatus(owner.ownerDetails.kyb_bisiness_owner_id, owner.ownerDetails.status ? 1 : 0).then((res => {
    logger.info('get response from   registerBusinessOwner.updateBusinessOwnerStatus() ');
    response.send({ message: "status update", status: STATUS.SUCCESS });
  }), (err) => {
    logger.error(' error in get response from   registerBusinessOwner.updateBusinessOwnerStatus() ');
    response.send({ message: configVariable.message.businessOwner.updateError, status: STATUS.FAILED });
  });
}

/**
 * @function updateBusinessOwner
 * @desc this function used for update business owner    
 * @param None
 * @return return with message along with status code 
 * 
 */

var updateBusinessOwner = function (request, response) {
  logger.info('initialize updateBusinessOwner ()');
  const owner = new Owner(request);
  let ownerDetails = {
    status: owner.ownerDetails.status ? 1 : 0,
    type: owner.ownerDetails.type,
    name: owner.ownerDetails.first_name + ',' + owner.ownerDetails.last_name,
    email: owner.ownerDetails.email,
    dob: owner.ownerDetails.dob,
    percentage: owner.ownerDetails.percentage,
    owner_id: owner.ownerDetails.kyb_bisiness_owner_id
  };
  logger.info('create a object and call registerBusinessOwner.updateBusinessOwner(ownerDetails)');
  registerBusinessOwner.updateBusinessOwner(ownerDetails).then((res => {
    logger.info('response of  registerBusinessOwner.updateBusinessOwner(ownerDetails)');
    response.send({ message: `${ownerDetails.type} updated`, status: STATUS.SUCCESS });
  }), (err) => {
    logger.error('error in registerBusinessOwner.updateBusinessOwner(ownerDetails)');
    response.send({ message: configVariable.message.businessOwner.updateError, status: STATUS.FAILED });
  });
}

/**
 * @function deleteBusinessOwnerKyb
 * @desc this function used for delete document 
 * @param None
 * @return return with message along with status code 
 * 
 */

var deleteBusinessOwnerKyb = function (request, response) {
  const owner = new Owner(request);
  logger.info('initialize deleteBusinessOwnerKyb () and call  registerBusinessOwner.deleteBusinessOwnerKyb() ');
  registerBusinessOwner.deleteBusinessOwnerKyb(owner.kyb_document_id).then((res => {
    logger.info('response of registerBusinessOwner.deleteBusinessOwnerKyb(owner.kyb_document_id)');
    response.send({ message: owner.type + configVariable.message.businessOwner.deleted, status: STATUS.SUCCESS });
  }), (err) => {
    logger.error('error in  registerBusinessOwner.deleteBusinessOwnerKyb()');
    response.send({ message: configVariable.message.businessOwner.deleteError, status: STATUS.FAILED });
  });
}

/**
	 * @function getBusinessOwnerDetails
	 * @desc this function used for get business owner details 
	 * @param None
	 * @return return with owner details 
	 * 
	 */

var getBusinessOwnerDetails = function (request, response) {
  logger.info('initialize getBusinessOwnerDetails ()  and verify token ');
  const object = new Owner(request);
  jwt.verify(object.token, process.env.PASSWORD_CONFIG, function (err, decoded) {
    if (err) {
      logger.error('error in verify token ');
      response.send(err)
    } else {
      logger.info(' token verify and create a response object  ');
      var data = {
        Token: jwt.sign({ email: decoded.email }, process.env.PASSWORD_CONFIG), status: 1,
        client_auth: jwt.sign({ email: decoded.email }, process.env.PASSWORD_CONFIG1), member_id: process.env.CLIENT_ID,
        api_access_key: process.env.API_KEY, business_id: decoded.business_id, kyb_bo_id: decoded.kyb_bo_id, isKyc: decoded.isKyc
      };
      logger.info(' call registerBusinessOwner.getBusinessOwnerDetails(decoded.kyb_bo_id)   ');
      registerBusinessOwner.getBusinessOwnerDetails(decoded.kyb_bo_id).then((ownerDetails => {
        logger.info(' get response from  registerBusinessOwner.getBusinessOwnerDetails(decoded.kyb_bo_id)  and ckeck size  ');
        if (ownerDetails.length > 0) {
          logger.info(' size >0 create a response and send  ');
          data.type = ownerDetails[0].type
          data.email = ownerDetails[0].email
          data.name = ownerDetails[0].name
          data.percentage = ownerDetails[0].percentage
          data.dob = ownerDetails[0].dobgetCompanyDetails
          response.send(data)
        } else {
          logger.warn(' size  == 0 create a response and send  ');
          response.send({ message: configVariable.message.businessOwner.recordNotFound, status: STATUS.FAILED });
        }
      }), (err) => {
        logger.error('error in    registerBusinessOwner.getBusinessOwnerDetails(decoded.kyb_bo_id) ');
        response.send({ message: err, status: STATUS.FAILED });
      });
    }
  });
}

// //checks total shareholders
// var checkTotalShareholder = function (request, response) {
//     return new Promise(function (resolve, reject) {
//         object.obj.checkTotalShareholder(request, response).then((res => {
//             resolve(res);
//         }), (err) => {
//             resolve(`${err}`);
//         })
//     })
// }

// // checkDuplicateEmail
// var checkDuplicateEmail = function (request, response) {
//     return new Promise(function (resolve, reject) {
//         object.obj.checkDuplicateEmail(request).then((res => {
//             resolve(res);
//         }), (err) => {
//             resolve(`${err}`);
//         })
//     })
// }

export {
  addBusinessOwner,
  saveBusinessOwner,
  getStakeholdersInfo,
  // checkDuplicateEmail,
  // checkTotalShareholder,
  getBusinessOwnersById,
  getBusinessOwnersByCId,
  updateBusinessOwnerStatus,
  deleteBusinessOwnerKyb,
  updateBusinessOwner,
  getBusinessOwnerDetails
}
