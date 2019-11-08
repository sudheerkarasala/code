  /**
   * Business registraion Component
   * Business registration
   * @package BusinessComponent
   * @subpackage app\index\sign-up\business\BusinessComponent
   * @author SEPA Cyber Technologies, Sayyad M.
   */

import { AuthService } from '../../../core/shared/auth.service';
import { IndexService } from "../../../core/shared/index.service";
import { Component, OnInit} from "@angular/core";
import {FormGroup,Validators,FormBuilder,AbstractControl} from "@angular/forms";
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/toastr-notification/toastr-notification.service';

declare var $: any;

@Component({
  selector: 'app-business',
  templateUrl: './business-signup.component.html',
  styleUrls: ['./business-signup.component.scss']
})
export class BusinessSignupComponent implements OnInit {
  
  progressBarFlag: boolean = true;
  perSignUpFormm: FormGroup;
  countryData: any;
  OTPValue: any;
  emailId:any;
  EmailOTP: any;
  EmailOTPStatus: any;
  emailOTPMessage: boolean=false;
  mobileOTPMessage: boolean=false;
  enableEmailNext:boolean=false;
  enableMobileNext:boolean=false;
  OTPlength: any;
  mobileNumber:any;
  mobileNo: any;
  MobileOTP: any;
  MObileOTPStatus: any;
  callingCode:any;
  emailotpReason: string;
  otpFailMsg: string;
  emailOtpexpiredMsg: boolean=false;
  mobileOtpexpiredMsg:boolean=false;
  disabledOnSuccessMobile:boolean=true;
  existEmailerror: boolean=false;
  existEmail: string;
  existMobile: string;
  existMobileerror: boolean=false;
  loginActionActive=false;
  timer:any;
  intervalId:any;

  emailFieldSet:boolean=true;
  passwordFieldSet:boolean=false;
  passwordConfirmFieldset:boolean=false;
  confirmEmailFieldset:boolean=false
  mobileNumberFieldSet:boolean=false;
  confirmMobileFeildSet:boolean=false;
  profilecompleteFeildSet: boolean=false;
  loader:boolean=false;
  country_id: any;

  step1: boolean=true;
  step3: boolean=false;
  value1:any='invalid';
  value2:any='current'
  value3:any='completed'
  step2:boolean=false;
  value4: string;
  value5: string;
  step4: boolean=false;
  step5:boolean=false;
  value6: string;

  

  constructor(private fb: FormBuilder, private indexService: IndexService,private alert:NotificationService,private authService:AuthService,private routerNavigate:Router) {
  }
  
  //check duplicate email

