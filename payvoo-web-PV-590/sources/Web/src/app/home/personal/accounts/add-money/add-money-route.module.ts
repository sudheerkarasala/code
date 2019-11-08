import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentsComponent } from './payments/payments.component';
import { CardsComponent } from './cards/cards.component';
import { CardsDetailsComponent } from './carddetails/cardsdetails.component';

export const addMoneyRoute: Routes = [
  {path:'payments/:id',component:PaymentsComponent},
  {path:'cards',component:CardsComponent},
  {path:'card-details/:id',component:CardsDetailsComponent},
]


@NgModule({
  imports: [RouterModule.forChild(addMoneyRoute)],
  exports:[RouterModule]

})

export class AddMoneyRouteModule { }
