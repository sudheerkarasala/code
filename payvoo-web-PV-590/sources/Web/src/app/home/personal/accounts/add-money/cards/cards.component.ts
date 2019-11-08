import { AddMoneyComponent } from './../add-money.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/core/shared/home.service';
import { NotificationService } from 'src/app/core/toastr-notification/toastr-notification.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  cardDetailsForm: FormGroup
  profileData: any;
  applicant_id: any;
  type: any;
  flag: boolean = false;
  cardNumber: any;

  constructor(private fb: FormBuilder, private homeService: HomeService,  private addMoneyComp: AddMoneyComponent,private alert:NotificationService) {
    this.profileData = JSON.parse(sessionStorage.getItem('userData'));
  }
  submitCard(formData: any) {
    formData.card_month=formData.card_exp.substring(0,2);
    formData.card_year=formData.card_exp.slice(-4);
    delete formData["card_exp"];
    formData.applicant_id = this.profileData.userInfo.applicant_id;
    this.homeService.submitCard(formData).subscribe(res => {
      if (res['status'] == 1) {
        this.alert.success("Card details Submitted");
        this.cardDetailsForm.reset();
        this.type = ''
        this.addMoneyComp.getCardDetails();
       } else if (res['status'] == 0) {
         this.alert.error("Card already submitted");
      }
    })
  }
  getCardType(cardNumber) {
    if (cardNumber.length == 4) {
      this.homeService.getValidCardDetails(cardNumber).subscribe(res => {
        if (res['status'] = 1) {
          this.flag = true
          this.type = res['type'];
          this.cardDetailsForm.patchValue({
            'card_type': this.type
          })
        }
        else {
          this.alert.error("Invalid card")
          this.type = '';
        }
      })
    }
    else {
      if (this.flag) {
        this.type = this.type;
      }
      if (cardNumber.length <= 4) {
        this.type = ''
      }

    }
  }

  ngOnInit() {
    this.cardDetailsForm = this.fb.group({
      card_number: ["", Validators.compose([Validators.required, Validators.pattern('^[0-9 ]*$')])],
      card_cvv: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])],
      name_on_card:["", Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z ]*$')])],
      card_type: ['', Validators.required],
      card_exp: ['', Validators.required],
    })


  }

}
