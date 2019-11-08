import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/core/shared/home.service';
import { NotificationService } from 'src/app/core/toastr-notification/toastr-notification.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent {
  transList: any;
  profileData: any;
  amount: any;
  transDate: any;
  opositeOwner: any;
  currencyData: any;
  currencyType: any;
  selCurType: any;
  selAccNo: any;
  selCurId: any = 0;
  lastMonth:any;
  sixMonth:any;
  setYear:any;
  transForm:any;
  search_currencies:any;
  
  filterDate = [{
      "months": "Last Month",
      "date": this.lastMonth
    },{
      "months": "Last 6 Month",
      "date": this.sixMonth
    },{
      "months": "Last 1 Year",
      "date": this.setYear
    }];
  transaction_type: any;


  constructor(public _router: Router, private homeService: HomeService, private alert: NotificationService) {
    this.profileData = JSON.parse(sessionStorage.getItem('userData'));
    this.getAllTransctionList();
    //this.getAccounts();
    this.getCurrencyList();
  }
  getCurrencyList(){
    this.homeService.getCurrency(this.profileData.userInfo.applicant_id).subscribe(rs => {
      this.currencyType = rs['list'];
    })
  }
  // selectedCurrency(event) {
  //   this.selAccNo = event.target.value;
  //   this.currencyType.forEach((v, i) => {
  //     if (v.account_no == this.selAccNo) {
  //       this.selCurTyp@Component({ = v.currency + ' Transactions history';
  //     }
  //     else if (this.se@Component({AccNo == 0) {
  //       this.selCurTyp@Component({ = '';
  //     }
  //   });
  // }
  getAllTransctionList() {
    this.homeService.getAllTransctionList(this.profileData.userInfo.applicant_id, 'all').subscribe(res => {
      if (res['status'] == 1) {
        this.transList = res.transaction_details;
      }
      else {
        this.alert.warn("No transcations details ");
      }
    });
  }
  getCurrentTransDetails(item) {
    this.transaction_type=item.transaction_type
    this.transDate = item.created_on;
    this.amount = item.amount;
    this.opositeOwner = item.opposite_account_owner
  }
  getAccounts() {
    this.homeService.getAccounts(this.profileData.userInfo.applicant_id).subscribe(res => {
      this.currencyData = res.list;
    });
  }
}
