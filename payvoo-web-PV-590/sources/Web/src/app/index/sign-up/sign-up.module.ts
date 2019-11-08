import { NgModule } from '@angular/core';
import { SignUpComponent } from './sign-up.component';
import { SignUpRouteModule } from './sign-up-route.module';


@NgModule({
  declarations: [SignUpComponent],
  imports: [
    SignUpRouteModule
  ]
})
export class SignUpModule { 
  constructor(){
    console.log("sing up module")
  }
}
