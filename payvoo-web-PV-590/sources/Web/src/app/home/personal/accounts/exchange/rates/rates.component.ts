import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../../../../core/shared/home.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NotificationService } from 'src/app/core/toastr-notification/toastr-notification.service';

declare var $:any;

@Component({
  selector: 'rates',
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.scss']
})
export class RatesComponent implements OnInit {
  CountryDetails: any;
  exchangeCurrencyResult: any;
  getdata: any;
  convertObj: any;
  result: any;
  ratesData: any;
  to_currency: any;
  from_currency: any;
  currencyFB: FormGroup;
  currentPage = 1;
  rateExchangeData:any;
  applicant_id:any;
  
  constructor(private homeService: HomeService,private formBuilder: FormBuilder,private alert:NotificationService) {
    this.getdata = JSON.parse(sessionStorage.getItem('userData'));
    this.applicant_id=this.getdata.userInfo.applicant_id;
    this.ratesList();
  }
  getCountrydetails() {
    this.currencyFB.reset();
    this.homeService.getCurrencyList().subscribe(res => {
      if(res['status']==1){
      this.CountryDetails = res.currency;
      }
      else if(res['status']==0){
        this.alert.error(res['message']);
      }
    })
  }
  CreateRates(){
    var request = {
      "applicant_id": this.applicant_id,
      "from_currency": this.currencyFB.get('from_currency').value,
      "to_currency": this.currencyFB.get('to_currency').value,
      "isConvert": 0
    }
    if(request.from_currency == request.to_currency){
      this.alert.warn("please Select different Currencies");
    }
    else if(request.from_currency != request.to_currency){
      this.homeService.CreateCurrencycheckRate(request).subscribe(res => {
          if(res['status']==1){
          $("#createCurrency").modal("hide");
          this.alert.success(res['message']);
          this.ratesList();
          }
          else if(res['status']==0){
           this.alert.error(res['message']);
          }
      })
    }
    this.currencyFB.reset();
  }
  deleteRate(id) {
    this.homeService.deleteCurrencyRate(id).subscribe((res: any) => {
      if(res['status'] == 1) {
        this.alert.success(res['message']);
        this.ratesList();
        } else if(res['status'] == 0){
        this.alert.error(res['message']);
     }
    })
  }
  ratesList(){
    this.convertObj = {
      "applicant_id": this.applicant_id,
      "isConvert": 0
    }
    this.homeService.createCurrencyConvertor(this.convertObj).subscribe(res => {
      if(res['status'] == 1) {
      this.ratesData = res['data'];
      } else if (res['status']==0){
        this.ratesData = [];
      }
      });
  }
  ngOnInit() {
    this.currencyFB = this.formBuilder.group({
      from_currency: ['', Validators.required],
      to_currency: ['', Validators.required],
    });
  }
}

