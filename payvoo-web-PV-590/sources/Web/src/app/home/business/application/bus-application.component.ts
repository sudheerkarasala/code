
/**
* Dashboard Component
* KYC status, KYC verification process, user profile
* @package BusdashboardComponent
* @subpackage app\home\personal\business-dashboard\busdashboard.component.html
* @author SEPA Cyber Technologies, Sayyad M.
*/

import { HomeService } from '../../../core/shared/home.service';
import { Component, OnInit } from '@angular/core';
import {FormGroup,Validators,FormBuilder,AbstractControl} from "@angular/forms";
import { IndexService } from 'src/app/core/shared/index.service';
import { Router } from '@angular/router';
import * as _ from "lodash";
import { NotificationService } from 'src/app/core/toastr-notification/toastr-notification.service';
declare var $: any;



@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {
 

  loadContent:boolean=true;
  busAddrTemp:boolean=false;
  operatingAddrTemp:boolean=false;
  busAddrForm: FormGroup;
  operatingAddrForm:FormGroup;
  countryData: any;
  bus_applicant_id: number;
  profileData: any;
  typesOfBus:boolean=false;
  isBusList:boolean=false
  fieldArray: Array<any> = [{}];
  newAttribute: any = {};
  businessSectorData: any;
  range_of_service: any;
  busTypesFormData: any={};
  businessSectorId: any;
  transcationinfo:boolean=false;
  
  MnthVolTransData=[];
  PayntPerMonth=[];
  max_value_of_payment: any;
  monthy_transfer_amount: any;
  no_payments_per_month: any;
  monthlyTrsnAmt: any;
  pyntpermonth: any;
  KYBStatus: any;
  confmDirector:boolean=false;
  insdustriesData: any;
  ids: number[];
  facility:any;
  ids1:any;
  selectedInsData: any=[];
  selectedIndustries: any;
  receivePayTempl:boolean=false;
  sendPayTempl:boolean=false;
  reveivePaymentTemp:boolean=false;
  countryFieldArray: Array<any> = [{}];
  newCountryAttribute: any = {};
  sendPaycountryFieldArray:Array<any> = [{}];
  sendPayCountryAttribute: any = {};
  directorList: any;
  country: any;
  shareHoldertable:boolean=false;
  sendPymtBtn:boolean=false;
  sbmtOperBtn:boolean=false;
  businessList:boolean=true;
  verifyIdenTemp:boolean=false;
  Invitaiontemplate:boolean=false
  busOwnPerTemplate:boolean=false;
  busSelfAddress:boolean=false;
  verifiedListTemp:boolean=false;
  shareholderTemp:boolean=false
  kycTemplate:boolean=false;
  utltimateOwner:boolean=false;
  directorForm:FormGroup;
  smslinkBox:boolean=true;
  smslinkBox1:boolean=true;
  identId: any;
  identLoader:boolean=false;
  KYCStatus: any;
  updateContactDetails:boolean=false;
  updateContactForm:FormGroup;
  addDirectorForm:FormGroup;
  dob: any;
  gender: any;
  mobile: any;
  ultimateOwnForm:FormGroup;
  customLoadingTemplate:any;

  restricted_business: boolean=true;
  // indlistFlag = [
  //   {isSelected: false,name:'Yes'},
  //   {isSelected: true,name:'No'},
  // ]
 
  first_name: any;
  last_name: any;
  email: any;
  isVeryfiedList: any;
  addr_applicant_id: any;
  minDOB=''
  maxDOB:any;
  selectedfile: any;
   myObject = {};
   fileupload:boolean=false;
   photoimage:string;
   responsedata:any;
   responseDataOperting:any;
   opertingPhotoImage:string;
   shareholder:string;
   responseDatashare:any;
   authorityPhotoImage:string;
   responseDataAuthority:any;
   supportDocument:boolean=false;
   suppDocumRegistered:boolean=false;
   proofofOperating:boolean=false;
   proofOfShareHolder:boolean=false;
   authorityAddress:boolean=false;
   activeclick:boolean=false;
   activeClickOperating:boolean=false;
   activeClickShareHolder:boolean=false;
   activeClickAuthority:boolean=false;
   operatingObject={};
   shareholderObject={};
   authorityObject={};
   registeredcheckimage:boolean=false;
   registeredcheckfile:boolean=false;
   operatingcheckimage:boolean=false;
   operatingcheckfile:boolean=false;
   sharefolderchceckimage:boolean=false;
   sharefoldercheckfile:boolean=false;
   authoritycheckimage:boolean=false;
   authoritycheckfile:boolean=false;
   business_Id: number;
   business_owner_id: number;
   ShrHoldrList: any;
  dirlistTemplate:boolean=true;
  busUserList: unknown;
  Owner: any;
  directors: any;
  arrayList: any;
  business_owner_type: any;
  applicant_Id: number;
  allow: boolean=false;
  selectedIndValue: any;
  restricted:Array<any>=[]
  errordata:any;
  industrycheck:boolean=false;
  blockindustries:boolean=false;
  countrieserror:boolean=false;
  countrieslist:Array<any>=["Afghanistan","Algeria", "Angola", "Belarus", "Bosnia and Herzegovina", "Burkina Faso",
    "Burundi", "Cambodia", "Central African Republic", "Congo",
    "Democratic Republic of the Congo", "Cuba, Côte d\'Ivoire", "Egypt", "Eritrea", "Guinea", "Guinea-Bissau",
    "Guyana", "Haiti","Iran (Islamic Republic of)", "Iraq", "Lao People\'s Democratic Republic",
    "Lebanon", "Liberia", "Libya", "Mozambique", "Myanmar", "Nigeria", "Democratic People\'s Republic of Korea",
    "Pakistan", "State of Palestine", "Panama", "Sierra Leone", "Somalia", "South Sudan", "Sudan, Swaziland",
    "Syrian Arab Republic", "Tajikistan", "Timor-Leste", "Tunisia", "Uganda", "Ukraine", "Vanuatu",
    "Venezuela","Denmark"];
   contact_mobile: any;
   contact_email: any;
   verifiedAll: boolean;
   sendcompanies:boolean;
   country_incorporation: any;
   country_business:any;
   directorDetailsTemplate:boolean=false;
   addDirectorFormData: any=[];
   shareHolderData: any=[];
   imgValue: any;
   supportDocBtn: boolean=true;
   legalName: any;
   businessname:any;
   updateContactAddress: boolean=false;
   business_description:any;
   dirList: string[];
   ownList:string[];  
   docData: any;
   verifyAllbtn: boolean=false;
   post_validation:boolean=false;
   invalidWebsite:boolean=true;
   invalidcountries:boolean=true;
   sendcountires:boolean=true;
   validDOB: boolean=false;
   SelectedVerifyData: any;


    applybusiness:boolean;
    checkoption:boolean=true;
    optionvalid:boolean=true;
    validationIndustries:boolean=true;
  
 
  ownerShareholderList:any;
  selectedCountryId: any;
  isKyc: any;
  SharidentId: any;
  kycTemplateShare: boolean=false;
  shareHolderEmail: any;
  industrStatus: any;
  restricted_businessValue: number;
  type: string;




 
   // supporting document end

   
  constructor(private fb: FormBuilder, private indexService: IndexService,private homeService:HomeService,private alert:NotificationService,private routerNavigate:Router) {
    var date = new Date(),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
    var obj=[date.getFullYear(), mnth, day].join("-");
    this.maxDOB=obj;

    this.getBusSectorTypes();
    this.getCountryDetails();
     this.profileData=JSON.parse(sessionStorage.getItem('userData'));
     this.business_Id=this.profileData.userInfo.business_Id;
     this.applicant_Id=this.profileData.userInfo.applicant_id;
     this.country_incorporation=this.profileData.userInfo.business_country_of_incorporation;
     this.legalName=this.profileData.userInfo.business_legal_name;
     this.getKYBStatus();
     this.industryStatus()

   }
   industryStatus(){
     var obj={
            "business_id" : this.profileData.userInfo.business_Id
     }
    this.homeService.industryStatus(obj).subscribe(res => {
        this.industrStatus=res['isRestricted'];
    });
   }

   getKYBStatus(){
    var obj={
      "business_id" : this.business_Id
    }
    this.homeService.getKYBStatus(obj).subscribe(response => {
     this.KYBStatus=response;
     console.log(this.KYBStatus)
     if(response.status==0){
        this.insertKYB();
     }
    });
   }
   typesOfBusniess(){
    this.validationIndustries=true;
     this.kycTemplateShare=false;
     this.updateContactAddress=false;
     this.loadContent=false;
    this.transcationinfo=false;
    this.typesOfBus=true;
    this.isBusList=false;
    this.busAddrTemp=false;
    this.operatingAddrTemp=false;
    this.confmDirector=false;
    this.receivePayTempl=false;
    this.sendPayTempl=false;
    this.verifyIdenTemp=false;
    this.Invitaiontemplate=false;
    this.busSelfAddress=false;
    this.verifiedListTemp=false
    this.shareholderTemp=false;
    this.supportDocument = false;
    this.suppDocumRegistered = false;
    this.proofofOperating = false;
    this.proofOfShareHolder = false;
    this.authorityAddress = false;
    this.kycTemplate=false;
    this.blockindustries=false;
    this.countrieserror=false;
    this.updateContactDetails=false;
    this.sendcompanies=false;
    this.directorDetailsTemplate=false;
    this.utltimateOwner=false;
    this.applybusiness=false;
  }

  addFieldValue(index){
  if(this.fieldArray.length <= 10) {
    this.fieldArray.push(this.newAttribute);
    this.newAttribute = {};
  }
  }


 
  deleteFieldValue(index) {
    if(this.fieldArray.length > 1) {
    this.fieldArray.splice(index, 1);
    }
  }
  
 //receive payment
  addreceivedFieldValue(){
    if(this.countryFieldArray.length <= 2) {
      this.countryFieldArray.push(this.newCountryAttribute);
      this.newCountryAttribute = {};
      this.validateBusiness();
   }
  }
  deletereceiveFieldValue(index) {
      if(this.countryFieldArray.length > 1) {
      this.countryFieldArray.splice(index, 1);
      this.validateBusiness();
      }
    }


    // countries start


    validateBusiness()
    {
      let invalidCountries= false;
      let wsRegex = new RegExp(/^[A-Za-z0-9' ,-]+$/);
      for(var i=0;i<this.countryFieldArray.length;i++){
        if( this.countryFieldArray[i].business_description.length < 30 || !this.countryFieldArray[i].business_description.match(wsRegex)){
            this.countryFieldArray[i].error = true;
            invalidCountries = true;
            break;
        }
        else{
          this.countryFieldArray[i].error = false;
        }
      }
      if(invalidCountries){
        this.invalidcountries = true;
      }else{
        this.invalidcountries = false;
      }
    }


    // countries end



  receivePayment(){

    var thisObj = this
    let countrydetails=[];
    let countrynames=[];
    let countrylistcheck=[];
    var blockCompany =[]


     // get country name using id 

    for (var j = 0; j < this.countryData.length; j++) {
      for (var k = 0; k < this.countryFieldArray.length; k++) {
        if (this.countryData[j]['country_id'] == this.countryFieldArray[k]['country_id']) {
          countrynames.push(this.countryData[j]['country_name']);
        }
      }
    }


    _.forEach(countrynames, function (row) {
      _.forEach(thisObj.countrieslist, function (row1) {
        if (row == row1) {
          blockCompany.push(row)
        }
      })
    })



    if(_.size(blockCompany)>0) // here we have to place api coutry
    {
       this.countrieserror=true;
       this.receivePayTempl=false;
       blockCompany=[]
    }
    else
    {
    for(var i = 0; i < this.countryFieldArray.length; i++){
      this.countryFieldArray[i].business_id=this.business_Id;
      this.countryFieldArray[i].transaction_type="RECEIVE"
    }
    var obj={countries_Details:this.countryFieldArray}
    this.homeService.receivesendFromCountry(obj).subscribe(res=>{
      if(res.status==1){
        this.alert.success("Submited Successfully");  
        this.receivePayTempl=false;
        this.sendPymtBtn=false;
        this.sendPayTempl=true;
        this.verifyIdenTemp=false;
        this.Invitaiontemplate=false;
        this.busSelfAddress=false;
        this.verifiedListTemp=false
        this.shareholderTemp=false;
        this.utltimateOwner=false;
        this.kycTemplate=false;
        this.updateContactDetails=false;
        this.directorDetailsTemplate=false;

       // this.countryFieldArray=[];
      }
      else if(res.status==0){
        this.sendPayTempl=false;
        this.alert.warn("Fields should not be empty"); 
      }
    })
  }

  }
  //send payment
  addsendFieldValue(){
    if(this.sendPaycountryFieldArray.length <= 2) {
      this.sendPaycountryFieldArray.push(this.sendPayCountryAttribute);
      this.sendPayCountryAttribute = {};
      this.sendPaymentCountries();
    }
    }
  deletesendFieldValue(index) {
      if(this.sendPaycountryFieldArray.length > 1) {
      this.sendPaycountryFieldArray.splice(index, 1);
      this.sendPaymentCountries();
      }
    }


    // send countries start


    sendPaymentCountries()
    {
      let sendsCountries= false;
      let wsRegex = new RegExp(/^[A-Za-z0-9' ,-]+$/);
      for(var i=0;i<this.sendPaycountryFieldArray.length;i++){
        if(this.sendPaycountryFieldArray[i].business_description.length < 30 || !this.sendPaycountryFieldArray[i].business_description.match(wsRegex)){
            this.sendPaycountryFieldArray[i].error = true;
            sendsCountries = true;
            break;
        }
        else{
          this.sendPaycountryFieldArray[i].error = false;
        }
      }
      if(sendsCountries){
        this.sendcountires = true;
      }else{
        this.sendcountires = false;
      }
    }


    // send countries end



  sendPayment(){

    var thisObj = this
    var paycountrynames =[];
    var blockCompanyreceive=[];

     // get country name using id 

     for (var j = 0; j < this.countryData.length; j++) {
      for (var k = 0; k < this.sendPaycountryFieldArray.length; k++) {
        if (this.countryData[j]['country_id'] == this.sendPaycountryFieldArray[k]['country_id']) {
          paycountrynames.push(this.countryData[j]['country_name']);
        }
      }
    }


    _.forEach(paycountrynames, function (row) {
      _.forEach(thisObj.countrieslist, function (row1) {
        if (row == row1) {
          blockCompanyreceive.push(row)
        }
      })
    })


    if(_.size(blockCompanyreceive)>0) // here we have to place api coutry
    {
       this.sendcompanies=true;
       this.sendPayTempl=false;
       blockCompanyreceive=[];
    }
    else
    {
    for(var i = 0; i < this.sendPaycountryFieldArray.length; i++){
      this.sendPaycountryFieldArray[i].business_id=this.business_Id;;
      this.sendPaycountryFieldArray[i].transaction_type="SEND"
    }
    var obj={countries_Details:this.sendPaycountryFieldArray}
    this.homeService.receivesendFromCountry(obj).subscribe(res=>{
      if(res.status==1){
        this.loadContent=true;
        this.sendPayTempl=false;
        this.alert.success("Submited Successfully"); 
        this.insertKYB();
        this.getUpdatedStatus('type_of_business',2);
      }
      else if(res.status==0){
        this.sendPayTempl=true
        this.alert.warn("Fields should not be empty"); 

      }
    })
    }
  }
  
  getDirectors(){

    var business_id=this.business_Id;
    this.homeService.getDirectors(business_id,'director').subscribe(res=>{
      if(res['status']==1){
        this.directorList=res['directors'];
       this.dirlistTemplate=true;
      }
      else{
        this.dirlistTemplate=false;
      }
      })
  }
  addDirectorFieldVal(){
      this.directorDetailsTemplate=true;
      this.confmDirector=false;
      // this.addDirBtn=false;
      // this.dirlistTemplate=false;
      this.newCountryAttribute = {};
  }
  deleteDirectorFieldVal(index){
      this.addDirectorForm.reset();
      this.getDirectors();
      this.confmDirector=true;
      this.directorDetailsTemplate=false;
     // this.addDirBtn=true;
  }
  submitDirecotrsNames(formData:any){
         formData.status=false;
         formData.percentage=null;
         formData.type="director"
         formData.dob=null
         this.addDirectorFormData.push(formData)
    var obj= {list:this.addDirectorFormData,business_id:this.business_Id}
   this.homeService.addDirShrHolder(obj).subscribe(res=>{
      if(res.status==1){
        this.addDirectorFormData=[]
        this.alert.success("Added Successfully"); 
        this.getDirectors();
        this.directorDetailsTemplate=false;
        this.confmDirector=true;
        this.addDirectorForm.reset();
       // this.dirlistTemplate=true;
        this.deleteDirectorFieldVal(0)
      }
      else if(res.status==0){
        this.alert.error("failed"); 
        // this.confmDirector=true;
      }
    })
}
  verifyIdenData(item){
    this.shareHolderEmail=item.email;
    this.isKyc=item.isKyc;
    this.SelectedVerifyData=item;
    this.personalAddress.reset();
    this.busOwnerForm.reset();
    if(item.type=='director'){
      this.dirList= ['director'];
      this.busOwnerForm.controls['business_owner_type'].patchValue(item.type, {onlySelf: true});
    }
   else if(item.type=='shareholder'){
      this.dirList= ['shareholder'];
      this.busOwnerForm.controls['business_owner_type'].patchValue(item.type, {onlySelf: true});
    }
    else if(item.type=='businessowner'){
      this.dirList= ['businessowner'];
      this.busOwnerForm.controls['business_owner_type'].patchValue(item.type, {onlySelf: true});
    }
  

    //this.business_owner_type=item.type
    this.business_owner_id=item.kyb_bo_id
    var nameArr = item.name.split(',');
    this.busOwnerForm.patchValue({
      email:item.email,
      first_name:nameArr[0],
      last_name:nameArr[1],
    })
    this.first_name=nameArr[0];
    this.last_name=nameArr[1];
    this.verifyIdenTemp=false;
    this.Invitaiontemplate=true;
    this.busSelfAddress=false;
    this.verifiedListTemp=false;
    this.shareholderTemp=false;
    this.kycTemplate=false;
    this.updateContactDetails=false;
    this.directorDetailsTemplate=false;
    this.utltimateOwner=false;


    this.dob = item.dob;
    this.gender = item.gender;
    this.mobile = item.mobile;
   }
   verifiedAllStatus(){
     this.loadContent=true;
    this.verifiedListTemp=false;
    this.verifyIdenTemp=false;
  }
   VeriyYourself(){
    this.Invitaiontemplate=false;
    this.busSelfAddress=false;
    this.busOwnPerTemplate=true;
    this.verifiedListTemp=false
    this.shareholderTemp=false;
    this.kycTemplate=false;
    this.updateContactDetails=false;
    this.directorDetailsTemplate=false;
    this.utltimateOwner=false;


   }
   submitPersonalDetails(formData:any){
    formData.percentage=null;
    formData.business_id= this.business_Id;
    this.homeService.submitPersonalDetails(formData).subscribe(res=>{
      if(res.status==1){
        this.addr_applicant_id=res.applicantId;
        this.alert.success("submited"); 
        this.busOwnPerTemplate=false;
        this.busSelfAddress=true;
        this.kycTemplate=false;
      }
      else{
        this.alert.error("failed"); 
      }
    })
   }



  addBusType(id,rangeofservice){
   
    this.transcationinfo=false;
    this.businessSectorId=id;
    this.range_of_service=rangeofservice;
   
  
    this.typesOfBus=false;
    this.isBusList=true;
    this.confmDirector=false;
    this.receivePayTempl=false;
    this.sendPayTempl=false;
    this.verifyIdenTemp=false;
    this.Invitaiontemplate=false;
    this.busOwnPerTemplate=false;
    this.busSelfAddress=false;
    this.verifiedListTemp=false
    this.shareholderTemp=false;
    this.kycTemplate=false;
    this.updateContactDetails=false;
    this.directorDetailsTemplate=false;
    this.utltimateOwner=false;


    this.getBusinessIndustries();
  }

  getSelectedInsd(value,isSelected,index,id){

   
    this.selectedIndValue=value;
    this.validationIndustries=false;

    if(isSelected){
      this.selectedInsData.push(value);
    }
    else{
      var index =  this.selectedInsData.indexOf(value);
      if(index!=-1){
       this.selectedInsData.splice(index, 1);
      }
    }
    this.selectedIndustries = this.selectedInsData.toString();


    // restricted start

    // if(id==1)
    // {
    // this.restricted.push(id);
    // }

  }
  checkOpt(value){
    this.optionvalid=false;
    if(value=='no'){
      this.restricted_businessValue=0;
    }
    else if(value=='yes'){
      this.restricted_businessValue=1;
    }
  }
  optionCheck(){
    if(this.restricted_businessValue==0){
    var websitesArray=[];
    var websites;
    this.fieldArray;

    for(var i=0;i<this.fieldArray.length;i++){
      var websiteName=[this.fieldArray[i].name];
      websitesArray.push(websiteName);
      websites = websitesArray.toString();
    }
    this.busTypesFormData.business_sector_id=this.businessSectorId;
    this.busTypesFormData.website=websites;
    this.busTypesFormData.restricted_business= this.restricted_businessValue;
    this.busTypesFormData.range_of_service=this.range_of_service;
    this.busTypesFormData.business_id=this.business_Id;
    this.busTypesFormData.selectedIndustries=null

      this.homeService.submitBusTypes(this.busTypesFormData).subscribe(response => {
      if(response.status==1){
      this.alert.success("saved successfully"); 
      this.isBusList=false;
      this.transcationinfo=true;
      this.confmDirector=false;
      this.receivePayTempl=false;
      this.sendPayTempl=false;
      this.verifyIdenTemp=false;
      this.Invitaiontemplate=false;
      this.busOwnPerTemplate=false;
      this.busSelfAddress=false;
      this.verifiedListTemp=false
      this.shareholderTemp=false;
      this.kycTemplate=false;
      this.directorDetailsTemplate=false;
      this.utltimateOwner=false;
      this.applybusiness=false;

      this.selectedInsData=[];
       this.getTrnsInfo()
      }
      else if(response.status==0){
      this.alert.error("failed"); 

      }
    });
    }
    else if(this.restricted_businessValue==1){
      this.applybusiness=true;
      this.isBusList=false;
    }
  }


  submitBusTypes(){
    var websitesArray=[];
    var websites;
    this.fieldArray;
    for(var i=0;i<this.fieldArray.length;i++){
      var websiteName=[this.fieldArray[i].name];
      websitesArray.push(websiteName);
      websites = websitesArray.toString();
    }
    this.busTypesFormData.business_sector_id=this.businessSectorId;
    this.busTypesFormData.website=websites;
    this.busTypesFormData.restricted_business=this.restricted_businessValue;
    this.busTypesFormData.range_of_service=this.range_of_service;
    this.busTypesFormData.business_id=this.business_Id;
    this.busTypesFormData.selectedIndustries=this.selectedIndustries;
    this.homeService.submitBusTypes(this.busTypesFormData).subscribe(response => {
      if(response.status==1){
      if(response['restricted']==1){
        this.blockindustries=true
        this.applybusiness=false;
        this.industryStatus();
      }
      else{
        this.alert.success("Submitted successfully"); 
        this.isBusList=false;
        this.transcationinfo=true;
        this.confmDirector=false;
        this.receivePayTempl=false;
        this.sendPayTempl=false;
        this.verifyIdenTemp=false;
        this.Invitaiontemplate=false;
        this.busOwnPerTemplate=false;
        this.busSelfAddress=false;
        this.verifiedListTemp=false
        this.shareholderTemp=false;
        this.kycTemplate=false;
        this.directorDetailsTemplate=false;
        this.utltimateOwner=false;
        this.applybusiness=false;
        this.selectedInsData=[];
         this.getTrnsInfo()
      }
    }
    else{
      this.alert.error("failed"); 
    }
    });

  }
  getTrnsInfo(){
  this.MnthVolTransData=['1 000 - 10 000','10 000 - 100 000','100 000 - 1 000 000','1 000 000+'];
  this.PayntPerMonth=['<10','<50','<100','>100'];
  }
  getBusSectorTypes(){
    this.homeService.getBusSectorTypes().subscribe(response => {
      this.businessSectorData = response;
    });
  }
  mnthlyTrnsAmt(value){
   if(value=='1 000 - 10 000'){
    this.monthlyTrsnAmt=10000;
    this.max_value_of_payment=this.monthlyTrsnAmt/this.pyntpermonth;
     if(isNaN(this.max_value_of_payment)){
      this.max_value_of_payment='';
     }
   }
   else if(value=='10 000 - 100 000'){
    this.monthlyTrsnAmt=100000;
    this.max_value_of_payment=this.monthlyTrsnAmt/this.pyntpermonth;
    if(isNaN(this.max_value_of_payment)){
      this.max_value_of_payment='';
     }
   }
   else if(value=='100 000 - 1 000 000'){
    this.monthlyTrsnAmt=1000000;
    this.max_value_of_payment=this.monthlyTrsnAmt/this.pyntpermonth;
    if(isNaN(this.max_value_of_payment)){
      this.max_value_of_payment='';
     }
   }
   else if(value=='1 000 000+'){
    this.monthlyTrsnAmt=1000000;
    this.max_value_of_payment=this.monthlyTrsnAmt/this.pyntpermonth;
    if(isNaN(this.max_value_of_payment)){
      this.max_value_of_payment='';
     }
   }
  }
  getPaymtPerMonth(value){
  if(value.charAt(0) === '>'||value.charAt(0) === '<'){
   this.pyntpermonth = value.slice(1);
   this.max_value_of_payment=this.monthlyTrsnAmt/this.pyntpermonth;
   if(isNaN(this.max_value_of_payment)){
    this.max_value_of_payment='';
   }
  }}
  transcationVolume(){
    var formData={monthy_transfer_amount:this.monthlyTrsnAmt,no_payments_per_month:this.no_payments_per_month,max_value_of_payment:this.max_value_of_payment,business_id:this.business_Id}
    this.homeService.transcationVolume(formData).subscribe(response => {
     if(response.status==1){
       this.alert.success("Saved Successfully"); 
       this.receivePayTempl=true;
       this.transcationinfo=false;
       this.sendPayTempl=false;
       this.verifyIdenTemp=false;
       this.Invitaiontemplate=false;
       this.busOwnPerTemplate=false;
       this.busSelfAddress=false;
       this.verifiedListTemp=false
       this.shareholderTemp=false;
       this.kycTemplate=false;
       this.updateContactDetails=false;
       this.utltimateOwner=false;
       this.directorDetailsTemplate=false;
       
     }
     else if(response.status==0){
       this.alert.error("failed"); 
       this.receivePayTempl=false;
       this.transcationinfo=true;
       this.sendPayTempl=false;
       this.verifyIdenTemp=false;
       this.Invitaiontemplate=false;
       this.busOwnPerTemplate=false;
       this.busSelfAddress=false;
       this.verifiedListTemp=false
       this.shareholderTemp=false;
       this.kycTemplate=false;
       this.updateContactDetails=false;
       this.directorDetailsTemplate=false;
       this.utltimateOwner=false;


    
     }
    });
  }
  businessAddress(){
    this.kycTemplateShare=false;
    this.updateContactAddress=false;
    this.busAddrForm.reset();
    this.updateContactForm.reset();
    this.operatingAddrForm.reset();
    this.loadContent=false;
    this.transcationinfo=false;
    this.receivePayTempl=false;
    this.typesOfBus=false;
    this.isBusList=false
    this.busAddrTemp=true;
    this.operatingAddrTemp=false;
    this.typesOfBus=false;
    this.confmDirector=false;
    this.sendPayTempl=false;
    this.verifyIdenTemp=false;
    this.Invitaiontemplate=false;
    this.busOwnPerTemplate=false;
    this.busSelfAddress=false;
    this.verifiedListTemp=false
    this.shareholderTemp=false;
    this.supportDocument = false;
    this.suppDocumRegistered = false;
    this.proofofOperating = false;
    this.proofOfShareHolder = false;
    this.authorityAddress = false;
    this.kycTemplate=false;
    this.updateContactDetails=false;
    this.isBusList=false;
    this.applybusiness=false;
    this.blockindustries=false;
    this.countrieserror=false;
    this.sendcompanies=false;
    
    //country details pre populated

    this.busAddrForm.get('country_id').setValue(this.country_incorporation);

    this.directorDetailsTemplate=false;
    this.utltimateOwner=false;


   
  }


  getCountryDetails() {
    this.indexService.getCountryDetails().subscribe(response => {
      this.countryData = response;
    });
  }

  submitBusAddr(formData:any){
    formData.address_type_id=2,
    formData.applicant_id=this.applicant_Id
    this.homeService.submitAddr(formData).subscribe(response => {
      if(response.status==1){
        this.alert.success("Business address updated"); 
        this.busAddrTemp=false;
        this.operatingAddrTemp=true;
        this.receivePayTempl=false;
        this.sendPayTempl=false;
        this.confmDirector=false;
        this.sbmtOperBtn=false;
        this.verifyIdenTemp=false;
        this.Invitaiontemplate=false;
        this.busOwnPerTemplate=false;
        this.busSelfAddress=false;
        this.verifiedListTemp=false
        this.shareholderTemp=false;
        this.kycTemplate=false;
        this.updateContactDetails=false;
        this.utltimateOwner=false;

        this.directorDetailsTemplate=false;

      }
      else if(response.status==0){
        this.alert.error("Registration failed");
      }
    });
  }
  submitPersonalAddr(formData:any){
    formData.applicant_id=this.addr_applicant_id;
    formData.address_type_id=1;

    this.homeService.submitAddr(formData).subscribe(response => {
      if(response.status==1){
        this.alert.success("Submitted");
        this.busSelfAddress=false;
        this.storeAppIdforKYC();
        this.IsVerifiedDirOwnr();
      }
      else if(response.status==0){
        this.alert.error("Registration failed");
      }
    });
  }
  storeAppIdforKYC(){
    var obj={
      applicant_id:this.addr_applicant_id
    }
    this.homeService.storeAppIdforKYC(obj).subscribe(response => {
      if(response['status']==1){
        if(this.isKyc==true){
          this.verifiedListTemp=false;
          this.kycTemplateShare=true;
         this.submitForShareHolderIdentId();
        }
        else{
          this.verifiedListTemp=true;
          this.kycTemplateShare=false;
          this.alert.error("Your KYC status is false");
        }
      }
      else{
        this.alert.success(response['message']);
      }
    });
  }
  submitForShareHolderIdentId(){
    this.homeService.Bus_SubmitForKYC(this.addr_applicant_id).subscribe(res=>{
      if(res.status==1){
        this.SharidentId=res['data']['id'];
      }
      else{
        this.alert.error(res['message']);
      }
    })
  }
  
  IsVerifiedDirOwnr(){
    var obj={
      "kyb_bisiness_owner_id":this.business_owner_id,
      "status":true
    }
    this.homeService.IsVerifiedDirOwnr(obj).subscribe(response => {
        if(response.status==1){
           this.getAllList(this.business_Id,'all');
        }
        else{
          this.alert.error('status not updated');
        }
    });
  }
  selectedDirtitem={first_name:'',last_name:'',email:''}
  getCurrntDir(item){
    var nameArr = item.name.split(',');
    this.first_name=nameArr[0];
    this.last_name=nameArr[1];
    this.selectedDirtitem={first_name:this.first_name,last_name:this.last_name,email:item.email}
  }
  moveToShareHolder(){
    this.shareholderTemp=true;
    this.confmDirector=false;
    this.getShareHoldersOwners()

  }
  addShrHoldrFieldValue(index){
       this.type='businessowner'
      this.utltimateOwner=true;
      this.shareholderTemp=false;
    }
  delShrHoldrFieldValue(index) {
      this.shareHolderData=[];
       this.ultimateOwnForm.reset();
        this.utltimateOwner=false;
        this.shareholderTemp=true;
       this.getShareHoldersOwners();
  }
  getShareHoldersOwners(){
    this.shareHoldertable=true;
      this.homeService.getAllList( this.business_Id,'all').subscribe(response => {
              this.ownerShareholderList=response;
      })
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
  submitSharedHolder(formData:any){
    formData.status=false;
    formData.dob=null
    this.shareHolderData.push(formData)
var obj= {list:this.shareHolderData,business_id:this.business_Id}
   this.homeService.addDirShrHolder(obj).subscribe(res=>{
     if(res.status==1){
       this.alert.success('Submited Successfully');
       this.shareHolderData=[];
       this.ultimateOwnForm.reset();
       this.getDirectors();
       this.getShareHoldersOwners();
       this.delShrHoldrFieldValue(0)
       this.getShareHoldersOwners();
     }
     else{
      this.shareHolderData=[];
      this.ultimateOwnForm.reset();
       this.alert.error(res['message']);
     }

   })
   this.shareHolderData=[];
 }
 verifyIdentity(){
   this.smslinkBox1=true;
   this.verifyIdenTemp=true;
   this.shareholderTemp=false;
   this.kycTemplate=false;
   this.getAllList(this.business_Id,'all');
 }
 //update owner status
 getAllList(id,type){
  this.homeService.getAllList(id,type).subscribe(response => {
          this.arrayList=response;
         if(_.size(response["directors"]) == _.size(_.filter(response["directors"], {status:1}))  && _.size(response["businessowner"]) == _.size(_.filter(response["businessowner"], {status:1})) && _.size(response["shareholder"]) == _.size(_.filter(response["shareholder"], {status:1}))){
          this.getUpdatedStatus("business_owner_details", 2)
          this.verifyAllbtn=true;
         }     
  })
 
}


deleteOwner(id,type){
  this.homeService.deleteOwner(id,type).subscribe(res=>{
            this.getDirectors();
            this.getShareHoldersOwners();
  })
}
  submitOperatingAddr(formData:any){
    formData.address_type_id=3;
    formData.applicant_id= this.applicant_Id;
    this.homeService.submitAddr(formData).subscribe(response => {
      if(response.status==1){
        this.loadContent=true;
        this.operatingAddrTemp=false;
        this.kycTemplate=false;
        this.alert.success('Operating address updated');
        this.insertKYB();
        this.getUpdatedStatus('business_address',1);
      }
      else if(response.status==0){
        this.alert.error('Registration failed');
      }
    });
  }
 
   
  setBusAddr(value){
    if(value.currentTarget.checked==true){
      this.sbmtOperBtn=false;
      this.operatingAddrForm.patchValue({  
         country_id:this.busAddrForm.get('country_id').value,
         postal_code:this.busAddrForm.get('postal_code').value,  
         city:this.busAddrForm.get('city').value,  
         address_line1:this.busAddrForm.get('address_line1').value, 
         address_line2:this.busAddrForm.get('address_line2').value, 
         region:this.busAddrForm.get('region').value,
         });  
    }
    else if(value.currentTarget.checked==false){
      this.operatingAddrForm.reset();
      this.sbmtOperBtn=true;
    }
  }
  confirmDirector(){
    this.smslinkBox1=true;
    this.kycTemplateShare=false;
    this.updateContactAddress=false;
    this.busOwnerForm.reset();
    this.personalAddress.reset();
    this.addDirectorForm.reset();
    this.ultimateOwnForm.reset();
    this.dirlistTemplate=false;
    this.loadContent=false;
    this.confmDirector=true;
    this.transcationinfo=false;
    this.typesOfBus=false;
    this.isBusList=false
    this.busAddrTemp=false;
    this.operatingAddrTemp=false;
    this.typesOfBus=false;
    this.receivePayTempl=false;
    this.sendPayTempl=false;
    this.verifyIdenTemp=false;
    this.Invitaiontemplate=false;
    this.busOwnPerTemplate=false;
    this.busSelfAddress=false;
    this.verifiedListTemp=false;
    this.shareholderTemp=false;
    this.supportDocument = false;
    this.suppDocumRegistered = false;
    this.proofofOperating = false;
    this.proofOfShareHolder = false;
    this.authorityAddress = false;
    this.updateContactDetails=false;
    this.directorDetailsTemplate=false;
    this.kycTemplate=false;
    this.utltimateOwner=false;
    this.isBusList=false;
    this.applybusiness=false;
    this.blockindustries=false;
    this.countrieserror=false;
    this.sendcompanies=false;

    this.getDirectors();
  }
  insertKYB(){
    var obj={
      "business_id" : this.business_Id,
    }
    this.homeService.insertKYB(obj).subscribe(response => {
      this.getKYBStatus();
    });
  }
  getUpdatedStatus(value1,value2){
   var obj={
      "business_id" : this.business_Id,
      "column" : value1,
      "status":value2
    }
    this.homeService.getUpdatedStatus(obj).subscribe(response => {
      this.getKYBStatus();
    });
  }
  getBusinessIndustries(){ 
    this.homeService.getBusinessIndustries().subscribe(response => {
    this.insdustriesData=response['industries'];
    console.log(this.insdustriesData)
    });
  }

  /* supporting documentation start */

  //  reg address start


  handleFileSelect(evt) {

    var files = evt.target.files;
    var file = files[0];
    var string = evt.target.files[0].type;
    var file_upload = string.slice(6).toUpperCase(); 

    this.myObject['file_type'] = file_upload;

    if (files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }

  }


  _handleReaderLoaded(readerEvt) {

    var binaryString = readerEvt.target.result;
    var base64textString = btoa(binaryString);
    this.myObject['file_content'] = base64textString;
    this.fileupload = true;
    this.activeclick = true;

  }


  uploadAddressDocument() {
    this.myObject['business_id'] = this.business_Id;
    this.myObject['file_name'] = "REGISTERED_ADDRESS";
    this.homeService.sendRegisterdAddressDocument(this.myObject).subscribe(response => {
      if (response['status'] == 0) {
        this.alert.error('Uploading failed');
      }
      if (response['status'] == 1) {
        this.supportDocument = true;
        this.suppDocumRegistered = false;
        this.getRegisterdAddressDocument();
      }
    });
    
    this.fileupload = false;
  }


  getRegisterdAddressDocument() {
    let requestobj = {};
    var checkfiletype: any;
    requestobj['business_id'] = this.business_Id;
    this.homeService.getRegisterdAddressDocument(requestobj['business_id']).subscribe(response => {
      if (response['status'] == 1) {
        for (let i = 0; i < response['data'].length; i++) {
          if (response['data'][i].kyb_doc_type == 'REGISTERED_ADDRESS') {
            this.photoimage = response['data'][i]['kyb_doc_base64'];
            checkfiletype = response['data'][i]['kyb_doc_file_type'];
          }
        }
        if (checkfiletype) 
        {
          this.registeredcheckimage = true;
          this.registeredcheckfile = false;
        }
        else {
          this.registeredcheckimage = false;
          this.registeredcheckfile = true;
        }
      }
    });
  }

  getRegisterdAddress() {
    let requestobj = {};
    requestobj['applicant_id'] = this.applicant_Id;
    this.homeService.getRegisterdDetails(requestobj['applicant_id']).subscribe(response => {
      if (response['status'] == 1) {
        for (let i = 0; i < response['data'].length; i++) {
          if (response['data'][i].address_type_id == 2) {
            this.responsedata = response['data'][i];
          }
        }
      }
    });
  }

  // reg address end


  //proof of operating start


  handleFileSelects(evt) {

    var files = evt.target.files;
    var file = files[0];
    var string = evt.target.files[0].type;
    var file_upload = string.slice(6).toUpperCase(); //changed

  
    this.operatingObject['file_type'] = file_upload;

    if (files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoadeds.bind(this);
      reader.readAsBinaryString(file);
    }

  }

  _handleReaderLoadeds(readerEvt) {

    var binaryString = readerEvt.target.result;
    var base64textString = btoa(binaryString);
    this.operatingObject['file_content'] = base64textString;
    this.fileupload = true;
    this.activeClickOperating=true;
  }

  uploadOperatingDocument() {
    this.operatingObject['business_id'] = this.business_Id;
    this.operatingObject['file_name'] = "OPERATING_ADDRESS";
    this.homeService.sendRegisterdAddressDocument(this.operatingObject).subscribe(response => {
      if (response['status'] == 0) {
        this.alert.error('Uploading failed');
      }
      if (response['status'] == 1) {
        this.supportDocument = true;
        this.proofofOperating = false;
        this.getOperatingDocumets();
      }
    });
    this.fileupload = false;
  }

  getOperatingDocumets() {
    let requestobj = {};
    var operatingCheckFile: any;
    requestobj['business_id'] = this.business_Id;
    this.homeService.getRegisterdAddressDocument(requestobj['business_id']).subscribe(response => {
    if (response['status'] == 1){
    for (let i = 0; i < response['data'].length; i++){
    if (response['data'][i].kyb_doc_type == 'OPERATING_ADDRESS') {
         this.opertingPhotoImage = response['data'][i]['kyb_doc_base64'];
         operatingCheckFile = response['data'][i]['kyb_doc_file_type'];
    }
    }
    if (operatingCheckFile) 
    {
       this.operatingcheckimage = true;
       this.operatingcheckfile = false;
    }
    else 
    {
       this.operatingcheckimage = false;
       this.operatingcheckfile = true;
    }
    }
    });
  }

  getOperatingAddress() {
    let requestobj = {};
    requestobj['application_id'] = this.applicant_Id;
    this.homeService.getRegisterdDetails(requestobj['application_id']).subscribe(response => {
      if (response['status'] == 1) {
        for (let i = 0; i < response['data'].length; i++) {
          if (response['data'][i].address_type_id == 3) {
            this.responseDataOperting = response['data'][i];
            console.log(this.responsedata);
          }
        }
      }
    })
  }
  SetCountryKYBDetails(obj){
       this.personalAddress1.patchValue({
              'country_id': obj,
            });
   }
   //submit for kyc
   Bus_SubmitForKYC(){
     this.kycTemplateShare=false;
    this.operatingAddrForm.reset();
    this.personalAddress1.reset();
    this.busAddrForm.reset();
    this.updateContactForm.reset();
    this.contact_mobile=this.profileData.userInfo.mobile;
    var country_id=this.profileData.userInfo.country_id;
      for(var i=0;i<this.countryData.length;i++){
            if(country_id==this.countryData[i]['country_id']){
              this.updateContactForm.patchValue({
                calling_code:this.countryData[i]['calling_code']
              })
            }
      }

     this.updateContactAddress=false;
    this.contact_mobile=this.profileData.userInfo.phone;
    this.contact_email=this.profileData.userInfo.email;
    this.updateContactForm.patchValue({
      'mobile': this.contact_mobile,
      'email': this.contact_email,
    })
  

    this.updateContactDetails=true;
    this.identLoader=true;
    this.kycTemplate=false;
    this.loadContent=false;
    this.confmDirector=false;
    this.transcationinfo=false;
    this.typesOfBus=false;
    this.isBusList=false
    this.busAddrTemp=false;
    this.operatingAddrTemp=false;
    this.typesOfBus=false;
    this.receivePayTempl=false;
    this.sendPayTempl=false;
    this.verifyIdenTemp=false;
    this.Invitaiontemplate=false;
    this.busOwnPerTemplate=false;
    this.busSelfAddress=false;
    this.verifiedListTemp=false;
    this.shareholderTemp=false;
    this.supportDocument = false;
    this.suppDocumRegistered = false;
    this.proofofOperating = false;
    this.proofOfShareHolder = false;
    this.authorityAddress = false;
    this.directorDetailsTemplate=false;
    this.utltimateOwner=false;
    this.isBusList=false;
    this.applybusiness=false;
    this.blockindustries=false;
    this.countrieserror=false;
    this.sendcompanies=false;

    this.SetCountryKYBDetails(country_id)
    
    
  }
  updateAddrDetails(formData:any){
    formData.mobile = formData.calling_code + formData.mobile;
    delete formData["calling_code"];
    formData.applicant_id=this.applicant_Id;
    this.homeService.updateContact(formData).subscribe(res=>{
      if(res.status==1){
        this.personalAddress.reset();
        this.alert.success('Success');
         this.updateContactAddress=true;
          this.updateContactDetails=false
        
      }
      else{
        this.alert.error(res.message);
      }
    })
  }
  submitAddr(formData:any){
    formData.applicant_id=this.applicant_Id;
    formData.address_type_id=1;
    this.homeService.submitAddr(formData).subscribe(response => {
      if(response.status==1){
          this.kycTemplate=true;
          this.updateContactAddress=false;
          this.submitForIdentId()
          this.alert.success('Success');
      }
      else if(response.status==0){
        this.alert.error(response['message']);
      }
    });
  }

  submitForIdentId(){
    this.homeService.Bus_SubmitForKYC(this.applicant_Id).subscribe(res=>{
      if(res.status==1){
        this.identLoader=false;
        this.identId=res['data']['id'];
        this.getUpdatedStatus('personal_profile',1);
      }
      else{
        this.alert.error(res['message']);
      }
    })
  }
  KYClinkToMobile(mobilePlatform){
    this.homeService.KYClinkToMobile(this.profileData.userInfo.mobile,this.profileData.userInfo.email,mobilePlatform,this.identId).subscribe(res=>{
    if(res['status']==1){
      this.smslinkBox=false;
    }
    })

  }
  ShareHoldKYClinkToMobile(mobilePlatform){
    this.updateContactDetails=false
    this.updateContactAddress=false;

    this.homeService.KYClinkToMobile(this.profileData.userInfo.mobile,this.profileData.userInfo.email,mobilePlatform,this.identId).subscribe(res=>{
    if(res['status']==1){
      this.smslinkBox1=false;
      this.verifiedListTemp=true;
      this.kycTemplateShare=false;
    }
    })

  }

  

  // proof of operating end


  //proof of shareholder start


  handleFileSelectshare(evt) {

    var files = evt.target.files;
    var file = files[0];
    var string = evt.target.files[0].type;
    var file_upload = string.slice(6).toUpperCase(); 

    this.shareholderObject['file_type'] = file_upload;

    if (files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoadedshare.bind(this);
      reader.readAsBinaryString(file);
    }

  }

  _handleReaderLoadedshare(readerEvt) {

    var binaryString = readerEvt.target.result;
    var base64textString = btoa(binaryString);
    this.shareholderObject['file_content'] = base64textString;
    this.fileupload = true;
    this.activeClickShareHolder=true;
  }

  uploadShareDocument() {
    this.shareholderObject['business_id'] = this.business_Id;
    this.shareholderObject['file_name'] = "SHAREHOLDER_DETAILS";
    this.homeService.sendRegisterdAddressDocument(this.shareholderObject).subscribe(response => {
      if (response['status'] == 0) {
        this.alert.error('Uploading failed');
      }
      if (response['status'] == 1) {
        this.supportDocument = true;
        this.proofOfShareHolder = false;
        this.getshareholderDocumets();
      }
    });
    this.fileupload = false;
  }

  getshareholderDocumets() {
    let requestobj = {};
    requestobj['business_id'] = this.business_Id;
    var shareHolderFile: any;
    this.homeService.getRegisterdAddressDocument(requestobj['business_id']).subscribe(response => {
    if (response['status'] == 1){
      for (let i = 0; i < response['data'].length; i++){
      if (response['data'][i].kyb_doc_type == 'SHAREHOLDER_DETAILS')
      {
            this.shareholder = response['data'][i]['kyb_doc_base64'];
            shareHolderFile = response['data'][i]['kyb_doc_file_type'];
      }
      }
      if (shareHolderFile) 
      {
           this.sharefolderchceckimage = true;
           this.sharefoldercheckfile = false;
      }
      else 
      {
           this.sharefoldercheckfile=true;
           this.sharefolderchceckimage=false;
      }
      }
     
    });
  }
  getdoumentImg(doc_type){
    this.homeService.getDocStatus(this.business_Id).subscribe(res=>{
      for(var i=0;i<=res['data'].length;i++){
        if(res['data'][i].kyb_doc_type==doc_type){
          this.imgValue=res['data'][i]['kyb_doc_base64']
        }
      }
    })
      
  }


  //proof of shareholder end


  //proof of authority start


  handleFileAuthority(evt) {

    var files = evt.target.files;
    var file = files[0];
    var string = evt.target.files[0].type;
    var file_upload = string.slice(6).toUpperCase(); 

    this.authorityObject['file_type'] = file_upload;

    if (files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderAuthority.bind(this);
      reader.readAsBinaryString(file);
    }

  }

  _handleReaderAuthority(readerEvt) {

    var binaryString = readerEvt.target.result;
    var base64textString = btoa(binaryString);
    this.authorityObject['file_content'] = base64textString;
    this.fileupload = true;
    this.activeClickAuthority = true;

  }

   uploadAuthorityDocument() 
   {
    this.authorityObject['business_id'] = this.business_Id;
    this.authorityObject['file_name'] = "SIGNING_AUTHORITY";
    this.homeService.sendRegisterdAddressDocument(this.authorityObject).subscribe(response => {
    if (response['status'] == 0)
     {
        this.alert.error('Uploading failed');
    }
    if (response['status'] == 1)
    {
      this.supportDocument = true;
      this.authorityAddress = false;
      this.getsAuthorityDocumets();
    }
    });
    this.fileupload = false;
  }

  getsAuthorityDocumets() {
    let requestobj = {};
    requestobj['business_id'] = this.business_Id;
    var checkAuthorityFile: any;
    this.homeService.getRegisterdAddressDocument(requestobj['business_id']).subscribe(response => {
    if (response['status'] == 1){
      for (let i = 0; i < response['data'].length; i++){
      if (response['data'][i].kyb_doc_type == 'SIGNING_AUTHORITY') 
      {
          this.authorityPhotoImage = response['data'][i]['kyb_doc_base64'];
          checkAuthorityFile = response['data'][i]['kyb_doc_file_type'];
      }
      }
      if (checkAuthorityFile) 
      {
          this.authoritycheckimage = true;
          this.authoritycheckfile = false;
      }
      else 
      {
          this.authoritycheckimage = false;
          this.authoritycheckfile = true;
      }
      }
    });
  }
  sendInvitationLink(){
    var obj={
    inviteeEmail:this.SelectedVerifyData.email,
    businessId:this.profileData.userInfo.business_Id,
    userEmail:this.profileData.userInfo.email,
    platformType:'web',
    kyBusinessId:this.SelectedVerifyData.kyb_bo_id,
    isKyc:this.isKyc
    }
     this.homeService.sendInvitationLink(obj).subscribe(res=>{
          if(res['status']='1'){
            this.alert.success('Invitaion link sent');
            this.Invitaiontemplate=false;
            this.loadContent=true;
          }
          else{
            this.alert.error('Invitation failed');
          }
     })
  }

  //proof of authority end

  supportingDocument() {
  
    this.kycTemplateShare=false;
    this.updateContactAddress=false;
    this.blockindustries=false;
    this.homeService.getDocStatus(this.business_Id).subscribe(res=>{
      this.docData=res['data'];

      if((_.size(res["data"]) == _.size(_.filter(res["data"],{status:1}))) && _.size(_.filter(res["data"],{kyb_doc_type:"REGISTERED_ADDRESS"}))>0){
   
    this.activeclick=true;
    this.supportDocBtn=false;  
    this.loadContent = false;
    this.transcationinfo = false;
    this.receivePayTempl = false;
    this.typesOfBus = false;
    this.isBusList=false;
    this.applybusiness=false;
    this.blockindustries=false;
    this.countrieserror=false;
    this.sendcompanies=false;
    this.busAddrTemp = false;
    this.operatingAddrTemp = false;
    this.typesOfBus = false;
    this.confmDirector = false;
    this.sendPayTempl = false;
    this.verifyIdenTemp = false;
    this.Invitaiontemplate = false;
    this.busOwnPerTemplate = false;
    this.busSelfAddress = false;
    this.verifiedListTemp = false
    this.shareholderTemp = false;
    this.supportDocument = true;
    this.suppDocumRegistered = false;
    this.proofofOperating = false;
    this.proofOfShareHolder = false;
    this.authorityAddress = false;
    this.kycTemplate=false;
    this.updateContactDetails=false;
    this.directorDetailsTemplate=false;
    this.utltimateOwner=false;
      }
    if((_.size(res["data"]) == _.size(_.filter(res["data"],{status:1}))) && _.size(_.filter(res["data"],{kyb_doc_type: "SHAREHOLDER_DETAILS"}))>0){
      this.activeClickShareHolder=true;
      this.supportDocBtn=false;  
      this.loadContent = false;
    this.transcationinfo = false;
    this.receivePayTempl = false;
    this.typesOfBus = false;
    this.isBusList = false;
    this.busAddrTemp = false;
    this.applybusiness=false;
    this.blockindustries=false;
    this.countrieserror=false;
    this.sendcompanies=false;
    this.operatingAddrTemp = false;
    this.typesOfBus = false;
    this.confmDirector = false;
    this.sendPayTempl = false;
    this.verifyIdenTemp = false;
    this.Invitaiontemplate = false;
    this.busOwnPerTemplate = false;
    this.busSelfAddress = false;
    this.verifiedListTemp = false
    this.shareholderTemp = false;
    this.supportDocument = true;
    this.suppDocumRegistered = false;
    this.proofofOperating = false;
    this.proofOfShareHolder = false;
    this.authorityAddress = false;
    this.kycTemplate=false;
    this.updateContactDetails=false;
    this.directorDetailsTemplate=false;
    this.utltimateOwner=false;
    }
    if((_.size(res["data"]) == _.size(_.filter(res["data"],{status:1}))) && _.size(_.filter(res["data"],{kyb_doc_type: "OPERATING_ADDRESS"}))>0){
      this.activeClickOperating=true;
      this.supportDocBtn=false;  
      this.loadContent = false;
    this.transcationinfo = false;
    this.receivePayTempl = false;
    this.typesOfBus = false;
    this.busAddrTemp = false;
    this.isBusList=false;
    this.applybusiness=false;
    this.blockindustries=false;
    this.countrieserror=false;
    this.sendcompanies=false;
    this.operatingAddrTemp = false;
    this.typesOfBus = false;
    this.confmDirector = false;
    this.sendPayTempl = false;
    this.verifyIdenTemp = false;
    this.Invitaiontemplate = false;
    this.busOwnPerTemplate = false;
    this.busSelfAddress = false;
    this.verifiedListTemp = false
    this.shareholderTemp = false;
    this.supportDocument = true;
    this.suppDocumRegistered = false;
    this.proofofOperating = false;
    this.proofOfShareHolder = false;
    this.authorityAddress = false;
    this.kycTemplate=false;
    this.updateContactDetails=false;
    this.directorDetailsTemplate=false;
    this.utltimateOwner=false;
    }
    if((_.size(res["data"]) == _.size(_.filter(res["data"],{status:1}))) && _.size(_.filter(res["data"],{kyb_doc_type: "OPERATINGADDRESS"}))>0){
      this.activeClickOperating=true;
      this.loadContent = false;
      this.supportDocBtn=false;  
    this.transcationinfo = false;
    this.receivePayTempl = false;
    this.typesOfBus = false;
    this.isBusList=false;
    this.applybusiness=false;
    this.blockindustries=false;
    this.countrieserror=false;
    this.sendcompanies=false;
    this.busAddrTemp = false;
    this.operatingAddrTemp = false;
    this.typesOfBus = false;
    this.confmDirector = false;
    this.sendPayTempl = false;
    this.verifyIdenTemp = false;
    this.Invitaiontemplate = false;
    this.busOwnPerTemplate = false;
    this.busSelfAddress = false;
    this.verifiedListTemp = false
    this.shareholderTemp = false;
    this.supportDocument = true;
    this.suppDocumRegistered = false;
    this.proofofOperating = false;
    this.proofOfShareHolder = false;
    this.authorityAddress = false;
    this.kycTemplate=false;
    this.updateContactDetails=false;
    this.directorDetailsTemplate=false;
    this.utltimateOwner=false;
    }
    if((_.size(res["data"]) == _.size(_.filter(res["data"],{status:1}))) && _.size(_.filter(res["data"],{kyb_doc_type:"SIGNING_AUTHORITY"}))>0){
    this.activeClickAuthority=true;
    this.supportDocBtn=false;   
    this.loadContent = false;
    this.transcationinfo = false;
    this.receivePayTempl = false;
    this.typesOfBus = false;
     this.isBusList=false;
    this.applybusiness=false;
    this.blockindustries=false;
    this.countrieserror=false;
    this.sendcompanies=false;
    this.busAddrTemp = false;
    this.operatingAddrTemp = false;
    this.typesOfBus = false;
    this.confmDirector = false;
    this.sendPayTempl = false;
    this.verifyIdenTemp = false;
    this.Invitaiontemplate = false;
    this.busOwnPerTemplate = false;
    this.busSelfAddress = false;
    this.verifiedListTemp = false
    this.shareholderTemp = false;
    this.supportDocument = true;
    this.suppDocumRegistered = false;
    this.proofofOperating = false;
    this.proofOfShareHolder = false;
    this.authorityAddress = false;
    this.kycTemplate=false;
    this.updateContactDetails=false;
    this.directorDetailsTemplate=false;
    this.utltimateOwner=false;
    }
       else{
        this.supportDocBtn=true;   
        this.loadContent = false;
        this.transcationinfo = false;
        this.receivePayTempl = false;
        this.typesOfBus = false;
        this.isBusList = false
        this.busAddrTemp = false;
        this.operatingAddrTemp = false;
        this.typesOfBus = false;
        this.confmDirector = false;
        this.sendPayTempl = false;
        this.verifyIdenTemp = false;
        this.Invitaiontemplate = false;
        this.busOwnPerTemplate = false;
        this.blockindustries=false;
        this.busSelfAddress = false;
        this.verifiedListTemp = false
        this.shareholderTemp = false;
        this.supportDocument = true;
        this.suppDocumRegistered = false;
        this.proofofOperating = false;
        this.proofOfShareHolder = false;
        this.authorityAddress = false;
        this.kycTemplate=false;
        this.updateContactDetails=false;
        this.directorDetailsTemplate=false;
        this.utltimateOwner=false;
        this.applybusiness=false;
       }
    
    })
  
  }


  registeredAddress() {
    if(this.KYBStatus.business_address==1 || this.KYBStatus.business_address==2){
      this.getRegisterdAddress();
      this.supportDocument = false;
      this.suppDocumRegistered = true;
      this.proofofOperating = false;
      this.proofOfShareHolder = false;
      this.authorityAddress = false;
      this.kycTemplate=false;
      this.updateContactDetails=false;
      this.directorDetailsTemplate=false;
      this.utltimateOwner=false;
    }
     else{
       this.alert.warn('Please, Submit or Verify your business address');
     }
  }

  proofOfOperatingAdd() {
    if(this.KYBStatus.business_address==1 || this.KYBStatus.business_address==2){
      this.getOperatingAddress();
      this.supportDocument = false;
      this.suppDocumRegistered = false;
      this.proofofOperating = true;
      this.proofOfShareHolder = false;
      this.authorityAddress = false;
      this.kycTemplate=false;
      this.updateContactDetails=false;
      this.directorDetailsTemplate=false;
      this.utltimateOwner=false;
    }
    else{
      this.alert.warn('Please, Submit or Verify your business address');
    }
   


  }

  proofOfShareAdd() {
    this.supportDocument = false;
    this.suppDocumRegistered = false;
    this.proofofOperating = false;
    this.proofOfShareHolder = true;
    this.authorityAddress = false;
    this.kycTemplate=false;
    this.updateContactDetails=false;
    this.directorDetailsTemplate=false;
    this.utltimateOwner=false;
  }

  proofOfOpenAcc()
  {
    this.supportDocument = false;
    this.suppDocumRegistered = false;
    this.proofofOperating = false;
    this.proofOfShareHolder = false;
    this.authorityAddress = true;
    this.kycTemplate=false;
    this.updateContactDetails=false;
    this.directorDetailsTemplate=false;
    this.utltimateOwner=false;
  }
  SetCountry(){
    this.selectedCountryId=this.busOwnerForm.get('calling_code').value;
    for(var i=0;i<=this.countryData.length;i++){
          if(this.selectedCountryId==this.countryData[i].calling_code){
            this.personalAddress.patchValue({
              'country_id':  this.countryData[i].country_id,
            });
          }
    }
   }
   SetCountryKYB(){
    this.selectedCountryId=this.updateContactForm.get('calling_code').value;
    for(var i=0;i<=this.countryData.length;i++){
          if(this.selectedCountryId==this.countryData[i].calling_code){
            this.personalAddress1.patchValue({
              'country_id':  this.countryData[i].country_id,
            });
          }
    }
   }

  /* supporting document end */
  
  // postal code start


  ValidatePostal(control:AbstractControl) {
    let postalValue = control.value;
    if(postalValue == null) return null;

    let regex = new RegExp(/^[A-Za-z0-9- ]+$/);
    if (!regex.test(postalValue)) {
      return { invalidPostal: true };
    }
    else{
    let  onlyNumeric = /^(?=.*[0-9- ])/;
      if(!postalValue.match(onlyNumeric)){
        return { invalidPostal: true };
      }
    }
    return null;
  }
 

  // postal code end

  busOwnerForm:FormGroup;
  personalAddress:FormGroup;
  personalAddress1:FormGroup;
  ngOnInit() {

    this.updateContactForm=this.fb.group({
      first_name: [ "", Validators.compose([Validators.required,Validators.pattern("(?=.*[a-zA-Z-'])(?!.*[0-9])(?!.*[@#$%^&+=:;></?\|.,~{}_]).{1,}")])],   
      last_name: [ "", Validators.compose([Validators.required,Validators.pattern("(?=.*[a-zA-Z-'])(?!.*[0-9])(?!.*[@#$%^&+=:;></?\|.,~{}_]).{1,}")])],   
      dob: ["",Validators.required],
      mobile: ["",Validators.compose([Validators.required, Validators.pattern("^[0-9]*$")])],
    //  email: ["",Validators.compose([ Validators.required,Validators.pattern("[a-zA-Z0-9.-]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{3,}")])],
      email: ["",Validators.compose([Validators.required,Validators.pattern("[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}")])], 
      gender: ['', Validators.required],
      middle_name:[null],
      telephone:[null],
      calling_code: ['', Validators.required],
    })

    this.busAddrForm=this.fb.group({
    'country_id':['',Validators.required],
    'postal_code':['',Validators.compose([Validators.required,this.ValidatePostal])],
    'city':['',Validators.compose([Validators.required,Validators.pattern("^[a-zA-Z- ']+$")])],
    'address_line1':['',Validators.compose([Validators.required,Validators.pattern("^[a-zA-Z0-9', -]+$")])],
    'address_line2':['',Validators.compose([Validators.pattern("^[a-zA-Z0-9' ,-]+$")])],
    'region':['',Validators.compose([Validators.required])],
    })

    this.operatingAddrForm=this.fb.group({
      'country_id':['',Validators.required],
      'postal_code':['',Validators.compose([Validators.required,this.ValidatePostal])],
      'city':['',Validators.compose([Validators.required,Validators.pattern("^[a-zA-Z- ']+$")])],
      'address_line1':['',Validators.compose([Validators.required,Validators.pattern("^[a-zA-Z0-9', -]+$")])],
      'address_line2':['',Validators.compose([Validators.pattern("^[a-zA-Z0-9', -]+$")])],
      'region':['',Validators.compose([Validators.required])],
    });

    this.addDirectorForm=this.fb.group({
      first_name: [ "", Validators.compose([Validators.required,Validators.pattern("(?=.*[a-zA-Z-'])(?!.*[0-9])(?!.*[@#$%^&+=:;></?\|.,~{}_]).{1,}")])],   
      last_name: [ "", Validators.compose([Validators.required,Validators.pattern("(?=.*[a-zA-Z-'])(?!.*[0-9])(?!.*[@#$%^&+=:;></?\|.,~{}_]).{1,}")])],   
      email: ["",Validators.compose([Validators.required,Validators.pattern("[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}")])],
    })
     
    this.ultimateOwnForm=this.fb.group({
      type:['',Validators.required],
      first_name: [ "", Validators.compose([Validators.required,Validators.pattern("(?=.*[a-zA-Z-'])(?!.*[0-9])(?!.*[@#$%^&+=:;></?\|.,~{}_]).{1,}")])],   
      last_name: [ "", Validators.compose([Validators.required,Validators.pattern("(?=.*[a-zA-Z-'])(?!.*[0-9])(?!.*[@#$%^&+=:;></?\|.,~{}_]).{1,}")])],   
     email: ["",Validators.compose([Validators.required,Validators.pattern("[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}")])], 
     percentage: ["",Validators.compose([Validators.required,Validators.pattern("^[0-9]*$"), Validators.minLength(2),Validators.maxLength(3),Validators.min(25),Validators.max(100)])],

    })
  
    this.busOwnerForm=this.fb.group({
      first_name: [ "", Validators.compose([Validators.required,Validators.pattern("(?=.*[a-zA-Z-'])(?!.*[0-9])(?!.*[@#$%^&+=:;></?\|.,~{}_]).{1,}")])],   
      last_name: [ "", Validators.compose([Validators.required,Validators.pattern("(?=.*[a-zA-Z-'])(?!.*[0-9])(?!.*[@#$%^&+=:;></?\|.,~{}_]).{1,}")])],   
      email: ["",Validators.compose([Validators.required,Validators.pattern("[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}")])],
      mobile: ["",Validators.compose([Validators.required, Validators.pattern("^[0-9]*$")])],
      dob: ["",Validators.required],
     
      business_owner_type: ["",Validators.required],  
      gender: ['', Validators.required],
      calling_code: ['', Validators.required],
    })

    this.personalAddress=this.fb.group({
    country_id:['',Validators.required],
    postal_code:['',Validators.compose([Validators.required,Validators.pattern("^[a-zA-Z0-9- ]+$")])],
    city:['',Validators.compose([Validators.required,Validators.pattern("^[a-zA-Z- ']+$")])],
    address_line1:['',Validators.compose([Validators.required,Validators.pattern("^[a-zA-Z0-9', -]+$")])],
    address_line2:['',Validators.compose([Validators.pattern("^[a-zA-Z0-9', -]+$")])],
    region:['',Validators.compose([Validators.required])],
    })

    this.personalAddress1=this.fb.group({
      country_id:['',Validators.required],
      postal_code:['',Validators.compose([Validators.required,Validators.pattern("^[a-zA-Z0-9- ]+$")])],
      city:['',Validators.compose([Validators.required,Validators.pattern("^[a-zA-Z- ']+$")])],
      address_line1:['',Validators.compose([Validators.required,Validators.pattern("^[a-zA-Z0-9', -]+$")])],
      address_line2:['',Validators.compose([Validators.pattern("^[a-zA-Z0-9', -]+$")])],
      region:['',Validators.compose([Validators.required])],
      })
  }
}
