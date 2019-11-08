/**
 * contactModel
 * this is used for the insert  the contact details of person in database and get the data from database
 * @package contactModel
 * @subpackage model/contactModel
 *  @author SEPA Cyper Technologies,krishnakanth.r
 */
"use strict";


import { DbConnMgr } from '../dbconfig/dbconfig';
const DbInstance = DbConnMgr.getInstance();

export class Contact {
  constructor(user) {
    this.applicant_id = user.applicant_id;
    this.first_name = user.first_name;
    this.middle_name = user.middle_name;
    this.last_name = user.last_name;
    this.email = user.email;
    this.gender = user.gender;
    this.dob = user.dob;
    this.telephone = user.telephone;
    this.mobile = user.mobile
  }
  getContactId(id) {
    return new Promise((resolve, reject) => {
      log.info("getContactId() initiated");
      let sql = `SELECT contact_id FROM contact WHERE applicant_id = ${id}`;
      DbInstance.executeQuery(sql).then(result => {
        logger.info("query executed");
        resolve(result);
      }).catch(err => {
        logger.error("error while  execute the query");
        reject(err);
      });
    })
  }


  addContact(applicant_id, first_name, middle_name, last_name, email, gender, dob, telephone, mobile) {
    return new Promise((resolve, reject) => {
      log.info("addContact() initiated");
      let sql = `INSERT INTO contact (applicant_id,first_name,middle_name,last_name,email,gender,dob,telephone,mobile) VALUES (${applicant_id},'${first_name}', '${middle_name}', '${last_name}', '${email}', '${gender}', '${dob}','${telephone}','${mobile}')`;
      DbInstance.executeQuery(sql).then(result => {
        logger.info("query executed");
        resolve(result);
      }).catch(err => {
        logger.error("error while  execute the query");
        reject(err);
      });
    })
  }
  updateContact(first_name, middle_name, last_name, email, gender, dob, telephone, mobile, applicant_id) {
    return new Promise((resolve, reject) => {
      log.info("updateContact() initiated");
      let sql = `UPDATE contact SET first_name = '${first_name}',middle_name = '${middle_name}',last_name ='${last_name}',email = '${email}',gender ='${gender}',dob = '${dob}',telephone ='${telephone}',mobile ='${mobile}' WHERE applicant_id = ${applicant_id}`;
      DbInstance.executeQuery(sql).then(result => {
        logger.info("query executed");
        resolve(result);
      }).catch(err => {
        logger.error("error while  execute the query");
        reject(err);
      });
    })

  }
  getConatctDetails(id) {
    return new Promise((resolve, reject) => {
      log.info("getConatctDetails() initiated");
      let sql = `SELECT * FROM contact WHERE applicant_id = '${id}'`;
      DbInstance.executeQuery(sql).then(result => {
        logger.info("query executed");
        resolve(result);
      }).catch(err => {
        logger.error("error while  execute the query");
        reject(err);
      });
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

