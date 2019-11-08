/**
 * userDetails Controller
 *  The userDetails Controller will give the required details of the respective user in the response object.
 * @package userDetails
 * @subpackage controller/userDetails/userDetails
 *  @author SEPA Cyper Technologies, Krishnakanth R.
 */

"use strict";

var userdetailModel = require('../../model/userModel');
var sqlInjecter = require('../../utility/userDetails');

var details = function (request, response) {
    var email = request.body.email;
    return new Promise(function (resolve, reject) {
        //query for get the user details
        userdetailModel.obj.getUserdetails(email).then(results => {
            if (_.size(results) > 0) {
                response.send({ status: 1, message: `${sqlInjecter.message.success}`, data: results[0] });
            } else {
                response.send({ status: 0, message: `${sqlInjecter.message.fail}` });
            }
        }).catch(err => {
            resolve({ status: 0, message: `${err}` })
        })
    })
}

var index = function (req, res) {
    return new Promise(function (resolve, reject) {
        myPool.query(sqlInjecter.config.index).then(results => {
            resolve({ status: 1, list: results })
        }).catch(err => {
            resolve({ status: 0, message: `${err}` })
        })
    })

}

module.exports = {
    details,
    index
};