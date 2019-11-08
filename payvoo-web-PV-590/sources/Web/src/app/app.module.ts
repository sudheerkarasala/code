import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component'; 
import { HomeComponent } from './home/home.component';
import { NoPageComponent } from './no-page/no-page.component';
import { ToastrModule } from './core/toastr-notification/toastr.module';
import { AppRouterModule } from './app.router.module';
import { HttpclientService } from './core/shared/httpclient.service';
import { InterceptorsService } from './core/interceptors/interceptors.service';


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    HomeComponent,
    NoPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRouterModule,
    ToastrModule,
    HttpClientModule
  ],
  providers: [HttpclientService,{
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorsService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(){
    console.log("app module")
  }
 }
