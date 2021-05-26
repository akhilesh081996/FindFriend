import { Component, OnInit } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Events, AlertController, Platform, MenuController, NavController, ModalController, IonContent } from '@ionic/angular';
import { ViewChild, ElementRef, NgZone } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute,Router } from '@angular/router';
import { AllServicesService } from '../all-services.service';
import { Storage } from '@ionic/storage';
import { Location } from '@angular/common';
import { NavigationExtras } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation';
import { DatePipe } from '@angular/common';

import { FormGroup, Validators, FormBuilder, FormArray, FormControl } from '@angular/forms';
import {  LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-setschedule',
  templateUrl: './setschedule.page.html',
  styleUrls: ['./setschedule.page.scss'],
})
export class SetschedulePage implements OnInit {
  messageAtBooking
  selectDateforbook
  date: any;
  myinfo
  startdate: any;
  enddate: any;
  isSelected: any;
  isday: any;
  daysInThisMonth: any;
  daysInLastMonth: any;
  daysInNextMonth: any;
  weekNames: any;
  monthNames: string[];
  currentMonth: any;
  currentYear: any;
  currentDate: any;
  weekNames2: any;

  user: any;
  ready: boolean = false;
  calready: boolean = false;
  res: any;
  list: any;

  service: any = {};
  price: any = {};
  time: any = {};
  item: any = {};
  selecteddate:any;
  serviceName:any={};


  addCheckListForm: FormGroup;
  form_value: any;
  user_id: any;
  user_info: any;
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
  sunday: any

  is_formServiceValid: boolean = false;
  is_formdateValid: boolean = false;
  avilable_time_slot:any=[];

  timeready:boolean=true;
  act
  arrayItems: {
    service: number;
    price: string;
    time: string
  }[];

  private currentNumber = 0;
  activitytime: any;
  nextMonthenable: boolean = false;
  result;
  cards = [];
  constructor(
    public alertCtrl: AlertController, 
    public allServicesService: AllServicesService,
    public loadingCtrl: LoadingController,
    public router: Router,
    public route: ActivatedRoute,
    public navCtrl: NavController,
    public location: Location,
    public storage: Storage,
    private _formBuilder: FormBuilder) {
    this.user_id = this.route.snapshot.parent.paramMap.get('id');
    this.act = this.route.snapshot.parent.paramMap.get('act');
    this.addCheckListForm = new FormGroup({
      // demoArray: this._formBuilder.array([]),
      'select_day': new FormControl('', Validators.compose([Validators.required])),
      'select_time': new FormControl('', Validators.compose([Validators.required])),
      'activity': new FormControl('', Validators.compose([Validators.required])),
      'location': new FormControl('', Validators.compose([Validators.required])),
      'city': new FormControl('', Validators.compose([Validators.required])),
      'state': new FormControl('', Validators.compose([Validators.required])),
      'zipcode': new FormControl('', Validators.compose([Validators.required])),
      'minimum_time_to_spend_with_Friend': new FormControl('', Validators.compose([Validators.required])),
      'response_time_limit': new FormControl('', Validators.compose([Validators.required])),
    })
    this.monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.weekNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    this.weekNames2 = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    this.date = new Date();

  }
  back(){
    this.navCtrl.back()
  }
  ionViewWillEnter(){
    this.storage.get('user').then(userInfo => {
      if (userInfo != null) {
        this.user = userInfo;
        this.getMyPro(this.user.user_id)
        // this.GetServices();
        this.getDaysOfMonth();
      } else {
        this.router.navigate(['/home']);
      }
    }, err => {
      this.router.navigate(['/home']);
    });
  }
  // get demoArray() {
  //   return this.addCheckListForm.get('demoArray') as FormArray;
  // }
  // addItem(item) {
  //   this.arrayItems.push(item);
  //   this.demoArray.push(this._formBuilder.control(false));
  // }
  // removeItem() {
  //   this.arrayItems.pop();
  //   this.demoArray.removeAt(this.demoArray.length - 1);
  // }
  ngOnInit() {
  }
  getMyPro(user_id){
    this.allServicesService.getData('getProfile/?token=' + user_id + '&type=public').subscribe(data => {
      this.myinfo = data
      this.GetCards()
    })
  }
  getDaysOfMonth() {
    this.calready = false;
    this.GetUserProfile(this.user_id);
  }
  goToLastMonth() {
    this.nextMonthenable = false
    this.date = new Date(this.date.getFullYear(), this.date.getMonth(), 0);
    this.getDaysOfMonth();
  }

  goToNextMonth() {
    this.nextMonthenable = true
    this.date = new Date(this.date.getFullYear(), this.date.getMonth() + 2, 0);
    this.getDaysOfMonth();
  }

