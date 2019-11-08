import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../../../../core/shared/home.service';
//import { AlertService } from 'ngx-alerts';
import { FormBuilder } from '@angular/forms';
import { NotificationService } from 'src/app/core/toastr-notification/toastr-notification.service';

@Component({
  selector: 'convertor',
  templateUrl: './convertor.component.html',
  styleUrls: ['./convertor.component.scss']
})
export class ConvertorComponent implements OnInit {
  CountryDetails: any;
  exchanCurrencyRes: any;
  userData: any;
  getCountrydetailsList:any;
  country_id_currency: any;
  searchText:any;

  constructor(private homeService: HomeService, private fb: FormBuilder,private alert:NotificationService) {
    this.userData = JSON.parse(sessionStorage.getItem('userData'));
    this.getConvertorList(); 
  }
  getConvertorList() {
    let obj= {
      "applicant_id": this.userData.userInfo.applicant_id,
      "isConvert": 1,
      "from_currency":"EUR",
      "amount":100
    }
    this.homeService.createCurrencyConvertor(obj).subscribe((res: any) => {
      if(res['status']==1)
      {
        this.exchanCurrencyRes=res['data'];
      }
    });
  }
  getCountrydetails() {
    this.homeService.getAccountsCurrency().subscribe(res => {
      if(res['status']==1){
        this.CountryDetails = res['currency'];
      }
      else{
      this.alert.error(res['message']);
      }
    })
  }

  addAccount(obj) {
    this.country_id_currency=obj.country_id;
    this.getCountrydetailsList = obj;
  }
 
  convertorValue(value, event) {
    var code = (event.keyCode ? event.keyCode : event.which);
    if (code == 13) {
      let obj = {
        "applicant_id": this.userData.userInfo.applicant_id,
        "isConvert": 1,
        "from_currency": value.to_currency,
        "amount": value.exchanged_amount
      }
      this.homeService.currenceExchangedByConvertor(obj).subscribe((res: any) => {
        if(res['status']==1) {
        this.exchanCurrencyRes = res['data'] }
        else{
          this.alert.error(res['message'])
        }
      })
    }
  }
  deleteCurrency(id) {
    this.homeService.deleteCurrencyRate(id).subscribe((res: any) => {
      if (res.status == 1) {
        this.alert.success(res['message']);
        this.getConvertorList();
      } else {
        this.alert.error(res['message']);
      }
    })
  }
  CreateConverts(obj) {
    this.country_id_currency=obj.country_id;
    let request = {
      "applicant_id": this.userData.userInfo.applicant_id,
      "from_currency": obj.currency,
      "to_currency": null,
      "isConvert": 1
    }
    this.homeService.CreateCurrencycheckRate(request).subscribe(res => {
      if (res['status'] == 1) {
        this.alert.success(res['message']);
        this.getConvertorList();
      }
      else {
        this.alert.error(res['message']);
      }
    })
  }
  ngOnInit() {
  }
}
