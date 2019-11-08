/**
* Userprofile Component
* its a user profile component of the the personal account used to get user kyc status and kyc activation.
* @package UserprofileComponent
* @subpackage app\home\personal\userprofile\UserprofileComponent
* @author SEPA Cyber Technologies, Sayyad M.
*/

import { Component, OnInit} from '@angular/core';
import { HomeService } from '../../../core/shared/home.service';
import { NotificationService } from 'src/app/core/toastr-notification/toastr-notification.service';
declare var $;

@Component({
  selector: 'user-profile',
  templateUrl: './personalprofile.component.html',
  styleUrls: ['./personalprofile.component.scss']
})
export class PersonalprofileComponent implements OnInit {

  authToken: any;
  profileIfno: any = [];
  smslinkBox: boolean = true;
  identId: any;
  identLoader: boolean = false;
  KYCStatus: any;
  isIdentId:boolean=false;

  constructor(private hoemsService: HomeService, private alert:NotificationService) {
    // this.iDKnowLogin(); 
    this.profileIfno = JSON.parse(sessionStorage.getItem('userData'))
    this.getKYCStatus();
  }

  getKYCStatus() {
    this.hoemsService.getKYCStatus(this.profileIfno.userInfo.email).subscribe(res => {
      this.KYCStatus = res.kyc_status;
    })
  }

  SubmitForKYC() {
    this.identId = '';
    this.smslinkBox = true;
    this.identLoader = true;
    this.hoemsService.SubmitForKYC(this.profileIfno.userInfo.applicant_id).subscribe(res => {
      if (res.status == 0) {
        this.isIdentId=true;
        this.alert.error(res.message)
      } else if(res.status==1) {
        this.identId = res['data']['id'];
        this.isIdentId=false;
        this.identLoader = false;
      
      }
    })
  }

  KYClinkToMobile(mobilePlatform) {
    this.smslinkBox = false;
    this.hoemsService.KYClinkToMobile(this.profileIfno.userInfo.mobile, this.profileIfno.userInfo.email, mobilePlatform, this.identId).subscribe(res => {
    })
  }
  clearFlag(){
    this.smslinkBox = true;
  }

  ngOnInit() {
    $(document).ready(function(){
        $('#commingSoonPopup').modal({
      });
     });
  }
}