  // private increment(post_id) {
  //   let val = this.addCheckListForm.controls["item_" + post_id].value;
  //   let val2 = parseInt(val) + 1
  //   this.addCheckListForm.controls["item_" + post_id].setValue(val2);
  // }

  // private decrement(post_id) {
  //   let val = this.addCheckListForm.controls["item_" + post_id].value;
  //   if (val > 0) {
  //     let val2 = parseInt(val) - 1
  //     this.addCheckListForm.controls["item_" + post_id].setValue(val2);
  //   }
  // }
  selectDate(day) {
    if(this.nextMonthenable){
      this.setbok(day)
    }else{
      if( this.currentDate > day){
        this.allServicesService.presentAlert('Please select latest date')
          return
      }else{
      this.setbok(day)
      }
    }
  }
setbok(day){
  setTimeout(()=>{
    var dateclass = document.getElementById(day)
    if(dateclass){
      var data2 = document.getElementsByClassName('activedate')
        if(data2.length == 0){
          var data = document.getElementById(day)
          data.classList.toggle('activedate')
        }else{
          var id2 = data2[0].id
          if(id2 != day){
            var data = document.getElementById(id2)
            data.classList.toggle('activedate')
          }
          var data3 = document.getElementById(day)
          data3.classList.toggle('activedate')
        }
    }
  },400)

  this.startdate = '';
  this.enddate = '';
  this.isSelected == true;
  this.isday = day;
  let thisDate1 = this.date.getFullYear() + "/" + (this.date.getMonth() + 1) + "/" + day;
  let d = new Date(thisDate1);
  let n = d.getDay();
  let weekday = this.weekNames2[n];
  this.addCheckListForm.controls['select_day'].setValue(weekday);
  this.is_formdateValid = true;
  this.selecteddate=(this.date.getMonth() + 1)+'/'+day+'/'+this.date.getFullYear() ;
  let date_booking = this.date.getFullYear() +'-'+(this.date.getMonth() + 1)+'-'+day;
  this.selectDateforbook = date_booking
  this.GetBookingAvialableSlot(date_booking,this.user.token,this.user_id);
}
  GetServices() {
    this.allServicesService.getData('getUserServices/?type=public&token=' + this.user_id).subscribe(data => {
      this.res = data;
      if (this.res.status = 'ok') {
        this.ready = true;
        // this.list = this.res.list;
        // let group = {}
        // this.list.forEach(input_template => {
        //   if (input_template.checked) {
        //     this.serviceName[input_template.post_id]=input_template.post_title;
        //     let price_field = "price_" + input_template.post_id;
        //     let service_field = "service_" + input_template.post_id;
        //     let items = "item_" + input_template.post_id;
        //     let time_field = "time_" + input_template.post_id;
          
        //     group[price_field] = new FormControl(input_template.value.price);
        //     group[service_field] = new FormControl(false,Validators.required);
        //     group[items] = new FormControl(0,Validators.required);
        //     group[time_field] = new FormControl(input_template.value.time);
        //   }
        // })
        // group['select_day'] = new FormControl()
        // group['select_time'] = new FormControl()
        // this.addCheckListForm = new FormGroup(group);
      }
    }, (err) => {
      this.ready = true;
      if (err.error.error_code == "user_expire") {

        this.allServicesService.presentAlert(err.error.errormsg);
        this.router.navigate(['/home']);
      }
      this.allServicesService.presentAlert(err.error.errormsg);
    })
  }

