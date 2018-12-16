import { Component, OnInit } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';
import { AuthenticationService } from '../../_services/authentication.service';
import { StorageService } from '../../_services/storage.service';
import { ApiService } from '../../_services/api.service';
import { FormBuilder } from '../../../node_modules/@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  navClicked = false;
  userData;
  stringToSplit;


  constructor(private router:Router,  private authenticationService: AuthenticationService,  private apiService:
    ApiService,  private _fb: FormBuilder,private storage:StorageService) { }

  ngOnInit() {

    this.userData= this.storage.getItem("userData");
    let is_logged_in=this.storage.getItem("is_loggedIn");
    if(is_logged_in==1 && (is_logged_in!==undefined && is_logged_in!==null) )
    {
    
     
    }
    else{
      this.router.navigate(['']);//redirect to root/login
    }


  }

  onClick(url?: string) {
    if (url) {
      this.router.navigate([url]);
    }

  }
}
