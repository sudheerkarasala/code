import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/shared/auth.service';
import { Component, OnInit } from '@angular/core';
import { IndexService } from 'src/app/core/shared/index.service';
import { NotificationService } from 'src/app/core/toastr-notification/toastr-notification.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {
  mobile: any;
  timer:any;
  intervalId:any;
  mobileOtp:any;
  constructor(private indexService:IndexService,private AuthService:AuthService,private routerNavigate:Router,private alert:NotificationService) { 
    this.mobile=sessionStorage.getItem("mobile")
  }
  ngOnInit() {
    clearInterval(this.intervalId);
    this.setTimer();
  }
  setTimer(){
    this.timer = 60
    var thisObj = this;
    this.intervalId =setInterval(function(){ 
      if(thisObj.timer>0){
        thisObj.timer = thisObj.timer-1;
      }
     }, 1000);
  }
  verifyOTPAndSubmit(otp){
    if(sessionStorage.getItem("status")=='yes'){
      this.indexService.businessVerifyOTPLogin(otp,this.mobile).subscribe(res=>{
        if(res.status==1){
          sessionStorage.setItem("isVerified","yes");
          this.alert.info("Please complete your company registration");
          this.routerNavigate.navigate(["business-reg-form"]);
        }
        else{
         this.alert.error(res['message'])
        }
      })
    }
    else{
    this.indexService.businessVerifyOTPLogin(otp,this.mobile).subscribe(res=>{
      if(res.status==1){
        sessionStorage.setItem("isVerified","yes");
        this.routerNavigate.navigate(["bus-application"]);
      }
      else{
      this.alert.error(res['message'])
      }
    })
  }
  }
  mobileResendLink(id){
    var obj={'mobile_number':this.mobile}
    clearInterval(this.intervalId);
      this.indexService.createLoginOTP(obj).subscribe(data=>{
        if(data.status==1){
          this.setTimer();
        }
        else{
          this.routerNavigate.navigate(["business-login"]);
        }
      })
  
    }
}
