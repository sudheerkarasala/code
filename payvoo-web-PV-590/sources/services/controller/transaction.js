/**
 * transaction Controller
 * This api is used for to send or receive payments from bussiness app .
 * @package transaction
 * @subpackage controller/transactions/transaction
 *  @author SEPA Cyper Technologies, Satyanarayana G,Krishnakanth R
 */

"use strict"
import {Transaction} from '../model/transactionModel';
import {langEngConfig} from '../utility/lang_eng';


 const transaction = (request,response)=>{
    logger.info('transaction() initiated');
    const transaction = new Transaction();
    let countries_Details = request.body.countries_Details;
    let results = (countries_Details).length > 0 ? countries_Details : [];
    if (results && results.length > 0) {
        let rowItems = [];
        (results).forEach(function (obj) {
            let reSetObj = {};
            reSetObj.business_id = obj.business_id
            reSetObj.country_id = obj.country_id
            reSetObj.business_description = obj.business_description
            reSetObj.transaction_type = obj.transaction_type
            rowItems.push(Object.values(reSetObj));
        });
        try {
        transaction.transactionPayment(rowItems).then((data,error)=>{
            if (!error) {
                logger.info('transaction() exited');
                response.send({ status: 1, message: `${langEngConfig.message.transaction.operationSuccess}` })
            }
            else {
                logger.error('transaction() Error',error);
                response.send({ status: 0, message: `${langEngConfig.message.transaction.operationError} : ${error}` })
            }
        }).catch((error1) => {
            logger.error('transaction() Error',error1);
            response.send({ status: 0, message: `${langEngConfig.message.transaction.operationFailure} : ${error1}` })
        });
    }
        catch(error2){
            logger.error('transaction() Error',error2);
            response.send({ status: 0, message: ` ${langEngConfig.message.transaction.operationConnectionFail}: ${error2}` })
        }
    }
    else {
        logger.error('transaction() Error');
        response.send({ status: 0, message: `${langEngConfig.message.transaction.dataEmpty}` })
    }
}



 const getTransaction = (request,response)=>{
    logger.info('getTransaction() initiated');
    const getTransaction = new Transaction();
    let id = request.body.business_id;
    getTransaction.getTransaction(id).then((res,err)=>{
        if(err){
            logger.error('getTransaction() Error',err);
            response.send(err);
        }
        else{
            if(res[0]){
                logger.info('getTransaction() exited');
                response.send({
                    message: `${langEngConfig.message.transactionVolume.country_transaction_success}`,
                    transaction_country: res,
                    status: 1
                })
            }
            else{
                logger.error('getTransaction() Error');
                response.send({
                    message: `${langEngConfig.message.transactionVolume.country_transaction_failed}`,
                    status: 0
                })
            }
        }
    }).catch(err=>{
        logger.error('getTransaction() Error',err);
        response.send({ Error: `${err}`, status: 0 });
    })
}







const transactionVolume = (request,response)=>{
    logger.info('transactionVolume() initiated');
    const transactionVolume = new Transaction();
    let transaction={
        business_id :request.body.business_id,
        monthy_transfer_amount :request.body.monthy_transfer_amount,
        no_payments_per_month : request.body.no_payments_per_month,
        max_value_of_payment : request.body.max_value_of_payment
    }
    if (transaction.business_id && transaction.business_id != 'undefined') {
        transactionVolume.transactionVolume(transaction).then((results,err)=>{
            if (_.size(results) > 0) {
                logger.info('transactionVolume() exited');
                response.send({ status: 1, message: `${langEngConfig.message.transactionVolume.success}` })
            } else {
                logger.error('transactionVolume() Error');
                response.send({ status: 0, message: `${langEngConfig.message.transactionVolume.fail}` })
            }
        }).catch(err => {
            logger.error('transactionVolume() Error',err);
            response.send({ status: 0, message: `${langEngConfig.message.transactionVolume.error} : ${err}` })
        })
    }
}




 const getTransactionVolume= (request,response)=>{
    logger.info('getTransactionVolume() initiated');
    const getTransactionVolume = new Transaction();
    let id = request.body.business_id;
    getTransactionVolume.getTransactionVolume(id).then(res=>{
        if(res[0]){
            logger.info('getTransactionVolume() exited');
            response.send({
                message: `${langEngConfig.message.transactionVolume.fetchsuccess}= ${res[0].business_id}`,
                monthy_transfer_amount: res[0].monthly_transfer_amount,
                no_payments_per_month: res[0].no_payments_per_month,
                max_value_of_payment: res[0].max_value_of_payments,
                status: 1
            });
        }
        else{
            logger.info('getTransactionVolume() Error');
            response.send({
                message: `${langEngConfig.message.transactionVolume.fetcheerror}`,
                status: 0
            });
        }
    }).catch(err=>{
        logger.info('getTransactionVolume() Error',err);
        response.send({ Error: `${err}`, status: 0 });
    })

}

export  {
    transaction,
    getTransaction,
    transactionVolume,
    getTransactionVolume
  };








