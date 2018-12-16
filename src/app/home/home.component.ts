import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../_services/storage.service';
import { Router } from '../../../node_modules/@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userData;
  constructor(private storage:StorageService,private router:Router) { }

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

}
