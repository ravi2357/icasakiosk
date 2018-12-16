import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './route';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { PersionalPerticularComponent } from './persional-perticular/persional-perticular.component';
import { PersionalPerticulardetailComponent } from './persional-perticulardetail/persional-perticulardetail.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { ScancardComponent } from './scancard/scancard.component';
import { LoginComponent } from './login/login.component';
import { ApiService } from '../_services/api.service';
import { AuthenticationService } from '../_services/authentication.service';
import { FormsModule, ReactiveFormsModule } from '../../node_modules/@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import {WebcamModule} from 'ngx-webcam'
import { WebcamComponent } from './webcam/webcam.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    PersionalPerticularComponent,
    PersionalPerticulardetailComponent,
    ThankyouComponent,
    ScancardComponent,
    LoginComponent,
    WebcamComponent,

  ],
  imports: [
  BrowserModule,
  RouterModule,
  HttpModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  AppRoutingModule,
  WebcamModule,
  ],
  providers: [
    ApiService,
    AuthenticationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
