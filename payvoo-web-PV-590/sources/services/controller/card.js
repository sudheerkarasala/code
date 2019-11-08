/**
 * card Controller
 * card controller is used to store,update or delete the card details of an individual user.
 * @package card
 * @subpackage services/controller/card
 * @author SEPA Cyber Technologies, Sekhara Suman Sahu.
 */
"use strict";

import {Utils} from '../utility/utils';
import {Card} from '../model/card';
import{langEngConfig} from '../utility/lang_eng';
let utils = new Utils();
let card = new Card();

const STATUS = {
  SUCCESS: 0,
  FAILURE: 1
}

const DEFAUL_CARD ={
  TRUE : 1,
  FALSE : 0
}

const CARD_STATUS = {
  isActive : 1
}

//Class to store the User card details.
export class UserCardDetails {
  constructor(CardData) {
    this.applicant_id = CardData.applicant_id,
      this.card_type = _.toUpper(CardData.card_type),
      this.name_on_card = _.toUpper(CardData.name_on_card),
      this.card_number = CardData.card_number,
      this.card_cvv = "",
      this.card_month = CardData.card_month,
      this.card_year = CardData.card_year,
      this.status = CARD_STATUS.isActive,
      this.default_card = DEFAUL_CARD.TRUE
  }
}

//Mthod to store/add the card details in payment_cards_id table
export const addCard = (request, response) => {
  logger.info('initiated');
  const newCard = new UserCardDetails(request.body);
  logger.info('model/card isValidCard() called');
  utils.isValidCard(newCard)
    .then((result) => {
      if (result.status) {
        let cardNumber = newCard.card_number;
        cardNumber = cardNumber.replace(/ +/g, "");
        logger.info('model/card isDuplicatCard() called');
        isDuplicatCard(cardNumber, newCard.applicant_id)
          .then((result) => {
            if (result.status == 1) {
              logger.info('model/card isFirstCard() called');
              _isFirstCard(newCard.applicant_id)
                .then((result) => {
                    logger.info('model/card insertCardData() called');       
                    _insertCardData(newCard.applicant_id, newCard.card_type,
                        newCard.name_on_card, cardNumber, newCard.card_cvv, newCard.card_month, newCard.card_year,
                        newCard.status, newCard.default_card)
                      .then(result => {
                        logger.info('controller/card addCard() execution completed');
                        response.send(result);
                      })
                      .catch(err => {
                        logger.info('execution completed');
                        response.send(err);
                      });
                })
                .catch((err) => {
                  logger.info('execution completed');
                  response.send(err);
                });
            } else {
              logger.info('execution completed');
              response.send({ message: langEngConfig.message.payment.duplicate_card_succ, status: STATUS.FAILURE });
            }
          })
          .catch(err => {
            logger.info('execution completed');
            response.send(err);
          });
      }
    })
    .catch(err => {
      logger.info('execution completed');
      response.send(err);
    });
}

const isDuplicatCard = (cardNumber, applicantId) => {
  return new Promise((resolve, reject)=>{
    logger.info('initiated');
    card.isDuplicatCard(cardNumber, applicantId)
    .then(result=>{
      if(result.length > 0){
        if(result[0].status == 1){
          logger.info('execution completed');
          resolve({ message: langEngConfig.message.payment.duplicate_card_succ, status: STATUS.SUCCESS });
        }else {
            logger.info('execution completed');
          resolve({ message: langEngConfig.message.payment.duplicate_card_succ,  payment_cards_id: res[0].payment_cards_id,  status: STATUS.DEACTIVE });
        }
      } else {
        logger.info('execution completed');
        resolve({ message: langEngConfig.message.payment.duplicate_card_fail, status: STATUS.FAILURE });
      }
    })
    .catch(err=>{
      logger.info('execution completed');
      reject(err);
    });
  });
}

const _isFirstCard = (applicantId)=>{
  return new Promise((resolve, reject)=>{
  logger.info('initiated');
  card.isFirstCard(applicantId)
  .then(result=>{
    if (result != 0 && result[0].cards === 0) {
      logger.info('execution completed');
      resolve({ status: STATUS.SUCCESS });
    } else {
      logger.info('execution completed');
      resolve({ status: STATUS.FAILURE });
    }
  })
  .catch(err=>{
    logger.info('execution completed');
    reject({ message: langEngConfig.message.payment.getcardError, status: STATUS.FAILURE });
  });  
  });
}

const _insertCardData = (applicantId, cardType, nameOnCard,cardNumber, cardCvv, cardMonth, CardYear, status, defaultCard) =>{
  return new Promise((resolve, reject)=>{
    logger.info('initiated');
    card.insertCardData(applicantId, cardType, nameOnCard,cardNumber, cardCvv, cardMonth, CardYear, status, defaultCard)
    .then(result=>{
      logger.info('execution completed');
      resolve({  message: langEngConfig.message.payment.card_success,  payment_cards_id: result.insertId,
      status: STATUS.SUCCESS  });
    })
    .catch(err=>{
      logger.info('execution completed');
      reject({  message: langEngConfig.message.payment.err,  err: `${err}`,  status: STATUS.FAILURE
      });
    });
  });
}
/* Method to delete (deactivate) a card*/
export const deleteCard = (request, response) => {
  logger.info('controller/card deleteCard() initiated');
  let cardId = request.body.payment_cards_id;
  let isActive = request.body.isActive;
  logger.info('model/card deleteCard() called');
  _dodeleteCard(cardId, isActive)
  .then(result => {
      logger.info('controller/card deleteCard() execution completed');
      response.send(result);
  })
  .catch(err=>{
      response.send(err);
  });
}

const _dodeleteCard = (cardId, enableOrDisable)=>{
  return new Promise((resolve, reject)=>{
    logger.info('initiated');
    card.deleteCard(cardId, enableOrDisable)
    .then(result=>{
      if(enableOrDisable == 0){
        logger.info('execution completed');
        resolve({ message: langEngConfig.message.payment.cardDeactiveSuccess, status: STATUS.SUCCESS });
      }else {
        logger.info('execution completed');
        resolve({ message: langEngConfig.message.payment.cardActiveSuccess, status: STATUS.SUCCESS });
      }
    })
    .catch(err=>{
      logger.info('execution completed');
      reject({message : langEngConfig.message.payment.cardFailure, status : STATUS.FAILURE });
    });
  });
}

/*To get all the card saved by an individual user*/
export const getAllCards  = (request, response) => {
  logger.info('controller/card getAllCards() initiated');
  let applicantId = request.params.applicant_id;
  card.getAllCards(applicantId)
  .then(result => {
    if(result.length > 0){
      
      logger.info('controller/card getAllCards() execution completed');
      response.send(ResponseHelper.buildSuccessResponse({cards:result},langEngConfig.message.payment.getcardSuccess));
      // response.send({msg: langEngConfig.message.payment.getcardSuccess, cards:result, status : STATUS.SUCCESS});
    } else {
      logger.info('controller/card getAllCards() execution completed');
    
      response.send(ResponseHelper.buildFailureResponse(langEngConfig.message.payment.getcardError));
      // response.send({msg : langEngConfig.message.payment.getcardError, status : STATUS.FAILURE});
    }
  })
  .catch(err=>{
    response.send(ResponseHelper.buildFailureResponse(err));
    // response.send(err);
  });
}
