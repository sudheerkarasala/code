import { ActivatedRoute,Router } from '@angular/router';
import { FormBuilder,Validators,FormGroup,FormControl} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { IndexService } from "../../../core/shared/index.service";
import { NotificationService } from 'src/app/core/toastr-notification/toastr-notification.service';

@Component({
  selector: 'app-business-forgot',
  templateUrl: './business-forgot.component.html',
  styleUrls: ['./business-forgot.component.scss']
})
export class BusinessForgotComponent implements OnInit {

  forgotPassword:FormGroup;
  business_mail:boolean=true;
  reset_mail:boolean;
  error:boolean=false;
  profileData:any;
  applicant_id:any;
  email_id:any;
  match:boolean=false;
  passwordcompleteFeildSet:boolean=false;


  constructor(private fb:FormBuilder,private indexService: IndexService,private alert:NotificationService,private route:ActivatedRoute,private routerNavigate:Router)
  {
    
    this.email_id=this.route.snapshot.paramMap.get("id");
    this.showreset();
    
  }



  ngOnInit() {
  
    this.forgotPassword = this.fb.group({
      email: new FormControl('', Validators.compose([Validators.required,Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')])),
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
       this.alert.error("There is no user,please verify")
    }
    if(response.status==1)
    {
       this.alert.success(response.message);
    }
    });

  }

  showreset()
  {
    if(this.email_id)
    {
      this.business_mail=false;
      this.reset_mail=true;
    }
  }



  chcekpwd()
  {
    let obj={};
    obj['account_type']="business",
    obj['id']=this.email_id;
    obj['password']=this.forgotPassword.get('newpwd').value;
    if(this.forgotPassword.get('oldpwd').value===this.forgotPassword.get('newpwd').value)
    {
        this.match=false;
        this.indexService.checkPassword(obj).subscribe(response => {
        if(response.status==0)
        {
             this.alert.error("Please try again");
        }
        if(response.status==1)
        {
           this.reset_mail=false;
           this.passwordcompleteFeildSet=true;
        }
        });
    }
    else
    {
        this.match=true;
    }
    
  }



  chooselogin()
  {
    this.routerNavigate.navigate(['/business-login']);
  }



  }



