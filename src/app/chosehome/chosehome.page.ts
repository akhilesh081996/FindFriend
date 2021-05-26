import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { throwIfEmpty } from 'rxjs/operators';
import { AllServicesService } from '../all-services.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-chosehome',
  templateUrl: './chosehome.page.html',
  styleUrls: ['./chosehome.page.scss'],
})
export class ChosehomePage implements OnInit {
  userDetails
  res ;
  activeDay: boolean;
  latitude: number;
  longitude: number;

  constructor(
    public storage: Storage,
    public router: Router,
    public allServicesService: AllServicesService,
    private geolocation: Geolocation,
  ) { }
  ionViewWillEnter(){
    this.storage.get('user').then(userInfo => {
      this.userDetails = userInfo
      this.GetUserProfile()
    })
  }
  ngOnInit() {
    this.storage.get('user').then(userInfo => {
      this.userDetails = userInfo
      this.GetUserProfile()
    })
    this.GetLocation();
  }

  GetLocation() {
    var locladdress = localStorage.getItem('changeaddress')
    if(locladdress){
    }else{
      this.geolocation.getCurrentPosition().then((resp) => {
        this.latitude = resp.coords.latitude;
        this.longitude = resp.coords.longitude;
        // this.getAddress()
      }).catch((error) => {
        // this.getAddress()
      });
    }

  }

  GetUserProfile() {
    this.allServicesService.getData('getProfile/?token=' + this.userDetails.token + '&type=private').subscribe(data => {
      this.res = data;
      if(this.res['working'].is_friday == true  || this.res['working'].is_monday == true || this.res['working'].is_saturdy == true || this.res['working'].is_sunday == true || this.res['working'].is_thursday == true || this.res['working'].is_tuesday == true || this.res['working'].is_wednesday == true){
        this.activeDay = true
      }else{
        this.activeDay = false
      }
    }, (err) => {
      this.allServicesService.dismissLoading()
      this.allServicesService.presentAlert(err.error.errormsg);
    })
}
  updateprofile(){
    if(this.activeDay == true){
      this.router.navigate(['/availability',this.userDetails.user_id,'private']);
    }else{
      this.allServicesService.showLoader()
      const  option ={
        'userserviceinfo':1,
        'is_monday':true,
        'mondaytime': ["8:00 AM"]
        }
        this.allServicesService.sendData('updateProfileCompany/?token=' + this.userDetails.token, option).subscribe(data => {
          this.allServicesService.dismissLoading()
          this.router.navigate(['/availability',this.userDetails.user_id,'private']);
        }, (err) => { 
          
          if (err.error.error_code == "user_expire") {
            this.router.navigate(['/home']);
          }
          this.allServicesService.presentAlert(err.error.errormsg);
        })
    }
     
    }
   

  }
