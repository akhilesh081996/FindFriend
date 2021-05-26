import { Component, OnInit } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Events, AlertController, Platform, MenuController, NavController, ModalController, IonContent } from '@ionic/angular';
import { ViewChild, ElementRef, NgZone } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute,Router } from '@angular/router';
import { AllServicesService } from '../all-services.service';
import { Storage } from '@ionic/storage';
import { Location } from '@angular/common';
import { NavigationExtras } from '@angular/router';
// import { Geolocation } from '@ionic-native/geolocation';
import { GalleryCustomModalPage } from '../gallery-custom-modal/gallery-custom-modal.page';
declare var google;

@Component({
  selector: 'app-checkavailability',
  templateUrl: './checkavailability.page.html',
  styleUrls: ['./checkavailability.page.scss'],
})
export class CheckavailabilityPage implements OnInit {
  checkavalibitytab = false
  mondayactive = false
  tuesdayactive = false
  wednesdayactive =false
  thursdayactive = false
  fridayactive =false
  saturdayactive = false
  sundayactive = false
  sunday8am
  @ViewChild('map_provideview', { static: false }) mapElement: ElementRef;
  @ViewChild('content', { static: false }) private content: IonContent;
  Availability = false
  About = true
  map: any;
  marker: any;
  mapView: boolean = false;
  directionsDisplay = new google.maps.DirectionsRenderer;
  date: any;
  daysInThisMonth: any;
  daysInLastMonth: any;
  daysInNextMonth: any;
  list:any=[];
  weekNames: any;
  monthNames: string[];
  currentMonth: any;
  currentYear: any;
  currentDate: any;
  userDetails: any = [];
  is_private: boolean = false;
  type: any;
  user: any;
  ready: boolean = false;
  user_info: any;
  res: any;
  user_id: any;

  res_gallery: any;
  gallery: any = [];

  is_monday: boolean = false;
  is_tuesday: boolean = false;
  is_wednesday: boolean = false;
  is_thursday: boolean = false;
  is_friday: boolean = false;
  is_saturdy: boolean = false;
  is_sunday: boolean = false;


  monday: any
  tuesday: any
  wednesday: any
  thursday: any
  friday: any
  saturdy: any
  sunday: any;
  is_map: boolean = false;

