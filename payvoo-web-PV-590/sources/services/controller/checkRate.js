/**
 * checkRate Controller
 * checkRate controller is used for price convertion and price alert related services.
 * @package checkRate
 * @subpackage services/controller/checkRate
 * @author SEPA Cyber Technologies, Sekhara Suman Sahu , Kerishna kanth R. Shashank Singu.
 */
import {CheckRateModel} from '../model/checkRate';
import {langEngConfig} from '../utility/lang_eng';
let checkRateModel = new CheckRateModel();

const STATUS = {
  SUCCESS : 0,
  FAILURE : 1
}
export class CheckRate {
  constructor(checkRateData){
    this.applicant_id = checkRateData.applicant_id,
    this.from_currency = checkRateData.from_currency,
    this.to_currency = checkRateData.to_currency,
    this.isConvert = checkRateData.isConvert,
    this.created_on = checkRateData.created_on
  }
}
//method for checking the checkrate
export const checkRate = (request, response) =>{
  var today = new Date();
  date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  let cardrateDetail = new CheckRate(request.body);
  let createdOn = date+' '+time;

  checkRateModel.checkRate(cardrateDetail.applicant_id, cardrateDetail.from_currency, cardrateDetail.to_currency, cardrateDetail.isConvert , createdOn)
  .then(result=>{
    if(result){
      response.send({ message: langEngConfig.message.payment.check_rate_succ, status: STATUS.SUCCESS });
    } else {
      response.send({ message: paymentConfig.messages.payment.check_rates_fail, status: STATUS.FAILURE });
    }
    response.send(result);
  })
  .catch(err=>{
    response.send(err);
  })
}

export const deleteCheckRate = (request,response) => {
    let check_rate_id = request.params.check_rate_id;
    checkRateModel.deleteCheckRate(check_rate_id)
    .then(result=>{
      if(result ==0){
        response.send({ message: langEngConfig.message.payment.check_rate_del_succ, status: STATUS.SUCCESS });
      }else {
        response.send({ message: langEngConfig.message.payment.check_rate_del_fail, status: STATUS.FAILURE });
      }
    })
    .catch(err=>{
      response.send(err);
    })
}