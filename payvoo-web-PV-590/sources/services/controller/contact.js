/**
 * contactModel
 * this is used for the insert  the contact details of person in database and get the data from database
 * @package contactModel
 * @subpackage model/contactModel
 *  @author SEPA Cyper Technologies,krishnakanth.r
 */
"use strict";

import { langEngConfig } from '../utility/lang_eng';
// var sqlConfig = require('../utility/sqlService');
import {Contact} from '../model/contactModel';
import { logger } from 'handlebars';


const STATUS={
  SUCCESS:0,
  FAILURE:1
}

//insert contact details in database
export let addContact = (request, response) => {
  logger.info("addContact() initiated");
  const contact = new Contact(request.body);
  if (contact.applicant_id != 'undefined' && contact.applicant_id) {
    contact.getContactId(contact.applicant_id).then(results => {
      if (_.size(results) > 0) {
        logger.info("successfully fetch the results");
        logger.info("sent the response");
       response.send({ status: STATUS.FAILURE, message: langEngConfig.message.insert.error });
      } else {
        contact.addContact(contact.applicant_id, contact.first_name, contact.middle_name, contact.last_name, contact.email, contact.gender, contact.dob, contact.telephone, contact.mobile).then(results => {
          if ((results.affectedRows) > 0) {
            logger.info("successfully add contact");
        logger.info("sent the response");
           response.send({ status: STATUS.SUCCESS, message: langEngConfig.message.insert.success })
          } else {
            logger.dubug("failed to insert");
           response.send({ status: STATUS.FAILURE, message: langEngConfig.message.insert.fail });
          }
        }).catch(err => {
          logger.error("error while insert the data");
         response.send({ status: STATUS.FAILURE, message: `${err}` })
        });
      }
    }).catch(err => {
      logger.error("error while getting data");
     response.send({ status: STATUS.FAILURE, message: `${err}` })
    });
  }
}

//Update the contact details of the person
export let updateContact = function (request, response) {
  logger.info("updateContact() initiated");
  const contact = new Contact(request.body);
  if (contact.applicant_id != 'undefined' && contact.applicant_id) {
    contact.getContactId(contact.applicant_id).then(results => {
      if (_.size(results) > 0) {
        logger.info("successfully fetch the results");     
        contact.updateContact(contact.first_name, contact.middle_name, contact.last_name, contact.email, contact.gender, contact.dob, contact.telephone, contact.mobile, contact.applicant_id).then(results => {
          if ((results.affectedRows) > 0) {
            logger.info("successfully add contact");
            logger.info("sent the response");
           response.send({ status: STATUS.SUCCESS, message: langEngConfig.message.update.success })
          } else {
            logger.dubug("failed to insert");
           response.send({ status: STATUS.FAILURE, message: langEngConfig.message.update.fail });
          }
        }).catch(err => {
          logger.error("error while insert the data");
         response.send({ status: STATUS.FAILURE, message: `${err}` })
        })
      } else {
       response.send({ status: STATUS.FAILURE, message: langEngConfig.message.update.error });
      }
    }).catch(err => {
      logger.error("error while getting data");
     response.send({ status: STATUS.FAILURE, message: `${err}` })
    })

  }
}

//Get the contact details
export let getContactDetails = (request, response) => {
  logger.info("updateContact() initiated");
  const contact = new Contact(request.params);
  if (contact.applicant_id != 'undefined' && contact.applicant_id) {
    contact.getConatctDetails(contact.applicant_id).then(results => {
      if (_.size(results) > 0) {
        logger.info("successfully fetch the data");
            logger.info("sent the response");
            let data = results[0];
            response.send(ResponseHelper.buildSuccessResponse({data}, langEngConfig.message.get.success))
       //response.send({ status: STATUS.SUCCESS, message: langEngConfig.message.get.success, data: results[0] });
      } else {
        logger.debug("failed to get details")
        response.send(ResponseHelper.buildFailureResponse(langEngConfig.message.get.fail));
       //response.send({ status: STATUS.FAILURE, message: langEngConfig.message.get.fail });
      }
    }).catch(err => {
      response.send(ResponseHelper.buildFailureResponse(STATUS.FAILURE));
      logger.error("error while getting data");
     //response.send({ status: STATUS.FAILURE, message: `${err}` })
    })
  }
}

// obj.savePeerContact = function (req) {
//     return new Promise(function (resolve, reject) {
//         myPool.query(sqlConfig.contactSql.get_all_contact).then(results => {
//             if (_.size(results) == 0) {
//                 resolve({ status: 0, message: configVariable.message.insert.applicant_id_not_found });
//             } else {
//                 _.forEach(results, function (row) {
//                     if (_.size(_.filter(req.body.list, { mobile: row.mobile })) > 0 || _.size(_.filter(req.body.list, { mobile: row.phone })) > 0) {
//                         myPool.query(sqlConfig.contactSql.select_peer_contact, [req.body.applicant_id]).then(list => {
//                             if (_.size(_.filter(list, { contact_number: _.get(row, 'mobile', ' ') })) > 0 || _.size(_.filter(list, { contact_number: _.get(row, 'phone', ' ') })) > 0) {
//                                 console.log("record already exists")
//                             } else {
//                                 myPool.query(sqlConfig.contactSql.insert_peer_contact, [req.body.applicant_id, row.applicant_id, _.get(row, 'mobile', ' '), _.get(row, 'phone', ' '), _.get(row, 'first_name', ' ') + _.get(row, 'last_name', ' ')]).then(value => {
//                                     console.log("record inserted")
//                                 })
//                             }

//                         }).catch(err => {
//                             resolve({ status: 0, message: `${err}` })
//                         })

//                     } else {
//                         console.log("record not inserted")
//                     }
//                 })
//                 resolve({ status: 1, message: configVariable.message.insert.peer_contact })
//             }
//         }).catch(err => {
//             resolve({ status: 0, message: `${err}` })
//         })

//     })
// }

// obj.getPeerContact = function (req) {
//     return new Promise(function (resolve, reject) {
//         myPool.query(sqlConfig.contactSql.get_peer_contact,[req.params.applicant_id]).then(results => {
//             if(_.size(results)>0){
//                 resolve({ status: 1,data: _.uniqBy(results,{})})
//             } else{
//                 resolve({ status: 0, message: configVariable.message.get.fail  })
//             }
            
//         }).catch(err => {
//             resolve({ status: 0, message: `${err}` })
//         })

//     })
// }

// module.exports = { obj };