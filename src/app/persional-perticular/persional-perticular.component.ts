import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';
import { StorageService } from '../../_services/storage.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-persional-perticular',
  templateUrl: './persional-perticular.component.html',
  styleUrls: ['./persional-perticular.component.css']
})
export class PersionalPerticularComponent implements OnInit {
navClicked = false;
userData;
url: string;
 reader:any;
target:EventTarget;
DocHolderName="";
DocNumber="";

public files: any[];
ScanOptionValue;
profileFormGroup: FormGroup;
visitor_data:any={
  visitor_name:'',
  scan_opt_data:'',
  img_src:'',
  scan_option:'',
};


  constructor(private router:Router, private _fb: FormBuilder, private storage:StorageService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {

    this.DocHolderName=this.storage.getItem("DocHolderName");
    this.DocNumber=this.storage.getItem("DocNumber");

    this.profileFormGroup = this._fb.group({
      file: [null,]
    });
    this.userData= this.storage.getItem("userData");
    let is_logged_in=this.storage.getItem("is_loggedIn");
    if(is_logged_in==1 && (is_logged_in!==undefined && is_logged_in!==null) )
    {   
      this.ScanOptionValue=this.storage.getItem("ScanOptionValue"); 
      let visitorData=this.storage.getItem("visitor_data");
      if(!visitorData)
      { 
          this.visitor_data.img_src = './assets/img/user-img.png';//by default show the picture
      }
      else{
        this.visitor_data=visitorData;
      }
      
      
    }
    else{
      this.router.navigate(['']);//redirect to root/login
    }
    if(this.DocHolderName){
      this.visitor_data.visitor_name=this.DocHolderName;
    }
    if(this.DocNumber){
      this.visitor_data.scan_opt_data=this.DocNumber;
    }
  }


 
  onClick(url?: string) {
    if (url) {
      this.storage.setItem("visitor_data",this.visitor_data);
      this.router.navigate([url]);
    }
    this.navClicked = !this.navClicked;
  }

  SubmitData()
  {
    if( (this.visitor_data.visitor_name=='' || this.visitor_data.scan_opt_data=='') ) //|| (this.visitor_data.img_src=='' || this.visitor_data.img_src=='./assets/img/user-img.png') 
    {
      alert("Please Provide all details in the form!");
    }    
    else{
      //data is fine , we can proceed
      this.visitor_data.scan_option=this.ScanOptionValue;
      this.storage.setItem("visitor_data",this.visitor_data);
      this.router.navigate(['/persional-perticulardetail/']);
    }

  }


 
 
  onSelectFile(event) { // called each time file input changes
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();      
        reader.readAsDataURL(event.target.files[0]); // read file as data url  
        reader.onload = (imgsrc:any) => { // called once readAsDataURL is completed
          this.visitor_data.img_src = imgsrc.target.result;
        }
      }
  }



}
