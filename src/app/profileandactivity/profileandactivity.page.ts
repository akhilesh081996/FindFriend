import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';
import { AllServicesService } from '../all-services.service';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { DrawerState } from './../modules/ion-bottom-drawer/drawer-state';  
import 'hammerjs'; 
declare var google;
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';

@Component({
  selector: 'app-profileandactivity',
  templateUrl: './profileandactivity.page.html',
  styleUrls: ['./profileandactivity.page.scss'],
})
export class ProfileandactivityPage implements OnInit {
  address = ''
  datetime = []
  SlideOptionsPaths =
  {
      initialSlide: 0,
      centeredSlides: true,
      slidesPerView: 1.2,
      slidesPerGroup: 1,
      spaceBetween: 10,
      //slidesOffsetBefore: -82,
      //slidesOffsetAfter: 160,
      speed: 400,
      fadeEffect:
      {
          crossFade: true
      }
  };
  @ViewChild('map', { static: false }) mapElement: ElementRef;
  map: any;
  mapView: boolean = false;
  drawerOptions: any;
  directionsDisplay = new google.maps.DirectionsRenderer;
  user: any;
  res: any;
  serviceReady: boolean = false;
  list: any;
  barberReady: any;
  barberlist: any;
  barberlist_map:any;
  marker: any = [];
  latitude: any 
  longitude: any 
  disableDrag = false;
  dockedHeight :any= 200;
  height_cm:any=0;
  distanceTop = 275;
  minimumHeight = 200 ;
  drawerState = DrawerState.Docked;
  states = DrawerState;
  searchQuery: any;
  shouldBounce = true
  dateprm = '';
  timeprm = '';
  loadingSpinner = false
  constructor(
    public allServicesService: AllServicesService,
    public loadingCtrl: LoadingController,
    public router: Router,
    public route: ActivatedRoute,
    public navCtrl: NavController,
    private geolocation: Geolocation,
    public alertCtrl: AlertController,
    public storage: Storage,
    public nativeGeocoder:NativeGeocoder,
    private ref: ChangeDetectorRef, 
  ) {
  }
  ionViewWillEnter(){
    this.storage.get('user').then(userInfo => {
      this.user = userInfo;
      this.dateprm = ''
      this.timeprm = ''
      this.loadingSpinner  = true
      this.GetLocation();
      setTimeout(
        (z) => {
          this.route.queryParams.subscribe((params) => {
            if (params && params.val) {
              this.datetime = JSON.parse(params.val)
              this.dateprm = this.datetime['date']
              this.timeprm = this.datetime['time']
            this.GetLocation();
            }
          })
        }, 500)

      this.allServicesService.SaveAutoConfiqure(this.user.token);
  })
  }
  setCurrentLocation() {
		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition((position) => {
				this.latitude = position.coords.latitude;
				this.longitude = position.coords.longitude;
				this.GetUsersMap(this.latitude, this.longitude);
			});
		}
	}
  GetLocation() {
    var locladdress = localStorage.getItem('changeaddress')
    if(locladdress){
      var newloc = JSON.parse(locladdress)
      this.latitude = newloc.lat;
      this.longitude = newloc.long;
      this.address = newloc.address
      this.GetUsersMap(this.latitude, this.longitude);
    }else{
      this.geolocation.getCurrentPosition().then((resp) => {
        this.latitude = resp.coords.latitude;
        this.longitude = resp.coords.longitude;
        this.GetUsersMap(this.latitude, this.longitude);
        this.getAddress()
      }).catch((error) => {
        this.GetUsersMap(this.latitude, this.longitude);
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
          }, (err) => { 
            if (err.error.error_code == "user_expire") {
              this.router.navigate(['/home']);
            }
            this.allServicesService.presentAlert(err.error.errormsg);
          })
      }
      })
    .catch((error: any) => {
    });
  }
  ngOnInit() {
    this.storage.get('user').then(userInfo => {
      this.user = userInfo;
      this.dateprm = ''
      this.timeprm = ''
      this.loadingSpinner  = true
      this.GetLocation();
      setTimeout(
        (z) => {
          this.route.queryParams.subscribe((params) => {
            if (params && params.val) {
              this.datetime = JSON.parse(params.val)
              this.dateprm = this.datetime['date']
              this.timeprm = this.datetime['time']
            this.GetLocation();
            }
          })
        }, 500)

      this.allServicesService.SaveAutoConfiqure(this.user.token);
  })
  }
  updateAddress(){
      var geocoder = new google.maps.Geocoder();
      var address = this.address;
      var self = this
      this.loadingSpinner = true
      geocoder.geocode({ 'address': 'zipcode '+address }, function (results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
              var latitude = results[0].geometry.location.lat();
              var longitude = results[0].geometry.location.lng();
            self.GetUsersMap(latitude,longitude)
          } else {
          }
      });
  //   let options: NativeGeocoderOptions = {
  //     useLocale: true,
  //     maxResults: 5
  //   }
  //   this.nativeGeocoder.forwardGeocode(this.address, options).then((result: NativeGeocoderResult[]) => {
  //   this.GetUsersMap(result[0].latitude,result[0].longitude)
  // })
  // .catch((error: any) => {
  // });
  }
  async GetServices() {
    this.allServicesService.getData('getServices').subscribe(data => {
      this.res = data;
      if (this.res.status = 'ok') {
        this.list = this.res.list;
      }
    }, (err) => {
      this.allServicesService.presentAlert("something went wrong, please inform app admin.");
    })
  }
  async GetUsersMap(latitude, longitude) {
    this.allServicesService.getData('get_user_role_wise/?type=&role=&latitude=' + latitude + '&longitude=' + longitude+'&user_id='+this.user.user_id+'&filter_date='+this.dateprm+'&filter_time='+this.timeprm).subscribe(data => {
    this.ref.detectChanges(); // trigger change detection cycle
      this.loadingSpinner = false
      this.res = data;
      if (this.res.status = 'ok') {
        this.barberReady = true;
        this.barberlist_map = this.res.list;
      }
    }, (err) => {
      this.loadingSpinner = false
      this.barberReady = true;
      this.allServicesService.presentAlert("something went wrong, please inform app admin.");
    })
  }
}