  checkDuplicate(){
    this.emailId=this.perSignUpFormm.get('email').value;
    this.indexService.duplicateEmailMobile(this.emailId).subscribe(res=>{
      if(res.status==1){
      this.emailFieldSet=true;
      this.passwordFieldSet=false;
       this.existEmailerror=true;
      this.existEmail="Email already exist."
      }
      if(res.status==0){
        this.step1=true;
        this.step2=true;
        this.value3='current'
        this.value2='completed';
    this.emailFieldSet=false;
    this.passwordFieldSet=true;
      }
    })
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
  emailFieldSetBack(){
    this.step2=false;
    this.step1=true;
    this.value1='invalid';
    this.value2='current';
    this.perSignUpFormm.get('password').reset();
    this.existMobileerror=false;
    this.loader=false;
    this.emailFieldSet=true;
    this.passwordFieldSet=false;
  }
//create email otp
createEmailOTP(){
  clearInterval(this.intervalId);
    this.loader=true;
    this.emailId=this.perSignUpFormm.get('email').value;
    this.perSignUpFormm.get('EmailOTP').reset();
    this.emailOTPMessage=false;
    this.indexService.businessCreateEmailOTP(this.emailId).subscribe(response => {
    if(response.status==0){
      this.loader=false;
      this.existEmailerror=true;
     this.existEmail="Email already exist."
    }
    if(response.status==1){
      this.setTimer();
      this.step3=true;
      this.value3='completed'
      this.value4='current';
      this.loader=false;
      this.emailFieldSet=false;
      this.passwordFieldSet=false;  
      this.passwordConfirmFieldset=true;
    }
    });
  }

  resendEmailOTP(){
    this.emailOTPMessage=false;
    clearInterval(this.intervalId);
    $("#emailconfirm").attr("autofocus","autofocus").focus(); // autofocus for email
    this.emailId=this.perSignUpFormm.get('email').value;
    this.perSignUpFormm.get('EmailOTP').reset();
    this.indexService.createEmailOTP(this.emailId).subscribe(response => {
    if(response.status==0){
     this.existEmail="Email already exist."
    }
    if(response.status==1){
      this.setTimer();
    }
    });
  }
    //verify email with otp
    verifyEmail(){
    this.emailFieldSet=false;
    this.passwordFieldSet=false;
    this.EmailOTP=this.perSignUpFormm.get('EmailOTP').value;
    if(this.EmailOTP.length==6){
      this.indexService.businessVerifyEmailOTP(this.EmailOTP,this.emailId).subscribe(response => {
        this.EmailOTPStatus = response;
        if(this.EmailOTPStatus.status==1){
          this.step4=true;
          this.value4='completed'
          this.value5='current';
          this.getCountryDetails();
          this.loader=false;
          this.enableEmailNext=false;
          this.emailOTPMessage=false;
          this.passwordConfirmFieldset=false;

          this.country_id=this.perSignUpFormm.get('country_id').value;
          this.emailFieldSet=false;
          this.passwordFieldSet=false;
          this.mobileNumberFieldSet=true;
        }
          if(this.EmailOTPStatus.status==2){
            this.emailOTPMessage=true;
            this.enableEmailNext=true;
            alert("your otp expired plz request for new otp")
        }
         if(this.EmailOTPStatus.status==0){
          this.emailOTPMessage=true;
          this.enableEmailNext=true;
          this.otpFailMsg='Please, enter a correct 6-digit code.';
        }
      });
    }
  }
  //create mobile otp
  createMobileOTP(){
    clearInterval(this.intervalId);
    this.loader=true;
    this.mobileNo=this.perSignUpFormm.get('mobile').value;
    this.perSignUpFormm.get('mobileOTP').reset();
    this.mobileOTPMessage=false;
    this.callingCode=this.perSignUpFormm.get('calling_code').value
    this.indexService.businessCreateMobileOTP(this.callingCode+this.mobileNo).subscribe(response => {
       if(response.status==1){
        this.setTimer();
        this.step5=true;
        this.value5='completed'
        this.value6='current'
        this.loader=false;
        this. existEmailerror=false;
        this.passwordConfirmFieldset=false;
        this.emailFieldSet=false;
        this.passwordFieldSet=false;
        this.mobileNumberFieldSet=false;
        this.confirmMobileFeildSet=true;
         
       }
       if(response.status==0){
        this.loader=false;
        this.confirmMobileFeildSet=false;
        this.existMobileerror=true;
        this.existMobile="Mobile number already exist"
       }
     });
  }

  resendMobileOTP(){
    this.mobileOTPMessage=false;
    $("#confirmnumber").attr("autofocus","autofocus").focus(); // autofocus for phone
    clearInterval(this.intervalId);
    this.mobileNo=this.perSignUpFormm.get('mobile').value;
    this.callingCode=this.perSignUpFormm.get('calling_code').value;
    this.perSignUpFormm.get('mobileOTP').reset();
     this.indexService.createMobileOTP(this.callingCode+this.mobileNo).subscribe(response => {
       if(response.status==1){
        this.setTimer();
       }
       if(response.status==0){
        this.existMobile="Mobile number already exist"
       clearInterval();
       }
     });
  }
  
//verify mobile otp and submit
  verifyOTPAndSubmit(formData:any){
    this.passwordConfirmFieldset=false;
    this.emailFieldSet=false;
    this.passwordFieldSet=false;
    this.mobileNumberFieldSet=false;
    this.MobileOTP=this.perSignUpFormm.get('mobileOTP').value;
    if(this.MobileOTP.length==6){
      this.indexService.businessVerifyMobileOTP(this.MobileOTP,this.callingCode+this.mobileNo).subscribe(response => {
      if(response.status==1){
        this.disabledOnSuccessMobile=false;
        this.enableMobileNext=false;
        this.mobileOTPMessage=false;
        this.confirmMobileFeildSet=false;
        this.submitBusiness(formData);
      }
      if(response.status==2){
        this.mobileOTPMessage=true
        this.enableMobileNext=true;
      }
      if(response.status==0){
        this.mobileOTPMessage=true;
        this.enableMobileNext=true;
        this.otpFailMsg='Please, enter a correct 6-digit code.'
      }
      });
    }
  }

  //get coutry details for country drowndown
  getCountryDetails() {
    this.indexService.getCountryDetails().subscribe(response => {
      this.countryData = response;
    });
  }
 
  //submit signup data
   submitBusiness(formData: any) {
    this.progressBarFlag = false;
    formData.mobile = formData.calling_code + formData.mobile;
    delete formData["EmailOTP"];
    delete formData["mobileOTP"];
    for(var i=0;i<this.countryData.length;i++){
        if(formData.calling_code==this.countryData[i].calling_code){
          var country_id=this.countryData[i]['country_id'];
        }
    }
    delete formData["calling_code"];
    formData.country_id=country_id;
    formData.phone=this.perSignUpFormm.get('mobile').value;
    this.indexService.savePersonalData(formData).subscribe(data => {
      if(data.status==1){
      this.progressBarFlag=false;
      this.passwordConfirmFieldset=false;
      this.emailFieldSet=false;
      this.passwordFieldSet=false;
      this.mobileNumberFieldSet=false;
      this.confirmMobileFeildSet=false;
      this.profilecompleteFeildSet=true;
      sessionStorage.setItem('Token',data['Token']);
      sessionStorage.setItem('client_auth',data['client_auth']);
      sessionStorage.setItem('member_id',data['member_id']);
      sessionStorage.setItem('api_access_key',data['api_access_key']);
     data['userInfo']['password']=this.perSignUpFormm.get('password').value
     sessionStorage.setItem('businessSavedData',JSON.stringify(data))
      }
      else{
      this.alert.error('Signup failed');
      }
    });
  }

  get email() {
    return this.perSignUpFormm.get('email');
   } 
  get mobile(){
    return this.perSignUpFormm.get('mobile');
  }
  //choose business plan
  chooseBusinessPlan(){
     this.routerNavigate.navigate(['business-register']);
  }
  businessTerms(){
    this.routerNavigate.navigate([]).then(result => { 
      window.open('/#termsofservice', '_blank');
      });
  }
  businessLogin(){
    this.routerNavigate.navigate(['index/login/business'])
  }

  ngOnInit() {
    
    /* reactive form validating*/
    this.perSignUpFormm = this.fb.group({

      email: ["",Validators.compose([Validators.required,Validators.pattern("[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}")])],
      password: ["",Validators.compose([Validators.required,this.ValidatePassword])],
      EmailOTP:["",Validators.compose([Validators.required,Validators.pattern("^[0-9 ]*$")])],
      mobile: ['', Validators.compose([Validators.required,Validators.pattern("^[0-9]{6,15}$")])],
      mobileOTP:["",Validators.compose([Validators.required,Validators.pattern("^[0-9]*$")])],
      calling_code: ['', Validators.required],
      gender: [, Validators.required],
      account_type: ["Business", Validators.required],
      next_step: ["KYC", Validators.required],
    
      first_name: [null,Validators.compose([Validators.required, Validators.pattern('[a-zA-Z_]{1,}')])],
      last_name: [null,Validators.compose([Validators.required, Validators.pattern('[a-zA-Z_]{1,}')])],
      country_id: [null, Validators.required],
      middle_name: [null, Validators.required],
      dob: [null, Validators.required],
      postal_code: [null, Validators.required],
      address_line1: [null, Validators.required],
      address_line2: [null],
      city: [null,Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z ]*$')]) ],
      region: [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z ]*$')])],
      passcode_pin:[null,Validators.compose([Validators.required, Validators.pattern("^[0-9]*$")])],
      town: [null, Validators.required],
      telephone: [null, Validators.required],
      phone:[null, Validators.required]
    });
   
  }



  ValidatePassword(control: AbstractControl) {

    let passwordvalue = control.value;
    if (passwordvalue == null) return null;
    var alphaCheck = new Array();
    alphaCheck.push("[A-Z]"); //Uppercase Alphabet.
    alphaCheck.push("[a-z]"); //Lowercase Alphabet.

    var numCheck = new Array();
    numCheck.push("[0-9]"); //Digit.


    var special = new Array();
    special.push("[-!$%^&*()_+|~=`{}[:;<>?,.@#\]");

    var alphaPassed = 0;
    var numPassed = 0;
    var specialCharacter=0;

    for (var i = 0; i < alphaCheck.length; i++) {
      if (new RegExp(alphaCheck[i]).test(passwordvalue)) {
        alphaPassed++;
      } else { }
    }

    for (var i = 0; i < numCheck.length; i++) {
      if (new RegExp(numCheck[i]).test(passwordvalue)) {
        numPassed++;
      } else { }
    }

    for (var i = 0; i < special.length; i++) {
      if (new RegExp(special[i]).test(passwordvalue)) {
       specialCharacter++;
      } else { }
    }

    let minLength = false;
    let invalidPasswordAlpha = false;
    let invalidPasswordNumbers = false;
    let specialChara = false;

    if (passwordvalue.length >= 8) {
        minLength = true;
    } 

    if(alphaPassed == alphaCheck.length){
      invalidPasswordAlpha = true;
    } 
    
    if(numPassed == numCheck.length){
       invalidPasswordNumbers = true;
    }

    if(specialCharacter==special.length){
       specialChara=true;
    }

    return {
      minLength: minLength,
      invalidPasswordAlpha : invalidPasswordAlpha,
      invalidPasswordNumbers: invalidPasswordNumbers,
      specialChara:specialChara
    };

  }

   ngAfterViewInit(){
     //enter btn continue fieldset
    $("#email").keyup(function(event) {
      if (event.keyCode === 13) {
          $("#step1").click();
      } 
    });
    $("#password").keyup(function(event) {
      if (event.keyCode === 13) {
          $("#step2").click();
      } 
    });
    $("#emailconfirm").keyup(function(event) {
      if (event.keyCode === 13) {
          $("#step3").click();
      } 
    });
      $("#countryid,#mobileno").keyup(function(event) {
        if (event.keyCode === 13) {
            $("#step6").click();
        } 
    });
    $("#confirmnumber").keyup(function(event) {
      if (event.keyCode === 13) {
          $("#step7").click();
      } 
    });
 }

 
 backtoemail()
 {
  this.step1=true;
  this.value1='invalid';
  this.value2='current';
  this.step2=false;
  this.step3=false;
 
   this.emailFieldSet=true;
   this.passwordFieldSet=false;
   this.passwordConfirmFieldset=false;
   this.mobileNumberFieldSet=false;
   this.confirmMobileFeildSet=false;
   this.profilecompleteFeildSet=false;
 }

 backtophone()
 {
  this.step4=true;
  this.value5='current'
  this.value6=''


  this.emailFieldSet=false;
  this.passwordFieldSet=false;
  this.passwordConfirmFieldset=false;
  this.mobileNumberFieldSet=true;
  this.confirmMobileFeildSet=false;
  this.profilecompleteFeildSet=false;
 }


 removeError()
 {
    this.existEmailerror=false;
 }

 mobileError()
 {
     this.existMobileerror=false;
 }

}
