import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AllServicesService } from '../all-services.service';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-findhomee',
  templateUrl: './findhomee.page.html',
  styleUrls: ['./findhomee.page.scss'],
})
export class FindhomeePage implements OnInit {
  user
  latitude: number;
  longitude: number;
  address
  constructor(
    public storage: Storage,
    public allServicesService: AllServicesService,
    public nativeGeocoder:NativeGeocoder,
    private geolocation: Geolocation,

  ) { }
  ngOnInit() {
  }

  
  ionViewWillEnter(){
    this.storage.get('user').then(userInfo => {
        this.user = userInfo;
        this.allServicesService.SaveAutoConfiqure(this.user.token);
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
  getAddress(){
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
  }
  this.nativeGeocoder.reverseGeocode(this.latitude,this.longitude, options)
    .then((result: NativeGeocoderResult[]) => {
      this.address = result[0]['subThoroughfare']+' ' + result[0]['thoroughfare']+' ' + result[0]['locality']+', ' + result[0]['administrativeArea']+' ' + result[0]['postalCode']
      if(this.address){
        const  option ={
          'shop_location' : this.address,
          }
          this.allServicesService.sendData('updateProfileCompany/?token=' + this.user.token, option).subscribe(data => {
          }, 
          (err) => { 
            this.allServicesService.presentAlert(err.error.errormsg);
          })
      }
      })
    .catch((error: any) => {
    });
  }
}
