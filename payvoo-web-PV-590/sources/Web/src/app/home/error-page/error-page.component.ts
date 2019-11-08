import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators,FormGroup,FormControl} from '@angular/forms';
import { IndexService } from "../../core/shared/index.service";
import { NotificationService } from 'src/app/core/toastr-notification/toastr-notification.service';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {

  forgotPassword:FormGroup;
  business_mail:boolean=true;
  reset_mail:boolean;
  error:boolean=false;
  profileData:any;
  applicant_id:any;

  constructor(private fb:FormBuilder,private indexService: IndexService,private _notificationservice:NotificationService)
  {
     this.profileData = JSON.parse(sessionStorage.getItem('userData'));
     this.applicant_id = this.profileData.userInfo.applicantId;
  }

  ngOnInit() {
  
    this.forgotPassword = this.fb.group({

      email: new FormControl('', Validators.required),
      oldpwd: new FormControl('', Validators.required),
      newpwd: new FormControl('', Validators.required)

    });

  }

  checkdata()
  {
    let request={};
    request['account_type']="business",
    request['email']=this.forgotPassword.get('email').value;
    this.indexService.forgotPasswordBusiness(request).subscribe(response => {
    if(response.status==0)
    {
       this._notificationservice.error("There is no user,please verify");  
    }
    if(response.status==1)
    {
       this.business_mail=false;
       this.reset_mail=true;
    }
    });
  }

  chcekpwd()
  {
    let obj={};
    obj['oldPassword']=this.forgotPassword.get('oldpwd').value,
    obj['newPassword']=this.forgotPassword.get('newpwd').value,
    obj['applicant_id']=this.applicant_id;
    obj['account_type']="business",
    this.indexService.checkPassword(obj).subscribe(response => {
    if(response.status==0)
    {
         this._notificationservice.error("Please enter valid old password");  
    }
    if(response.status==1)
    {
        this._notificationservice.success("Password changed successfully");  

    }
    });
  }
}