  GetUserProfile(user_id) {
    this.allServicesService.getData('getProfile/?token=' + user_id + '&type=public').subscribe(data => {
      this.res = data;
      if (this.res.status = 'ok') {
        this.calready = true;
        this.user_info = this.res;
        this.userWorkingDaytime(this.user_info);
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
        this.selectDate(this.currentDate)
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
    }, (err) => {
      this.GetCards()
      this.calready = true;
      this.allServicesService.presentAlert(err.error.errormsg);
      if (err.error.error_code == "user_expire") {
        // this.location.back();
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

  addServices(data) {


    // for (var key in this.form_value) {
    //   if (this.form_value.hasOwnProperty(key)) {
    //     if (typeof this.form_value[key] != 'undefined') {
    //       if (key.substring(0, 5) === "item_") {
    //         let realkey = key;
    //         let thenum = key.match(/\d+/)[0];
    //         this.item[thenum] = this.form_value[realkey];
    //       }
          
    //       if (key.substring(0, 6) === "price_") {
    //         let realkey = key;
    //         let thenum = key.match(/\d+/)[0];
    //         this.price[thenum] = this.form_value[realkey];
    //       }

    //       if (key.substring(0, 5) === "time_") {
    //         let realkey = key;
    //         let thenum = key.match(/\d+/)[0];
    //         this.time[thenum] = this.form_value[realkey];
    //       }

         

          // if (key.substring(0, 8) === "service_") {
          //   let realkey = key;
          //   let thenum = key.match(/\d+/)[0];
          //   this.service[thenum] = this.form_value[realkey];
          //   if (this.form_value[realkey] == true) {
          //     //this.is_formServiceValid = true;
          //     if(this.form_value["item_"+thenum]==0){
          //       this.is_formServiceValid=false;
          //     }else{
          //       this.is_formServiceValid=true;
          //     }
          //   }
          // }
    //     }
    //   }
    // }


      
      let processData = {
        select_day:data.select_day,
        select_date:this.selecteddate,
        select_time:data.select_time,
        activity:data.activity,
        location:data.location,
        city:data.city,
        state:data.state,
        zipcode:data.zipcode,
        minimum_time_to_spend_with_Friend:data.minimum_time_to_spend_with_Friend,
        response_time_limit:data.response_time_limit,
      };
      this.storage.set('cart',processData)
      this.router.navigate(['/invoice/'+this.user_id])
  }


 async GetBookingAvialableSlot(selecteddate,token,user_id){
   this.allServicesService.showLoader()
   this.timeready=false;
    var time = new Date
   const dataPost = {
    token:token,
    barber_id:Number(user_id),
    date: selecteddate+' '+time.toLocaleTimeString()
   }
  this.avilable_time_slot=[]; 
  this.addCheckListForm.controls['select_time'].setValue("");
  this.allServicesService.sendData('get_barber_booked_time_on_date',dataPost).subscribe(data => {
   this.allServicesService.dismissLoading()
        this.res = data;
    if (this.res.status = 'ok') {
      if(this.res.working != false){
        this.avilable_time_slot = this.res.working;
        this.timeready=true;
      }else{
        this.allServicesService.dismissLoading()
        this.allServicesService.presentAlert('No time slot available. Please try other day')
      }
    }
  }, (err) => {
   this.allServicesService.dismissLoading()
    this.calready = true;
    this.allServicesService.presentAlert(err.error.errormsg);
    if (err.error.error_code == "user_expire") {
      // this.location.back();
    }
  })
 }

//  SelectService(event,service){
//    if(event.detail.checked==true){
//     this.addCheckListForm.controls['item_'+service].setValue(1);
//    }else{
//     this.addCheckListForm.controls['item_'+service].setValue(0);
//    }
  
//  }
selecttimeslot(val){
//   var now = new Date();

// var in20 = new Date(now.getTime() + val);
  this.activitytime = val
}
GetCards() {
  //this.is_issue = false;
  this.allServicesService.GetCards(this.user.token)
  .subscribe(res => {
    this.result=res;
    if (this.result.status == "ok") {
      this.cards = this.result.cards.data;
      if(this.myinfo.kyc_status == 0){
        this.presentAlertforkyc()
      }
    }else{
      this.prsentAlrtForaddcard()
      // this.allServicesService.presentAlert("something went wrong.");
    }
  },(err) => {
    this.prsentAlrtForaddcard()
  });

}
async presentAlertforkyc() {
  const alert = await this.alertCtrl.create({
    header:'Complete Your KYC',
    // message:'are you sure ?',
    buttons: [
      {
        text: 'Later',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
        }
      }, {
        text: 'Complete KYC',
        handler: () => {
          this.navCtrl.navigateForward('kyc')

        }
      }
    ]
  });
  await alert.present();
}
  async prsentAlrtForaddcard(){
    const alert = await this.alertCtrl.create({
      header:'Please add card First',
      message:'are you sure ?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.navCtrl.navigateForward('/billing/forpayment/invoice')
          }
        }
      ]
    });
    await alert.present();
}
  async submit(){
  if(this.cards.length == 0 || this.cards == []){
    this.prsentAlrtForaddcard()
  }else if(this.myinfo.kyc_status == 0){
    this.presentAlertforkyc()
  }else{
    this.allServicesService.showLoader()
    const option ={
      token:this.user.token,
      activity:this.act,
      to_user_id:this.user_id,
      select_time:this.activitytime,
      select_date:this.selectDateforbook,
      messageAtBooking:this.messageAtBooking
    }
    this.allServicesService.sendData('CreateStripeCaptureBooking',option).subscribe(res =>{
      if(res['status'] == 'ok'){
        this.navCtrl.navigateForward('tabs/searchfilter')
        this.allServicesService.presentAlert('Your booking was successful! Please wait for Friend to accept!')
        this.allServicesService.dismissLoading()
      }else{
        this.allServicesService.dismissLoading()
      this.allServicesService.presentAlert('Something went wrong')
      }
    },err =>{
      this.allServicesService.dismissLoading()
      this.allServicesService.presentAlert('Something went wrong')
    })
  }
  }

}
