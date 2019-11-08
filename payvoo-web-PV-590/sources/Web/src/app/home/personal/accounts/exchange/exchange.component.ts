import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HomeService } from '../../../../core/shared/home.service';
//import { AlertService } from 'ngx-alerts';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EventEmitterService } from 'src/app/home/personal/accounts/exchange/event-emitter.service';
import { NotificationService } from 'src/app/core/toastr-notification/toastr-notification.service';
declare var $: any;

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss']
})
export class ExchangeComponent implements OnInit {
  fromExchnAmount:any;
  toExchnAmount:any;
  toExchAmount:any;
  toAmount:any;
  result:any;
  fromCurrency:any;
  targetCurrency:any;
  exchangeCurrencyResult:any;
  exchangeCurrencyObj: any;
  showTodayCurrency: any;
  getTransactionResult: any;
  currencyFB: FormGroup;
  tobalance: any;
  frombalance: any;
  frmcurrency: any;
  tocurrency: any;
  fromExchnCurrency: any;
  currencyList: any = [];
  activeCurrencyType: any;
  toDayCurrencyRate: any;

//autoExchange variable declaration

  from_Currency: any;
  from_Amt: any;
  to_Currency: any;
  autoExCurrencyObj: any;
  autoExchangeData: any;
  currentPage = 1;
  setTarPrice: any;
  isSetTarget: boolean = true;
  isetTarBtn: boolean = true;
  getdata: any;
  currencyType: any;
  getAutoAlerts: any;
  fromCurrencyBal: any;
  toCurrencyBal: any;
  showCurrency: any;
  accountNo: any;
  autoCurrencyType: any;
  getAllExchData: any;
  autoExchForm: any;
  applicantId: any;
  userData: any;

  // pricealert variable declaration

  taramount: any;
  targetfb: FormGroup;
  CountryDetails: any;
  selCountrydetails: any;
  country_id_currency: any;
  targettCurrency: any;
  getResult: any;
  searchText: any;
  toPriceRate: any;
  selCurrency: any;
  todayPriceCurrn: boolean;
  priceActCurren: any;
  exchCurrencyType: any;
  toDayCurrnExchRate: any;

  constructor(private homeService: HomeService, private http: HttpClient,private emitter:EventEmitterService, 
    private formBuilder: FormBuilder, private routerNavigate: Router,private alert:NotificationService) {
    this.userData = JSON.parse(sessionStorage.getItem('userData'));
      this.getautoAction()
  }
  
  CurrencyChange() {
    this.currencyFB.get('fromExchnCurrency').setValue('');
    this.currencyFB.get('toExchnAmount').setValue('');
    if (this.frmcurrency == this.tocurrency) {
     this.alert.warn("Please select the different countries");

      this.currencyFB.get('toCurrency').setValue('');
      this.tobalance = '';
      this.showTodayCurrency = false;
    }
    else if (this.frmcurrency && this.tocurrency) {
      this.homeService.currentRate(this.tocurrency, this.frmcurrency, 1).subscribe((res: any) => {
        if (res['status'] == 1) {
          this.toDayCurrnExchRate = res['amount'];
          this.showTodayCurrency = true;
        }
        else {
        this.alert.error('failed')
        }
      });
    }
  }
  swap_currency() {
    let fromCurrency = this.currencyFB.get('fromCurrency').value;
    let toCurrency = this.currencyFB.get('toCurrency').value;

    if (!fromCurrency.currency || !toCurrency.currency) {
      this.showTodayCurrency = false;
      this.alert.warn('Please select the currencies');
    }
    else if (!this.fromExchnCurrency) {
      this.currencyFB.get('fromCurrency').setValue(toCurrency);
      this.currencyFB.get('toCurrency').setValue(fromCurrency);
      this.homeService.currentRate(this.tocurrency, this.frmcurrency, 1).subscribe((res: any) => {
        if (res['status'] == 1) {
          this.toDayCurrnExchRate = res['amount'];
          this.showTodayCurrency = true;
          let from_exchCurrency = this.currencyFB.get('fromExchnCurrency').value;
          if (from_exchCurrency !== '') {
            let convertedAmt = (from_exchCurrency * this.toDayCurrnExchRate).toFixed(4);
            this.currencyFB.get('toExchnAmount').setValue(convertedAmt);
          }
        }
        else {
          this.alert.error('failed');
        }
      });
    }
    else {
      this.targetCurrency = fromCurrency;
      this.fromCurrency = toCurrency;
      this.currencyFB.get('fromCurrency').setValue(this.targetCurrency);
      this.currencyFB.get('toCurrency').setValue(this.fromCurrency);
      this.homeService.currentRate(this.tocurrency, this.frmcurrency, 1).subscribe((res: any) => {
        if(res['status']==1){
        this.toDayCurrnExchRate = res['amount'];
        this.toExchnAmount = this.toDayCurrnExchRate;
        this.showTodayCurrency = true;
        }
      });
    }
  }

