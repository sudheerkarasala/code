import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GetaccountsComponent } from './getaccounts/getaccounts.component';
import { TransactionsComponent } from './transactions/transactions.component';

export const accountRoute: Routes = [
  {path:'',component:GetaccountsComponent},
  {path:'getaccount',component:GetaccountsComponent},
  {path:'transactions',component:TransactionsComponent}, 
]


@NgModule({
  imports: [RouterModule.forChild(accountRoute)],
  exports:[RouterModule]

})
export class AccountIndexRouteModule { }
