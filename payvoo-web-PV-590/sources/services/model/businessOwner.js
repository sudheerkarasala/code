/**
 * businessModel
 * this is used for the insert  the business details of person in database and get the data from database
 * @package businessModel
 * @subpackage model/businessModel
 *  @author SEPA Cyper Technologies,krishnakanth.r
 */


import { DbConnMgr } from '../dbconfig/dbconfig';
const DbInstance = DbConnMgr.getInstance();

export class BusinessOwner {
  constructor() {

  }
  // this method is used for creating different types of business owners like(Director/Shareholder/Ultimate Benificial Owner)

  saveApplicant(type) {
    return new Promise((resolve, reject) => {
      logger.info('initialize saveApplicant() ');
      let sql = `insert into applicant (account_type) values ('${type}')`;
      DbInstance.executeQuery(sql).then(userData => {
        logger.info('success in  saveApplicant() ');
        resolve(userData);
      }).catch(err => {
        logger.error('error  in  saveApplicant() ');
        reject(err);
      });
    });
  }

  saveContact(applicant_id, ownerDetails) {
    return new Promise((resolve, reject) => {
      logger.info('initialize saveContact() ');
      let sql = `insert into contact (applicant_id,first_name,last_name,email,gender,dob,mobile) values (${applicant_id},'${ownerDetails.first_name}','${ownerDetails.last_name}','${ownerDetails.email}','${ownerDetails.gender}','${ownerDetails.dob}','${ownerDetails.mobile}')`;
      DbInstance.executeQuery(sql).then(userData => {
        logger.info('success in  saveContact() ');
        resolve(userData);
      }).catch(err => {
        logger.error('error in  saveContact() ');
        reject(err);
      });
    });
  }

  saveBusinessOwner(contact_id, ownerDetails) {
    return new Promise((resolve, reject) => {
      logger.info('initialize  saveBusinessOwner() ');
      let sql = `insert into business_owner (business_id ,contact_id ,business_owner_type,percentage) values(${ownerDetails.business_id},${contact_id},'${ownerDetails.business_owner_type}','${ownerDetails.percentage}')`;
      DbInstance.executeQuery(sql).then(userData => {
        logger.info('success in  saveBusinessOwner() ');
        resolve(userData);
      }).catch(err => {
        logger.error('error in  saveBusinessOwner() ');
        reject(err);
      });
    });
  }

  // this method is used for get all the director 
  getStakeholdersInfo(id) {
    return new Promise((resolve, reject) => {
      logger.info('initialize  getStakeholdersInfo() ');
      let sql = `select * from kyb_business_owner where business_id = ${id}`;
      DbInstance.executeQuery(sql).then(ownerDetails => {
        logger.info('success in  getStakeholdersInfo() ');
        resolve(ownerDetails);
      }).catch(err => {
        logger.error('error in  getStakeholdersInfo() ');
        reject(err);
      });
    });
  }
  // get business owners list by contact_id
  getBusinessOwnersById(id) {
    return new Promise((resolve, reject) => {
      logger.info('initialize  getBusinessOwnersById() ');
      let sql = `SELECT bo.business_id , CONCAT_WS(' ',c.first_name,c.last_name) as fullName ,c.contact_id
        FROM business_owner bo JOIN contact c ON c.contact_id = bo.contact_id WHERE bo.business_id = ${id} ORDER BY c.contact_id`;
      DbInstance.executeQuery(sql).then(ownerDetails => {
        logger.info('success in  getBusinessOwnersById() ');
        resolve(ownerDetails);
      }).catch(err => {
        logger.error('error in  getBusinessOwnersById() ');
        reject(err);
      });
    });
  }

  getKybBusinessOwner(id, mail) {
    return new Promise((resolve, reject) => {
      logger.info('initialize getKybBusinessOwner() ');
      var sql;
      if (mail) {
        sql = `select email, type from kyb_business_owner where email = '${mail}' and business_id = ${id}`;
      } else {
        sql = `select email, percentage from kyb_business_owner where business_id = ${id} and type = 'shareholder'`
      }
      DbInstance.executeQuery(sql).then(ownerDetails => {
        logger.info('success in  getKybBusinessOwner() ');
        resolve(ownerDetails);
      }).catch(err => {
        logger.error('error in  getKybBusinessOwner() ');
        reject(err);
      });
    });
  }