  is_login: boolean = false;
  listing
  userProfile: any;
  sameuser: boolean = false;
viewfavlist  = false
rating
sundaytime: any=[];
  saturdaytime: any=[];
  fridaytime: any=[];
  thursdaytime: any=[];
  wednesdaytime: any=[];
  tusdaytime: any=[];
  mondaytime =[];
  sunday11am: boolean;
  sunday11PM: boolean;
  sunday10PM: boolean;
  sunday9PM: boolean;
  sunday7PM: boolean;
  sunday8PM: boolean;
  sunday6PM: boolean;
  sunday4PM: boolean;
  sunday5PM: boolean;
  sunday3PM: boolean;
  sunday2PM: boolean;
  sunday9am: boolean;
  sunday10am: boolean;
  sunday12PM: boolean;
  sunday1PM: boolean;
  monday8am: boolean;
  monday9am: boolean;
  monday10am: boolean;
  monday11am: boolean;
  monday12PM: boolean;
  monday1PM: boolean;
  monday2PM: boolean;
  monday3PM: boolean;
  monday4PM: boolean;
  monday5PM: boolean;
  monday6PM: boolean;
  monday7PM: boolean;
  monday8PM: boolean;
  monday9PM: boolean;
  monday10PM: boolean;
  monday11PM: boolean;
  tuesday8am: boolean;
  tuesday9am: boolean;
  tuesday10am: boolean;
  tuesday11am: boolean;
  tuesday12PM: boolean;
  tuesday1PM: boolean;
  tuesday2PM: boolean;
  tuesday3PM: boolean;
  tuesday4PM: boolean;
  tuesday5PM: boolean;
  tuesday6PM: boolean;
  tuesday7PM: boolean;
  tuesday8PM: boolean;
  tuesday9PM: boolean;
  tuesday10PM: boolean;
  tuesday11PM: boolean;
  tuesdaytime: any[];
  wednesday8am: boolean;
  wednesday9am: boolean;
  wednesday10am: boolean;
  wednesday11am: boolean;
  wednesday12PM: boolean;
  wednesday1PM: boolean;
  wednesday2PM: boolean;
  wednesday3PM: boolean;
  wednesday4PM: boolean;
  wednesday5PM: boolean;
  wednesday6PM: boolean;
  wednesday7PM: boolean;
  wednesday8PM: boolean;
  wednesday9PM: boolean;
  wednesday10PM: boolean;
  wednesday11PM: boolean;
  thursday8am: boolean;
  thursday9am: boolean;
  thursday10am: boolean;
  thursday11am: boolean;
  thursday12PM: boolean;
  thursday1PM: boolean;
  thursday2PM: boolean;
  thursday3PM: boolean;
  thursday4PM: boolean;
  thursday5PM: boolean;
  thursday6PM: boolean;
  thursday7PM: boolean;
  thursday8PM: boolean;
  thursday9PM: boolean;
  thursday10PM: boolean;
  thursday11PM: boolean;
  friday8am: boolean;
  friday9am: boolean;
  friday10am: boolean;
  friday11am: boolean;
  friday12PM: boolean;
  friday1PM: boolean;
  friday2PM: boolean;
  friday3PM: boolean;
  friday4PM: boolean;
  friday5PM: boolean;
  friday6PM: boolean;
  friday7PM: boolean;
  friday8PM: boolean;
  friday9PM: boolean;
  friday10PM: boolean;
  friday11PM: boolean;
  saturday8am: boolean;
  saturday9am: boolean;
  saturday10am: boolean;
  saturday11am: boolean;
  saturday12PM: boolean;
  saturday1PM: boolean;
  saturday2PM: boolean;
  saturday3PM: boolean;
  saturday4PM: boolean;
  saturday5PM: boolean;
  saturday6PM: boolean;
  saturday7PM: boolean;
  saturday8PM: boolean;
  saturday9PM: boolean;
  saturday10PM: boolean;
  saturday11PM: boolean;
  constructor(public storage: Storage,
    private callNumber: CallNumber,
    public menuCtrl: MenuController,
    private route: ActivatedRoute,
    public navctrl: NavController,
    public location: Location,
    public router: Router,
    public allServicesService: AllServicesService,
    public modalController: ModalController,
    public alertCtrl: AlertController
    ) {


    this.monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.weekNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    this.date = new Date();
    this.getDaysOfMonth();
  }
  checktabav(){
    if(this.checkavalibitytab == false){
      this.checkavalibitytab = true
        this.selectweek(11)
    }else{
      this.checkavalibitytab = false
      this.mondayactive = false
      this.tuesdayactive = false
      this.wednesdayactive =false
      this.thursdayactive = false
      this.fridayactive =false
      this.saturdayactive = false
      this.sundayactive = false    }
  }
  selectact(data){
    this.router.navigate(['setschedule',data,this.user_id])
  }
  selectweek(id){
    var data2 = document.getElementsByClassName('dayactive2')
    if(data2.length == 0){
      setTimeout(() => {
        var data = document.getElementById(id)
      data.classList.toggle('dayactive2')
      }, 400);
      
    }else{
      var id2 = data2[0].id
      if(id2 != id){
        var data = document.getElementById(id2)
        data.classList.toggle('dayactive2')
      }
      var data3 = document.getElementById(id)
      data3.classList.toggle('dayactive2')
    }
    if(id == 11){
      this.mondayactive = true
      this.tuesdayactive = false
      this.wednesdayactive =false
      this.thursdayactive = false
      this.fridayactive =false
      this.saturdayactive = false
      this.sundayactive = false
    }
    if(id == 12){
      this.mondayactive = false
      this.tuesdayactive = true
      this.wednesdayactive =false
      this.thursdayactive = false
      this.fridayactive =false
      this.saturdayactive = false
      this.sundayactive = false
    }
    if(id == 13){
      this.mondayactive = false
      this.tuesdayactive = false
      this.wednesdayactive =true
      this.thursdayactive = false
      this.fridayactive =false
      this.saturdayactive = false
      this.sundayactive = false
    }
    if(id == 14){
      this.mondayactive = false
      this.tuesdayactive = false
      this.wednesdayactive =false
      this.thursdayactive = true
      this.fridayactive =false
      this.saturdayactive = false
      this.sundayactive = false
    }
    if(id == 15){
      this.mondayactive = false
      this.tuesdayactive = false
      this.wednesdayactive =false
      this.thursdayactive = false
      this.fridayactive =true
      this.saturdayactive = false
      this.sundayactive = false
    }
    if(id == 16){
      this.mondayactive = false
      this.tuesdayactive = false
      this.wednesdayactive =false
      this.thursdayactive = false
      this.fridayactive =false
      this.saturdayactive = true
      this.sundayactive = false
    }
    if(id == 17){
      this.mondayactive = false
      this.tuesdayactive = false
      this.wednesdayactive =false
      this.thursdayactive = false
      this.fridayactive =false
      this.saturdayactive = false
      this.sundayactive = true
    }

}
  scrollabout(){
      this.About = true
      this.Availability = false
   this.viewfavlist = false

    // let y = document.getElementById('aboutme').offsetTop;
    // this.content.scrollByPoint(0, y-50,300);
  }
  scrollAvailability(){
   this.About = false
   this.Availability = true
   this.viewfavlist = false
    // let y = document.getElementById('Availability').offsetTop;
    // this.content.scrollByPoint(0, y-50,300);
  }
  initMap(map_lat, map_lng) {
    this.map = new google.maps.Map(document.getElementById('map_provideview'), {
      zoom: 10,
      center: {
        lat: map_lat,
        lng: map_lng
      }
    });
    this.directionsDisplay.setMap(this.map)
    const icon = {
      url: '/assets/imgs/marker.png', // image url
      scaledSize: new google.maps.Size(50, 50), // scaled size
    };
    const pos = {
      lat: map_lat,
      lng: map_lng,
    };
    this.marker = new google.maps.Marker({
      position: pos,
      map: this.map,
      icon: icon
    });
  }

