import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../_services/api.service';

import { Router } from '../../../node_modules/@angular/router';
import { FormBuilder, FormGroup } from '../../../node_modules/@angular/forms';
import { StorageService } from '../../_services/storage.service';

@Component({
  selector: 'app-persional-perticulardetail',
  templateUrl: './persional-perticulardetail.component.html',
  styleUrls: ['./persional-perticulardetail.component.css']
})
export class PersionalPerticulardetailComponent implements OnInit {
  countryCode:any={}; 
  c_code;
  v_purpose;
  visitPurpose:any={};
  verifyResident:any=[];
  keyDetailFormGrops:FormGroup;
  visitorData;
  values = ['casul Visit', 'PM'];
  VisitorPurposeID = this.values[1];
  constructor(private router:Router,  private apiService:
    ApiService,  private _fb: FormBuilder,private storage:StorageService) { }

  public edited = true;

  userData;
  enableSubmit=0;
  resid;



  ngOnInit() {
    this.userData= this.storage.getItem("userData");
    let is_logged_in=this.storage.getItem("is_loggedIn");
    if(is_logged_in==1 && (is_logged_in!==undefined && is_logged_in!==null) )
    {
       //console.log("userData is "+JSON.stringify(this.userData));
       this.visitorData=this.storage.getItem("visitor_data");
       if(!this.visitorData)
       { 
         alert("Vistor data not available!");
         this.router.navigate(['persional-perticular']);//redirect to persional-perticular
       }
       else{ 
          this.keyDetailFormGrops = this._fb.group({
            DeploymentID: this.userData.DeploymentID,
            UnitNumber: '',
            DocType:this.visitorData.scan_option,
            ResidentMobile: '',
            VisitorName: this.visitorData.visitor_name,
            VisitorPhoto:'',
            ResidentID: this.resid,
            CountryCode: '',
            VisitorMobile: '',
            VehicleRegNumber: '',
            VisitorPurposeID: '',
          }); 
          
           

       }
    }
    else{
      this.router.navigate(['']);//redirect to root/login
    }
 
      //show box msg
      this.apiService.create(`general/getcountrycodes`, '').subscribe(response =>{
        this.countryCode =response; 
        this.c_code=response.CountryCodes[0].countrycode; 
      });

      this.apiService.create(`general/getvisitpurposes`, '').subscribe(response =>{
        this.visitPurpose =response;
        this.v_purpose=response.ShowVisitPurposes[0].visitpurposeid;
      });
  }

  verify()
  {

    const values = this.keyDetailFormGrops.value;
    this.apiService.create(`resident/verifyresident`, values).subscribe(response =>{
      if(response.ResidentInfo)
      {
        this.resid=response.ResidentInfo[0].ResidentID;
        this.enableSubmit=1;
      }
      else{
        this.enableSubmit=0;
      }

    });

  }
  
  dataURItoBlob(dataURI,image_type) {
    //console.log(dataURI)
    const byteString = atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([arrayBuffer], { type: image_type });    
    return blob;
 }
 
  getbyteArr(b64Data)
  {
    const byteCharacters = atob(b64Data);
	const byteNumbers = new Array(byteCharacters.length);
	for (let i = 0; i < byteCharacters.length; i++) {
		byteNumbers[i] = byteCharacters.charCodeAt(i);
	}
	const byteArray = new Uint8Array(byteNumbers);	
	return byteArray;
  }

  submit()
  {
    debugger;
    const values = this.keyDetailFormGrops.value;
    this.apiService.create(`resident/verifyresident`, values).subscribe(response =>{
      if(response.ResidentInfo!==null)
      {
        this.resid=response.ResidentInfo[0].ResidentID;
        if (this.resid!=null && this.resid>0){
          const values = this.keyDetailFormGrops.value;    
          values.ResidentID=this.resid;
          values.VisitorPhoto=this.visitorData.img_src;
          values[this.visitorData.scan_option]=this.visitorData.scan_opt_data;
       
          let image_ext_data=values.VisitorPhoto.split(";base64,");//data:image/jpeg;base64,
          const base64Str=image_ext_data[1]; 
          image_ext_data=image_ext_data[0]; 
          const image_ext=image_ext_data.replace("data:image/",""); 
          const image_type=image_ext_data.replace("data:","");
      
          // Naming the image
          const date = new Date().valueOf();
          let text = '';
          const possibleText = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
          for (let i = 0; i < 5; i++) {
            text += possibleText.charAt(Math.floor(Math.random() *    possibleText.length));
          }
          // Replace extension according to your media type
          const imageName = date + '.' + text + '.'+image_ext; 
          
          
          // call method that creates a blob from dataUri
          //const imageBlob = this.dataURItoBlob(base64Str,image_type);
          //const imageFile = new File([imageBlob], imageName, { type: image_type });
          //values.VisitorPhoto=imageBlob;   
      
          const byteArr=this.getbyteArr(base64Str);
          values.VisitorPhoto="";//byteArr; 
          debugger;          
          this.apiService.create(`resident/savevisitordetails`, values).subscribe(response =>{
            debugger;
            if(response.Message=='Success' && response.KioskPassID>0)
            {
              this.router.navigate(['/thankyou/']);          
            }
            else{
              alert(response.message)
            }
          });//this.apiService.create
        }//this.resid!=null && this.resid>0
        else{
          alert(response.message);
        }
        
      }//if(response.ResidentInfo)
      else{
        alert(response.message);
      }
    });// VerifyResident
  }// submit method


  onClick(url?: string) { 
    if (url) {
      this.router.navigate([url]);
    }

  }
}
