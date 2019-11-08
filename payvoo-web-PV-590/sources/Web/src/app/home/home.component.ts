
/**
* Home Component
* its contain logout actin of the application and router-routet of the child components (home module)
* @package HomeComponent
* @subpackage app\home\HomeComponent
* @author SEPA Cyber Technologies, Sayyad M.
*/

import { HomeService } from './../core/shared/home.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/shared/auth.service';
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle'; // import it to your component
declare var $: any;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userData: any;
  firstName: any;
  lastName: any;
  KYCStatus: any;
  accountType: any;
  public loading=true;
  accountActive:boolean;
  paymentActive: boolean;
   
  constructor(public authService: AuthService, private homeService:HomeService, private routerNavigate: Router,private bnIdle: BnNgIdleService) { 
     if(this.routerNavigate.url.match('account-index')||this.routerNavigate.url.match('add-money') || this.routerNavigate.url.match('exchange')){
      this.accountActive=true;
      }
    


    // this.bnIdle.startWatching(900).subscribe((res) => {
    //   if(res) {
    //     this.logoutAction();
    //   }
    // })
    this.userData=JSON.parse(sessionStorage.getItem('userData'));

    this.firstName=this.userData.userInfo.first_name;
    this.lastName=this.userData.userInfo.last_name;
   
  }

  getKYCStatus(){
    this.homeService.getKYCStatus(this.userData.userInfo.applicant_id).subscribe(res=>{
      if(res['status']==1){
        this.KYCStatus='Completed'
      }
      if (res['status'] == 2) {
        this.KYCStatus = 'Pending'
      }
      if (res['status'] == 0) {
        this.KYCStatus = 'Pending'
      }
    })
  }

  logoutAction() {
    if (this.userData.userInfo.account_type == 'Personal') {
      if (this.authService.logOutAction()) {
        this.routerNavigate.navigate([''])
      }
    }
    else if (this.userData.userInfo.account_type == 'Business') {
      if (this.authService.logOutAction()) {
        this.routerNavigate.navigate([''])
      }
    }
    else if (this.userData.userInfo.account_type == 'sandbox') {
      if (this.authService.logOutAction()) {
        this.routerNavigate.navigate([''])
      }
    }

  }

  ngOnInit() {
    $(document).ready(function () {
      $(".bars_cnt").click(function () {
        $(".left_nav").toggleClass("active");
        $(".nav_backdrop").toggleClass("active");
      });
      $(".close_btn").click(function () {
        $(".left_nav").toggleClass("active");
        $(".nav_backdrop").toggleClass("active");
      });
    });
  }

}
