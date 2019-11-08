/**
 * signUpController Controller
 * signUpController is used for the user registration purpose. An individual user has to give the required 
 * data to register himself in the payvoo app.
 * @package signUpController
 * @subpackage controller/signUP/signUpController
 * @author SEPA Cyber Technologies, Sekhara Suman Sahu.
 */

"use strict";

import { country } from '../model/country';
import { configVariable } from '../utility/country';

const STATUS = {
  FAILED: 1,
  SUCCESS: 0
};

// this function is used to get list of country
let getCountriesList = (request, response) => {
  let countryObject = new country(request);
  logger.info('getCountriesList initiated')
  countryObject.getCountriesList().then(result => {
    logger.info('getCountriesList fetched successfully')
    response.send(ResponseHelper.buildSuccessResponse(result,))
   // response.send(JSON.stringify(result));
  }).catch((err) => {
    logger.error('Error while fetching countries list ')
    response.send(ResponseHelper.buildFailureResponse(err));
    //response.send({ Error: `${err}`, status: STATUS.FAILED });
  });

}

// this function is used to get country details by Id 
let getCountryByName = (request, response) => {
  let countryObject = new country(request.params);
  logger.info('getCountryByName initiated')
  let countryName = countryObject.country_name ? countryObject.country_name : ''
  if (countryName) {
    countryObject.getCountryByName(countryName).then(result => {
      if (result.length == 0) {
        logger.debug('There is no countries by name');
        //response.send(ResponseHelper.buildSuccessResponse({cards:result},configVariable.message.indexCountry.inputError));
        return response.send({ message: configVariable.message.indexCountry.inputError, status: responseStatusHandler.NOT_FOUND.CODE });
      }
      logger.info('get countries by name fetched successfully')
     return response.send(ResponseHelper.buildSuccessResponse(result,));
      //return response.send(JSON.stringify(result));
    }, (err) => {
      logger.error('Fail to fetch countries by name')
      return response.send({ status: STATUS.FAILED, Error: `${err}` });
    })
  } else {
    logger.debug('Invalid input details for get countries by name')
    return response.send(ResponseHelper.buildFailureResponse(configVariable.message.indexCountry.InvalidRequest));
    //return response.send({ status: STATUS.FAILED, message: configVariable.message.indexCountry.InvalidRequest });
  }

}

// //get currency which status is 1
var getStatusCurrency = (request, response) => {
  logger.info('getStatusCurrency initiated')
  countryModel.obj.getStatusCurrency(request, response).then(result => {
    if (typeof result[0] == 'undefined' || _.size(result) == 0) {
      logger.debug('There is no status currency')
      return response.send(ResponseHelper.buildFailureResponse(configVariable.message.indexCountry.inputError));
      // return response.send({
      //   message: signupConfig.message.indexCountry.inputError, status: STATUS.FAILED
      // });
    }
    logger.info('get countries currency status successfully')
    return response.send(ResponseHelper.buildSuccessResponse({currency: result},configVariable.message.country.status_suc));
    // return response.send({
    //   message: signupConfig.message.country.status_suc, currency: result, status: STATUS.SUCCESS
    // });
  }, (err) => {
    logger.error('Fail to fetch countries currency status')
    return response.send(ResponseHelper.buildFailureResponse(configVariable.message.indexCountry.inputError));
    // return response.send({
    //   message: signupConfig.message.indexCountry.inputError, status: STATUS.FAILED, Error: `${err}`
    // });
  }).catch(e => {
    logger.error('Fail to fetch countries currency status')
    return response.send(e);
  })
}



module.exports = {
  getCountriesList,
  getCountryByName,
  getStatusCurrency
}
