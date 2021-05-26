import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Events, AlertController, Platform, MenuController, NavController, ModalController, IonContent, LoadingController, ToastController, ActionSheetController, IonSlides } from '@ionic/angular';
import { ViewChild, ElementRef, NgZone } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute,Router } from '@angular/router';
import { AllServicesService } from '../all-services.service';
import { Storage } from '@ionic/storage';
import { Location } from '@angular/common';
import { NavigationExtras } from '@angular/router';
// import { Geolocation } from '@ionic-native/geolocation';
import { GalleryCustomModalPage } from '../gallery-custom-modal/gallery-custom-modal.page';
import { FilePath } from '@ionic-native/file-path/ngx';
declare var google;
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/Camera/ngx';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { ThrowStmt } from '@angular/compiler';
import { Crop } from '@ionic-native/crop/ngx';

@Component({
  selector: 'app-availability',
  templateUrl: './availability.page.html',
  styleUrls: ['./availability.page.scss'],
})
export class AvailabilityPage implements OnInit {
changeupdatedata = false
  @ViewChild('map_provideview', { static: false }) mapElement: ElementRef;
  @ViewChild('content', { static: false }) private content: IonContent;
  @ViewChild('slides', { static: true }) slider: IonSlides;  
  @ViewChild('slidestime', { static: true }) slidertime: IonSlides;  
  segment = 0;
  segmenttime = 0;
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
  is_monday: boolean;
  is_tuesday: boolean;
  is_wednesday: boolean;
  is_thursday: boolean;
  is_friday: boolean;
  is_saturdy: boolean;
  is_sunday: boolean;
  is_map: boolean;
  is_login: boolean;
  listing
  userProfile: any;
viewfavlist  = false
rating
  res_image;
  images: any[];
  userImage: any;
  name: any;
  shop_location: any;
  snipet: any;
  shop_about: any;
  items: any=[];
  activity : any=[];
  offer_services: any=[];
  days_week = true
  common_interest = false
  about_tab = false
  activity_tab =false
  sundaytime: any=[];
  saturdaytime: any=[];
  fridaytime: any=[];
  thursdaytime: any=[];
  wednesdaytime: any=[];
  tusdaytime: any=[];
  mondaytime =[];
  mondayactive = true
  tuesdayactive = false
  wednesdayactive =false
  thursdayactive = false
  fridayactive =false
  saturdayactive = false
  sundayactive = false
  sunday8am :boolean
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

  userserviceinfo
  sametimeallday



  
  Foodie:boolean
  Sports_Fan:boolean
  Great_Outdoors:boolean
  Art_Lover:boolean
  Animal_Lover:boolean
  Socialite:boolean
  Athletic:boolean
  Dancing_Nightlife:boolean
  More_Coffee:boolean
  Theater_Nerd:boolean

  Open_to_Suggestions:boolean;
  amusement_park:boolean;
  attend_a_conference:boolean;
  attend_a_motorsport_event:boolean;
  attend_a_party:boolean;
  attend_a_political_event:boolean;
  attend_a_trivia_night:boolean;
  ballroom_dancing:boolean;
  bingo:boolean;
  bonfire:boolean;
  book_club:boolean;
  bungee_jumping:boolean;
  canoeing:boolean;
  carve_pumpkins:boolean;
  christmas_caroling:boolean;
  city_tour:boolean;
  escape_rooms:boolean;
  floating_on_tubes:boolean;
  fun_runs:boolean;
  get_dessert:boolean;
  go_look_at_christmas_lights:boolean;
  go_to_a_bbg:boolean;
  go_to_a_dance:boolean;
  go_to_a_festival:boolean;
  go_to_a_formal_event:boolean;
  go_to_a_show:boolean;
  go_to_an_aquarium:boolean;
  go_to_church:boolean;
  going_for_a_walk_with_pets:boolean;
  group_dates:boolean;
  group_game_night:boolean;
  home_decorating:boolean;
  horse_back_riding:boolean;
  hot_air_balloon:boolean;
  hunting:boolean;
  ice_skating:boolean;
  kayaking:boolean;
  laser_tag:boolean;
  line_dancing:boolean;
  marathons:boolean;
  mushroom_hunting:boolean;
  photography:boolean;
  play_musical:boolean;
  random_acts_of_kindness:boolean;
  reunion:boolean;
  roller_skating:boolean;
  scuba_diving:boolean;
  sightseeing:boolean;
  sky_diving:boolean;
  sledding:boolean;
  studying:boolean;
  take_a_class_together:boolean;
  thrifting:boolean;
  tubing:boolean;
  watch_fireworks:boolean;
  watch_sunset:boolean;
  water_park:boolean;
  wingman:boolean;
  wood_working:boolean;
  
