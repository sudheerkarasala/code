/**
 * loggerModel Model
 * loggerModel is used for the fetching configurable log levels.
 * @package loggerModel
 * @subpackage sources/services/model/loggerModel
 * @author SEPA Cyper Technologies, Satyanarayana G.
 */

"use strict";

import { DbConnMgr } from "../dbconfig/dbconfig";
import { logger } from "handlebars";
const DbInstance = DbConnMgr.getInstance();

export class LoggerModel {
	constructor() {
	}
	getAllModules() {
		return new Promise((resolve, reject) => {
			//console.log('getAllModules() initiated')
			let sql = `SELECT DISTINCT module , log_level FROM server_logs`;
			DbInstance.executeQuery(sql)
				.then(res => {
					//console.log('Fetched configured logger successfully')
					resolve(res);
				}).catch(err => {
					console.log('Error while fetching configured logger')
					reject(err);
				});
		});
	}

	updateConfiguration(moduleName, moduleLevel) {
		return new Promise((resolve, reject) => {
			logger.info('updateConfiguration() initiated');
			let sql = `UPDATE token_validator SET log_level = ${moduleLevel} where module = '${moduleName}'`;
			DbInstance.executeQuery(sql).then(res => {
				console.log('logger configuration updated successfully')
				resolve(res);
			}).catch(err => {
				console.log('Error while updating logger configuration ')
				reject(err);
			})
		})
	}
}

