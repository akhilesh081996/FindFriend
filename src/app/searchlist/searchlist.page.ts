import { Component, OnInit } from '@angular/core';
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
@Component({
  selector: 'app-searchlist',
  templateUrl: './searchlist.page.html',
  styleUrls: ['./searchlist.page.scss'],
})
export class SearchlistPage implements OnInit {
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
  distanceTop = 100;
  drawerState = DrawerState.Docked;
  states = DrawerState;
  searchQuery: any;
  datetime = []

  constructor(
    public allServicesService: AllServicesService,
    public loadingCtrl: LoadingController,
    public router: Router,
    public route: ActivatedRoute,
    public navCtrl: NavController,
    private geolocation: Geolocation,
    public alertCtrl: AlertController,
    public storage: Storage
  ) {

    this.storage.get('user').then(userInfo => {
      if (userInfo != null) {
        this.user = userInfo;
        this.allServicesService.SaveAutoConfiqure(this.user.token);
      this.GetUsers(this.latitude, this.longitude,this.user['user_id']);
      }else{
        
      }
    },err=>{

    });
    this.GetServices();
    
    setTimeout(
      (z) => {
        this.GetLocation();
      }, 200);
      this.height_cm=(window.innerHeight-this.dockedHeight-52)+'px';
      this.drawerOptions = {
        handleHeight: 50,
        thresholdFromBottom: 200,
        thresholdFromTop: 200,
        bounceBack: true
      }
  }

  ionViewDidLoad() {


  }

  ionViewWillEnter(){
    this.storage.get('user').then(userInfo => {
      if (userInfo != null) {
        this.user = userInfo;
        this.allServicesService.SaveAutoConfiqure(this.user.token);
      }
    });
  }

  GetLocation() {
    var locladdress = localStorage.getItem('changeaddress')
    if(locladdress){
      var newloc = JSON.parse(locladdress)
      this.latitude = newloc.lat;
      this.longitude = newloc.long;
      this.GetUsers(this.latitude, this.longitude,this.user['user_id']);
    }else{
      this.geolocation.getCurrentPosition().then((resp) => {
        this.latitude = resp.coords.latitude;
        this.longitude = resp.coords.longitude;
        this.GetUsers(this.latitude, this.longitude,this.user['user_id']);
      }).catch((error) => {
        this.GetUsers(this.latitude, this.longitude,this.user['user_id']);
      });
    }
    // this.initMap();
  }

  ngOnInit() {
    
  }

  async GetServices() {
    this.allServicesService.getData('getServices').subscribe(data => {
      this.res = data;
      if (this.res.status = 'ok') {
        this.serviceReady = true;
        this.list = this.res.list;
      }
    }, (err) => {
      this.serviceReady = true;
      this.allServicesService.presentAlert("something went wrong, please inform app admin.");
    })
  }

  submitSearch($event) {
    if (typeof this.searchQuery != "undefined") {
      setTimeout(
        (z) => {
          this.navCtrl.navigateForward(['/shop_search/' + this.searchQuery]);
        }, 200);
    }
  }

  clearSearch(e) {
    this.searchQuery = '';
 
  }
  addfav(id,no){
    if(no == 1){
      this.barberlist.map(el =>{
        if(el.id == id){
         el.fav = '1'
        }
      })
   }else{
     this.barberlist.map(el =>{
       if(el.id == id){
         el.fav = '0'
        }
     })
   }
    const option = {
      friend_id:Number(id),
      token:this.user.token,
      fav:Number(no)
    }
    this.allServicesService.sendData('addfav',option).subscribe(res =>{
      if(res['status'] == 'ok'){

      }else{
      this.allServicesService.presentAlert('Something Went Wrong')
      }

    },err =>{
      this.allServicesService.presentAlert('Something Went Wrong')
    })
  }
  async GetUsers(latitude, longitude,id) {
    this.marker = [];
    this.allServicesService.getData('get_user_role_wise/?type=&role=&latitude=' + latitude + '&longitude=' + longitude+'&user_id='+id+'&filter_date='+'&filter_time=').subscribe(data => {
      this.res = data;
      if (this.res.status = 'ok') {
        this.barberReady = true;
        this.barberlist = this.res.list;
        this.barberlist.forEach(element => {
          if(element.rating.average == null){
            element['rate'] = 0
          }else{
            element['rate'] = parseFloat(element.rating.average)
          }
          if (element.map_lat!=''  && element.map_lng !='') {
            const icon = {
              url: '/assets/imgs/marker.png', // image url
              scaledSize: new google.maps.Size(50, 50), // scaled size
            };

            const pos = {
              lat: element.map_lat,
              lng: element.map_lng,
            };
         

            this.marker[element.id] = new google.maps.Marker({
              position: pos,
              map: this.map,
              title: element.shop_name,
              icon: icon,
              id: element.id,
            });

            

            this.marker[element.id].addListener('click', function (marker) {
            //  this.navCtrl.navigateForward(['/barberprofile/' + marker.id + '/public ']);
        
           // this.OpenModal(marker)
            });
          }
        });

      }
    }, (err) => {
      this.barberReady = true;
      this.allServicesService.presentAlert("something went wrong, please inform app admin.");
    })
  }

  async initMap() {
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 6,
      disableDefaultUI: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      scrollwheel: false,
      center: {
        lat: this.latitude,
        lng: this.longitude
      }
    });
    this.directionsDisplay.setMap(this.map);

    google.maps.event.addListener(this.map, 'idle', ()=> {
      this.latitude=this.map.getBounds().getCenter().lat();
      this.longitude=this.map.getBounds().getCenter().lng();
      this.GetUsers(this.latitude, this.longitude,this.user['user_id']);

    });
  }

  async GetUsersMap(latitude, longitude) {
    //this.marker = [];
    this.allServicesService.getData('get_user_role_wise/?type=&role=&latitude=' + latitude + '&longitude=' + longitude+'&user_id='+this.user.user_id).subscribe(data => {
      this.res = data;
      if (this.res.status = 'ok') {
        this.barberReady = true;
        this.barberlist_map = this.res.list;
        this.barberlist_map.forEach(element => {
          if (element.map_lat!=''  && element.map_lng !='') {
     

            const icon = {
              url: '/assets/imgs/marker.png', // image url
              scaledSize: new google.maps.Size(50, 50), // scaled size
            };

            const pos = {
              lat: element.map_lat,
              lng: element.map_lng,
            };


            this.marker[element.id] = new google.maps.Marker({
              position: pos,
              map: this.map,
              title: element.shop_name,
              icon: icon,
              id: element.id,
            });

            this.marker[element.id].addListener('click', function (marker) {
             // this.navCtrl.navigateForward(['/barberprofile/' + marker.id + '/public ']);
        
             //this.OpenModal(marker)
            });
          }
        });

      }
    }, (err) => {
      this.barberReady = true;
      this.allServicesService.presentAlert("something went wrong, please inform app admin.");
    })
  }


OpenModal(marker){
}

}
