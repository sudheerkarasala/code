/**
* Index Service
* Allow you to define code that's accessible and reusable throughout multiple components.
* @package IndexService
* @subpackage app\core\shared\indexservice
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
export class IndexService {
  userData: any;

  constructor(private dataClient: HttpclientService,private http: HttpClient) { }
  //personal
  public getCountryDetails(): Observable<any> {
    return this.dataClient.get<any>(HttpUrl.Countries_Details);
  }

  createEmailOTP(email): Observable<any> {
    var obj={referenceValue  :email}
    return this.dataClient.post<any>(HttpUrl.OTP,obj);
  }
  verifyEmailOTP(emailOTP,email): Observable<any> {
    var obj={otpReference:emailOTP,referenceValue  :email}
    return this.dataClient.post<any>(HttpUrl.Email_OTP_Code,obj);
  }

  createMobileOTP(mobile): Observable<any> {
    var obj={referenceValue  :mobile}
    return this.dataClient.post<any>(HttpUrl.OTP,obj);
  }
  verifyMobileOTP(mobileOTP, mobile): Observable<any> {
    var obj={otpReference:mobileOTP,referenceValue  :mobile}
    return this.dataClient.post<any>(HttpUrl.OTP_Code,obj);
  }

  savePersonalData(signUpData): Observable<any> {
    return this.dataClient.post(HttpUrl.SignUp, signUpData);
  }

  duplicateEmailMobile(input): Observable<any> {
    var body = { value: input }
    return this.dataClient.post(HttpUrl.DuplicateEmailMObile, body);
  }

  business
  public businessGetCountryDetails(): Observable<any> {
    return this.dataClient.get<any>(HttpUrl.Countries_Details);
  }

  businessCreateEmailOTP(email): Observable<any> {
    var obj={referenceValue  :email}
    return this.dataClient.post<any>(HttpUrl.OTP,obj);
  }
  
  businessVerifyEmailOTP(emailOTP, email): Observable<any> {
     var obj={otpReference:emailOTP,referenceValue  :email}
    return this.dataClient.post<any>(HttpUrl.OTP_Code,obj);
  }

  businessCreateMobileOTP(mobile): Observable<any> {
    var obj={referenceValue  :mobile}
    return this.dataClient.post<any>(HttpUrl.OTP,obj);
  }
  businessVerifyMobileOTP(mobileOTP, mobile): Observable<any> {
    var obj={otpReference:mobileOTP,referenceValue  :mobile}
    return this.dataClient.post<any>(HttpUrl.OTP_Code,obj);
  }
  businessVerifyOTPLogin(mobileOTP, mobile): Observable<any> {
    var obj={otpReference:mobileOTP,referenceValue  :mobile}
    return this.dataClient.post<any>(HttpUrl.OTP_Code,obj);
  }
  createLoginOTP(obj){
    return this.dataClient.post<any>(HttpUrl.Verify_Login_OTP, obj);
  }

  businessSavePersonalData(signUpData): Observable<any> {
    return this.dataClient.post(HttpUrl.SignUp, signUpData);
  }
  getBusinessType(): Observable<any> {
    return this.dataClient.get<any>(HttpUrl.Business_Type);
  }
  registerBusiness(formData): Observable<any> {
   // this.userData = JSON.parse(sessionStorage.getItem('userData'))
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': 'barra ' +sessionStorage.getItem('Token'),
      'api_access_key': sessionStorage.getItem('api_access_key'),
      'client_auth': sessionStorage.getItem('client_auth'),
      'member_id':  sessionStorage.getItem('member_id'),
    });
    let options = {
      headers: headers,
    }
    return this.http.post(HttpUrl.Register_Business,formData,options);
  }
  saveCompanywithoutKYB(obj): Observable<any>{
    return this.dataClient.post(HttpUrl.own_company, obj);
  }

  forgotPasswordBusiness(obj): Observable<any>
  {
    return this.dataClient.post(HttpUrl.forgot_password_business,obj);
    // HttpUrl.forgot_password_business
  }

  checkPassword(obj):Observable<any>
  {
    return this.dataClient.post(HttpUrl.resetPassword,obj)
  }

  getPersonalDetails(obj){
    return this.dataClient.get(HttpUrl.businessOwnerDetails+'/'+obj); //send invitation link

  }
 
   CreateAccount(data) {
    return this.http.post("http://192.168.16.160:8011/insertaccount", data);
    }
    
    getAccount(){
    return this.http.get("http://192.168.16.160:8011/getaccount");
    }
}