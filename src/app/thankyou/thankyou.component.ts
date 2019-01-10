import { Component, OnInit } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';
import { StorageService } from '../../_services/storage.service';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.css']
})
export class ThankyouComponent implements OnInit {
  public edited = true;
  public thankyoum = true;
  userData;
  visitorData;
  visitor_name="User Name"
  constructor(private router:Router, private storage: StorageService) { }

  ngOnInit() {

    this.userData= this.storage.getItem("userData");
    let is_logged_in=this.storage.getItem("is_loggedIn");
    if(is_logged_in==1 && (is_logged_in!==undefined && is_logged_in!==null) )
    {
      this.visitorData=this.storage.getItem("visitor_data");
      
       if(!this.visitorData)
       { 
         alert("Vistor data not available!");
         this.router.navigate(['persional-perticular']);//redirect to persional-perticular
       }
       else{
         console.log("Hey I am done!!");
        this.visitor_name=this.visitorData.visitor_name;
        let temp_user_data = this.storage.getItem("userData");
        let temp_is_logged_in = this.storage.getItem('is_loggedIn');
        this.storage.clearAll()
        this.storage.setItem("userData",temp_user_data);
        this.storage.setItem("is_loggedIn", temp_is_logged_in);
  
       }
    }
    else{
      this.router.navigate(['/home/']);//redirect to root/login
    }

    setTimeout(function() {
      this.edited = false;
      console.log(this.edited);
  }.bind(this), 2000);


  setTimeout(function() {

    this.thankyoum = false;
    console.log(this.edited);
}.bind(this), 4000);

setTimeout(() => {
  this.router.navigate(['home']);
}, 15000);  //5s

  }

}
