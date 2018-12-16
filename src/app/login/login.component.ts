import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';
import { AuthenticationService } from '../../_services/authentication.service';
import { ApiService } from '../../_services/api.service';
import { StorageService } from '../../_services/storage.service';
import { FormGroup } from '@angular/forms/src/model';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup;
  isSubmit: boolean;
  isLoginSubmit: boolean;
  errorMessage: any = {};
  userDetails: any;
  verifyMessage: string;
  isLoading: boolean;
  loggedIn: boolean;
  userData;

  @Output() onLoggin: EventEmitter<any> = new EventEmitter();
  constructor(private router:Router, private authenticationService: AuthenticationService,  private apiService:
    ApiService,  private _fb: FormBuilder,private storage:StorageService ) { }

  ngOnInit() {

    this.userData= this.storage.getItem("userData");
    let is_logged_in=this.storage.getItem("is_loggedIn");
    if(is_logged_in==1 && (is_logged_in!==undefined && is_logged_in!==null) )
    {
      this.router.navigate(['/register/']);//redirect to inside application
    }
     


    this.loginFormGroup = this._fb.group({
      UserName: ['', Validators.required],
      Password: ['', Validators.required],
    });
  }


  login() {
    this.isLoginSubmit = true;
    this.authenticationService.login(this.loginFormGroup.value).subscribe(response => {
      //debugger;
      if (response.Message === 'Success') {

        this.storage.setItem("userData",response);
        this.storage.setItem("is_loggedIn", 1);

        this.router.navigate(['/register/']);
        const userdata = response;
        this.authenticationService.emitLoginEvent(response);
        this.onLoggin.emit(userdata);
      }
      else{

        alert('Credentials mismatch, Please Contact your Supervisor');

      }
    }, (Message) => {
      this.errorMessage = Message.json();
      this.errorMessage.error('System Error!');
    });
  }


}



