/**
 * tokenManager Controller
 * tokenManager is used for validate token , generate new token
 * @package tokenmanager
 * @subpackage controller/tokenManager
 * @author SEPA Cyber Technologies, Sekhara Suman Sahu.
 */

"use strict";

import { TokenModel } from '../model/tokenManager';
const validateToken = new TokenModel();

const STATUS = {
  SUCCESS: 0,
  FAILURE: 1
}

class Token {
  constructor(req) {
    this.token = req.headers["x-auth-token"];
    this.newToken = uuidv1() + Math.floor(new Date() / 1000);
  }
}
/**
 * @function isTokenValid
 * @desc this method is used for validate token if token is expires then send back else call next function with applicant id 
 * @param None
 * @return return 403 if token is invalid or expired 
 * 
 */

let isTokenValid = (request, response, next) => {
  var token = new Token(request)
  validateToken.getTokenDetails(token.token)
    .then(tokenInfo => {
      if (tokenInfo.length == 0) {
        response.status(403).send({ message: 'please enter valid token', status: STATUS.FAILURE })
      } else {
        var date = new Date()
        // here we are checking token is expired or not 
        if (tokenInfo[0].created_on.getTime() + process.env.TOKEN_EXP_TIME * 60000 > date.getTime()) {
          // if the token is valid then store applicant id in the params , so we can get the applicant id in controller (to avoid call agin database to get applicant id)
          request.params["applicant_id"] = tokenInfo[0].applicant_id;
          next();
        } else {
          response.status(403).send({ message: "token is expire", status: STATUS.FAILURE })
        }
      }
    }, err => {
      response.status(403).send({ message: err, status: STATUS.FAILURE })
    })
}

/**
 * @function refreshToken
 * @desc this method is used for  generate new token is token is expire middle of operation/ transaction;
 * @param None
 * @return return with new token
 */

let refreshToken = (request, response, next) => {
  var token = new Token(request)
  validateToken.getTokenDetails(token.token)
    .then(tokenInfo => {
      if (tokenInfo.length == 0) {
        response.status(403).send({ message: 'please enter valid token', status: STATUS.FAILURE })
      } else {
        validateToken.saveToken(tokenInfo[0].applicant_id, token.newToken)
          .then(tokenInfo => {
            response.send({ 'x-auth-token': token.newToken, status: STATUS.SUCCESS });
          }, err => {
            response.send({ message: err, status: STATUS.FAILURE });
          })
      }
    }, err => {
      response.status(403).send({ message: err, status: STATUS.FAILURE });
    })
}



export {
  isTokenValid,
  refreshToken
}