  saveKybBusinessOwner(businessId, type, email, name, status, dob, percentage) {
    return new Promise((resolve, reject) => {
      logger.info('initialize saveKybBusinessOwner ');
      let sql = `insert into kyb_business_owner (business_id,type,email,name,status,dob, percentage) values(${businessId},'${type}','${email}','${name}',${status},'${dob}','${percentage}')`
      DbInstance.executeQuery(sql).then(ownerDetails => {
        logger.info('success in saveKybBusinessOwner ');
        resolve(ownerDetails);
      }).catch(err => {
        logger.error('error in saveKybBusinessOwner ');
        reject(err);
      });
    });
  }

  //get business owners list by contact_id
  getBusinessOwnersByCId(id) {
    return new Promise((resolve, reject) => {
      logger.info(' initialize getBusinessOwnersByCId()');
      let sql = `SELECT bo.business_id , bo.business_owner_type , c.first_name ,c.last_name ,c.contact_id ,c.applicant_id
    FROM business_owner bo JOIN contact c ON c.contact_id = bo.contact_id WHERE bo.contact_id = ${id}`;
      DbInstance.executeQuery(sql).then(getContact => {
        logger.info('success in getBusinessOwnersByCId()');
        resolve(getContact);
      }).catch(err => {
        logger.error('error in getBusinessOwnersByCId()');
        reject(err);
      });
    });
  }

  // update status of shareholder and directors
  updateBusinessOwnerStatus(id, type) {
    return new Promise((resolve, reject) => {
      logger.info('initialize updateBusinessOwnerStatus() ');
      let sql = `update kyb_business_owner set status='${type}' where kyb_bo_id = ${id}`;
      DbInstance.executeQuery(sql).then(status => {
        logger.info('success in  updateBusinessOwnerStatus() ');
        resolve(status);
      }).catch(err => {
        logger.error('error in  updateBusinessOwnerStatus() ');
        reject(err);
      });
    });
  }

  // update  status of shareholder and directors in the list
  updateBusinessOwner(ownerDetails) {
    return new Promise((resolve, reject) => {
      logger.info('initialize updateBusinessOwner() ');
      let sql = `update kyb_business_owner set type = '${ownerDetails.type}' , email ='${ownerDetails.email}' , name='${ownerDetails.name}',status= '${ownerDetails.status}', dob='${ownerDetails.dob}', percentage =${ownerDetails.percentage} where kyb_bo_id = ${ownerDetails.owner_id}`;
      DbInstance.executeQuery(sql).then(status => {
        logger.info('success in updateBusinessOwner() ');
        resolve(status);
      }).catch(err => {
        logger.error('error  in updateBusinessOwner() ');
        reject(err);
      });
    });
  }

  // this method is used to add shareholder
  deleteBusinessOwnerKyb(id) {
    return new Promise((resolve, reject) => {
      logger.info('initialize   deleteBusinessOwnerKyb() ');
      let sql = `delete from kyb_business_owner  where kyb_bo_id = ${id}`;
      DbInstance.executeQuery(sql).then(status => {
        logger.info('success in  deleteBusinessOwnerKyb() ');
        resolve(status);
      }).catch(err => {
        logger.error('error in  deleteBusinessOwnerKyb() ');
        reject(err);
      });
    });
  }

  getBusinessOwnerDetails(kyb_bo_id) {
    return new Promise((resolve, reject) => {
      logger.info('initialize  getBusinessOwnerDetails() ');
      let sql = `select type, email, name, dob, percentage, type from kyb_business_owner where kyb_bo_id = ${kyb_bo_id}`;
      DbInstance.executeQuery(sql).then(status => {
        logger.info('success in  getBusinessOwnerDetails() ');
        resolve(status);
      }).catch(err => {
        logger.error('error in  getBusinessOwnerDetails() ');
        reject(err);
      });
    });
  }
}