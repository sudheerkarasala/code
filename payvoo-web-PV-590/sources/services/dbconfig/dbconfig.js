
/**
 * This file contains all database related configurations. Here we are getting all the
 * configuration from .env file.
 * @package dbconfig
 * @subpackage sources\services\dbconfig\dbconfig
 * @author SEPA Cyber Technologies, Sujit kumar , Sekhara Suman Sahu.
 */

const mariadbCallback = require('mariadb/callback');
export const mariadb = require('mariadb');

export class DbConnMgr {
  constructor(){
    DbConnMgr.__instance = null;
    DbConnMgr.__pool = null;
    DbConnMgr.__conn = null;
  }
  //Method for getting instance of the current class
  static getInstance(){
    if(DbConnMgr.__instance == null){
      DbConnMgr.__instance = new DbConnMgr();
      return DbConnMgr.__instance;
    }
    return DbConnMgr.__instance;
  }

  //Method for establishing database connection
  static __createConn(){
    if(DbConnMgr.__pool == null){
      return mariadbCallback.createPool({
          host: process.env.DBHOST,
          user: process.env.DBUSER,
          port: process.env.DBPORT,
          password: process.env.DBPASSWORD,
          database: process.env.DB,
          connectionLimit : process.env.DbConnMgrLIMIT,
         });
       }
      return DbConnMgr.__pool;
   }
  //Method for SQL query execution
  executeQuery(sql){
    return new Promise((resolve, reject)=>{
      const pool = DbConnMgr.__createConn();
      pool.query(sql,(err, result)=>{
        if(err){
          reject(err);
        }
        resolve(result);
      });
    });
   }

   //Method for getting single connection object
   getConnObject(){
    return new Promise((resolve)=>{
      if(DbConnMgr.__conn == null){
        mariadb.createConnection({
          host: process.env.DBHOST,
          user: process.env.DBUSER,
          port: process.env.DBPORT,
          password: process.env.DBPASSWORD,
          database: process.env.DB,
        })
        .then(conn=>{
          DbConnMgr.__conn = conn;
          resolve(DbConnMgr.__conn);
        })
      } else {
        resolve(DbConnMgr.__conn);
      }
    })
  }
}