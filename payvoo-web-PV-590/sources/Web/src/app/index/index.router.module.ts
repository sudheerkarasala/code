/**
* Index routes
* Routing configuration (features module)(lazy laoding) child components in index module
* @package Indexroutes
* @subpackage app\index\Indexroutes
* @author SEPA Cyber Technologies, Sayyad M.
*/

import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index.component';
import { LoginGuard } from '../core/gaurds/login.guard';
import { TermsofserviceComponent } from './sign-up/business/termsofservice/termsofservice.component';
import { InvitationLinkComponent } from './invitation-link/invitation-link.component';
import { AppleAppSiteAssociationComponent } from './apple-app-site-association/apple-app-site-association.component';
import { TermsofpolicyComponent } from './termsofpolicy/termsofpolicy.component'
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgotComponent } from './forgot/forgot.component';



export const Indexroutes: Routes = [
    {path:'',component:IndexComponent,canActivate:[LoginGuard],
    children:[
    {path:'login',component: LoginComponent,
     children:[{path:'',loadChildren:'src/app/index/login/login.module#LoginModule'}] 
    },
    {path:'signup',component: SignUpComponent,
     children:[{path:'',loadChildren:'src/app/index/sign-up/sign-up.module#SignUpModule'}] 
    },
    {path:'forgot',component: ForgotComponent,
    children:[{path:'',loadChildren:'src/app/index/forgot/forgot.module#ForgotModule'}] 
    },
    {path:'termsofservice',component:TermsofserviceComponent},
    {path:'verifyPerDetails',component:InvitationLinkComponent},
    {path:'apple-app-site-association',component:AppleAppSiteAssociationComponent},
    {path:'termsofpolicy',component:TermsofpolicyComponent}
    ]
   }
]
@NgModule({
    imports: [RouterModule.forChild(Indexroutes)],
    exports:[RouterModule]
  
  })
     export class IndexRouterModule { }
  