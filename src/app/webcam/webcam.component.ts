import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import { Router } from '../../../node_modules/@angular/router';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import { StorageService } from '../../_services/storage.service';

@Component({
  selector: 'app-webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.css']
})
export class WebcamComponent implements OnInit {

  constructor(private storage:StorageService,private router:Router) { }

  
  //webcam varriable//
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal: 576}
  };
  public errors: WebcamInitError[] = [];

  // latest snapshot
  public webcamImage: WebcamImage = null;

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();
  //webcam varriable//
  img_src;

  ngOnInit() {

    WebcamUtil.getAvailableVideoInputs()
    .then((mediaDevices: MediaDeviceInfo[]) => {
      this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
    });

    this.img_src = './assets/img/user-img.png';//by default show the picture

  }

  PickPhoto()
  {
    if(this.webcamImage)
    {
     let visitorData=this.storage.getItem("visitor_data");
     if(visitorData)
     {
      visitorData.img_src=this.webcamImage.imageAsDataUrl;
      this.storage.setItem("visitor_data",visitorData);
     }
     else{
       const vdata={ visitor_name:'',
       scan_opt_data:'',
       img_src:'',
       scan_option:''};
       vdata.img_src=this.webcamImage.imageAsDataUrl;
       this.storage.setItem("visitor_data",vdata);
     }
    
     
     this.router.navigate(['/persional-perticular/']);
    }
    else
    {
      alert("Please capture photo atleast 1 time!")
    }
    
  }

  onClick(url?: string) {
    if (url) {
      this.router.navigate([url]);
    }

  }
  
  //web cam methods//
  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public showNextWebcam(directionOrDeviceId: boolean|string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
  }

  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean|string> {
    return this.nextWebcam.asObservable();
  }
  //web cam methods//


}
