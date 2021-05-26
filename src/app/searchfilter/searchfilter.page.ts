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
  selector: 'app-searchfilter',
  templateUrl: './searchfilter.page.html',
  styleUrls: ['./searchfilter.page.scss'],
})
export class SearchfilterPage implements OnInit {
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
      }else{
        
      }
    },err=>{

    });
    this.GetServices();
    
    setTimeout(
      (z) => {
        this.GetLocation();
      }, 2000);
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
    this.initMap();
    this.geolocation.getCurrentPosition().then((resp) => {
    
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      this.map.setCenter(new google.maps.LatLng(this.latitude, this.longitude));
      this.GetUsers(this.latitude, this.longitude);
    }).catch((error) => {
      this.map.setCenter(new google.maps.LatLng(this.latitude, this.longitude));
      this.GetUsers(this.latitude, this.longitude);
    });
  }

  ngOnInit() {
    // this.GetLocation();
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
       this.barberlist_map.map(el =>{
         if(el.id == id){
          el.fav = '1'
         }
       })
    }else{
      this.barberlist_map.map(el =>{
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
  async GetUsers(latitude, longitude) {
    this.marker = [];
    this.allServicesService.getData('get_user_role_wise/?type=home&role=trainer&latitude=' + latitude + '&longitude=' + longitude+'&user_id='+this.user.user_id).subscribe(data => {
      this.res = data;
      if (this.res.status = 'ok') {
        this.barberReady = true;
        this.barberlist = this.res.list;
        this.barberlist.forEach(element => {
          if (element.map_lat!=''  && element.map_lng !='') {
            const icon = {
              url: '/assets/imgs/marker.png', // image url
              scaledSize: new google.maps.Size(50, 50), // scaled size
            };

            // const pos = {
            //   lat: element.map_lat,
            //   lng: element.map_lng,
            // };
         

            // this.marker[element.id] = new google.maps.Marker({
            //   position: pos,
            //   map: this.map,
            //   title: element.shop_name,
            //   icon: icon,
            //   id: element.id,
            // });
            let marker= new google.maps.Marker({
              position: {
                lat: element.map_lat,
                lng: element.map_lng,
              },
              map: this.map,
              title: element.shop_name,
              icon: icon,
              id: element.id,
            });
            
            let title = element.shop_name;
            let image = element.shop_logo;
            let price = element.amount_range;
            let pid = element.id;
            google.maps.event.addListener(marker, 'click',  ()=> {
              var contentString = '<div class="textData"></div>';
                    var infowindow = new google.maps.InfoWindow({
                      content: contentString,
                      closeBoxURL: "",
                      disableAutoPan: true
                    });
                    let div = document.createElement('div');
                    var img = document.createElement("img");
                    div.innerHTML='<div   id=' + 'propertyInfo' + ' class=' + 'mapDiv' + '>' + '<h6>' + title + '</h6>' + '<p class=' + 'price' + '>' + price + '</p>' +
                    '<img class=' + 'mapImg' + ' src="' + image + '" id=' + pid + ' >'
                    + '</div>'
                                  
                    div.onclick = () => { this.gotosingles(pid) };
                    infowindow.setContent(div);
                    img.setAttribute('class', 'img_marker');
                    img.src = image;
                    div.appendChild(img);
                    var infowindow = new google.maps.InfoWindow();
                    var service = google.maps.places.PlacesService(this.map);
                    infowindow.open(this.map, marker);
            })
            this.directionsDisplay.setMap(this.map);

        //     this.marker[element.id].addListener('click', function (marker) {
        //       var contentString = '<div class="textData"></div>';
        //       var infowindow = new google.maps.InfoWindow({
        //         content: contentString,
        //         closeBoxURL: "",
        //         disableAutoPan: true
        //       });
        //       let div = document.createElement('div');
        //       var img = document.createElement("img");
        //       div.innerHTML='<div   id=' + 'propertyInfo' + ' class=' + 'mapDiv' + '>' + '<h6>' + title + '</h6>' + '<p class=' + 'price' + '>' + price + '</p>' +
        //       '<img class=' + 'mapImg' + ' src="' + image + '" id=' + pid + ' >'
        //       + '</div>'
                            
        //       div.onclick = () => { this.gotosingles(pid) };
        //       infowindow.setContent(div);
        //       img.setAttribute('class', 'img_marker');
        //       img.src = image;
        //       div.appendChild(img);
        //       var infowindow = new google.maps.InfoWindow();
        //       var service = google.maps.places.PlacesService(this.map);
        //       infowindow.open(this.map, marker);
        //     });
        // this.directionsDisplay.setMap(this.map);
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
      zoom: 19,
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
      this.GetUsersMap(this.latitude,this.longitude);
    });
  }

  async GetUsersMap(latitude, longitude) {
    //this.marker = [];
    this.allServicesService.getData('get_user_role_wise/?type=home_map&role=trainer&latitude=' + latitude + '&longitude=' + longitude+'&user_id='+this.user.user_id).subscribe(data => {
      this.res = data;
      if (this.res.status = 'ok') {
        this.barberReady = true;
        this.barberlist_map = this.res.list;
        this.barberlist_map.forEach(element => {
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

            // const pos = {
            //   lat: element.map_lat,
            //   lng: element.map_lng,
            // };


            // this.marker[element.id] = new google.maps.Marker({
            //   position: pos,
            //   map: this.map,
            //   title: element.shop_name,
            //   icon: icon,
            //   id: element.id,
            // });
            let marker= new google.maps.Marker({
              position: {
                lat: element.map_lat,
                lng: element.map_lng,
              },
              map: this.map,
              title: element.shop_name,
              icon: icon,
              id: element.id,
            });
      
        let title = element.shop_name;
        let image = element.shop_logo;
        let price = element.amount_range;
        let pid = element.id;
        var infowindow = new google.maps.InfoWindow();
        var service = google.maps.places.PlacesService(this.map);
        google.maps.event.addListener(marker, 'click',  ()=> {
          // infowindow.setContent('<div   id=' + 'propertyInfo' + ' class=' + 'mapDiv' + '>' + '<h6>' + title + '</h6>' + '<p class=' + 'price' + '>' + pid + '</p>' +
          //   '<img class=' + 'mapImg' + ' src="' + image +'class='+pid+ ' >'
          //   + '</div>');
          // infowindow.open(this.map, this);



          var contentString = '<div class="textData"></div>';
                var infowindow = new google.maps.InfoWindow({
                  content: contentString,
                  closeBoxURL: "",
                  disableAutoPan: true
                });
                let div = document.createElement('div');
                var img = document.createElement("img");
        let price = element.amount_range;
                div.innerHTML='<div   id=' + 'propertyInfo' + ' class=' + 'mapDiv' + '>' + '<h6>' + title + '</h6>' + '<p class=' + 'price' + '>' + price + '</p>' +
                '<img class=' + 'mapImg' + ' src="' + image + ' >'
                + '</div>'
                           
                img.setAttribute('class', 'img_marker');
                img.src = image;
                div.appendChild(img);
                div.onclick = () => { this.gotosingles(pid) };
                infowindow.setContent(div);
                infowindow.open(this.map, marker);
        })
        this.directionsDisplay.setMap(this.map);
          }
        });

      }
    }, (err) => {
      this.barberReady = true;
      this.allServicesService.presentAlert("something went wrong, please inform app admin.");
    })
  }

  gotosingles(id){

      this.router.navigate(['trainer/'+id+'/public']);
  }
OpenModal(marker){
}

}