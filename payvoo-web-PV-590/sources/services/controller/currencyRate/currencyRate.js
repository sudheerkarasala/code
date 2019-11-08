/**
 * currencyRate
 * this is used for the check the current currency rates and also show the convertamount with multiple Currency
 * @package currencyRate
 * @subpackage controller/currencyRate/currencyRate
 *  @author SEPA Cyper Technologies,krishnakanth.r
 */
"use strict";

var currencyObject = require('../../model/currencyRateModel')

var currencyRate = function(request,response) {
    let newCurrencyRate = new currencyObject.obj.currency_object(request);
    return new Promise(function(resolve,reject) {
        currencyObject.obj.currencyRate(newCurrencyRate,response).then(res => {
            resolve(res);
        },err => {
            resolve(`${err}`)
        })
    })
}

// This method is used for delete the currency rate
var deleteCurrencyRate = function(request,response) {
    let newCurrencyRate = new currencyObject.obj.currency_object(request);
    return new Promise(function(resolve,reject) {
        currencyObject.obj.deleteCurrencyRate(newCurrencyRate,response).then(res => {
            resolve(res);
        },err => {
            resolve(`${err}`)
        })
    })
}
module.exports={currencyRate,deleteCurrencyRate}