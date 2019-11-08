import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { HomeService } from 'src/app/core/shared/home.service';
import * as _ from "lodash";
declare var $: any;

import { NotificationService } from 'src/app/core/toastr-notification/toastr-notification.service';

@Component({
  selector: 'app-deletecards',
  templateUrl: './cardsdetails.component.html',
  styleUrls: ['./cardsdetails.component.scss']
})
export class CardsDetailsComponent implements OnInit {
  applicant_id: any;
  profileData: any;
  cardData: any;
  CardDetails: any;
  id: any;
  constructor(private routerNavigate:Router,private route: ActivatedRoute,private homeService:HomeService,private alert:NotificationService) { 
    this.profileData=JSON.parse(sessionStorage.getItem('userData'));
  }
  deleteCard(){
    var obj={
      payment_cards_id:this.id,
      isActive:0
    }
    this.homeService.deleteCard(obj).subscribe(res=>{
      if(res['status']==1){
        $("#myModal").modal('hide');
        $("#confirm_delete").modal('show');
      }
      if(res['status']==0){
        this.alert.error("failed")
       }
    })
  }
  creditCardMask(credNumber){
    let char = "*"
    credNumber = credNumber.replace(/[^0-9]+/g, ''); /*ensureOnlyNumbers*/
    let l = credNumber.length;
    return credNumber.substring(0,0) + char.repeat(l-4) + credNumber.substring(l-4,l);
  }
  confirmPopClose(){
    $("#confirm_delete").modal('hide');
    this.routerNavigate.navigate(['/add-money']);
  }
  ngOnInit() {
    this.applicant_id=this.profileData.userInfo.applicant_id;
    this.route.params.subscribe(param =>{
       this.id=this.route.snapshot.paramMap.get('id');
    this.homeService.getCardDetails(this.applicant_id).subscribe(res=>{
      if(res['status']==1){
         this.cardData=res['cards'];
         var obj =  this.cardData.filter(({payment_cards_id}) => payment_cards_id == this.id);
        this.CardDetails=obj[0];
      }
      if(res['status']==0){
        this.alert.error("failed");
       }
    })
     });
  }
  
}
