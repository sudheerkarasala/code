import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IndexService } from "../../../core/shared/index.service";
//import { AlertService } from 'ngx-alerts';
import { Subscription } from 'rxjs/Subscription';

import { NotificationService } from 'src/app/core/toastr-notification/toastr-notification.service';

declare var $:any;

@Component({
  selector: 'app-sandboxsignup',
  templateUrl: './sandboxsignup.component.html',
  styleUrls: ['./sandboxsignup.component.scss']
})
export class SandboxsignupComponent implements OnInit {

  CountrySubs:Subscription;
  sandboxDetailForm: FormGroup;
  countryData: any;
  signupsandbox: boolean = true;
  profilecompleteFeildSet: boolean = false;
  createPassword:any;
  repeatPassword:any;
  checkPassword:boolean=false;
  optiondata:any;
  optionid:any;
  callingoption:any;
  callingid:any;
  spins:boolean=false;

  constructor(private formBuilder: FormBuilder, private router: Router, private indexservice: IndexService,private alert:NotificationService) {
    this.getCountryDetails();
  }


  sandboxLogin() {
    this.router.navigateByUrl('sandboxlogin');
  }

  onSelectBusiness(some){
     this.sandboxDetailForm.patchValue({
        country:some.country_name
     });
     this.optionid=some.country_id;
     $(".ul_style").hide();
  }

  
  codeValue(some){
    this.sandboxDetailForm.patchValue({
      calling_code:some.calling_code
   });
   $(".calling_code").hide();
   }

  //get coutry details for country drowndown
  getCountryDetails() {
    this.indexservice.businessGetCountryDetails().subscribe(response => {
      this.countryData = response;
    });
  }


  registerSandbox(formData:any) {
     
    this.spins=true;

    let registrationkyb = {};
    registrationkyb['country_of_incorporation'] = 1;
    registrationkyb['business_legal_name'] = this.sandboxDetailForm.get('companyname').value;
    registrationkyb['trading_name'] = "";
    registrationkyb['registration_number'] = "";
    registrationkyb['incorporation_date'] = '1994-04-26';
    registrationkyb['business_type'] = 6
    formData.mobile=formData.calling_code+formData.mobile;
     
    delete formData["agree"];
    delete formData["repeat"];
    delete formData['calling_code'],
    delete formData['companyname'],
    delete formData['country'],

    formData.country_id=this.optionid;
    formData.passcode_pin= Math.floor(1000 + Math.random() * 9000);
    console.log(formData);
    this.indexservice.savePersonalData(formData).subscribe(res => {
      if (res['status'] == 1) {
        this.spins=false;
        registrationkyb['applicant_id'] = res.userInfo.applicant_id;
        this.indexservice.saveCompanywithoutKYB(registrationkyb).subscribe(response => {
          if (response.status == 1) {
            this.spins=false;
            this.signupsandbox = false;
            this.profilecompleteFeildSet = true;
          }
          else if (response.status == 0) {
            this.spins=false;
            this.alert.error("Registration failed")
          }
        });
      }
      else {
        this.spins=false;
        this.alert.error(res['message']);
      }
    });

  }

  ngOnInit() {

    this.sandboxDetailForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      companyname: ['', Validators.required],
      email: ["", Validators.compose([Validators.required,Validators.email])],
      country: ["",Validators.required],
      calling_code: ['',Validators.required],
      mobile: ["", Validators.compose([Validators.required, Validators.pattern("^[0-9]*$"),Validators.maxLength(13)])],
      password: ["", Validators.compose([Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?!.*[-!$%^&*()_+|~=^`{}[:;<>?,.@#\ ]).{8,}')])],
      repeat: ["", Validators.required],
      agree: ["", Validators.required],
      account_type:['sandbox'],
      address_line1:[''],
      address_line2:[''],
      city:[''],
      country_id:[''],
      dob:['1994-04-26'],
      gender:[''],
      middle_name:[''],
      next_step:[''],
      passcode_pin:[''],
      postal_code:[''],
      region:[''],
      telephone:[''],
      town:[''],
      phone:['']
    });

    this.sandboxDetailForm.get('password').valueChanges.subscribe((value) => {
       this.createPassword=value;
    });
    this.sandboxDetailForm.get('repeat').valueChanges.subscribe((value)=>{
       this.repeatPassword=value;
       if(this.createPassword===this.repeatPassword){
        this.checkPassword=false;
       }
       else{
        this.checkPassword=true;
       }
    });


    $(document).ready(function(){
      $("#country").click(function(e){
        e.stopPropagation();
        $(".ul_style").toggle();
        $(".calling_code").hide();
      });
      $(document).click(function(){
        $(".ul_style").hide();
        $(".calling_code").hide();
      });
    });

    $(document).ready(function(){
      $("#calling_code").click(function(e){
        e.stopPropagation();
        $(".calling_code").toggle();
        $(".ul_style").hide();
      });
      $(document).click(function(){
        $(".calling_code").hide();
        $(".ul_style").hide();
      });
    });

  }
  

}
