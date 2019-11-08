import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NoPageComponent } from './no-page/no-page.component';
export const routes: Routes = [
  {path:'',loadChildren:'src/app/landing/landing.module#LandingModule'},
  {path:'index',loadChildren:'src/app/index/index.module#IndexModule'},
  {path:'home',loadChildren:'src/app/home/home.module#HomeModule'},  
  {path:'**',component:NoPageComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports:[RouterModule],
 
})
   export class AppRouterModule { }
