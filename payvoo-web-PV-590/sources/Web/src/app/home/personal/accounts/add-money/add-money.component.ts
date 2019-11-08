import { Component} from '@angular/core';
import { HomeService } from 'src/app/core/shared/home.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/toastr-notification/toastr-notification.service';

@Component({
  selector: 'app-add-money',
  templateUrl: './add-money.component.html',
  styleUrls: ['./add-money.component.scss']
})
export class AddMoneyComponent{
  profileData: any;
  applicant_id: any;
  cardData: any=[];
  constructor(private homeService:HomeService,private routerNavigate:Router,private alert:NotificationService) { 
    this.profileData=JSON.parse(sessionStorage.getItem('userData'));
    this.getCardDetails();
  }
  getCardDetails(){
    this.applicant_id=this.profileData.userInfo.applicant_id;
    this.homeService.getCardDetails(this.applicant_id).subscribe(res=>{
      if(res['status']=1){
       this.cardData=res['cards'];
      }
      if(res['status']=0){
       this.alert.error("Get card details failed")
       }
    })
  }
  creditCardMask(credNumber){
    let char = "*"
    credNumber = credNumber.replace(/[^0-9]+/g, ''); /*ensureOnlyNumbers*/
    let l = credNumber.length;
    return credNumber.substring(0,0) + char.repeat(l-4) + credNumber.substring(l-4,l);
  }
}
