import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms'
import { HomeService } from '../../../core/shared/home.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/toastr-notification/toastr-notification.service';
declare var $: any;

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.scss']
})
export class SandboxComponent implements OnInit {

  userProfile:FormGroup;
  userData:any;
  api_key:any;
  url:any;
  uservalue:any;
  emaildata:any = {};
  responsedata:any;
  application_id:any;
  email:any;
  memberuser:any;
  copymember:any;
  support:any;
  redirect_url:any

  constructor(private fb: FormBuilder,private alert:NotificationService,private homeservice:HomeService,private router:Router) 
  { 
    this.userData=JSON.parse(sessionStorage.getItem('userData'));
    this.api_key=this.userData.sandBoxInfo.api_key;
    this.url=this.userData.sandBoxInfo.url;
    this.application_id=this.userData.userInfo.applicant_id;
    this.email=this.userData.userInfo.email;
    this.memberuser=this.userData.sandBoxInfo.memberId;
    this.support=this.userData.sandBoxInfo.api_doc_url;
    // this.redirect_url=this.userData.sandBoxInfo.redirect_url;
  }

  ngOnInit() {

    $(".sandbox").click(function () {
      $(".rotate").toggleClass("down");
    })

    $(".prod-api").click(function(){
      $(".rotate-product").toggleClass("down")  ; 
    })

    this.userProfile =  this.fb.group({
      url :[this.url],
      apikey: [this.api_key],
      support: [this.support]
    });
    
  }


  copyInputMessage(input){
    input.select();
    input.setSelectionRange(0, 999);
    document.execCommand('copy');
  }

  business(){
    localStorage.setItem('redirect','true')
    window.open("/#/payvoo-business","_blank")
  }


  sendEmail(){

    this.emaildata={
      "email":this.uservalue,
      "applicant_id":this.application_id
    }
    this.homeservice.sendEmail(this.emaildata).subscribe(response => {
    if(response['status']==1){
      $('#success').modal('show');
      $('#sendemail').modal('hide');
    }
    else if(response['status']==0){
      this.alert.error("Please try again");  
    }
    });
    this.uservalue='';
  }

  closeModal(){
    $('#sendemail').modal('hide');
    $('#success').modal('hide');
   }
 



}
