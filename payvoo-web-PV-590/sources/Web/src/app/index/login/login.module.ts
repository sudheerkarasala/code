import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { LoginrouteModule } from './loginroute.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    LoginrouteModule
  ]
})
export class LoginModule { 
  constructor(){
    console.log("login module")
  }
}
