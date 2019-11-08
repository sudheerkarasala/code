/**
* This service is used to get the token and manages in session storage and provide the boolean value for auth service.
* @author SEPA Cyber Technologies, Sayyad M.
*/


import { HttpUrl } from './httpUrl.component';
import { Injectable,Output,EventEmitter } from "@angular/core";
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { IndexService } from './index.service';
import { NotificationService } from '../toastr-notification/toastr-notification.service';


@Injectable({
  providedIn: "root"
})
export class AuthService {
  responseData:any=[];
  @Output() logindata: EventEmitter<boolean> = new EventEmitter();
  userData: any;
  constructor(private http:HttpClient,private _notificationservice:NotificationService,private routerNavigate: Router,private IndexService:IndexService) {}

  public isAuthenticate(): boolean {
    //method return true or false based on login credential
   const userData=sessionStorage.getItem('userData');
    if(userData && userData.length>0 && sessionStorage.getItem("isVerified")=='yes'){
      return true;
    }
    else{
    return false;
    }
  }
  public async loginAction(postData) {
  
    //api connection
    this.http.post(HttpUrl.Login_PayVoo,postData).subscribe(res => {
     if(res['status']==1){
       this._notificationservice.error("Please enter valid credentials."); 
       return false;
     }
     else if(res['status']==0  && res['userInfo']['account_type']=='Personal'){
      sessionStorage.setItem('userData',JSON.stringify(res));
     }
     else if(res['status']==0  && res['userInfo']['account_type']=='sandbox'){
      sessionStorage.setItem('userData',JSON.stringify(res));
     }
     else if(res['status']==0 && res['userInfo']['business_Id'] && res['userInfo']['account_type']=='Business'){
       sessionStorage.setItem("mobile",res['userInfo']['mobile'])
      var obj={'mobile_number':res['userInfo']['mobile']}
      this.IndexService.createLoginOTP(obj).subscribe(data=>{
        if(data.status==1){
          sessionStorage.setItem('userData',JSON.stringify(res));
          this.routerNavigate.navigate(["otp"]);
        }
        else{
          this.routerNavigate.navigate(["business-login"]);
        }
     
     })
      }
     else if(res['status']==0 && !res['userInfo']['business_Id']){
      sessionStorage.setItem('applicant_id',JSON.stringify(res['userInfo']['applicant_id']));
      sessionStorage.setItem("status",'yes');
      sessionStorage.setItem('Token',res['Token']);
      sessionStorage.setItem('client_auth',res['client_auth']);
      sessionStorage.setItem('member_id',res['member_id']);
      sessionStorage.setItem('api_access_key',res['api_access_key']);
      sessionStorage.setItem('user',JSON.stringify(postData));
        //otp verifiaction befor business registraion
        sessionStorage.setItem("mobile",res['userInfo']['mobile'])
      var obj={'mobile_number':res['userInfo']['mobile']}
      this.IndexService.createLoginOTP(obj).subscribe(data=>{
        if(data.status==1){
          sessionStorage.setItem('userData',JSON.stringify(res));
          this.routerNavigate.navigate(["otp"]);
        }
        else{
          alert("Failed to create OTP")
          this.routerNavigate.navigate(["business-login"]);
        }
     
     })
      return false;
     }
       this.logindata.emit();
    });
     return true;
  }
  public async LoginFromRegistration(postData) {
  
    //api connection
    this.http.post(HttpUrl.Login_PayVoo,postData).subscribe(res => {
      
     if(res['status']==1){
       this._notificationservice.error(res['message']); 
       return false;
     }
     else if(res['status']==0  && res['userInfo']['account_type']=='Personal'){
      sessionStorage.setItem('userData',JSON.stringify(res));
     }

     else if(res['status']==0 && res['userInfo']['business_Id'] && res['userInfo']['account_type']=='Business'){
        if(res['status']==0){
          sessionStorage.setItem('userData',JSON.stringify(res));
        }
      }
     else if(res['status']==0 && !res['userInfo']['business_Id']){
      this._notificationservice.info('Please complete your company registration'); 
      sessionStorage.setItem('applicant_id',JSON.stringify(res['userInfo']['applicant_id']));
      sessionStorage.setItem("status",'yes');
      sessionStorage.setItem('user',JSON.stringify(postData));
      this.routerNavigate.navigate(["business-reg-form"]);
      return false;
     }
       this.logindata.emit();
    });
     return true;
  }
  public async logOutAction() {
    //session/local storage clear
    await sessionStorage.removeItem('profileData');
    await sessionStorage.removeItem('userData');
    await sessionStorage.removeItem('businessSavedData');
    await sessionStorage.clear();
    return true;
  }
  //match account for switching
  accountMatch(allowedAccounts):boolean{
    var isMatch=false;
    this.userData=JSON.parse(sessionStorage.getItem('userData'));
    var userAccount=this.userData['userInfo']['account_type'];
    allowedAccounts.forEach(element=>{
      if(userAccount.indexOf(element)>-1){
        isMatch=true;
        return false;
      }
    });
    return isMatch;

  }
}
