import { HomeService } from './../../core/shared/home.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { IndexService } from 'src/app/core/shared/index.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/toastr-notification/toastr-notification.service';


@Component({
  selector: 'app-invitation-link',
  templateUrl: './invitation-link.component.html',
  styleUrls: ['./invitation-link.component.scss']
})
export class InvitationLinkComponent implements OnInit {
  personalAddress:FormGroup;
  updateContactForm:FormGroup;
  updateContactDetails:boolean=true;
  updateContactAddress:boolean=false;
  thanksFlag:boolean=false;
   minDOB=''
   maxDOB:any;


  public href: string = "";
  url: string = "";
  dirList: string[];
  business_Id: any;
  percentage: any;
  countryData: any;
  validDOB: boolean=false;
  applicantId: any;
  business_owner_id: any;
  kycTemplate:boolean=false;
  smslinkBox:boolean=true;
  identLoader:boolean=false;
  identId:any;
  applicant_Id:any;
  Token: any;
  api_access_key: any;
  client_auth: any;
  member_id: any;
  email: any;
  selectedCountryId: any;
  isKyc: any;


  constructor(private fb: FormBuilder,private homeService:HomeService, private indexService: IndexService,private alert:NotificationService,private router : Router) {
    var date = new Date(),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
      var obj=[date.getFullYear(), mnth, day].join("-");
      this.maxDOB=obj;

    this.getCountryDetails();
    this.href = this.router.url;
    var obj=this.router.url.slice(24)
    var tokenObj=obj.slice(0, -1);
    this.indexService.getPersonalDetails(tokenObj).subscribe(res=>{

      if(res['status']='1'){
        this.isKyc=res['isKyc']
      
        if(res['type']=='director'){
          this.dirList= ['director'];
          this.updateContactForm.controls['business_owner_type'].patchValue(res['type'], {onlySelf: true});
        }
       else if(res['type']=='shareholder'){
          this.dirList= ['shareholder'];
          this.updateContactForm.controls['business_owner_type'].patchValue(res['type'], {onlySelf: true});
        }
        else if(res['type']=='businessowner'){
          this.dirList= ['businessowner'];
          this.updateContactForm.controls['business_owner_type'].patchValue(res['type'], {onlySelf: true});
        }
        var nameArr = res['name'].split(',');
        var first_name=nameArr[0];
        var last_name=nameArr[1];
        this.business_Id=res['business_id'],
        this.percentage=res['percentage']
        this.business_owner_id=res['kyb_bo_id'];
        this.Token=res['Token'];
        this.api_access_key=res['api_access_key'];
        this.client_auth=res['client_auth'];
        this.member_id=res['member_id'];
        this.email=res['email']

        this.updateContactForm.patchValue({
          email: res['email'],
          first_name:first_name,
          last_name:last_name,
          
        });
      }
      else{
        this.alert.error("Invitation failed")
      }
    })
   }
   submitPersonalDetails(formData:any){
    formData.percentage=null;
    formData.business_id= this.business_Id;
    this.homeService.submitPersonalDetails(formData).subscribe(res=>{
      if(res.status==1){
        this.applicantId=res['applicantId']
        this.updateContactDetails=false;
        this.updateContactAddress=true
       this.alert.success("Submitted")
      }
      else{
        this.alert.error("failed");
      }
    })
   }
   SetCountry(){
    this.selectedCountryId=this.updateContactForm.get('calling_code').value;
    for(var i=0;i<=this.countryData.length;i++){
          if(this.selectedCountryId==this.countryData[i].calling_code){
            this.personalAddress.patchValue({
              'country_id':  this.countryData[i].country_id,
            });
          }
    }
   }
   submitPersonalAddr(formData:any){
    formData.applicant_id=this.applicantId;
    formData.address_type_id=1;

    this.homeService.submitAddr(formData).subscribe(response => {
      if(response.status==1){ 
        this.alert.success("Submitted")
        this.IsVerifiedDirOwnr();
        this.storeAppIdforKYC();
      }
      else if(response.status==0){
        this.alert.error("Registration failed")
      }
    });
  }
  IsVerifiedDirOwnr(){
    var obj={
      "kyb_bisiness_owner_id":this.business_owner_id,
      "status":true
    }
    this.homeService.IsVerifiedDirOwnr(obj).subscribe(response => {
        if(response.status==1){
  
        }
        else{
          this.alert.error("status not updated");
        }
    });
  }
  
  getCountryDetails() {
    this.indexService.getCountryDetails().subscribe(response => {
      this.countryData = response;
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
  storeAppIdforKYC(){
    var obj={
      applicant_id:this.applicantId
    }
    this.homeService.storeAppIdforKYC(obj).subscribe(response => {
      if(response['status']==1){
        if(this.isKyc==true){
          this.updateContactAddress=false;
          this.kycTemplate=true;
         this.submitForIdentId();
        }
        else{
          this.updateContactAddress=true;
          this.kycTemplate=false;
          this.alert.error("Your KYC status is false")
        }
         
      }
      else{
        this.alert.success(response['message'])
      }
    });
  }
    submitForIdentId(){
      this.homeService.Bus_SubmitForKYCInvitaion(this.applicantId,this.Token,this.api_access_key,this.client_auth,this.member_id).subscribe(res=>{
        if(res['status']==1){
          this.identLoader=false;
          this.identId=res['data']['id'];
        }
        else{
          this.alert.error(res['message'])
        }
      })
    }
    
        KYClinkToMobile(mobilePlatform){
          this.homeService.KYClinkToMobile(null,this.email,mobilePlatform,this.identId).subscribe(res=>{
          if(res['status']==1){
            this.smslinkBox=false;
          }
          })    
         }
      
  ngOnInit() {
    this.updateContactForm=this.fb.group({
      first_name: [ "", Validators.compose([Validators.required,Validators.pattern("(?=.*[a-zA-Z-'])(?!.*[0-9])(?!.*[@#$%^&+=:;></?\|.,~{}_]).{1,}")])],   
      last_name: [ "", Validators.compose([Validators.required,Validators.pattern("(?=.*[a-zA-Z-'])(?!.*[0-9])(?!.*[@#$%^&+=:;></?\|.,~{}_]).{1,}")])],   
     // email: ["",Validators.compose([ Validators.required,Validators.pattern("[a-zA-Z0-9.-]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{3,}")])],
      email: ["",Validators.compose([Validators.required,Validators.pattern("[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}")])],
      mobile: ["",Validators.compose([Validators.required, Validators.pattern("^[0-9]*$")])],
      dob: ["",Validators.required],
      business_owner_type: ["",Validators.required],  
      gender: ['', Validators.required],
      calling_code: ['',Validators.required],
    })
    this.personalAddress=this.fb.group({
      country_id:['',Validators.required],
      postal_code:['',Validators.compose([Validators.required,Validators.pattern("^[a-zA-Z0-9- ]+$")])],
      city:['',Validators.compose([Validators.required,Validators.pattern("^[a-zA-Z-']+$")])],
      address_line1:['',Validators.compose([Validators.required,Validators.pattern("^[a-zA-Z0-9', -]+$")])],
      address_line2:['',Validators.compose([Validators.pattern("^[a-zA-Z0-9', -]+$")])],
      region:['',Validators.compose([Validators.required])],
      })
  }

}
