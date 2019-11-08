/**
 * card Controller
 * card controller is used to store,update or delete the card details of an individual user.
 * @package card
 * @subpackage services/controller/card
 * @author SEPA Cyber Technologies, Sekhara Suman Sahu.
 */
"use strict";

import {Utils} from '../../utility/utils';
import {Card} from '../../model/card';
let utils = new Utils();
let card = new Card();
var cardModel = require('../../model/card');
 /*This method is to store card details in payment_cards*/

 const STATUS = {
  SUCCESS : 0,
  FAILURE : 1
 }

 //Class to store the User card details.
 export class UserCardDetails {
  constructor(CardData){
    this.applicant_id = CardData.applicant_id,
    this.card_type = _.toUpper(CardData.card_type),
    this.name_on_card = _.toUpper(CardData.name_on_card),
    this.card_number = CardData.card_number,
    this.card_cvv = "",
    this.card_month = CardData.card_month,
    this.card_year = CardData.card_year,
    this.status = 1,
    this.default_card = 1
  }

 }

 //Mthod to store/add the card details in payment_cards_id table
export const addCard = (request, response) => {
    const newCard = new UserCardDetails(request.body);
    utils.isValidCard(newCard)
    .then((result)=>{
      if(result.status){
        let cardNumber = newCard.card_number;
        //triming the extra spaces in card number
        cardNumber = cardNumber.replace(/ +/g, "");

        card.isDuplicatCard(cardNumber, newCard.applicant_id)
        .then((result)=>{
          if(result.status == 1){
            card.isFirstCard(newCard.applicant_id)
            .then((result)=>{
              if(result.status == 0){
                card.insertCardData(newCard.applicant_id, newCard.card_type,
                  newCard.name_on_card, newCard.card_cvv, newCard.card_month, newCard.card_year,
                  newCard.status, newCard.default_card)
                .then(result =>{
                  response.send(result);
                })
                .catch(err=>{
                  response.send(err);
                })  
              } else if (result.status == 2) {
                card.updateCardStatus()
              }
            })
            .catch((err)=>{
              response.send(err);
            });
          }
        })
        .catch(err=>{
          response.send(err);
        });
      }
    })
    .catch(err=>{
      response.send(err);
    })
}

/* Method to delete (deactivate) a card*/
 var deleteCard = function(request,response){
    return new Promise((resolve,reject)=>{
        cardModel.obj.deleteCard(request,response).then(res=>{
            resolve(res);
        },(err)=>{
            reject(err);
        })
    })
 }

 /*To get all the associated with an user*/
 var getCard = function(request,response){
    return new Promise((resolve,reject)=>{
        cardModel.obj.getCard(request,response).then(res=>{
            resolve(res);
        },(err)=>{
            reject(err);
        })
    })
 }

 /*Transaction*/
 var transaction = function(request,response){
    return new Promise((resolve,reject)=>{
        cardModel.obj.transaction(request,response).then(res=>{
            resolve(res);
        },(err)=>{
            reject(err);
        })
    })
 }

 /*Method for getting transaction details of an particular account*/
 var transDetails = (request,response)=>{
    return new Promise((resolve,reject)=>{
        cardModel.obj.transDetails(request,response).then(res=>{
            resolve(res);
        },(err)=>{
            reject(err);
        })
    })
 }

  /*Method for getting transaction details of an particular account*/
  var webTransDetails = (request,response)=>{
    return new Promise((resolve,reject)=>{
        cardModel.obj.webTransDetails(request,response).then(res=>{
            resolve(res);
        },(err)=>{
            reject(err);
        })
    })
 }

 /*Method for getting the balance of an User from wallet*/
var getWalletBalance = (request, response) => {
    return new Promise((resolve, reject) => {
        cardModel.obj.getWalletBalance(request,response).then(res=>{
            resolve(res);
        },(err)=>{
            reject(err);
        })
    })
}

var currencyExchange = (req, res) => {
    return new Promise((resolve, reject) => {
        cardModel.obj.currencyExchange(req,res).then(res=>{
            resolve(res);
        },(err)=>{
            reject(err);
        })
    })
}

/*Method for getting the currency exchange details actions*/
var getCurrencyExchange = function (request, response) {
    const priceAlert = new cardModel.obj.alerts(request);  
    return new Promise(function (resolve, reject) {
        cardModel.obj.getCurrencyExchange(priceAlert, response).then((res => {
            resolve(res);
        }), (err) => {
            reject(err);
        })
    })
}
        
//method for inserting record into chek_rates table
var checkRate = (req,res) => {
    return new Promise((resolve,reject)=>{
        cardModel.obj.checkRate(req,res).then(res=>{
            resolve(res);
        },(err)=>{
            reject(err);
        })
    })
}

/*Method for deleteing the currency exchange details */
var deleteCurrencyExchange = function (request, response) {
    const priceAlert = new cardModel.obj.alerts(request);  
    return new Promise(function (resolve, reject) {
        cardModel.obj.deleteCurrencyExchange(priceAlert, response).then((res => {
            resolve(res);
        }), (err) => {
            reject(err);
        })
    })
}

/*Method for deleteing the currency exchange details */
var updateCurrencyExchange = function (request, response) {
    const priceAlert = new cardModel.obj.alerts(request);  
    return new Promise(function (resolve, reject) {
        cardModel.obj.updateCurrencyExchange(priceAlert, response).then((res => {
            resolve(res);
        }), (err) => {
            reject(err);
        })
    })
}
            
//Method for removing a record from check_rates table
var deleteCheckRate = (req,res) => {
    return new Promise((resolve,reject)=>{
        cardModel.obj.deleteCheckRate(req,res).then(res=>{
            resolve(res);
        },(err)=>{
            reject(err);
        })
    })
}

//Method for removing a record from check_rates table
var peerTransfer = (req,res) => {
    return new Promise((resolve,reject)=>{
        cardModel.obj.peerTransfer(req,res).then(res=>{
            resolve(res);
        },(err)=>{
            reject(err);
        })
    })
}

 module.exports ={
    addCard,
    deleteCard,
    getCard,
    transaction,
    transDetails,
    checkRate,
    deleteCheckRate,
    getWalletBalance,
    currencyExchange,
    getCurrencyExchange,
    deleteCurrencyExchange,
    updateCurrencyExchange,
    webTransDetails,
    peerTransfer
 }