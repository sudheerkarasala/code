/**
 * uploadModel
 * This is using for to store the files as base64 format in database and get the data from database.
 * @package uploadModel
 * @subpackage model/uploadModel
 *  @author SEPA Cyper Technologies, krishnakanth.r
 */
"use strict";

import { DbConnMgr } from "../dbconfig/dbconfig";
const DbInstance = DbConnMgr.getInstance();

// This is for testing purpose save in database 

export class Upload {
    constructor(user) {
        this.id = user.business_id;
        this.file_content = user.file_content;
        this.file_name = user.file_name;
        this.file_type = user.file_type;

    }
    getBusinesDocsId(id,fileName) {
        return new Promise((resolve, reject) => {
            logger.info("getBusinessDocsId() initiated");
         let sql =`SELECT kyb_business_docs_id FROM kyb_business_docs WHERE business_id=${id} AND kyb_doc_type = '${fileName}'`;
         DbInstance.executeQuery(sql).then(docsId => {
             logger.info("sql query executed");
             resolve(docsId);
        }).catch(err => {
            logger.error("error while execute the query");
            reject(err);
        });
    })
}
//insert the documents into database
    insertDocs(file_type,file_content,id, file_name) {
        return new Promise((resolve,reject) => {
            logger.info("insertDocs() initiated");
            let sql=`INSERT INTO kyb_business_docs (business_id, kyb_doc_type,kyb_doc_file_type,kyb_doc_base64) VALUES (${id}, '${file_name}', '${file_type}', ${file_content})`;
            DbInstance.executeQuery(sql).then(result => {
                logger.info("sql query executed");
                resolve(result);
           }).catch(err => {
               logger.error("error while execute the query");
               reject(err);
           });
        })
    }
    //update the documents 
    updateDocs(file_type,file_content,id, file_name) {
        return new Promise((resolve,reject) => {
            logger.info("updateDocs() initiated");
            let sql=`UPDATE kyb_business_docs SET kyb_doc_file_type='${file_type}',kyb_doc_base64= ${file_content} where business_id =${id} and kyb_doc_type ='${file_name}'`;
            DbInstance.executeQuery(sql).then(result => {
                logger.info("sql query executed");
                resolve(result);
           }).catch(err => {
               logger.error("error while execute the query");
               reject(err);
           });
        })
    }
    //get the files of respective business
    getFileDetails(docId) {
        return new Promise((resolve,reject) => {
            logger.info("getFileDetails() initiated");
            let sql=`SELECT * FROM kyb_business_docs WHERE business_id = ${docId}`;
            DbInstance.executeQuery(sql).then(result => {
                logger.info("sql query executed");
                resolve(result);
           }).catch(err => {
               logger.error("error while execute the query");
               reject(err);
           });
        })
    }
}
