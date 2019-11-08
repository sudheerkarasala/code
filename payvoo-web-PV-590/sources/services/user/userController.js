/**
 * loginController Controller
 * loginController is used for authentication of user to allow to enter into payvoo app.
 * it will go to  validate  the user email and password then only it will allow into payvoo
 * @package loginController
 * @subpackage controller/login/loginController
 * @author SEPA Cyper Technologies, Sekhara Suman Sahu.
 */

"use strict";

import { User } from './userModel';
import { configVariable } from './userConfig'
const crypto = require('crypto');
const user = new User();

const STATUS = {
  FAILED: 1,
  SUCCESS: 0
};

const EXPIRE = {
  FAILED: 1,
  SUCCESS: 0
}

class UserRequest {
  constructor(userRequest) {
    this.business_type = (userRequest.body.account_type === 'business' || userRequest.body.account_type === 'sandbox') ? `business_users` : `user_login`;
    this.email = userRequest.body.email;
    this.account_type = userRequest.body.account_type;
    this.Update_business_type = (userRequest.params.type === 'business' || userRequest.params.type === 'sandbox') ? `business_users` : `user_login`;
    this.code = userRequest.params.code;
    this.newPassword = userRequest.body.newPassword;
    this.applicant_id = userRequest.body.applicant_id;
    this.password = userRequest.body.password;
    this.id = userRequest.body.id;

  }
	/**
	 * @function isValidUserRequest
	 * @desc this function is to validate user given otp
	 * @param None
	 * @return True if request is valid OTP. False if request is invalid
	 * 
	 */

  isValidOTPRequest(businessType) {
    if (Utils.isEmptyObject(businessType)) {
      return false; resetPassword
    }
    return true;
  }
}


var forgotPassword = (req, res) => {
  const userRequest = new UserRequest(req);
  user.forgotPassword(userRequest.business_type, userRequest.email).then(userInfo => {
    if (userInfo.length == 0) {
      res.send({ message: configVariable.message.errorInSendEmail, status: STATUS.FAILED, expire: EXPIRE.FAILED });
    }
    var userInfo = _encrypt(userInfo[0].user_id);
    user.sendResetLink(userRequest.email, userRequest.account_type, userInfo).then(info => {
      res.send({ "message": `Email sent to ${req.body.email} ,${configVariable.message.infoResetPassword}`, status: STATUS.SUCCESS });
    }, (err) => {
      res.send({ message: configVariable.message.errorInSendEmail, status: STATUS.FAILED, expire: EXPIRE.FAILED });
    })

  }, (err) => {
    res.send(err); resetPassword
  })
}

var updatePassword = (req, res) => {
  const userRequest = new UserRequest(req);
  user.updatePassword(userRequest.Update_business_type, userRequest.newPassword, _decrypt(userRequest.code)).then(info => {
    res.send({ "message": configVariable.message.passwordUpdated, status: STATUS.SUCCESS, data: result });
  }, (err) => {
    res.send({ "message": `${err}`, status: STATUS.FAILED });
  })

}

var changePassword = (req, res) => {
  const userRequest = new UserRequest(req);
  user.changePassword(userRequest.business_type, userRequest.applicant_id).then(password => {
    if (hashPassword.verify(req.body.oldPassword, password[0].password)) {
      user.saveNewPassword(userRequest.business_type, userRequest.newPassword).then(message => {
        res.send({ "message": configVariable.message.passwordChange, status: STATUS.SUCCESS });
      }, (err) => {
        res.send({ "message": `${err}`, status: STATUS.FAILED });
      })
    } else {
      res.send({ "message": configVariable.message.oldPasswordNotValid, status: STATUS.FAILED });
    }
  }, (err) => {
    res.send({ "message": `${err}`, status: STATUS.FAILED });
  })
}


var resetPassword = (req, res) => {
  const userRequest = new UserRequest(req);
  user.resetPassword(userRequest.business_type, userRequest.password, _decrypt(userRequest.id)).then(message => {
    res.send({ "message": configVariable.message.passwordChangeSuccessfully, status: STATUS.SUCCESS });
  }, (err) => {
    res.send({ "message": `${err}`, status: STATUS.FAILED });
  })

}

var _encrypt = (text) => {
  var cipher = crypto.createCipher('aes-256-cbc', 'd6F3Efeq')
  var crypted = cipher.update(text, 'utf8', 'hex')
  crypted += cipher.final('hex');
  return crypted;
}

var _decrypt = (text) => {
  var decipher = crypto.createDecipher('aes-256-cbc', 'd6F3Efeq')
  var dec = decipher.update(text, 'hex', 'utf8')
  dec += decipher.final('utf8');
  return dec;
}


module.exports = {
  forgotPassword,
  updatePassword,
  changePassword,
  resetPassword
}