  getAccount() {
    this.homeService.getAccountById(this.userData.userInfo.applicant_id).subscribe((res: any) => {
     if(res['status']==1){
      this.exchCurrencyType =res['list'].filter(({ status }) => status == 'Active');
     }
    })
  }
  exchange_currency() {
    this.toAmount = this.currencyFB.get('toCurrency').value;
    this.fromExchnAmount = this.currencyFB.get('fromCurrency').value
    this.exchangeCurrencyObj = {
      "applicant_id": this.userData.userInfo.applicant_id,
      "from_account": this.fromExchnAmount.account_no,
      "to_account": this.toAmount.account_no,
      "account_type": this.userData.userInfo.account_type,
      "from_amount": this.currencyFB.get('fromExchnCurrency').value,
      "to_amount": this.toExchnAmount
    }
    this.homeService.createTransactionByCurrency(this.exchangeCurrencyObj).subscribe((res: any) => {
      this.exchangeCurrencyResult = res;
      if (res['status'] == 0) {
          this.alert.warn(res['message'])
      }
      this.getTransation();
    })
    this.frombalance = '';
    this.tobalance = '';
    this.showTodayCurrency = "";
    this.currencyFB.reset();
  }
  exchange(data) {
    var fromExchCurrency = this.currencyFB.get('fromExchnCurrency').value;
    if (fromExchCurrency !== '') {
      this.targetCurrency = (this.currencyFB.get('fromCurrency').value);

      this.fromCurrency = this.currencyFB.get('toCurrency').value;
      this.homeService.getcurrency(this.fromCurrency.currency, this.targetCurrency.currency, data).subscribe(res => {
        if (res['status']==1) {
          this.toExchnAmount = (res['amount']).toFixed(4);
          this.currencyFB.get('toExchnAmount').setValue(this.toExchnAmount);
        }
      })
    }
    else {
      this.currencyFB.get('toExchnAmount').setValue('');
    }
  }
  getTransation() {
    this.homeService.transactionById(this.userData.userInfo.applicant_id)
      .subscribe((res: any) => {
        if (res.status == 1) {
            this.alert.success(res['message'])
          this.routerNavigate.navigate(['home/account-index/transactions']);
        }
      })
  }


