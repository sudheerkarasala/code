//import { Component, } from '@angular/core';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/core/shared/home.service';
import { NotificationService } from 'src/app/core/toastr-notification/toastr-notification.service';
declare var $: any;

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.scss']
})
export class AddAccountComponent {

  profileData: any;
  applicant_id: any;
  cardData: any = [];
  intialpayment: boolean;
  aplicant_id: any;
  all: any;
  cardlength: any;

  constructor(private router: Router, private homeService: HomeService,private alert:NotificationService) {
    this.profileData = JSON.parse(sessionStorage.getItem('userData'));
    this.getCardDetails();
    this.getTransactions();
  }

  getCardDetails() {
    this.applicant_id = this.profileData.userInfo.applicant_id;
    this.homeService.getCardDetails(this.applicant_id).subscribe(res => {
      if (res['status'] = 1) {
        this.cardlength = res['cards'];
        for (var i = 0; i < this.cardlength.length; i++) {
          if (res['cards'][i]['status']==1) {
            this.cardData = res['cards'][i]['payment_cards_id'];
          }
          else{
            this.cardData=null;
          }
        }
      }
      if (res['status'] = 0) {
        this.alert.error("Get card details failed")
      }
    })
   }

  addMoney() {
    $('#add_money').modal('hide');
    this.router.navigateByUrl('add-money');
    if (this.cardData == null) {
      this.router.navigate(['home/add-money/cards']);
    }
    else {
      this.router.navigate(['home/add-money/payments', this.cardData]);
    }
  }
  skip() {
    $('#add_money').modal('hide');
  }


  getTransactions() {
    this.applicant_id = this.profileData.userInfo.applicant_id;
    this.all = "all";
    this.homeService.getAllTransctionList(this.applicant_id, this.all).subscribe(res => {
      if (res['status'] == 0) {
        $('#add_money').modal('show');
      }
    })
  }

}
