import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { PersionalPerticularComponent } from './persional-perticular/persional-perticular.component';
import { PersionalPerticulardetailComponent } from './persional-perticulardetail/persional-perticulardetail.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { ScancardComponent } from './scancard/scancard.component';
import { LoginComponent } from './login/login.component';
import { WebcamComponent } from './webcam/webcam.component';




@Component({
  selector: 'selector-name',
  template: '<div></div>'
})
export class ToHomeComponent {
  constructor(private router: Router) {
    this.router.navigate(['']);
  }
}

const routes: Routes = [
  { path: 'home', component:  HomeComponent},
  { path: '', component:  LoginComponent},
  { path: 'register', component:  RegisterComponent},
  { path: 'scancard', component:  ScancardComponent},
  { path: 'persional-perticular', component:  PersionalPerticularComponent},
  { path: 'persional-perticulardetail', component:PersionalPerticulardetailComponent},
  { path: 'thankyou', component: ThankyouComponent},
  { path: 'webcam', component: WebcamComponent},

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: [
    ToHomeComponent
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