  // auto exchange start
  getautoAction(){
    this.emitter.myEvent.subscribe(res=>{
      if(res=='autoExchange')
      {
        this.autoExchangeCurrency();
      }
      else if(res=='autoPriceAlert'){
       
        $('#priceAlert').modal('show');
      }
    })
  }
  getCurrency() {
    this.userData = JSON.parse(sessionStorage.getItem('userData'));
    this.homeService.getCurrency(this.userData.userInfo.applicant_id).subscribe(rs => {
      this.currencyType = rs['list'];
      this.autoCurrencyType = this.currencyType.filter(({ status }) => status == 'Active');
    })
  }
  currencyRate() {
    this.autoExchForm.patchValue({ autoFromAmnt: '', autoToAmnt: '', autoSetTargetAmt: '' });
    this.isSetTarget = true;
    this.from_Currency = this.autoExchForm.value.autoFromCurrn;
    this.to_Currency = this.autoExchForm.value.autoToCurrn;
    if (this.from_Currency == this.to_Currency) {
      this.alert.error("Please select the different currencies");
    }
    else {
      let fromCurrency = this.from_Currency;
      let fCurrencydata = this.currencyType.filter(({ currency }) => currency == fromCurrency);
      this.fromCurrencyBal = fCurrencydata[0].balance;
      this.accountNo = fCurrencydata[0].account_no;

      if (this.to_Currency !== '' && this.to_Currency !== null) {
        let toCurrency = this.to_Currency;
        let tCurrencydata = this.currencyType.filter(({ currency }) => currency == toCurrency);
        this.toCurrencyBal = tCurrencydata[0].balance;
      }

      if ((this.from_Currency !== null && this.to_Currency !== null)) {
        this.isetTarBtn = false;
        this.homeService.currentRate(this.to_Currency, this.from_Currency, 1).subscribe((res: any) => {
          if (res['status'] == 1) {
            this.showCurrency = true;
            this.toDayCurrencyRate = res['amount'];
          }
        });
      }
    }
  }
  exchang_currency() {
    let balance = this.toCurrencyBal;
    let to_Currency = this.autoExchForm.get('autoToCurrn').value;
    let from_Currency = this.autoExchForm.get('autoFromCurrn').value
    this.autoExchForm.patchValue({
      'autoFromCurrn': to_Currency,
      'autoToCurrn': from_Currency,
      'autoFromAmnt': '',
      'autoToAmnt': ''
    })
    this.toCurrencyBal = this.fromCurrencyBal;
    this.fromCurrencyBal = balance;
    this.to_Currency = from_Currency;
    this.from_Currency = to_Currency;
    this.isSetTarget = true;
    this.homeService.currentRate(this.to_Currency, this.from_Currency, 1).subscribe(res => {
      if (res['status'] == 1) {
        this.toDayCurrencyRate = res['amount'];
      }
    })
  }
  autoExchangeCurrency() {
    this.autoExchForm.reset();
    $('#exchange').modal('show');
    this.fromCurrencyBal = '';
    this.toCurrencyBal = '';
    this.showCurrency = false;
    this.isSetTarget = true;
  }
  setTargetModal() {
    $("#exchange").modal('hide');
    this.autoExchForm.get("autoSetTargetAmt").setValue('');
  }
  setTargetAmount() {
    $("#setTargetModal").modal('hide');
    $("#exchange").modal('show');
    this.isSetTarget = false;
    this.setTarPrice = this.autoExchForm.value.autoSetTargetAmt;
    this.from_Amt = this.autoExchForm.value.autoFromAmnt;
    if (this.from_Amt != '' && this.from_Amt !== null) {
      var tAmount = this.from_Amt * this.setTarPrice;
      this.autoExchForm.get('autoToAmnt').setValue(tAmount);
      $("#autoExchangebtn").prop('disabled', false);
    }
  }
  autoExchange() {
    this.autoExCurrencyObj = { "applicant_id": this.userData.userInfo.applicant_id }
    var autoExchObj = {
      "applicant_id": this.autoExCurrencyObj.applicant_id,
      "account_no": this.accountNo,
      "from_currency": this.from_Currency,
      "to_currency": this.to_Currency,
      "amount": this.autoExchForm.get('autoFromAmnt').value,
      "target_amount": this.autoExchForm.get('autoSetTargetAmt').value,
      "exchange_status": false
    }
    this.homeService.autoCurrencyExhan(autoExchObj).subscribe((res: any)=> {
      if (res['status'] == 1) {
        this.emitter.myEvent.emit('getAction');
        this.alert.success(res['message']);
        this.routerNavigate.navigate(['/home/exchange/action'])
      }
      else {
        this.alert.error(res['message'])
      }
    })
  }
  convertAmt() {
    var fromAmt = this.autoExchForm.get('autoFromAmnt').value;
    var targetAmt = this.autoExchForm.get('autoSetTargetAmt').value;
    if (targetAmt !== '' && targetAmt !== null) {
      var fromAmt = this.autoExchForm.get('autoFromAmnt').value;
      var convertAmt = fromAmt * targetAmt;
      this.autoExchForm.get('autoToAmnt').setValue(convertAmt);
    }
  }