  snipptchar = 300
  biochar = 300
  snipptcharuse = 0
  biocharuse = 0
  changeTimeslot: boolean= false;
  constructor(
    public storage: Storage,
    private callNumber: CallNumber,
    public menuCtrl: MenuController,
    private route: ActivatedRoute,
    public navctrl: NavController,
    public location: Location,
    public modalController: ModalController,
    public alertCtrl: AlertController,
    public events: Events,
    public allServicesService: AllServicesService,
    public loadingCtrl: LoadingController,
    public router: Router,
    private camera: Camera,
    private file: File,
    public transfer: FileTransfer,
    private toastController: ToastController,
    private plt: Platform,
    private loadingController: LoadingController,
    private actionSheetController: ActionSheetController,
    private ref: ChangeDetectorRef,
    private filePath: FilePath,
    public nvCtrl :NavController,
    public crop:Crop

    ) {
      // this.allServicesService.showLoader()
  }
  ngOnInit() {
  }
  serviceonoff(){
    setTimeout(() => {
      this.updateprofile()
    }, 900);
  }

  changesametimeallday(){
    if(this.changeupdatedata == true){
    if(this.sametimeallday == true){
      this.is_monday = true
      this.is_tuesday = true
      this.is_wednesday = true
      this.is_thursday = true
      this.is_friday = true
      this.is_saturdy = true
      this.is_sunday = true     
      
      this.sunday8am = true
      this.sunday11am= true
      this.sunday4PM= true
      this.sunday5PM= true
      this.sunday3PM= true
      this.sunday2PM= true
      this.sunday9am= true
      this.sunday10am= true
      this.sunday12PM= true
      this.sunday1PM= true

      this.monday8am= true
      this.monday9am= true
      this.monday10am= true
      this.monday11am= true
      this.monday12PM= true
      this.monday1PM= true
      this.monday2PM= true
      this.monday3PM= true
      this.monday4PM= true
      this.monday5PM= true
 
      this.tuesday8am= true
      this.tuesday9am= true
      this.tuesday10am= true
      this.tuesday11am= true
      this.tuesday12PM= true
      this.tuesday1PM= true
      this.tuesday2PM= true
      this.tuesday3PM= true
      this.tuesday4PM= true
      this.tuesday5PM= true
 
      this.wednesday8am= true
      this.wednesday9am= true
      this.wednesday10am= true
      this.wednesday11am= true
      this.wednesday12PM= true
      this.wednesday1PM= true
      this.wednesday2PM= true
      this.wednesday3PM= true
      this.wednesday4PM= true
      this.wednesday5PM= true

      this.thursday8am= true
      this.thursday9am= true
      this.thursday10am= true
      this.thursday11am= true
      this.thursday12PM= true
      this.thursday1PM= true
      this.thursday2PM= true
      this.thursday3PM= true
      this.thursday4PM= true
      this.thursday5PM= true

      this.friday8am= true
      this.friday9am= true
      this.friday10am= true
      this.friday11am= true
      this.friday12PM= true
      this.friday1PM= true
      this.friday2PM= true
      this.friday3PM= true
      this.friday4PM= true
      this.friday5PM= true
 
      this.saturday8am= true
      this.saturday9am= true
      this.saturday10am= true
      this.saturday11am= true
      this.saturday12PM= true
      this.saturday1PM= true
      this.saturday2PM= true
      this.saturday3PM= true
      this.saturday4PM= true
      this.saturday5PM= true
      
      // this.sundaytime = ['8:00 AM','9:00 AM','10:00 AM','11:00 AM','12:00 PM','1:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM']
      // this.saturdaytime = ['8:00 AM','9:00 AM','10:00 AM','11:00 AM','12:00 PM','1:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM']
      // this.fridaytime = ['8:00 AM','9:00 AM','10:00 AM','11:00 AM','12:00 PM','1:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM']
      // this.thursdaytime = ['8:00 AM','9:00 AM','10:00 AM','11:00 AM','12:00 PM','1:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM']
      // this.wednesdaytime = ['8:00 AM','9:00 AM','10:00 AM','11:00 AM','12:00 PM','1:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM']
      // this.tusdaytime = ['8:00 AM','9:00 AM','10:00 AM','11:00 AM','12:00 PM','1:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM']
      // this.mondaytime = ['8:00 AM','9:00 AM','10:00 AM','11:00 AM','12:00 PM','1:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM']
    }
    // }else{
    //   this.is_monday = false
    //   this.is_tuesday = false
    //   this.is_wednesday = false
    //   this.is_thursday = false
    //   this.is_friday = false
    //   this.is_saturdy = false
    //   this.is_sunday = false     
      
    //    this.sunday8am = false
    //   this.sunday11am= false
    //   this.sunday4PM= false
    //   this.sunday5PM= false
    //   this.sunday3PM= false
    //   this.sunday2PM= false
    //   this.sunday9am= false
    //   this.sunday10am= false
    //   this.sunday12PM= false
    //   this.sunday1PM= false

    //   this.monday8am= false
    //   this.monday9am= false
    //   this.monday10am= false
    //   this.monday11am= false
    //   this.monday12PM= false
    //   this.monday1PM= false
    //   this.monday2PM= false
    //   this.monday3PM= false
    //   this.monday4PM= false
    //   this.monday5PM= false
 
    //   this.tuesday8am= false
    //   this.tuesday9am= false
    //   this.tuesday10am= false
    //   this.tuesday11am= false
    //   this.tuesday12PM= false
    //   this.tuesday1PM= false
    //   this.tuesday2PM= false
    //   this.tuesday3PM= false
    //   this.tuesday4PM= false
    //   this.tuesday5PM= false
 
    //   this.wednesday8am= false
    //   this.wednesday9am= false
    //   this.wednesday10am= false
    //   this.wednesday11am= false
    //   this.wednesday12PM= false
    //   this.wednesday1PM= false
    //   this.wednesday2PM= false
    //   this.wednesday3PM= false
    //   this.wednesday4PM= false
    //   this.wednesday5PM= false

    //   this.thursday8am= false
    //   this.thursday9am= false
    //   this.thursday10am= false
    //   this.thursday11am= false
    //   this.thursday12PM= false
    //   this.thursday1PM= false
    //   this.thursday2PM= false
    //   this.thursday3PM= false
    //   this.thursday4PM= false
    //   this.thursday5PM= false

    //   this.friday8am= false
    //   this.friday9am= false
    //   this.friday10am= false
    //   this.friday11am= false
    //   this.friday12PM= false
    //   this.friday1PM= false
    //   this.friday2PM= false
    //   this.friday3PM= false
    //   this.friday4PM= false
    //   this.friday5PM= false
 
    //   this.saturday8am= false
    //   this.saturday9am= false
    //   this.saturday10am= false
    //   this.saturday11am= false
    //   this.saturday12PM= false
    //   this.saturday1PM= false
    //   this.saturday2PM= false
    //   this.saturday3PM= false
    //   this.saturday4PM= false
    //   this.saturday5PM= false
      
    //   this.sundaytime = []
    //   this.saturdaytime = []
    //   this.fridaytime = []
    //   this.thursdaytime = []
    //   this.wednesdaytime = []
    //   this.tusdaytime = []
    //   this.mondaytime = []
    // }
  }
  }

