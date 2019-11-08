  /**
   * Business registration Component
   * Its a compnay registraion component
   * @package BusinessRegisterFormComponent
   * @subpackage app\index\sign-up\business\business-register-form\BusinessRegisterFormComponent
   * @author SEPA Cyper Technologies, Sayyad M.
   */

import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup,Validators,FormBuilder} from "@angular/forms";
import { IndexService } from 'src/app/core/shared/index.service';
import { AuthService } from 'src/app/core/shared/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/toastr-notification/toastr-notification.service';

@Component({
  selector: 'app-business-register-form',
  templateUrl: './business-register-form.component.html',
  styleUrls: ['./business-register-form.component.scss']
})
export class BusinessRegisterFormComponent implements OnInit {

  businessDetailForm:FormGroup;
  countryData: any;
  businessDetailTemplate:boolean=true;
  detailsCompltTemplate:boolean=false;
  loginActionActive: boolean;
  businessTypeData: any;
  businessProfileData: any;
  loginProfileData: any;
  otherCompanyReg:boolean=false;
  validDOB: boolean=false;
  minDOB=''
  maxDOB:any;

 

  constructor(private fb: FormBuilder,private indexService: IndexService,private alert:NotificationService,private authService:AuthService,private routerNavigate:Router) {
      var date = new Date(),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
      var obj=[date.getFullYear(), mnth, day].join("-");
      this.maxDOB=obj;

     this.getCountryDetails();
     this.getBusinessType();
     this.businessProfileData=JSON.parse(sessionStorage.getItem('businessSavedData'));
   }

  ngOnInit() {
    this.authService.logindata.subscribe(data => {
      this.navigateToDashboard();
    });

    this.businessDetailForm=this.fb.group({
      'country_of_incorporation':['',Validators.required],
      'business_legal_name':['',Validators.compose([Validators.required,Validators.pattern("^[a-zA-Z0-9 .-]+$")])],
      'trading_name':[null],
      'registration_number':['',Validators.compose([Validators.required,Validators.pattern("^[a-zA-Z0-9 .-]+$")])],
      'incorporation_date':['',Validators.required],
      'business_type':['',Validators.required]

    })

    // this.alertService.confirm('Do you blindly accept our conditions?')//
  }
  tredingNameclear(){
    this.businessDetailForm.patchValue({
      trading_name:''
    })
  }
  getCountryDetails() {
    this.indexService.getCountryDetails().subscribe(response => {
      this.countryData = response;
    });
  }
  getBusinessType(){
    this.indexService.getBusinessType().subscribe(response => {
      this.businessTypeData = response;
    });
  }

 registerBusiness(formData:any){

  if(sessionStorage.getItem('status') && sessionStorage.getItem('applicant_id')){
      formData.applicant_id=sessionStorage.getItem('applicant_id');
   }
  else{
     formData.applicant_id=this.businessProfileData['userInfo']['applicant_id'];
    }
  this.indexService.registerBusiness(formData).subscribe(response => {
    if(response.status==1){
      this.businessDetailTemplate=false;
      this.detailsCompltTemplate=true;
    }
    else if(response.status==0){
       this.saveCompanywithoutKYB(formData);
    }
    else if(response.status==2){
          this.alert.info("Company already registered");
          this.businessDetailTemplate=false;
          this.detailsCompltTemplate=true;
    }
  });
  }
  dobValidation($event){
    var dt = new Date();
    var yr= dt.getFullYear();
     var selectedYr = $event.target.value;
     if(selectedYr<=this.maxDOB){
        this.validDOB=false;
     }
     else{
      this.validDOB=true;
     }
  }
  saveCompanywithoutKYB(formData){
    this.indexService.saveCompanywithoutKYB(formData).subscribe(response => {
      if(response.status==1){
        this.businessDetailTemplate=false;
        this.detailsCompltTemplate=true;
      }
      else if(response.status==0){
         this.alert.error("Company Registration failed")
      }
    });
  }

  
//login action after complete business profile

LoginAction(){
if(sessionStorage.getItem('status') && sessionStorage.getItem('applicant_id')){
  this.loginProfileData=JSON.parse(sessionStorage.getItem('user'));
  //delete this.loginProfileData.account_type;

 }
 else{
  this.loginProfileData={account_type:this.businessProfileData['userInfo']['account_type'],email:this.businessProfileData['userInfo']['email'],password:this.businessProfileData['userInfo']['password']}
 }
  if(this.authService.LoginFromRegistration(this.loginProfileData)){
   this.loginActionActive=true;
  }
 }

 navigateToDashboard(){
   if(this.loginActionActive){
    sessionStorage.setItem("isVerified","yes");
     this.routerNavigate.navigate(['bus-application']);
   }
 }
}