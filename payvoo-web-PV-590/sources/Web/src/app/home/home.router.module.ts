
/**
* HomeModule
* routing of the home components based on the account types.
* @package HomeRoutes
* @subpackage app\home\HomeRoutes
* @author SEPA Cyber Technologies, Sayyad M.
*/ 
import { HomeComponent } from './home.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/gaurds/auth.guard';
import { ErrorPageComponent } from './error-page/error-page.component';
import { SandboxComponent } from './business/sandbox/sandbox.component';
import { NgModule } from '@angular/core';
import { AddAccountComponent } from './personal/accounts/account-index/add-account.component';
import { ApplicationComponent } from './business/application/bus-application.component';
import { AddMoneyComponent } from './personal/accounts/add-money/add-money.component';
import { ExchangeComponent } from './personal/accounts/exchange/exchange.component';
import { UsersComponent } from './profile/users.component';


export const HomeRoutes: Routes = [
    {path:'',component:HomeComponent,
    children:[

    {path:'account-index',component:AddAccountComponent,canActivate:[AuthGuard],data:{userAccount:['Personal']},
    children:[
      {path:'',loadChildren:'src/app/home/personal/accounts/account-index/account-index.module#AccountIndexModule'}]
     },        

    {path:'add-money',component:AddMoneyComponent,canActivate:[AuthGuard],data:{userAccount:['Personal']},
    children:[
      {path:'',loadChildren:'src/app/home/personal/accounts/add-money/add-money.module#AddMoneyModule'}]
      },

    {path:'exchange',component:ExchangeComponent,canActivate:[AuthGuard],data:{userAccount:['Personal']},
    children:[ {path:'',loadChildren:'src/app/home/personal/accounts/exchange/exchange.module#ExchangeModule'}]
     },

     {path:'profile',component:UsersComponent,
    children:[
      {path:'',loadChildren:'src/app/home/profile/users.module#UsersModule'}]
     }, 

    {path:'business-application',component:ApplicationComponent,canActivate:[AuthGuard],data:{userAccount:['Business']}},
    {path:'sandbox',component:SandboxComponent,canActivate:[AuthGuard],data:{userAccount:['sandbox']}},
    {path:'error-page',component:ErrorPageComponent},
    ]
   }]
   
@NgModule({
  imports: [RouterModule.forChild(HomeRoutes)],
  exports:[RouterModule]

})
   export class HomeRouterModule { }
