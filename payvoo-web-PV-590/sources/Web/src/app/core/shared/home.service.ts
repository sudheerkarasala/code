/**
* home service
* Allow you to define code that's accessible and reusable throughout multiple components.
* @package HomeService
* @subpackage app\core\shared\homeservice
* @author SEPA Cyber Technologies, Sayyad M.
*/
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { HttpclientService } from './httpclient.service'
import { HttpUrl } from './httpUrl.component'
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HomeService {  userData: any;
  //applicantIdObject: { applicant_id: any; };
  constructor(private dataClient: HttpclientService, private http: HttpClient) { }

  SubmitForKYC(applicant_id): Observable<any> {
    this.userData = JSON.parse(sessionStorage.getItem('userData'))
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': 'barra ' + this.userData.Token,
      'api_access_key': this.userData.api_access_key,
      'client_auth': this.userData.client_auth,
      'member_id':  this.userData.member_id,
    });
    let options = {
      headers: headers,
    }
   var obj = { applicant_id: applicant_id };
    return this.http.post(HttpUrl.IdentId,obj, options);
  }
  Bus_SubmitForKYC(applicantId): Observable<any> {
    this.userData = JSON.parse(sessionStorage.getItem('userData'))
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': 'barra ' + this.userData.Token,
      'api_access_key': this.userData.api_access_key,
      'client_auth': this.userData.client_auth,
      'member_id':  this.userData.member_id,
    });
    let options = {
      headers: headers,
    }
    var obj= { applicant_id: applicantId };
    return this.http.post(HttpUrl.IdentId, obj, options);
  }
  Bus_SubmitForKYCInvitaion(appId,token,api_access_key,client_auth,member_id){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': 'barra ' + token,
      'api_access_key': api_access_key,
      'client_auth': client_auth,
      'member_id':  member_id,
    });
    let options = {
      headers: headers,
    }
    var obj= { applicant_id: appId };
    return this.http.post(HttpUrl.IdentId, obj, options);
  }
  getKYCStatus(applicant_id ): Observable<any> {
    var obj = { applicant_id : applicant_id  };
    this.userData = JSON.parse(sessionStorage.getItem('userData'))
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': 'barra ' + this.userData.Token,
      'api_access_key': this.userData.api_access_key,
      'client_auth': this.userData.client_auth,
      'member_id':  this.userData.member_id,
    });
    let options = {
      headers: headers,
    }
   return this.http.post(HttpUrl.KYCStatus, obj, options);
  }
  KYClinkToMobile(mobile, email, mobilePlatform, identId): Observable<any> {
    return this.dataClient.get(HttpUrl.KycLinktoMobile + '/' + mobile + '/' + email + '/' + mobilePlatform + '/' + identId);
  }

  //business
  submitAddr(formData) {
    return this.dataClient.post(HttpUrl.Bus_Addr_Reg, formData);
  }
  getBusSectorTypes() {
    return this.dataClient.get(HttpUrl.Bus_Sectors_Types);
  }
  submitBusTypes(formData) {
    return this.dataClient.post(HttpUrl.Save_Bus_Types, formData);
  }
  transcationVolume(formData) {
    return this.dataClient.post(HttpUrl.Trnascation_Volume, formData);
  }
  
  insertKYB(obj) {
    return this.dataClient.post(HttpUrl.Insert_KYB, obj);
  }
  getKYBStatus(obj) {
    return this.dataClient.post(HttpUrl.KYB_Status, obj);
  }
  getUpdatedStatus(obj) {
    return this.dataClient.patch(HttpUrl.KYB_Status, obj);
  }
  getBusinessIndustries() {
    return this.dataClient.get(HttpUrl.Business_Industries);
  }
  receivesendFromCountry(obj) {
    return this.dataClient.post(HttpUrl.Send_Receive_Payment, obj);

  }
  getDirectors(bus_id,type) {
    return this.dataClient.get(HttpUrl.Get_DirectorsShareHolder+'/'+bus_id+'/'+type)
  }
  getShareHolders(bus_id,type){
    return this.dataClient.get(HttpUrl.Get_DirectorsShareHolder+'/'+bus_id+'/'+type)
  }
  getAllList(bus_id,type){
    return this.dataClient.get(HttpUrl.Get_DirectorsShareHolder+'/'+bus_id+'/'+type)
  }
  addDirShrHolder(obj) {
    return this.dataClient.post(HttpUrl.Get_DirectorsShareHolder, obj);
  }

  submitPersonalDetails(obj) {
    return this.dataClient.post(HttpUrl.PersonalDetails, obj);
  }
  updateContact(obj) {
    return this.dataClient.put(HttpUrl.Update_Contact,obj); 
  }

  IsVerifiedDirOwnr(obj) {
    return this.dataClient.patch(HttpUrl.Get_DirectorsShareHolder, obj);
  }
  deleteOwner(id,type){
    return this.dataClient.delete(HttpUrl.Get_DirectorsShareHolder+'/'+id+'/'+type);
  }
  sendRegisterdAddressDocument(obj) {
    return this.dataClient.post(HttpUrl.get_Registered_Address_Document, obj); //supporting documentation 
  }
  getRegisterdAddressDocument(obj) {
    return this.dataClient.get(HttpUrl.get_Registered_Address_Document + '/' + obj); //supporting documentation get by id 
  }
  getRegisterdDetails(obj) {
    return this.dataClient.get(HttpUrl.Bus_Addr_Reg + '/' + obj); //get registered details
  }
  getDocStatus(id) {
    return this.dataClient.get(HttpUrl.Get_Doc_Status+'/'+id); //get registered details
  }
  sendInvitationLink(obj) {
    return this.dataClient.post(HttpUrl.sendInvitation,obj); //send invitation link
  }
  submitCard(obj){
    return this.dataClient.post(HttpUrl.getCardsDetails,obj); //save card details
  }
  getCardDetails(id) {
    return this.dataClient.get(HttpUrl.getCardsDetails+'/'+id); //get card details
  }
  deleteCard(obj){
    return this.dataClient.patch(HttpUrl.getCardsDetails,obj); //update card details
  }
  CreateAccount(data) {
    return this.http.post(HttpUrl.getAccounts, data);
  }

  getAccount(data) {
    return this.http.get(HttpUrl.getAccounts+'/'+ data);
  }

  // Exchange api's start @sirisha 
 getcurrency(targetCurrency,fromCurrency,fromAmount){
  return this.http.get(HttpUrl.autoCurrencyExchange+'/'+targetCurrency+'/'+fromCurrency+'/'+fromAmount);
  // return this.http.get(`${environment.serviceUrl}`+"/service/v1/currencyExchange/"+targetCurrency+'/'+fromCurrency+'/'+fromAmount);
}
getAccountById(id){
  return this.http.get(HttpUrl.getAccounts+'/'+id);
}
createTransactionByCurrency(obj){
  return this.http.post(HttpUrl.transactionDetails,obj);
}
createCurrencyConvertor(obj){
  return this.http.post(HttpUrl.currencyRate,obj);
}
createSetAlertPrice(obj){
  return this.http.post(HttpUrl.autoCurrencyExchange,obj);
}
getCountryDetails(): Observable<any> {
  return this.dataClient.get<any>(HttpUrl.Countries_Details);
}
getCurrencyList(): Observable<any> {
  return this.dataClient.get<any>(HttpUrl.getCurrencyList);
}
CreateCurrencycheckRate(obj){
  return this.http.post(HttpUrl.checkRate,obj);
}
transactionById(applicant_id){
  return this.http.get(HttpUrl.transactionDetails+'/' +applicant_id+'/'+ 'all');
}
currenceExchangedByConvertor(obj){
  return this.http.post(HttpUrl.currencyRate,obj);
}
deleteCurrencyRate(id){
  return this.http.delete(HttpUrl.currencyRate+'/'+id);
}
// Exchange api's end @sirisha 
getCurrency(obj)
 {
 return this.dataClient.get(HttpUrl.getAccounts+'/'+obj);
 }
 currentRate(fCurrency,tCurrency,id)
 {
 return this.dataClient.get(HttpUrl.autoCurrencyExchange+'/'+fCurrency+'/'+tCurrency+'/'+id)
 }

   AddCurrMoney(obj): Observable<any> {
    this.userData = JSON.parse(sessionStorage.getItem('userData'))
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': 'barra ' + this.userData.Token,
      'api_access_key': this.userData.api_access_key,
      'client_auth': this.userData.client_auth,
      'member_id':  this.userData.member_id,
    });
    let options = {
      headers: headers,
    }
   return this.http.post(HttpUrl.addMoney, obj, options);
  }

  sendEmail(email):Observable<any> {
    return this.http.post(HttpUrl.send_sandbox_email,email);
  }

  storeAppIdforKYC(id):Observable<any>{
    return this.dataClient.post(HttpUrl.storeAppIdForKYC,id); //ident id entry for kyc
  }
  autoCurrencyExhan(obj){
    return this.dataClient.post(HttpUrl.autoCurrencyExchange,obj); //update card details
  }
  getAutoCurrencyData(obj) {
    return this.http.get(HttpUrl.autoCurrencyExchange+'/'+obj); 
  }
  getAccounts(id): Observable<any> {
    return this.dataClient.get<any>(HttpUrl.getAccounts+'/'+id);
  }
  getAllTransctionList(id,value): Observable<any> {
    return this.dataClient.get<any>(HttpUrl.Gettransaction+'/'+id+'/'+value);
  }
  statusCurrency(): Observable<any> {
    return this.dataClient.get<any>(HttpUrl.statusCurrency);
  }
  createAccount(obj):Observable<any>{
    return this.dataClient.post(HttpUrl.getAccounts,obj); //ident id entry for kyc
  }
  ActiveDeactiveacocunt(obj) {
    return this.dataClient.patch(HttpUrl.getAccounts, obj);
  }

  industryStatus(obj){
    return this.dataClient.post(HttpUrl.KYB_Status,obj); //industry status
  }
  getAccountsCurrency(){
    return this.dataClient.get(HttpUrl.getCurrencyList); //account currency
  }
  getValidCardDetails(cardNumber){
    return this.dataClient.get(HttpUrl.getValidateCard+'/'+cardNumber); //card validation 
  }
  deleteAutoExchangeRecord(id){
    return this.dataClient.delete(HttpUrl.autoCurrencyExchange+'/'+id);
  }

} 