  ionViewWillEnter() {
    this.type = this.route.snapshot.parent.paramMap.get('type');
    this.user_id = this.route.snapshot.parent.paramMap.get('user_id');
    this.storage.get('user').then(userInfo => {
      if (userInfo != null) {
        this.is_login = true;
        this.user = userInfo;
        this.GetUserImage();
        // this.showclass(1)
        // this.selectweek(11)
          this.GetUserProfile();
        this.allServicesService.SaveAutoConfiqure(this.user.token);
      } else {
        this.is_login = false;
      }
    }, err => {
      this.is_login = false;
    }); 
  }
menu(){
  this.menuCtrl.toggle()
}
  async segmentChanged(ev: any) {  
    await this.slider.slideTo(this.segment);  
  }  
  async slideChanged() {  
    this.segment = await this.slider.getActiveIndex();  
  } 
  async segmentChangedtime(ev: any) {  
    await this.slidertime.slideTo(this.segmenttime);  
  }  
  async slideChangedtime() {  
    this.segmenttime = await this.slidertime.getActiveIndex();  
  }
  GetUserProfile() {
      this.allServicesService.getData('getProfile/?token=' + this.user.token + '&type=' + this.type).subscribe(data => {
        // this.allServicesService.dismissLoading()
        this.res = data;
        if (this.res.status = 'ok') {
          setTimeout(()=>{
            this.changeupdatedata = true
          },500)
          this.ready = true;
          this.user_info = this.res;
          this.name = this.user_info.shop_name
          this.shop_location = this.user_info.shop_location
          this.snipet = this.user_info.snipet
          this.shop_about = this.user_info.shop_about
          this.userserviceinfo=this.user_info.userserviceinfo
          this.sametimeallday =this.user_info.sametimeallday
          this.is_sunday = this.user_info.working.is_sunday
          this.is_monday = this.user_info.working.is_monday
          this.is_tuesday = this.user_info.working.is_tuesday
          this.is_wednesday = this.user_info.working.is_wednesday
          this.is_thursday = this.user_info.working.is_thursday
          this.is_friday = this.user_info.working.is_friday
          this.is_saturdy = this.user_info.working.is_saturdy
          this.checksnipt()
          this.checkbio()
         
          if(this.user_info.working.sundaytime == [] || this.user_info.working.sundaytime == undefined || this.user_info.working.sundaytime == '' || this.user_info.working.sundaytime == null){
            this.sundaytime = []
          }else{
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
          }
          if(this.user_info.working.mondaytime == [] || this.user_info.working.mondaytime == undefined || this.user_info.working.mondaytime == '' || this.user_info.working.mondaytime == null){
              this.mondaytime = []
            }else{
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
            }
          if(this.user_info.working.tusdaytime == [] || this.user_info.working.tusdaytime == undefined || this.user_info.working.tusdaytime == '' || this.user_info.working.tusdaytime == null){
            this.tusdaytime = []
          }else{
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
            }
          if(this.user_info.working.wednesdaytime == [] || this.user_info.working.wednesdaytime == undefined || this.user_info.working.wednesdaytime == '' || this.user_info.working.wednesdaytime == null){
            this.wednesdaytime = []
            }else{
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
            }
          if(this.user_info.working.thursdaytime == [] || this.user_info.working.thursdaytime == undefined || this.user_info.working.thursdaytime == '' || this.user_info.working.thursdaytime == null){
            this.thursdaytime = []
            }else{
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
            }
          if(this.user_info.working.fridaytime == [] || this.user_info.working.fridaytime == undefined || this.user_info.working.fridaytime == '' || this.user_info.working.fridaytime == null){
            this.fridaytime = []
            }else{
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
            }
          if(this.user_info.working.saturdaytime == [] || this.user_info.working.saturdaytime == undefined || this.user_info.working.saturdaytime == '' || this.user_info.working.saturdaytime == null){
            this.saturdaytime = []
            }else{
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
            }
          if(this.user_info.activity == null || this.user_info.activity == undefined || this.user_info.activity == '' || this.user_info.activity == [] || this.user_info.activity == '↵'){
            this.activity = []
            }else{
              this.activity = this.user_info.activity
              if(this.user_info.activity.includes('Open to Suggestions')){
                this.Open_to_Suggestions = true
                }else{
                this.Open_to_Suggestions = false
              }
             if(this.user_info.activity.includes('Amusement park')){
                this.amusement_park = true
                }else{
                this.amusement_park = false
              }
              if(this.user_info.activity.includes('Attend a conference/seminar')){
                this.attend_a_conference = true
                }else{
                this.attend_a_conference = false
              }
              if(this.user_info.activity.includes('Attend a Motorsport event')){
                this.attend_a_motorsport_event = true
                }else{
                this.attend_a_motorsport_event = false
              }
              if(this.user_info.activity.includes('Attend a party - Themed, Halloween, Christmas, New Year, company/office party')){
                this.attend_a_party = true
                }else{
                this.attend_a_party = false
              }
              if(this.user_info.activity.includes('Attend a political event')){
                this.attend_a_political_event = true
                }else{
                this.attend_a_political_event = false
              }
              if(this.user_info.activity.includes('Attend a Trivia night')){
                this.attend_a_trivia_night = true
                }else{
                this.attend_a_trivia_night = false
              }
              if(this.user_info.activity.includes('Ballroom dancing')){
                this.ballroom_dancing = true
                }else{
                this.ballroom_dancing = false
              }
              if(this.user_info.activity.includes('Bingo')){
                this.bingo = true
                }else{
                this.bingo = false
              }
              if(this.user_info.activity.includes('Bonfire')){
                this.bonfire = true
                }else{
                this.bonfire = false
              }
              if(this.user_info.activity.includes('Book club')){
                this.book_club = true
                }else{
                this.book_club = false
              }
              if(this.user_info.activity.includes('Bungee jumping')){
                this.bungee_jumping = true
                }else{
                this.bungee_jumping = false
              }
              if(this.user_info.activity.includes('Canoeing')){
                this.canoeing = true
                }else{
                this.canoeing = false
              }
              if(this.user_info.activity.includes('Carve pumpkins')){
                this.carve_pumpkins = true
                }else{
                this.carve_pumpkins = false
              }
              if(this.user_info.activity.includes('Christmas Caroling')){
                this.christmas_caroling = true
                }else{
                this.christmas_caroling = false
              }
              if(this.user_info.activity.includes('City tour')){
                this.city_tour = true
                }else{
                this.city_tour = false
              }
              if(this.user_info.activity.includes('Escape rooms')){
                this.escape_rooms = true
                }else{
                this.escape_rooms = false
              }
              if(this.user_info.activity.includes('Floating on tubes')){
                this.floating_on_tubes = true
                }else{
                this.floating_on_tubes = false
              }
              if(this.user_info.activity.includes('Fun runs/walks')){
                this.fun_runs = true
                }else{
                this.fun_runs = false
              }
              if(this.user_info.activity.includes('Get dessert')){
                this.get_dessert = true
                }else{
                this.get_dessert = false
              }
              if(this.user_info.activity.includes('Go look at Christmas lights')){
                this.go_look_at_christmas_lights = true
                }else{
                this.go_look_at_christmas_lights = false
              }
              if(this.user_info.activity.includes('Go to a bbg')){
                this.go_to_a_bbg = true
                }else{
                this.go_to_a_bbg = false
              }
              if(this.user_info.activity.includes('Go to a dance/prom')){
                this.go_to_a_dance = true
                }else{
                this.go_to_a_dance = false
              }
              if(this.user_info.activity.includes('Go to a festival')){
                this.go_to_a_festival = true
                }else{
                this.go_to_a_festival = false
              }
              if(this.user_info.activity.includes('Go to a formal event')){
                this.go_to_a_formal_event = true
                }else{
                this.go_to_a_formal_event = false
              }
              if(this.user_info.activity.includes('Go to a show or convention - sci-fi convention, car show, boat show, comic convention, psychics fair, dog show, etc.')){
                this.go_to_a_show = true
                }else{
                this.go_to_a_show = false
              }
              if(this.user_info.activity.includes('Go to an aquarium')){
                this.go_to_an_aquarium = true
                }else{
                this.go_to_an_aquarium = false
              }
              if(this.user_info.activity.includes('Go to church')){
                this.go_to_church = true
                }else{
                this.go_to_church = false
              }
              if(this.user_info.activity.includes('Going for a walk with pets')){
                this.going_for_a_walk_with_pets = true
                }else{
                this.going_for_a_walk_with_pets = false
              }
              if(this.user_info.activity.includes('Group dates')){
                this.group_dates = true
                }else{
                this.group_dates = false
              }
              if(this.user_info.activity.includes('Group Game night')){
                this.group_game_night = true
                }else{
                this.group_game_night = false
              }
              if(this.user_info.activity.includes('Home decorating')){
                this.home_decorating = true
                }else{
                this.home_decorating = false
              }
              if(this.user_info.activity.includes('Horse back riding')){
                this.horse_back_riding = true
                }else{
                this.horse_back_riding = false
              }
              if(this.user_info.activity.includes('Hot Air balloon')){
                this.hot_air_balloon = true
                }else{
                this.hot_air_balloon = false
              }
              if(this.user_info.activity.includes('Hunting')){
                this.hunting = true
                }else{
                this.hunting = false
              }
              if(this.user_info.activity.includes('Ice skating')){
                this.ice_skating = true
                }else{
                this.ice_skating = false
              }
              if(this.user_info.activity.includes('Kayaking')){
                this.kayaking = true
                }else{
                this.kayaking = false
              }
              if(this.user_info.activity.includes('Laser tag')){
                this.laser_tag = true
                }else{
                this.laser_tag = false
              }
              if(this.user_info.activity.includes('Line dancing')){
                this.line_dancing = true
                }else{
                this.line_dancing = false
              }
              if(this.user_info.activity.includes('Marathons or races')){
                this.marathons = true
                }else{
                this.marathons = false
              }
              if(this.user_info.activity.includes('Mushroom hunting')){
                this.mushroom_hunting = true
                }else{
                this.mushroom_hunting = false
              }
              if(this.user_info.activity.includes('Photography')){
                this.photography = true
                }else{
                this.photography = false
              }
              if(this.user_info.activity.includes('Play musical instruments-Jam session')){
                this.play_musical = true
                }else{
                this.play_musical = false
              }
              if(this.user_info.activity.includes('Random acts of kindness')){
                this.random_acts_of_kindness = true
                }else{
                this.random_acts_of_kindness = false
              }
              if(this.user_info.activity.includes('Reunion')){
                this.reunion = true
                }else{
                this.reunion = false
              }
              if(this.user_info.activity.includes('Roller skating/rollerblading')){
                this.roller_skating = true
                }else{
                this.roller_skating = false
              }
              if(this.user_info.activity.includes('Scuba diving')){
                this.scuba_diving = true
                }else{
                this.scuba_diving = false
              }
              if(this.user_info.activity.includes('Sightseeing')){
                this.sightseeing = true
                }else{
                this.sightseeing = false
              }
              if(this.user_info.activity.includes('Sky diving')){
                this.sky_diving = true
                }else{
                this.sky_diving = false
              }
              if(this.user_info.activity.includes('Sledding')){
                this.sledding = true
                }else{
                this.sledding = false
              }
              if(this.user_info.activity.includes('Studying - tutoring')){
                this.studying = true
                }else{
                this.studying = false
              }
              if(this.user_info.activity.includes('Take a class together - dancing, pottery, art, cooking')){
                this.take_a_class_together = true
                }else{
                this.take_a_class_together = false
              }
              if(this.user_info.activity.includes('Thrifting')){
                this.thrifting = true
                }else{
                this.thrifting = false
              }
              if(this.user_info.activity.includes('Tubing')){
                this.tubing = true
                }else{
                this.tubing = false
              }
              if(this.user_info.activity.includes('Watch fireworks')){
                this.watch_fireworks = true
                }else{
                this.watch_fireworks = false
              }
              if(this.user_info.activity.includes('Watch sunset/sunrise')){
                this.watch_sunset = true
                }else{
                this.watch_sunset = false
              }
              if(this.user_info.activity.includes('Water park')){
                this.water_park = true
                }else{
                this.water_park = false
              }
              if(this.user_info.activity.includes('Wingman/wingwoman')){
                this.wingman = true
                }else{
                this.wingman = false
              }
              if(this.user_info.activity.includes('Wood working')){
                this.wood_working = true
                }else{
                this.wood_working = false
              }
          }
          if(this.user_info.offer_services == null || this.user_info.offer_services == undefined || this.user_info.offer_services == '' || this.user_info.offer_services == []){
            this.offer_services = []
          }else{
            this.offer_services = this.user_info.offer_services
            if(this.user_info.offer_services.includes('Foodie')){
            this.Foodie = true
            }else{
            this.Foodie = false
            }   
            if(this.user_info.offer_services.includes('Sports Fan')){
            this.Sports_Fan = true
            }else{
            this.Sports_Fan = false
            }
            if(this.user_info.offer_services.includes('Great Outdoors')){
            this.Great_Outdoors = true
            }else{
            this.Great_Outdoors = false
            }
            if(this.user_info.offer_services.includes('Art Lover')){
            this.Art_Lover = true
            }else{
            this.Art_Lover = false
            }  
            if(this.user_info.offer_services.includes('Animal Lover')){
            this.Animal_Lover = true
            }else{
            this.Animal_Lover = false
            }2
            if(this.user_info.offer_services.includes('Socialite')){
            this.Socialite = true
            }else{
            this.Socialite = false
            }3
            if(this.user_info.offer_services.includes('Athletic')){
            this.Athletic = true
            }else{
            this.Athletic = false
            } 
            if(this.user_info.offer_services.includes('Dancing & Nightlife')){
            this.Dancing_Nightlife = true
            }else{
            this.Dancing_Nightlife = false
            } if(this.user_info.offer_services.includes('More Coffee')){
            this.More_Coffee = true
            }else{
            this.More_Coffee = false
            } 
            if(this.user_info.offer_services.includes('Theater Nerd')){
            this.Theater_Nerd = true
            }else{
            this.Theater_Nerd = false
            }
        }
        }
      }, (err) => {
        setTimeout(()=>{
          this.changeupdatedata = true
        },400)
        this.allServicesService.dismissLoading()
        this.ready = true;
        this.allServicesService.presentAlert(err.error.errormsg);
        if (err.error.error_code == "user_expire") {
          this.location.back();
        }
      })
  }
  async selectImage(type) {
    this.type=type;
    this.images = [];
    const actionSheet = await this.actionSheetController.create({
      header: "Select Image source",
      buttons: [{
        text: 'Load image from Library',
        handler: () => {
          this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: 'capture image using Camera',
        handler: () => {
          this.takePicture(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }
  takePicture(sourceType: PictureSourceType) {
    var options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };
    this.camera.getPicture(options).then(imagePath => {
      this.crop.crop(imagePath, { quality: 100 }).then(
        newPath => {
          if(newPath){
            if (this.plt.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
              this.filePath.resolveNativePath(newPath)
                .then(filePath => {
                  let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                  let currentName = newPath.substring(newPath.lastIndexOf('/') + 1, newPath.lastIndexOf('?'));
                  let smext = currentName.split('.').pop();
                  let ext = smext.toLowerCase();
                  this.copyFileToLocalDir(correctPath, currentName, this.createFileName(ext));
                });
            } else {
              var currentName = newPath.substr(newPath.lastIndexOf('/') + 1);
              var correctPath = newPath.substr(0, newPath.lastIndexOf('/') + 1);
              let smext = currentName.split('.').pop();
              let ext = smext.toLowerCase();
              this.copyFileToLocalDir(correctPath, currentName, this.createFileName(ext));
            }
          }

          // this.UploadImage()
        },
        error => {
        }
      );
    });
  }
  createFileName(ext) {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + "." + ext;
    return newFileName;
  }
  copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(success => {
      this.updateStoredImages(newFileName);
    }, error => {
      this.presentToast('Error while storing file.');
    });
  }
  async presentToast(text) {
    const toast = await this.toastController.create({
      message: text,
      position: 'bottom',
      duration: 3000
    });
    toast.present();
  }
  updateStoredImages(name) {
    let filePath = this.file.dataDirectory + name;
    let resPath = this.pathForImage(filePath);
    let newEntry = {
      name: name,
      path: resPath,
      filePath: filePath
    };
    this.images.push(newEntry);
    this.UploadImage(this.user);
    this.ref.detectChanges(); // trigger change detection cycle
  }
  pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      let converted = (<any>window).Ionic.WebView.convertFileSrc(img);
      return converted;
    }
  }
  UploadImage(user) {
    this.allServicesService.showLoader('uploading...')
    if (this.images.length > 0) {
      let _mime_type = 'image/jpeg'
      let smext = this.images[0].name.split('.').pop();
      let ext = smext.toLowerCase();
      if (ext == 'png') {
        _mime_type = 'image/png';
      }
      if (ext == 'jpeg') {
        _mime_type = 'image/jpeg';
      }
      if (ext == 'mov') {
        _mime_type = 'video/quicktime';
      }
      if (ext == 'mp4') {
        _mime_type = 'video/mp4';
      }
      if (ext == 'jpg') {
        _mime_type = 'image/jpeg';
      }
      const fileTransfer: FileTransferObject = this.transfer.create();
      let header: Headers = new Headers();
      header.append('Authorization', 'Bearer ' + user.token);
      let options: FileUploadOptions = {
        fileKey: 'file',
        fileName: user.user_id + '_featured.' + ext,
        chunkedMode: false,
        mimeType: _mime_type,
        params: { 'type': this.type, 'user': user.user_id, 'ext': ext },
        headers: { 'Authorization': 'Bearer ' + user.token }
      }
      let url = this.allServicesService.getURL();
      fileTransfer.upload(this.images[0].filePath, url + '/wp-json/wp/v2/media?token=' + user.token, options)
        .then((data1) => {
          this.allServicesService.dismissLoading();
             this.GetUserImage();
        }, (err) => {
          this.allServicesService.dismissLoading();
        });
    }
  }
  GetUserImage(){
    this.allServicesService.getData('GetUserMainImage/?token=' + this.user.token).subscribe(data => {
      this.res_image = data;
      this.userImage = this.res_image.userImage;
    }, (err) => {
      this.ready = true;
      if (err.error.error_code == "user_expire") {
        this.allServicesService.presentAlert(err.error.errormsg);
        this.router.navigate(['/home']);
      }
      this.allServicesService.presentAlert(err.error.errormsg);
    })
  }
  updateprofile(){
      // this.allServicesService.showLoader()
      setTimeout(() => {
      this.allServicesService.presenttoast('Profile Updated')
      }, 1000);
      if(this.sametimeallday == true){
         this.sametimeallday = 1
      }else{
        this.sametimeallday = 0
      }
      if(this.userserviceinfo == true){
        this.userserviceinfo = 1
     }else{
       this.userserviceinfo = 0
     }
      const  option ={
        'shop_name' : this.name,
        'shop_location' : this.shop_location,
        'shop_about' : this.shop_about,
        'snipet' : this.snipet,
        'activity':this.activity,
        'offer_services':this.offer_services,
        'is_monday':this.is_monday,
        'is_tuesday':this.is_tuesday,
        'is_wednesday':this.is_wednesday,
        'is_thursday':this.is_thursday,
        'is_friday':this.is_friday,
        'is_saturdy':this.is_saturdy,
        'is_sunday':this.is_sunday,
        'mondaytime':this.mondaytime,
        'tusdaytime':this.tusdaytime,
        'wednesdaytime':this.wednesdaytime,
        'thursdaytime':this.thursdaytime,
        'fridaytime':this.fridaytime,
        'saturdaytime':this.saturdaytime,
        'sundaytime':this.sundaytime,
        'userserviceinfo':this.userserviceinfo,
        'sametimeallday':this.sametimeallday
        }
        this.allServicesService.sendData('updateProfileCompany/?token=' + this.user.token, option).subscribe(data => {
        }, (err) => { 
          if (err.error.error_code == "user_expire") {
            this.router.navigate(['/home']);
          }
          this.allServicesService.presentAlert(err.error.errormsg);
        })

  }
select(ev){
  if (this.items.indexOf(ev.detail.value) == -1) {
    this.items.push(ev.detail.value)
  } else {
    this.items = this.items.filter(item => item !== ev.detail.value);
  }
}
selectactv(ev){
if(this.changeupdatedata == true){

    if (this.activity.indexOf(ev.detail.value) == -1) {
      this.activity.push(ev.detail.value)
    } else {
      this.activity = this.activity.filter(item => item !== ev.detail.value);
    }
  }
}
selectoffer_services(ev){
if(this.changeupdatedata == true){

  if (this.offer_services.indexOf(ev.detail.value) == -1) {
    this.offer_services.push(ev.detail.value)
  } else {
    this.offer_services = this.offer_services.filter(item => item !== ev.detail.value);
  }
}
}
selectweek(id){
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
  // var data2 = document.getElementsByClassName('dayactive')
  // if(data2.length == 0){
  //   var data = document.getElementById(id)
  //   data.classList.toggle('dayactive')
  // }else{
  //   var id2 = data2[0].id
  //   if(id2 != id){
  //     var data = document.getElementById(id2)
  //     data.classList.toggle('dayactive')
  //   }
  //   var data3 = document.getElementById(id)
  //   data3.classList.toggle('dayactive')
  // }
}
showclass(id){
  if(id == 1){
    this.days_week = true
    this.activity_tab=false
    this.common_interest = false
    this.about_tab = false
  }
  if(id == 2){
    this.days_week = false
    this.activity_tab=false
    this.common_interest = true
    this.about_tab = false
  }
  if(id == 3){
    this.days_week = false
    this.activity_tab=false
    this.common_interest = false
    this.about_tab = true
  }
  if(id == 4){
    this.days_week = false
    this.activity_tab=true
    this.common_interest = false
    this.about_tab = false
  }
  var data2 = document.getElementsByClassName('active')
  if(data2.length == 0){
    var data = document.getElementById(id)
    data.classList.toggle('active')
  }else{
    var id2 = data2[0].id
    if(id2 != id){
      var data = document.getElementById(id2)
      data.classList.toggle('active')
    }
    var data3 = document.getElementById(id)
    data3.classList.toggle('active')
  }
}
selectmondy(ev){
  if(this.changeupdatedata == true){
    if(this.changeTimeslot == false){
      if (this.mondaytime.indexOf(ev.detail.value) == -1) {
        this.mondaytime.push(ev.detail.value)
      } else {
        this.mondaytime = this.mondaytime.filter(item => item !== ev.detail.value);
    }
    }
}
}
selecttuesday(ev){
  if(this.changeupdatedata == true){
    if(this.changeTimeslot == false){
      if (this.tusdaytime.indexOf(ev.detail.value) == -1) {
        this.tusdaytime.push(ev.detail.value)
      } else {
        this.tusdaytime = this.tusdaytime.filter(item => item !== ev.detail.value);
      }
    }
}
}
selectwednesdy(ev){
  if(this.changeupdatedata == true){
    if(this.changeTimeslot == false){
      if (this.wednesdaytime.indexOf(ev.detail.value) == -1) {
        this.wednesdaytime.push(ev.detail.value)
      } else {
        this.wednesdaytime = this.wednesdaytime.filter(item => item !== ev.detail.value);
    }
    }
}
}
selectthursdy(ev){
  if(this.changeupdatedata == true){
    if(this.changeTimeslot == false){
      if (this.thursdaytime.indexOf(ev.detail.value) == -1) {
        this.thursdaytime.push(ev.detail.value)
      } else {
        this.thursdaytime = this.thursdaytime.filter(item => item !== ev.detail.value);
    }
    }
}
}
selectfridy(ev){
  if(this.changeupdatedata == true){
    if(this.changeTimeslot == false){
      if (this.fridaytime.indexOf(ev.detail.value) == -1) {
        this.fridaytime.push(ev.detail.value)
      } else {
        this.fridaytime = this.fridaytime.filter(item => item !== ev.detail.value);
      }
    }
}
}
selectsaturdy(ev){
  if(this.changeupdatedata == true){
    if(this.changeTimeslot == false){
      if (this.saturdaytime.indexOf(ev.detail.value) == -1) {
        this.saturdaytime.push(ev.detail.value)
      } else {
        this.saturdaytime = this.saturdaytime.filter(item => item !== ev.detail.value);
      }
    }
}
}
selectsundy(ev){
  if(this.changeupdatedata == true){
    if(this.changeTimeslot == false){
      if (this.sundaytime.indexOf(ev.detail.value) == -1) {
        this.sundaytime.push(ev.detail.value)
      } else {
        this.sundaytime = this.sundaytime.filter(item => item !== ev.detail.value);
      }
    }
}
}
selectSaameTime(ev){
  if(this.changeupdatedata == true){
    if(this.changeTimeslot == true){
      if(this.is_monday ==true){
        if (this.mondaytime.indexOf(ev.detail.value) == -1) {
          this.mondaytime.push(ev.detail.value)
        } else {
          this.mondaytime = this.mondaytime.filter(item => item !== ev.detail.value);
      }      
    }
     if(this.is_tuesday==true){
      if (this.tusdaytime.indexOf(ev.detail.value) == -1) {
        this.tusdaytime.push(ev.detail.value)
      } else {
        this.tusdaytime = this.tusdaytime.filter(item => item !== ev.detail.value);
      }     }
     if(this.is_wednesday==true){
      if (this.wednesdaytime.indexOf(ev.detail.value) == -1) {
        this.wednesdaytime.push(ev.detail.value)
      } else {
        this.wednesdaytime = this.wednesdaytime.filter(item => item !== ev.detail.value);
    }    }
    if(this.is_thursday==true){
      if (this.thursdaytime.indexOf(ev.detail.value) == -1) {
        this.thursdaytime.push(ev.detail.value)
      } else {
        this.thursdaytime = this.thursdaytime.filter(item => item !== ev.detail.value);
    }    }
    if(this.is_friday==true){
      if (this.fridaytime.indexOf(ev.detail.value) == -1) {
        this.fridaytime.push(ev.detail.value)
      } else {
        this.fridaytime = this.fridaytime.filter(item => item !== ev.detail.value);
      }    }
    if(this.is_saturdy==true){
      if (this.saturdaytime.indexOf(ev.detail.value) == -1) {
        this.saturdaytime.push(ev.detail.value)
      } else {
        this.saturdaytime = this.saturdaytime.filter(item => item !== ev.detail.value);
      }    }
    if(this.is_sunday==true){
      if (this.sundaytime.indexOf(ev.detail.value) == -1) {
        this.sundaytime.push(ev.detail.value)
      } else {
        this.sundaytime = this.sundaytime.filter(item => item !== ev.detail.value);
      }    
    }
    }else{
      if(this.is_tuesday == true){
        this.tusdaytime = this.mondaytime
      }
      if(this.is_wednesday == true){
      this.wednesdaytime = this.mondaytime
      }
      if(this.is_thursday == true){
      this.thursdaytime = this.mondaytime
    }
      if(this.is_friday == true){
      this.fridaytime = this.mondaytime
      }
      if(this.is_saturdy == true){
      this.saturdaytime = this.mondaytime
      }
      if(this.is_sunday == true){
      this.sundaytime = this.mondaytime
      }
    }
   
  }
}
sameTimeFunction(){
  if(this.sametimeallday == true){
setTimeout(() => {
  this.changeTimeslot = true
}, 500);
  }else{
    setTimeout(() => {
  this.changeTimeslot = false
    }, 500);
  }
}
checksnipt(){
  setTimeout(()=>{
    if(this.snipet){
      this.snipptcharuse = this.snipet['length'];
    }
  },200)
}
checkbio(){
  setTimeout(()=>{
    if(this.shop_about){
      this.biocharuse = this.shop_about['length']
    }
},500)
}
}