  //price alert start

  getCountrydetails() {
    this.homeService.getAccountsCurrency().subscribe(res => {
      this.CountryDetails = res['currency'];
    })
  }
  countryDetls(data) {
    this.getPriceAccount()
    this.country_id_currency = data.country_id;
    this.selCurrency = data;
    this.targetfb.get('target_tcurrency').setValue('');
    this.targetfb.get('taramount').setValue('');
    this.todayPriceCurrn = false;
    $('#CountryDetails').hide();
  }
  getPriceAccount() {
    this.homeService.getAccountById(this.userData.userInfo.applicant_id).subscribe((res: any) => {
      this.priceActCurren = res['list'].filter(({ status }) => status == 'Active');
    })
  }
  priceCurrency() {
    if (this.targettCurrency == this.selCurrency.currency) {
      this.targetfb.get('taramount').setValue('');
      this.targetfb.get('target_tcurrency').setValue('');
     this.alert.warn("Please select the different currencies");
      this.todayPriceCurrn = false;
      $("#taramount").prop('disabled', true);
    }
    else {
      $("#taramount").prop('disabled', false);
      this.todayPriceCurrn = true;
      this.homeService.currentRate(this.targetfb.get('target_tcurrency').value, this.selCurrency.currency, 1).subscribe((res: any) => {
        if (res['status'] == 1) {
          this.toPriceRate = res['amount'];
        }
        else {
          this.alert.error(res['message'])
        }

      });
    }
  }
  CreateCountry(data) {
   $('#CountryDetails').show('slow');
    $('.modal-dialog modal-dialog-slideout').show();
    this.country_id_currency = data.country_id;
    var alertObj = {
      "applicant_id": this.userData.userInfo.applicant_id,
      "account_no": 0,
      "from_currency": data.currency,
      "to_currency": this.targetfb.get('target_tcurrency').value,
      "amount": 0,
      "target_amount": this.targetfb.get('taramount').value,
      "exchange_status": false
    }
    this.homeService.createSetAlertPrice(alertObj).subscribe((res: any) => {
      if (res['status'] == 1) {
        this.emitter.myEvent.emit('getAction');
        this.alert.success(res['message']);
        this.routerNavigate.navigate(['home/exchange/action']);
      }
      else {
        this.alert.success(res['message']);
      }
    })
  }
  closeModal(){
    $('#CountryDetails').show('slow');
    $('.modal-dialog modal-dialog-slideout').show();
  }

  ngOnInit() {

    this.getAccount();
    this.getCurrency()
    this.currencyFB = this.formBuilder.group({
      fromCurrency: ['', Validators.required],
      fromExchnCurrency: ['', Validators.required],
      toCurrency: ['', Validators.required],
      toExchnAmount: []
    });

    this.autoExchForm = this.formBuilder.group({
      autoFromCurrn: ['', Validators.required],
      autoFromAmnt: ['', Validators.required],
      autoToCurrn: ['', [Validators.required]],
      autoToAmnt: [''],
      autoSetTargetAmt: ['', [Validators.required]]
    });

    if (this.fromExchnCurrency !== '') {
      this.currencyFB.get('fromExchnCurrency').valueChanges.subscribe(val => {
        this.exchange(val);
      });
    }
    this.currencyFB.get('fromCurrency').valueChanges.subscribe(val => {
      if (val.currency) {
        this.frombalance = val.balance;
        this.frmcurrency = val.currency;
      }
    })
    this.currencyFB.get('toCurrency').valueChanges.subscribe(val => {
      if (val.currency) {
        this.tobalance = val.balance;
        this.tocurrency = val.currency;
      }
    })

    this.getCountrydetails();
    this.targetfb = this.formBuilder.group({
      target_tcurrency: ['', Validators.required],
      taramount: ['', [Validators.required, Validators.pattern("[0-9.]{1,}")]]
    });
    this.targetfb.get('target_tcurrency').valueChanges.subscribe(val => {
      if (val) {
        this.targettCurrency = val;
      }
    })
  }
}

