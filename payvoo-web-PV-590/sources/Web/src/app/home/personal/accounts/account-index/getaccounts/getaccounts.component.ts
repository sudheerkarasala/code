import { HomeService } from './../../../../../core/shared/home.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {Router } from '@angular/router';
import { NotificationService } from 'src/app/core/toastr-notification/toastr-notification.service';
import {SubSink} from 'subsink'

declare var $:any;

@Component({
  selector: 'app-getaccounts',
  templateUrl: './getaccounts.component.html',
  styleUrls: ['./getaccounts.component.scss']
})
export class GetaccountsComponent implements OnInit {
  currencyData: any;
  profileData: any;
  country_name: any;
  obj: any;
  accountData: any;
  country_id_currency: any;
  layout: boolean=true;
  initialPayment:any;
  cardData:any;
  search_accounts:any;
  search_currencies:any;
  listActive: boolean=false;
  gridActive: boolean=true;
  public unsubscribe$=new SubSink();


  constructor(private homeService: HomeService, private fb: FormBuilder,private router:Router,private alert: NotificationService) { 
    this.profileData=JSON.parse(sessionStorage.getItem('userData'));
    this.getAccounts();
  }
  statusCurrency() {
    this.homeService.getAccountsCurrency().subscribe(res => {
      this.currencyData = res['currency'];
    });
  }
  listView(){
    this.listActive=true
    this.gridActive=false;
    this.layout=false;
  }
  gridView(){
    this.gridActive=true;
    this.listActive=false
    this.layout=true;
  }
  save_outage_item(item){
  this.country_id_currency=item.country_id;
  this.country_name=item.country_name;
   this.obj={
  "applicantId":this.profileData.userInfo.applicant_id,
	"currency":item.currency,
	"status": true,
	"role":1,
	"balance":0
   }
  }
  createAccount(){
    this.homeService.createAccount(this.obj).subscribe(res => {
      if(res['status']==1){
        this.alert.success(res['message'])
        this.getAccounts();
      }
      else{
        this.alert.error(res['message'])
      }
    });
  }
  getAccounts(){
    this.homeService.getAccounts(this.profileData.userInfo.applicant_id).subscribe(res => {
      this.accountData = res.list;
    });
  }
  deactivateAccount(item){
   var obj={
      "status":0,
      "currency":item.currency,
      "applicantId":this.profileData.userInfo.applicant_id,
  }
  this.homeService.ActiveDeactiveacocunt(obj).subscribe(res => {
  if(res['status']=1){
    this.alert.success(res['message']);
    this.getAccounts();
  }
  else{
    this.alert.error("Failed")
  }
  });
}
activateAccount(item){
  var obj={
     "status":1,
     "currency":item.currency,
     "applicantId":this.profileData.userInfo.applicant_id,
 }
 this.homeService.ActiveDeactiveacocunt(obj).subscribe(res => {
  if(res['status']=1){
   this.alert.success(res['message']);
    this.getAccounts();
  }
  else{
    this.alert.error("Failed")
  }
});
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
getInitialPayment() {
  this.initialPayment = this.profileData.userInfo.initialPayment;
  if (this.initialPayment == 0) {
    $('#add_money').modal('show');
  }
}
  ngOnInit() {
  $(".search_open").click(function(){
        $(".srch_cnt").toggleClass("active");
  });
  }
  ngOnDestroy(){
    this.unsubscribe$.unsubscribe();
  }


}