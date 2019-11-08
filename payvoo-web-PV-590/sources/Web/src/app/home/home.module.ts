
/**
* HomeModule
* its manages the dependencies in home module
* @package HomeModule
* @subpackage app\home\HomeModule
* @author SEPA Cyber Technologies, Sayyad M.
*/ 
import { NgModule } from '@angular/core';
import { ReactiveFormsModule }  from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BnNgIdleService } from 'bn-ng-idle';
import { PersonalprofileComponent } from './profile/personal/personalprofile.component'; // import bn-ng-idle service
import { FormsModule } from '@angular/forms';
import { ApplicationComponent } from './business/application/bus-application.component';
import {NgxPaginationModule} from 'ngx-pagination';
import * as _ from "lodash";
import { ErrorPageComponent } from './error-page/error-page.component';
import { AddMoneyComponent } from './personal/accounts/add-money/add-money.component';
import { CardsComponent } from './personal/accounts/add-money/cards/cards.component';
import { CardsDetailsComponent } from './personal/accounts/add-money/carddetails/cardsdetails.component';
import { PaymentsComponent } from './personal/accounts/add-money/payments/payments.component';
import { AddAccountComponent } from './personal/accounts/account-index/add-account.component';
import { GetaccountsComponent } from './personal/accounts/account-index/getaccounts/getaccounts.component';
import { TransactionsComponent } from './personal/accounts/account-index/transactions/transactions.component';
import { ExchangeComponent } from './personal/accounts/exchange/exchange.component';
import { SandboxComponent } from './business/sandbox/sandbox.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { RatesComponent } from './personal/accounts/exchange/rates/rates.component';
import { ConvertorComponent } from './personal/accounts/exchange/convertor/convertor.component';
import { ActionComponent } from './personal/accounts/exchange/action/action.component';
import {NgxMaskModule} from 'ngx-mask';
import { DecimalDirective } from './personal/accounts/exchange/decimal.directive';
import { AuthService } from '../core/shared/auth.service';
import { AuthGuard } from '../core/gaurds/auth.guard';
import {HomeRouterModule } from './home.router.module';
import { UsersComponent } from './profile/users.component';


@NgModule({
  declarations: [
    PersonalprofileComponent,UsersComponent, ApplicationComponent, 
     ErrorPageComponent, 
     AddMoneyComponent, CardsDetailsComponent,CardsComponent, PaymentsComponent,AddAccountComponent,
    GetaccountsComponent,TransactionsComponent, ExchangeComponent,SandboxComponent, RatesComponent, ConvertorComponent, ActionComponent, DecimalDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    HomeRouterModule,
    Ng2SearchPipeModule,
    NgxMaskModule.forRoot()
  ],
  providers: [BnNgIdleService,AuthService,AuthGuard],
})
export class HomeModule {
  constructor(){
    console.log("home module")
  }
 }
