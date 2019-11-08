 /**
   * Login Component
   * login to the personal application if entered credentials are correct
   * @package LoginComponent
   * @subpackage app\index\login\personal-login\LoginComponent
   * @author SEPA Cyper Technologies, Sayyad M.
  */
import { AuthService } from '../../../core/shared/auth.service';
import { Component, OnInit } from "@angular/core";
import {Validators, FormBuilder,FormGroup,FormControl} from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: "personal-login",
  templateUrl: "./personal-login.component.html",
  styleUrls: ["./personal-login.component.scss"]
})
export class PersonalLoginComponent implements OnInit {
  loginForm:FormGroup;
  loginActionActive=false;
  constructor(private fb:FormBuilder,private authService:AuthService,private routerNavigate:Router) {}

  LoginAction(formData:any){
   if(this.authService.loginAction(formData)){
    this.loginActionActive=true;
  //  this.routerNavigate.navigate(['dashboard']);
   }
  }
  navigateToDashboard(){
    if(this.loginActionActive){
      sessionStorage.setItem("isVerified","yes");
      this.routerNavigate.navigate(['home/account-index/getaccount']);
    }
   
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      'email': ['',Validators.compose([Validators.required,Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')])],
      'password': [null,Validators.compose([Validators.required,Validators.minLength(8)])],
      'account_type':['personal',Validators.required]
    });

    this.authService.logindata.subscribe(data => {
      this.navigateToDashboard();
    });
  }

  //jquery
  
  password()
  {
    this.routerNavigate.navigate(['index/forgot/personal']);
  }
 

}
