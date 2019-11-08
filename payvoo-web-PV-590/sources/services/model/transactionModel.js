/**
 * transactionModel
 * This api is used for to send or receive payments from bussiness app and also 
 * used for set volume of business transations.
 * @package transactionModel
 * @subpackage model/transactionModel
 *  @author SEPA Cyper Technologies, Satyanarayana G,Krishnakanth R
 */

// import mariadb from '../dbconfig/dbconfig';
"use strict"
const config = require('../dbconfig/connection').config;
// var sqlConfig = require('../utility/sqlService');
import { sqlConfig } from '../utility/sqlService';
import mariadb from 'mariadb';
import { DbConnMgr } from "../dbconfig/dbconfig";
const DbInstance = DbConnMgr.getInstance();
import util from 'util';

export class Transaction {
  constructor() {

  }

  transactionPayment(rowItems) {
    return new Promise((resolve, reject) => {
      logger.info('transactionPayment() initiated');
      mariadb.createConnection(config).then(conn => {
        conn.batch(sqlConfig.transactionSql.insertCountry, rowItems).then(res => {
          logger.info('transactionPayment() exited');
          conn.close();
          resolve(res);
        }).catch(err => {
          conn.close();
          logger.error('transactionPayment() Error', err);
          reject(err);
        })
      }).catch(err => {
        conn.close();
        logger.error('transactionPayment() Error', err);
        reject(err);
      })
    })
  }

  getTransaction(id) {
    return new Promise((resolve, reject) => {
      logger.info('getTransaction() initiated');
      let sql = util.format(sqlConfig.transactionSql.select_transaction_country, id);
      DbInstance.executeQuery(sql).then(res => {
        logger.info('getTransaction() exited');
        resolve(res);
      }).catch(err => {
        logger.error('getTransaction() Error', err);
        reject(err);
      })
    })
  }

  transactionVolume(transaction) {
    return new Promise((resolve, reject) => {
      logger.info('transactionVolume() initiated');
      let sql = util.format(sqlConfig.transactionSql.insertQuery, transaction.business_id, transaction.monthy_transfer_amount, transaction.no_payments_per_month, transaction.max_value_of_payment);
      DbInstance.executeQuery(sql).then(res => {
        logger.info('transactionVolume() exited');
        resolve(res);
      }).catch(err => {
        logger.error('transactionVolume() Error', err);
        reject(err);
      })
    })
  }

  getTransactionVolume(id) {
    return new Promise((resolve, reject) => {
      logger.info('gettransactionVolume() initiated');
      let sql = util.format(sqlConfig.transactionSql.select_transaction_volume, id);
      DbInstance.executeQuery(sql).then(res => {
        logger.info('gettransactionVolume() exited');
        resolve(res);
      }).catch(err => {
        logger.error('gettransactionVolume() Error', err);
        reject(err);
      })

    })
  }

}

