/**
 * uploadModel
 * This is using for to store the files as base64 format in database and get the data from database.
 * @package uploadModel
 * @subpackage model/uploadModel
 *  @author SEPA Cyper Technologies, krishnakanth.r
 */
"use strict";
import { langEngConfig } from '../utility/lang_eng';
import { Upload } from '../model/uploadModel';

const STATUS = {
  SUCCESS: 0,
  FAILURE: 1
}

///Upload the files or images data in database 
export let uploadFile = function (request, response) {
  logger.info("uploadFile() initiated");
  const upload = new Upload(request.body);
  if (upload.id && upload.file_name != '' && upload.file_name) {
    let fileName = _.upperCase(upload.file_name)
    upload.getBusinesDocsId(upload.id, fileName).then(results => {
      if (_.size(results) > 0) {
        logger.info("successfully get results");
        upload.updateDocs(upload.file_type, upload.file_content, upload.id, fileName).then(results => {
          if ((results.affectedRows) > 0) {
            logger.info("updated successfully");
            logger.info("response sent");
            response.send({ status: STATUS.SUCCESS, message: `${langEngConfig.message.upload.success}` });
          } else {
            logger.debug("failed to update");
            response.send({ status: STATUS.FAILURE, message: `${langEngConfig.message.upload.fail}` });
          }
        }).catch(err => {
          logger.error("error in while updating data");
          response.send({ status: STATUS.FAILURE, message: `${err}` })
        });
      } else {
        upload.insertDocs(upload.file_type, upload.file_content, upload.id, fileName).then(results => {
          if ((results.affectedRows) > 0) {
            logger.info("inserted successfully");
            logger.info("response sent");
            response.send({ status: STATUS.SUCCESS, message: `${langEngConfig.message.upload.success}` });
          } else {
            logger.debug("failed to insert")
            response.send({ status: STATUS.FAILURE, message: `${langEngConfig.message.upload.fail}` });
          }
        }).catch(err => {
          logger.error("error in while inserting data");
          response.send({ status: STATUS.FAILURE, message: `${err}` });
        });
      }
    }).catch(err => {
      logger.error("error in while get the id of document");
      response.send({ status: STATUS.FAILURE, message: `${err}` });
    })
  } else {
    logger.debug("invalid request");
    logger.info("response sent");
    response.send({ status: STATUS.FAILURE, message: `${langEngConfig.message.upload.fail}` });
  }
}
//get the Documenet details of respective business
export let getFile = (request, response) => {
  logger.info("getFile() initiated");
  let upload = new Upload(request.params);
  upload.getFileDetails(upload.id).then(results => {
    if (results.length > 0) {
      logger.info("successfully get results");
      logger.info("response sent");
      response.send({ status: STATUS.SUCCESS, message: langEngConfig.message.getFail.success, data: results })
    } else {
      logger.debug("failed to get the document details");
      response.send({ status: STATUS.FAILURE, message: langEngConfig.message.getFail.fail })
    }
  }).catch(err => {
    logger.error("error in while getting the details of document");
    response.send({ status: STATUS.FAILURE, message: `${err}` });
  });
}
//get the Documenet details of respective business with status which it is indicate file uploaded or not
export let getFileWithStatus = function (request, response) {
  logger.info("getFile initiated");
  let upload = new Upload(request.params);
  upload.getFileDetails(upload.id).then(results => {
    if (_.size(results) > 0) {
      logger.info("successfully get results");
      _.forEach(results, function (result, key) {
        if (result.kyb_doc_base64 != '' && result.kyb_doc_base64) {
          logger.info("status added");
          results[key].status = STATUS.SUCCESS;
        } else {
          logger.info("status added");
          results[key].status = STATUS.FAILURE;
        }
      })
      logger.info("response sent");
      response.send({ status: STATUS.SUCCESS, message: `${langEngConfig.message.getFail.success}`, data: results });
    } else {
      logger.debug("failed to get the document details");
      response.send({ status: STATUS.FAILURE, message: `${langEngConfig.message.getFail.fail}` })
    }
  }).catch(err => {
    logger.error("error in while getting the details of document");
    response.send({ status: STATUS.FAILURE, message: `${err}` })
  });     
  }