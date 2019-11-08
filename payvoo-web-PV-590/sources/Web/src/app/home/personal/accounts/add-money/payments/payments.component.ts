import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HomeService } from 'src/app/core/shared/home.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import * as _ from "lodash";
import { NotificationService } from 'src/app/core/toastr-notification/toastr-notification.service';


@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
  countryData: any;
  applicant_id: any;
  profileData: any;
  cardData: any;
  CardDetails: any;
  id: any;
  amountTransForm:FormGroup;
  currTransForm:FormGroup;
  addPaymentemplate:boolean=false;
  hideCurrBtn:boolean=true;
  amount: any;
  currency: any;
  currAmountTmpl:boolean=true;
  currencyData: any;
  prevcurrTransForm:boolean=false;
  loader:boolean=false;
  currencyDataValues: any=[];

  
  constructor(private routerNavigate:Router,private route: ActivatedRoute,private homeService:HomeService,private fb:FormBuilder,private alert:NotificationService) { 
    this.profileData=JSON.parse(sessionStorage.getItem('userData'));
    this.getAccounts();
  }
  getAccounts() {
    this.homeService.getAccounts(this.profileData.userInfo.applicant_id).subscribe(res => {
      this.currencyDataValues = res.list;
      this.currencyData=  this.currencyDataValues.filter(({status}) =>status== 'Active');
      if(this.currencyData.length==0){
       this.alert.error("Your accounts are Deactivated")
      }
    });
  }
  addPaymentemp(formData:any){
    this.amount=formData.amount;
    this.currency=formData.currency;
    this.addPaymentemplate=true;
    this.hideCurrBtn=false;
    this.currTransForm.patchValue({
      card_number:this.creditCardMask(this.CardDetails['card_number']),   
      name_on_card:this.CardDetails.name_on_card,
      card_type:this.CardDetails.card_type,
      card_exp:+this.CardDetails.card_month.toString()+this.CardDetails.card_year.toString()
    })
  }
  AddCurrMoney(formData:any){
    this.loader=true;
    this.prevcurrTransForm=true
    let fixedAmount=parseFloat(this.amountTransForm.get('amount').value).toFixed(2)
    formData.amount=fixedAmount;
    formData.currency=this.amountTransForm.get('currency').value; 
    formData.applicant_id=this.applicant_id;
    formData.payment_cards_id=parseInt(this.id);
    formData.orderDescriptor="test";
    let obj=this.currencyData.filter(({currency}) => currency == this.currency);
    formData.account_number=obj[0]['account_no']

    delete formData["card_name"];
    delete formData["card_number"];
    delete formData["card_exp"];
    this.homeService.AddCurrMoney(formData).subscribe(res => {
      if(res['status']==1){
        if(res['payStatus']=='fail'){
          this.loader=false;
          this.prevcurrTransForm=false;
          this.alert.error(res['transactionInfo']['description'])
        }
        else if(res['payStatus']=='success'){
          this.loader=false;
          this.prevcurrTransForm=false;
          this.alert.success(res['transactionInfo']['description'])
          this.routerNavigate.navigate(['/home/account-index/transactions']);
        }
        else{
          this.loader=false;
          this.prevcurrTransForm=false;
          this.alert.error(res['message'])
        }
      
      }
      else if(res['status']==0){
        if(res['payStatus']=='fail'){
          this.loader=false;
          this.prevcurrTransForm=false;
          this.alert.error(res['transactionInfo']['description'])
        }
        else{
          this.loader=false;
          this.prevcurrTransForm=false;
          this.alert.error(res['message'])
        }
      }
     
    });
  }
  creditCardMask(credNumber){
    let char = "*"
    credNumber = credNumber.replace(/[^0-9]+/g, ''); /*ensureOnlyNumbers*/
    let l = credNumber.length;
    return credNumber.substring(0,0) + char.repeat(l-4) + credNumber.substring(l-4,l);
  }
  PreDiv(){
   this.currAmountTmpl=true; 
   this.addPaymentemplate=false;
   this.hideCurrBtn=true;
   this.currTransForm.reset();
   this.amountTransForm.reset();
  }
  ngOnInit() {
    this.applicant_id=this.profileData.userInfo.applicant_id;
    this.route.params.subscribe(param =>{
       this.id=this.route.snapshot.paramMap.get('id');
    this.homeService.getCardDetails(this.applicant_id).subscribe(res=>{
      if(res['status']==1){
        this.addPaymentemplate=false;
        this.hideCurrBtn=true;
         this.loader=false;
        this.prevcurrTransForm=false;
        this.currTransForm.reset();
        this.amountTransForm.reset();
         this.cardData=res['cards'];
         var obj =  this.cardData.filter(({payment_cards_id}) => payment_cards_id == this.id);
        this.CardDetails=obj[0];
      }
      if(res['status']==0){
        this.alert.error("failed");
       }
    })
     });

  this.amountTransForm=this.fb.group({
    amount  : ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])],
    currency:['',Validators.required],
    })
   this.currTransForm=this.fb.group({
      card_number: ["",Validators.required],   
      card_cvv:['', Validators.compose([Validators.required,Validators.pattern('^[0-9]*$')])],
      name_on_card:["", Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z ]*$')])],
      card_type:['',Validators.required],
      card_exp:['',Validators.required],
    })
}
}
