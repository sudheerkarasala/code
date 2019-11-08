 /**
   * Business Login Component
   * login to the business application if entered credential are correct
   * @package BusinessLoginComponent
   * @subpackage app\index\login\busines-login\BusinessLoginComponent
   * @author SEPA Cyper Technologies, Sayyad M.
  */
import { AuthService } from '../../../core/shared/auth.service';
import { Component, OnInit } from "@angular/core";
import {Validators, FormBuilder,FormGroup,FormControl} from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-business-login',
  templateUrl: './business-login.component.html',
  styleUrls: ['./business-login.component.scss']
})
export class BusinessLoginComponent implements OnInit {

  loginForm:FormGroup;
  loginActionActive=false;
  public loading=false;
 

  constructor(private fb:FormBuilder,private authService:AuthService,private routerNavigate:Router) {}

  LoginAction(formData:any){
   if(this.authService.loginAction(formData)){
    this.loginActionActive=true;
  //  this.routerNavigate.navigate(['dashboard']);
   }
  }

  navigateToDashboard(){
    if(this.loginActionActive){
      this.loading=false;
      this.routerNavigate.navigate(['bus-application']);
    }
  }
  // navigateToDashboard(){
  //   if(this.loginActionActive){
  //     this.routerNavigate.navigate(['bus-dashboard']);
  //   }
  // }

  ngOnInit() {
    this.loginForm = this.fb.group({
     // 'email': ['',Validators.compose([Validators.required,Validators.email])],
      'email': ["",Validators.compose([Validators.required,Validators.pattern("[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}")])],
      'password': [null,Validators.compose([Validators.required,Validators.minLength(7),Validators.maxLength(15)])],
      'account_type':['Business',Validators.required]
    });

    // this.authService.logindata.subscribe(data => {
    //   this.navigateToDashboard();
    // });
  }

  //jquery


  password()
  {
    this.routerNavigate.navigate(['index/forgot/business']);
  }
  


 

}
