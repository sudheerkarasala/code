import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators,FormGroup,FormControl} from '@angular/forms';
import { IndexService } from "../../../core/shared/index.service";
import { ActivatedRoute,Router } from '@angular/router';
import { NotificationService } from 'src/app/core/toastr-notification/toastr-notification.service';

@Component({
  selector: 'app-sandbox-forgot',
  templateUrl: './sandbox-forgot.component.html',
  styleUrls: ['./sandbox-forgot.component.scss']
})
export class SandboxForgotComponent implements OnInit {

  sandboxforgot:boolean=true;
  sandboxreset:boolean=false;
  confirm:boolean=false;
  forgotForm:FormGroup;
  resetpwd:FormGroup;
  email_id:any;
  match:boolean=false;
  passwordcompleteFeildSet:boolean=false;
  createPassword:any;
  repeatPassword:any;
  checkPassword:boolean=false;

  constructor(private fb:FormBuilder,private indexService: IndexService,private alert:NotificationService,private route:ActivatedRoute,private routerNavigate:Router) {
    this.email_id=this.route.snapshot.paramMap.get("id");
    this.showreset();
   }


  forgotAction(){
    let request={};
    request['account_type']="sandbox",
    request['email']=this.forgotForm.get('email').value;
    this.indexService.forgotPasswordBusiness(request).subscribe(response => {
    if(response.status==1){
      this.alert.error(response['message']);
    }
    if(response.status==0){
       this.alert.success(response.message);
    }
    });
  }

  showreset()
  {
    if(this.email_id)
    {
      this.sandboxforgot=false;
      this.sandboxreset=true;
    }
  }

  chcekpwd()
  {
    let obj={};
    obj['account_type']="sandbox",
    obj['id']=this.email_id;
    obj['password']=this.resetpwd.get('newpassword').value;
    if(this.resetpwd.get('newpassword').value===this.resetpwd.get('confirmpassword').value)
    {
        this.match=false;
        this.indexService.checkPassword(obj).subscribe(response => {
        if(response.status==1)
        {
          this.alert.error(response['message'])
        }
        if(response.status==0)
        {
           this.sandboxreset=false;
           this.confirm=true;
        }
        });
    }
    else
    {
        this.match=true;
    }
    
  }

  ngOnInit() {

    this.forgotForm = this.fb.group({
      email: new FormControl('', Validators.compose([Validators.required,Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')])),
    });

    this.resetpwd = this.fb.group({
      newpassword: new FormControl('', Validators.compose([Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?!.*[-!$%^&*()_+|~=^`{}[:;<>?,.@#\ ]).{8,}')])),
      confirmpassword: new FormControl('', Validators.compose([Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?!.*[-!$%^&*()_+|~=^`{}[:;<>?,.@#\ ]).{8,}')])),
    });

    this.resetpwd.get('newpassword').valueChanges.subscribe((value) => {
      this.createPassword=value;
    });
    this.resetpwd.get('confirmpassword').valueChanges.subscribe((value)=>{
      this.repeatPassword=value;
      if(this.createPassword===this.repeatPassword){
       this.checkPassword=false;
      }
      else{
       this.checkPassword=true;
      }
    });



  }


  chooselogin()
  {
    this.routerNavigate.navigate(['/sandboxlogin']);
  }




}
