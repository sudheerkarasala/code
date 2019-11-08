/**
 * Card route
 * This is a route file, where the User Card related services are defined. 
 * @package card
 * @subpackage router/card
 * @author SEPA Cyber Technologies, Sujit kumar , Sekhara Suman Sahu.
 */

"use strict";

import {addCard, deleteCard, getAllCards} from '../controller/card';
var valid = require('card-validator');
var paymentCard = require('../controller/card/card');
var commonCode = require("../controller/commonCode");

/* To get the card type */
router.get('/service/v1/validateCard/:cardNumber', (req, res) => {
    var cardInfo = valid.number(req.params.cardNumber);
    if (cardInfo.card) {
        res.send({ type: cardInfo.card.type, isValid: cardInfo.isValid, status: 1 })
    } else {
        res.send({ card: cardInfo.card, status: 0 })
    }

})

/*Route for inserting card details*/
router.post('/service/v1/card', addCard);
/* Route for deleting card */
router.patch('/service/v1/card', deleteCard);
/* router for getting all the card associated with an user */
router.get('/service/v1/card/:applicant_id', getAllCards);





//currency exachange 
router.get('/service/v1/currencyExchange/:to/:from/:amount', (req, res) => {
    global.to = _.toUpper(req.params.to); global.from = _.toUpper(req.params.from);
    global.amount = req.params.amount;
    commonCode.currencyExchange(from,to).then(function (value) {
        if (value.status > 0) {
            res.send({ amount: value.rate * global.amount, status: 1 })
        } else {
            res.send({ message: "unable to convert", status: 0 })
        }

    })
})

//auto exachange 
router.post('/service/v1/currencyExchange', (req, res) => {
    paymentCard.currencyExchange(req,res).then(message=>{
        res.send(message);
    }, (error)=>{
        res.send(error);
    })
})

/* router for getting all the currency exchnage details  */
router.get('/service/v1/currencyExchange/:applicant_id', function (req, res) {
    paymentCard.getCurrencyExchange(req, res).then(function (message) {
        res.send(message);
    }, function (error) {
        res.status(400).send(error);
    });
});

/*  router for delete the data from currency excgange actions */
router.delete('/service/v1/currencyExchange/:auto_exchange_id', function (req, res) {
    paymentCard.deleteCurrencyExchange(req, res).then(function (message) {
        res.send(message);
    }, function (error) {
        res.status(400).send(error);
    });
});

/*  router for delete the data from currency excgange actions */
router.put('/service/v1/currencyExchange/:auto_exchange_id', function (req, res) {
    paymentCard.updateCurrencyExchange(req, res).then(function (message) {
        res.send(message);
    }, function (error) {
        res.status(400).send(error);
    });
});


//router for inserting data into check_rates table
/*router.post('/service/v1/checkRate', (req, res) => {
    paymentCard.checkRate(req,res).then(message=>{
        res.send(message);
    }, (error)=>{
        res.send(error);
    })
})*/

//route for deleting a record in check_rates table
/*router.delete('/service/v1/checkRate/:check_rate_id', (req, res) => {
    paymentCard.deleteCheckRate(req,res).then(message=>{
        res.send(message);
    }, (error)=>{
        res.send(error);
    })
})*/

// //route for peer to peer transfer 
// router.post('/service/v1/peerTransfer', (req, res) => {
//     paymentCard.peerTransfer(req,res).then(message=>{
//         res.send(message);
//     }, (error)=>{
//         res.send(error);
//     })
// })

module.exports = router;