import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';
import { StorageService } from '../../_services/storage.service';
import { ApiService } from 'src/_services/api.service';

@Component({
  selector: 'app-scancard',
  templateUrl: './scancard.component.html',
  styleUrls: ['./scancard.component.css']
})


export class ScancardComponent implements OnInit {
selectScanOption:string = '';
userData;
@Output() sendScanoption: EventEmitter <any> = new EventEmitter();
  constructor(private router:Router, private storage:StorageService,private apiService:
    ApiService) { }

  radioSelected;

scanOption: any = [
'NRIC',
'PASSPORT',
'DRIVING LICENSE',
'WORK PERMIT',

];
  scanner_setup=false;
  loading=false;
  ngOnInit() {
    this.userData= this.storage.getItem("userData");
    let is_logged_in=this.storage.getItem("is_loggedIn");
    if( (is_logged_in!==undefined && is_logged_in!==null) && is_logged_in==1  )
    {
      // console.log("userData is "+JSON.stringify(this.userData));       
      this.scanchangeHandler(this.scanOption[0]);  
    }
    else{
      this.router.navigate(['']);//redirect to root/login
    }
  }
  onClick(url?: string) {
    this.loading=true;
    this.apiService.get(`http://localhost/combiscan/scan/getdata`).subscribe(response =>{
      debugger;

      if (response.success){
        this.scanner_setup=true;
        this.storage.setItem("DocHolderName", response.DocHolderName); 
        this.storage.setItem("DocNumber", response.DocNumber); 
        if (url) {
          this.router.navigate([url]);
        }

      }else{
        alert("Scanner is not ready");
      }
      this.loading=false;
    }); 
    // this.storage.setItem("DocHolderName", "Sriram"); 
    // this.storage.setItem("DocNumber", "9999"); 

    if(!this.scanner_setup){
      // Use this block if need to do something with if code scanned.
    }else{
      if (url) {
        this.router.navigate([url]);
      }
    }
  }
 

 public scanchangeHandler(option){
    this.sendScanoption =option; 
    this.radioSelected=option; 
    this.storage.setItem("ScanOptionValue", option); 
  }
}
