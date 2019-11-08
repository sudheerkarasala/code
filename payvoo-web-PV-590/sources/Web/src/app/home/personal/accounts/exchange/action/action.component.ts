import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../../../../core/shared/home.service';
import * as _ from "lodash";
// import { AlertService } from 'ngx-alerts';
import { EventEmitterService } from 'src/app/home/personal/accounts/exchange/event-emitter.service';
import { NotificationService } from 'src/app/core/toastr-notification/toastr-notification.service';
declare var $: any;
@Component({
  selector: 'action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {
  profileData: any;
  getAutoAlerts: any;
  autoExchangeData:any;
  currentPage:any;
  constructor(private homeService: HomeService,public emitter:EventEmitterService,private alert:NotificationService) {
    this.getCallAction()
   }
  autoExchModal(){
    $("#addActionModal").modal('hide');
    this.emitter.myEvent.emit('autoExchange');
  }
  autoPriceAlert() {
    $("#addActionModal").modal('hide');
    this.emitter.myEvent.emit('autoPriceAlert');
  }
  getCallAction(){
    this.emitter.myEvent.subscribe(res=>{
      if(res=='getAction')
      {
        this.getActionData();
      }
    })
  }
  getActionData() {
    this.profileData = JSON.parse(sessionStorage.getItem('userData'));
    this.homeService.getAutoCurrencyData(this.profileData.userInfo.applicant_id).subscribe(res => {
      if (res['status']==1) {
        this.autoExchangeData = res['data'];
        this.getAutoAlerts = true;
      }
      else {
        this.autoExchangeData = [];
        this.getAutoAlerts = false;
      }
    })
  }
  deleteAutoExchangeAlert(id) {
    this.homeService.deleteAutoExchangeRecord(id).subscribe(res => {
      if(res['status']==1){
        this.alert.success(res['message']);
        this.getActionData();
      }
      
    })
  }
  ngOnInit() {
    this.getActionData();
  }
}