  getDaysOfMonth() {
    this.daysInThisMonth = new Array();
    this.daysInLastMonth = new Array();
    this.daysInNextMonth = new Array();
    this.currentMonth = this.monthNames[this.date.getMonth()];
    this.currentYear = this.date.getFullYear();
    if (this.date.getMonth() === new Date().getMonth()) {
      this.currentDate = new Date().getDate();
    } else {
      this.currentDate = 999;
    }
    var firstDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
    var prevNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate();
    for (var i = prevNumOfDays - (firstDayThisMonth - 1); i <= prevNumOfDays; i++) {
      this.daysInLastMonth.push(i);
    }
    var thisNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate();
    for (var i = 0; i < thisNumOfDays; i++) {
      this.daysInThisMonth.push(i + 1);
    }
    var lastDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDay();
    var nextNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth() + 2, 0).getDate();
    for (var i = 0; i < (6 - lastDayThisMonth); i++) {
      this.daysInNextMonth.push(i + 1);
    }
    var totalDays = this.daysInLastMonth.length + this.daysInThisMonth.length + this.daysInNextMonth.length;
    if (totalDays < 36) {
      for (var i = (7 - lastDayThisMonth); i < ((7 - lastDayThisMonth) + 7); i++) {
        this.daysInNextMonth.push(i);
      }
    }
  }
  goToLastMonth() {
    this.date = new Date(this.date.getFullYear(), this.date.getMonth(), 0);
    this.getDaysOfMonth();
  }

  goToNextMonth() {
    this.date = new Date(this.date.getFullYear(), this.date.getMonth() + 2, 0);
    this.getDaysOfMonth();
  }

  ionViewWillEnter() {
    this.type = this.route.snapshot.parent.paramMap.get('type');
    this.user_id = this.route.snapshot.parent.paramMap.get('user_id');
    this.storage.get('user').then(userInfo => {
      if (userInfo != null) {
        this.allServicesService.SaveAutoConfiqure(userInfo.token)

        this.is_login = true;
        this.user = userInfo;
        if(this.user.user_id == this.user_id){
          this.sameuser = true
        }
        if (this.type == "private") {
          this.is_private = true;
          this.RenderProfileData();
        } else {
          this.is_private = false;
          this.GetUserProfile(this.user_id);
        }
        this.allServicesService.showLoader();
        this.allServicesService.SaveAutoConfiqure(this.user.token);
        this.allServicesService.getSecoondUserInfo(this.user.token, this.user_id).subscribe((result) => {
          this.userProfile = result;
          this.ready = true;
          this.allServicesService.dismissLoading();
        }, (err) => {
          this.allServicesService.dismissLoading();
          let msg = err.error.errormsg;
          this.allServicesService.presentAlert(msg);
        });
      } else {
        this.is_login = false;
      }
    }, err => {
      this.is_login = false;
    }); 

    this.storage.get('user').then(userInfo => {
      if (userInfo != null) {
        this.user = userInfo;
      } else {
        this.is_login = false;
      }
    }, err => {
      this.is_login = false;
    });
  
  }
  ngOnInit() {
  }

  RenderProfileData() {
    this.storage.get('user_profile').then(user_profile => {
      if (user_profile != null) {
        this.is_login = true;
        this.ready = true;
        this.user_info = user_profile;

        this.userWorkingDaytime(this.user_info);
        this.GetUserProfile(this.user.user_id);
      } else {
        this.is_login = false;
      }
    }, err => {
      this.is_login = false;
    });
  }

  GetUserProfile(user_id) {
    if(this.type == 'public'){
      this.allServicesService.getData('getProfile/?token=' + user_id + '&type=' + this.type+'&logged='+this.user.user_id).subscribe(data => {
        this.res = data;
        if (this.res.status = 'ok') {
          this.ready = true;
          this.user_info = this.res;
          if(this.user_info.working.sundaytime ){
            this.sundaytime = this.user_info.working.sundaytime
          if(this.user_info.working.sundaytime.includes('8:00 AM')){
          this.sunday8am = true
          }else{
          this.sunday8am = false
          }
          if(this.user_info.working.sundaytime.includes('9:00 AM')){
          this.sunday9am = true
          }else{
          this.sunday9am = false
          }   
          if(this.user_info.working.sundaytime.includes('10:00 AM')){
          this.sunday10am = true
          }else{
          this.sunday10am = false
          }
          if(this.user_info.working.sundaytime.includes('11:00 AM')){
          this.sunday11am = true
          }else{
          this.sunday11am = false
          }
          if(this.user_info.working.sundaytime.includes('12:00 PM')){
          this.sunday12PM = true
          }else{
          this.sunday12PM = false
          }  
          if(this.user_info.working.sundaytime.includes('1:00 PM')){
          this.sunday1PM = true
          }else{
          this.sunday1PM = false
          }2
          if(this.user_info.working.sundaytime.includes('2:00 PM')){
          this.sunday2PM = true
          }else{
          this.sunday2PM = false
          }3
          if(this.user_info.working.sundaytime.includes('3:00 PM')){
          this.sunday3PM = true
          }else{
          this.sunday3PM = false
          } 
          if(this.user_info.working.sundaytime.includes('4:00 PM')){
          this.sunday4PM = true
          }else{
          this.sunday4PM = false
          } if(this.user_info.working.sundaytime.includes('5:00 PM')){
          this.sunday5PM = true
          }else{
          this.sunday5PM = false
          } 
          if(this.user_info.working.sundaytime.includes('6:00 PM')){
          this.sunday6PM = true
          }else{
          this.sunday6PM = false
          } if(this.user_info.working.sundaytime.includes('7:00 PM')){
          this.sunday7PM = true
          }else{
          this.sunday7PM = false
          } if(this.user_info.working.sundaytime.includes('8:00 PM')){
          this.sunday8PM = true
          }else{
          this.sunday8PM = false
          } if(this.user_info.working.sundaytime.includes('9:00 PM')){
          this.sunday9PM = true
          }else{
          this.sunday9PM = false
          } if(this.user_info.working.sundaytime.includes('10:00 PM')){
          this.sunday10PM = true
          }else{
          this.sunday10PM = false
          } if(this.user_info.working.sundaytime.includes('11:00 PM')){
          this.sunday11PM = true
          }else{
          this.sunday11PM = false
          }                           
          }else{
            this.sundaytime = []
          }
          if(this.user_info.working.mondaytime ){
            this.mondaytime = this.user_info.working.mondaytime
            if(this.user_info.working.mondaytime.includes('8:00 AM')){
            this.monday8am = true
            }else{
            this.monday8am = false
            }
            if(this.user_info.working.mondaytime.includes('9:00 AM')){
            this.monday9am = true
            }else{
            this.monday9am = false
            }   
            if(this.user_info.working.mondaytime.includes('10:00 AM')){
            this.monday10am = true
            }else{
            this.monday10am = false
            }
            if(this.user_info.working.mondaytime.includes('11:00 AM')){
            this.monday11am = true
            }else{
            this.monday11am = false
            }
            if(this.user_info.working.mondaytime.includes('12:00 PM')){
            this.monday12PM = true
            }else{
            this.monday12PM = false
            }  
            if(this.user_info.working.mondaytime.includes('1:00 PM')){
            this.monday1PM = true
            }else{
            this.monday1PM = false
            }2
            if(this.user_info.working.mondaytime.includes('2:00 PM')){
            this.monday2PM = true
            }else{
            this.monday2PM = false
            }3
            if(this.user_info.working.mondaytime.includes('3:00 PM')){
            this.monday3PM = true
            }else{
            this.monday3PM = false
            } 
            if(this.user_info.working.mondaytime.includes('4:00 PM')){
            this.monday4PM = true
            }else{
            this.monday4PM = false
            } if(this.user_info.working.mondaytime.includes('5:00 PM')){
            this.monday5PM = true
            }else{
            this.monday5PM = false
            } 
            if(this.user_info.working.mondaytime.includes('6:00 PM')){
            this.monday6PM = true
            }else{
            this.monday6PM = false
            } if(this.user_info.working.mondaytime.includes('7:00 PM')){
            this.monday7PM = true
            }else{
            this.monday7PM = false
            } if(this.user_info.working.mondaytime.includes('8:00 PM')){
            this.monday8PM = true
            }else{
            this.monday8PM = false
            } if(this.user_info.working.mondaytime.includes('9:00 PM')){
            this.monday9PM = true
            }else{
            this.monday9PM = false
            } if(this.user_info.working.mondaytime.includes('10:00 PM')){
            this.monday10PM = true
            }else{
            this.monday10PM = false
            } if(this.user_info.working.mondaytime.includes('11:00 PM')){
            this.monday11PM = true
            }else{
            this.monday11PM = false
            }                           
            }else{
              this.mondaytime = []
            }
            if(this.user_info.working.tusdaytime ){
            this.tusdaytime = this.user_info.working.tusdaytime
              if(this.user_info.working.tusdaytime.includes('8:00 AM')){
              this.tuesday8am = true
              }else{
              this.tuesday8am = false
              }
              if(this.user_info.working.tusdaytime.includes('9:00 AM')){
              this.tuesday9am = true
              }else{
              this.tuesday9am = false
              }   
              if(this.user_info.working.tusdaytime.includes('10:00 AM')){
              this.tuesday10am = true
              }else{
              this.tuesday10am = false
              }
              if(this.user_info.working.tusdaytime.includes('11:00 AM')){
              this.tuesday11am = true
              }else{
              this.tuesday11am = false
              }
              if(this.user_info.working.tusdaytime.includes('12:00 PM')){
              this.tuesday12PM = true
              }else{
              this.tuesday12PM = false
              }  
              if(this.user_info.working.tusdaytime.includes('1:00 PM')){
              this.tuesday1PM = true
              }else{
              this.tuesday1PM = false
              }2
              if(this.user_info.working.tusdaytime.includes('2:00 PM')){
              this.tuesday2PM = true
              }else{
              this.tuesday2PM = false
              }3
              if(this.user_info.working.tusdaytime.includes('3:00 PM')){
              this.tuesday3PM = true
              }else{
              this.tuesday3PM = false
              } 
              if(this.user_info.working.tusdaytime.includes('4:00 PM')){
              this.tuesday4PM = true
              }else{
              this.tuesday4PM = false
              } if(this.user_info.working.tusdaytime.includes('5:00 PM')){
              this.tuesday5PM = true
              }else{
              this.tuesday5PM = false
              } 
              if(this.user_info.working.tusdaytime.includes('6:00 PM')){
              this.tuesday6PM = true
              }else{
              this.tuesday6PM = false
              } if(this.user_info.working.tusdaytime.includes('7:00 PM')){
              this.tuesday7PM = true
              }else{
              this.tuesday7PM = false
              } if(this.user_info.working.tusdaytime.includes('8:00 PM')){
              this.tuesday8PM = true
              }else{
              this.tuesday8PM = false
              } if(this.user_info.working.tusdaytime.includes('9:00 PM')){
              this.tuesday9PM = true
              }else{
              this.tuesday9PM = false
              } if(this.user_info.working.tusdaytime.includes('10:00 PM')){
              this.tuesday10PM = true
              }else{
              this.tuesday10PM = false
              } if(this.user_info.working.tusdaytime.includes('11:00 PM')){
              this.tuesday11PM = true
              }else{
              this.tuesday11PM = false
              }                           
              }else{
                this.tusdaytime = []
              }
              if(this.user_info.working.wednesdaytime ){
            this.wednesdaytime = this.user_info.working.wednesdaytime
                if(this.user_info.working.wednesdaytime.includes('8:00 AM')){
                this.wednesday8am = true
                }else{
                this.wednesday8am = false
                }
                if(this.user_info.working.wednesdaytime.includes('9:00 AM')){
                this.wednesday9am = true
                }else{
                this.wednesday9am = false
                }   
                if(this.user_info.working.wednesdaytime.includes('10:00 AM')){
                this.wednesday10am = true
                }else{
                this.wednesday10am = false
                }
                if(this.user_info.working.wednesdaytime.includes('11:00 AM')){
                this.wednesday11am = true
                }else{
                this.wednesday11am = false
                }
                if(this.user_info.working.wednesdaytime.includes('12:00 PM')){
                this.wednesday12PM = true
                }else{
                this.wednesday12PM = false
                }  
                if(this.user_info.working.wednesdaytime.includes('1:00 PM')){
                this.wednesday1PM = true
                }else{
                this.wednesday1PM = false
                }2
                if(this.user_info.working.wednesdaytime.includes('2:00 PM')){
                this.wednesday2PM = true
                }else{
                this.wednesday2PM = false
                }3
                if(this.user_info.working.wednesdaytime.includes('3:00 PM')){
                this.wednesday3PM = true
                }else{
                this.wednesday3PM = false
                } 
                if(this.user_info.working.wednesdaytime.includes('4:00 PM')){
                this.wednesday4PM = true
                }else{
                this.wednesday4PM = false
                } if(this.user_info.working.wednesdaytime.includes('5:00 PM')){
                this.wednesday5PM = true
                }else{
                this.wednesday5PM = false
                } 
                if(this.user_info.working.wednesdaytime.includes('6:00 PM')){
                this.wednesday6PM = true
                }else{
                this.wednesday6PM = false
                } if(this.user_info.working.wednesdaytime.includes('7:00 PM')){
                this.wednesday7PM = true
                }else{
                this.wednesday7PM = false
                } if(this.user_info.working.wednesdaytime.includes('8:00 PM')){
                this.wednesday8PM = true
                }else{
                this.wednesday8PM = false
                } if(this.user_info.working.wednesdaytime.includes('9:00 PM')){
                this.wednesday9PM = true
                }else{
                this.wednesday9PM = false
                } if(this.user_info.working.wednesdaytime.includes('10:00 PM')){
                this.wednesday10PM = true
                }else{
                this.wednesday10PM = false
                } if(this.user_info.working.wednesdaytime.includes('11:00 PM')){
                this.wednesday11PM = true
                }else{
                this.wednesday11PM = false
                }                           
                }else{
                  this.wednesdaytime = []
                }
                if(this.user_info.working.thursdaytime ){
            this.thursdaytime = this.user_info.working.thursdaytime
                  if(this.user_info.working.thursdaytime.includes('8:00 AM')){
                  this.thursday8am = true
                  }else{
                  this.thursday8am = false
                  }
                  if(this.user_info.working.thursdaytime.includes('9:00 AM')){
                  this.thursday9am = true
                  }else{
                  this.thursday9am = false
                  }   
                  if(this.user_info.working.thursdaytime.includes('10:00 AM')){
                  this.thursday10am = true
                  }else{
                  this.thursday10am = false
                  }
                  if(this.user_info.working.thursdaytime.includes('11:00 AM')){
                  this.thursday11am = true
                  }else{
                  this.thursday11am = false
                  }
                  if(this.user_info.working.thursdaytime.includes('12:00 PM')){
                  this.thursday12PM = true
                  }else{
                  this.thursday12PM = false
                  }  
                  if(this.user_info.working.thursdaytime.includes('1:00 PM')){
                  this.thursday1PM = true
                  }else{
                  this.thursday1PM = false
                  }2
                  if(this.user_info.working.thursdaytime.includes('2:00 PM')){
                  this.thursday2PM = true
                  }else{
                  this.thursday2PM = false
                  }3
                  if(this.user_info.working.thursdaytime.includes('3:00 PM')){
                  this.thursday3PM = true
                  }else{
                  this.thursday3PM = false
                  } 
                  if(this.user_info.working.thursdaytime.includes('4:00 PM')){
                  this.thursday4PM = true
                  }else{
                  this.thursday4PM = false
                  } if(this.user_info.working.thursdaytime.includes('5:00 PM')){
                  this.thursday5PM = true
                  }else{
                  this.thursday5PM = false
                  } 
                  if(this.user_info.working.thursdaytime.includes('6:00 PM')){
                  this.thursday6PM = true
                  }else{
                  this.thursday6PM = false
                  } if(this.user_info.working.thursdaytime.includes('7:00 PM')){
                  this.thursday7PM = true
                  }else{
                  this.thursday7PM = false
                  } if(this.user_info.working.thursdaytime.includes('8:00 PM')){
                  this.thursday8PM = true
                  }else{
                  this.thursday8PM = false
                  } if(this.user_info.working.thursdaytime.includes('9:00 PM')){
                  this.thursday9PM = true
                  }else{
                  this.thursday9PM = false
                  } if(this.user_info.working.thursdaytime.includes('10:00 PM')){
                  this.thursday10PM = true
                  }else{
                  this.thursday10PM = false
                  } if(this.user_info.working.thursdaytime.includes('11:00 PM')){
                  this.thursday11PM = true
                  }else{
                  this.thursday11PM = false
                  }                           
                  }else{
                    this.thursdaytime = []
                  }
                  if(this.user_info.working.fridaytime ){
            this.fridaytime = this.user_info.working.fridaytime
                    if(this.user_info.working.fridaytime.includes('8:00 AM')){
                    this.friday8am = true
                    }else{
                    this.friday8am = false
                    }
                    if(this.user_info.working.fridaytime.includes('9:00 AM')){
                    this.friday9am = true
                    }else{
                    this.friday9am = false
                    }   
                    if(this.user_info.working.fridaytime.includes('10:00 AM')){
                    this.friday10am = true
                    }else{
                    this.friday10am = false
                    }
                    if(this.user_info.working.fridaytime.includes('11:00 AM')){
                    this.friday11am = true
                    }else{
                    this.friday11am = false
                    }
                    if(this.user_info.working.fridaytime.includes('12:00 PM')){
                    this.friday12PM = true
                    }else{
                    this.friday12PM = false
                    }  
                    if(this.user_info.working.fridaytime.includes('1:00 PM')){
                    this.friday1PM = true
                    }else{
                    this.friday1PM = false
                    }2
                    if(this.user_info.working.fridaytime.includes('2:00 PM')){
                    this.friday2PM = true
                    }else{
                    this.friday2PM = false
                    }3
                    if(this.user_info.working.fridaytime.includes('3:00 PM')){
                    this.friday3PM = true
                    }else{
                    this.friday3PM = false
                    } 
                    if(this.user_info.working.fridaytime.includes('4:00 PM')){
                    this.friday4PM = true
                    }else{
                    this.friday4PM = false
                    } if(this.user_info.working.fridaytime.includes('5:00 PM')){
                    this.friday5PM = true
                    }else{
                    this.friday5PM = false
                    } 
                    if(this.user_info.working.fridaytime.includes('6:00 PM')){
                    this.friday6PM = true
                    }else{
                    this.friday6PM = false
                    } if(this.user_info.working.fridaytime.includes('7:00 PM')){
                    this.friday7PM = true
                    }else{
                    this.friday7PM = false
                    } if(this.user_info.working.fridaytime.includes('8:00 PM')){
                    this.friday8PM = true
                    }else{
                    this.friday8PM = false
                    } if(this.user_info.working.fridaytime.includes('9:00 PM')){
                    this.friday9PM = true
                    }else{
                    this.friday9PM = false
                    } if(this.user_info.working.fridaytime.includes('10:00 PM')){
                    this.friday10PM = true
                    }else{
                    this.friday10PM = false
                    } if(this.user_info.working.fridaytime.includes('11:00 PM')){
                    this.friday11PM = true
                    }else{
                    this.friday11PM = false
                    }                           
                    }else{
                      this.fridaytime = []
                    }
                    if(this.user_info.working.saturdaytime ){
            this.saturdaytime = this.user_info.working.saturdaytime
                      if(this.user_info.working.saturdaytime.includes('8:00 AM')){
                      this.saturday8am = true
                      }else{
                      this.saturday8am = false
                      }
                      if(this.user_info.working.saturdaytime.includes('9:00 AM')){
                      this.saturday9am = true
                      }else{
                      this.saturday9am = false
                      }   
                      if(this.user_info.working.saturdaytime.includes('10:00 AM')){
                      this.saturday10am = true
                      }else{
                      this.saturday10am = false
                      }
                      if(this.user_info.working.saturdaytime.includes('11:00 AM')){
                      this.saturday11am = true
                      }else{
                      this.saturday11am = false
                      }
                      if(this.user_info.working.saturdaytime.includes('12:00 PM')){
                      this.saturday12PM = true
                      }else{
                      this.saturday12PM = false
                      }  
                      if(this.user_info.working.saturdaytime.includes('1:00 PM')){
                      this.saturday1PM = true
                      }else{
                      this.saturday1PM = false
                      }2
                      if(this.user_info.working.saturdaytime.includes('2:00 PM')){
                      this.saturday2PM = true
                      }else{
                      this.saturday2PM = false
                      }3
                      if(this.user_info.working.saturdaytime.includes('3:00 PM')){
                      this.saturday3PM = true
                      }else{
                      this.saturday3PM = false
                      } 
                      if(this.user_info.working.saturdaytime.includes('4:00 PM')){
                      this.saturday4PM = true
                      }else{
                      this.saturday4PM = false
                      } if(this.user_info.working.saturdaytime.includes('5:00 PM')){
                      this.saturday5PM = true
                      }else{
                      this.saturday5PM = false
                      } 
                      if(this.user_info.working.saturdaytime.includes('6:00 PM')){
                      this.saturday6PM = true
                      }else{
                      this.saturday6PM = false
                      } if(this.user_info.working.saturdaytime.includes('7:00 PM')){
                      this.saturday7PM = true
                      }else{
                      this.saturday7PM = false
                      } if(this.user_info.working.saturdaytime.includes('8:00 PM')){
                      this.saturday8PM = true
                      }else{
                      this.saturday8PM = false
                      } if(this.user_info.working.saturdaytime.includes('9:00 PM')){
                      this.saturday9PM = true
                      }else{
                      this.saturday9PM = false
                      } if(this.user_info.working.saturdaytime.includes('10:00 PM')){
                      this.saturday10PM = true
                      }else{
                      this.saturday10PM = false
                      } if(this.user_info.working.saturdaytime.includes('11:00 PM')){
                      this.saturday11PM = true
                      }else{
                      this.saturday11PM = false
                      }                           
                      }else{
                        this.saturdaytime = []
                      }
          if(this.user_info.rating.average == null){
            this.rating = 0
            }else{
              this.rating = parseFloat(this.user_info.rating.average)
            }
          this.is_map = this.user_info.is_map;
          // this.userWorkingDaytime(this.user_info);
          this.GetUserProfileImages(user_id);
          // this.GetServices(user_id);
          if (this.type == "private") {
            this.storage.set('user_profile', this.res);
          }
          if (this.is_map) {
            setTimeout(
              (z) => {
                // this.initMap(this.user_info.map_lat, this.user_info.map_lng)
              }, 1000);
          }
        }
      }, (err) => {
        this.ready = true;
        this.allServicesService.presentAlert(err.error.errormsg);
        if (err.error.error_code == "user_expire") {
          this.location.back();
        }
      })
    }else{
      this.allServicesService.getData('getProfile/?token=' + this.user.token + '&type=' + this.type).subscribe(data => {
        this.res = data;
        if (this.res.status = 'ok') {
          this.ready = true;
          this.user_info = this.res;
          if(this.user_info.rating.average == null){
          this.rating = 0
          }else{
            this.rating = parseFloat(this.user_info.rating.average)
          }
          this.is_map = this.user_info.is_map;
          this.userWorkingDaytime(this.user_info);
          this.GetUserProfileImages(this.user.token);
          this.GetServices(this.user.token);
          if (this.type == "private") {
            this.storage.set('user_profile', this.res);
          }
          if (this.is_map) {
            setTimeout(
              (z) => {
                // this.initMap(this.user_info.map_lat, this.user_info.map_lng)
              }, 1000);
          }
        }
      }, (err) => {
        this.ready = true;
        this.allServicesService.presentAlert(err.error.errormsg);
        if (err.error.error_code == "user_expire") {
          this.location.back();
        }
      })
    }

  }
  back(){
    this.navctrl.back()
  }

  async GetUserProfileImages(user_id) {
    this.allServicesService.getData('getPhotos/?token=' + user_id + '&type=' + this.type).subscribe(data => {
      this.res_gallery = data;
      if (this.res_gallery.status = 'ok') {
        this.gallery = this.res_gallery.images;
      }
    }, (err) => {
      this.allServicesService.presentAlert(err.error.errormsg);
      if (err.error.error_code == "user_expire") {
        this.location.back();
      }
    })
  }

  userWorkingDaytime(user_profile) {
    if (user_profile.working.is_sunday != false) {
      this.is_sunday = true;
      this.sunday = user_profile.working.is_sunday;
    } else {
      this.is_sunday = false;
    }
    if (user_profile.working.is_monday != false) {
      this.is_monday = true;
      this.monday = user_profile.working.is_monday;
    } else {
      this.is_monday = false;
    }
    if (user_profile.working.is_tuesday != false) {
      this.is_tuesday = true;
      this.tuesday = user_profile.working.is_tuesday;
    } else {
      this.is_tuesday = false;
    }
    if (user_profile.working.is_wednesday != false) {
      this.is_wednesday = true;
      this.wednesday = user_profile.working.is_wednesday;
    } else {
      this.is_wednesday = false;
    }
    if (user_profile.working.is_thursday != false) {
      this.is_thursday = true;
      this.thursday = user_profile.working.is_thursday;
    } else {
      this.is_thursday = false;
    }
    if (user_profile.working.is_friday != false) {
      this.is_friday = true;
      this.friday = user_profile.working.is_friday;
    } else {
      this.is_friday = false;
    }
    if (user_profile.working.is_saturdy != false) {
      this.is_saturdy = true;
      this.saturdy = user_profile.working.is_saturdy;
    } else {
      this.is_saturdy = false;
    }
  }


  sendToMessage(userProfile) {
    this.storage.get('user').then((val) => {
      if (val != null) {
        this.allServicesService.showLoader();
        this.allServicesService.getCurrentUserInfo(val.token).subscribe((result) => {
          this.res = result;
          this.openChatPage(userProfile, this.res.result);
          this.allServicesService.dismissLoading();
        }, (err) => {
          this.allServicesService.dismissLoading();
          let msg = err.error.errormsg;
          this.allServicesService.presentAlert(msg);
        });
      }
    });
  }

  openChatPage(userProfile, Currentuser) {
    let userPro = {
      first_name: userProfile.first_name + '' + userProfile.last_name,
      id: parseInt(userProfile.id),
      user_img: userProfile.user_img
    };
    let navigationExtras: NavigationExtras = {
      queryParams: {
        //  special: JSON.stringify(workout),
        secondUser: JSON.stringify(userPro),
        currentUser: JSON.stringify(Currentuser),
        fromMy: true
      }
    };
    this.navctrl.navigateForward(['/chat'], navigationExtras);
  }
  async open_gallery_modal(index, gallery) {
    const modal = await this.modalController.create({
      component: GalleryCustomModalPage,
      componentProps: { index: index, gallery: gallery },
      cssClass: 'gallery_modal'
    });
    return await modal.present();
  }

  call(phone) {
    if (phone != '') {
      this.callNumber.callNumber(phone, true)
        .then(res => 
         {}
          )
        .catch(err =>
          {}
           );
    }
  }


  async GetServices(user_id) {
    this.allServicesService.getData('getUserServices/?type='+this.type+'&token=' + user_id).subscribe(data => {
      this.res = data;
      if (this.res.status = 'ok') {
        this.ready = true;
        this.list = this.res.list;
        // this.list.forEach(element => {
        //   if(element.checked == true){
        //     this.list = element
        //   }
        // })
      }
    }, (err) => {
      this.ready = true;
      if (err.error.error_code == "user_expire") {
        this.router.navigate(['/home']);
      }
      this.allServicesService.presentAlert(err.error.errormsg);
    })
  }
  addfav(id,no){
    if(no == 1){
       this.user_info.fav = '1'
    }else{
      this.user_info.fav = '0'

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
  viewfav(){
    this.viewfavlist = true
    this.Availability = false
    this.About = false
    // this.navctrl.navigateForward('favfriend')
  }

}
