import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';
import { AllServicesService } from '../all-services.service';
import { AlertController, LoadingController, NavController, Platform, MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Location } from '@angular/common';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
})
export class BookingPage implements OnInit {
   count = 60
  date: any;
  daysInThisMonth: any;
  daysInLastMonth: any;
  daysInNextMonth: any;
  weekNames: any;
  monthNames: string[];
  currentMonth: any;
  currentYear: any;
  currentDate: any;

  startdate: any;
  enddate: any;
  isSelected: any;
  isday: any;

  res: any;
  ready: boolean = false;

  user: any;
  booking: any;

  selected_date: any = '';
  status: any;
  ionViewDidLoad() {

  }
  constructor(
    public menuCtrl: MenuController,
    public alertCtrl: AlertController,
    public allServicesService: AllServicesService,
    public loadingCtrl: LoadingController,
    public router: Router,
    public route: ActivatedRoute,
    public navCtrl: NavController,
    public location: Location,
    public storage: Storage
    ) {
    this.monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.weekNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    this.date = new Date();
    this.getDaysOfMonth();
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

  ngOnInit() {

  }
  ionViewWillEnter() {
    this.storage.get('user').then(userInfo => {
      if (userInfo != null) {
        this.user = userInfo;
        this.GetBooking();
      } else {
        this.router.navigate(['/home']);
      }
    }, err => {
      this.router.navigate(['/home']);
    });
  }

  async GetBooking() {
    this.allServicesService.getData('GetMyBookings/?type=user&token=' + this.user.token + '&date=' + this.selected_date).subscribe(data => {
      this.res = data;
      if (this.res.status = 'ok') {
        this.ready = true;
        this.booking = this.res.booking;
      }
    }, (err) => {
      this.ready = true;
      if (err.error.error_code == "user_expire") {
        this.router.navigate(['/home']);
      }
      this.allServicesService.presentAlert(err.error.errormsg);
    })
  }

  selectDate(day) {
    if(day<10){
      day="0"+day;
    }
    this.startdate = '';
    this.enddate = '';
    this.isSelected == true;
    this.isday = day;
    let thisDate1 = this.date.getFullYear() + "/" + (this.date.getMonth() + 1) + "/" + day;
    let d = new Date(thisDate1);
    let n = d.getDay();
    this.selected_date = this.date.getFullYear() + '-' + (this.date.getMonth() + 1) + '-' + day;
    this.GetBooking();

  }


  async ProcessBooking(status, booking_id) {
    if (status == 1) {
      this.status = "Confirm";
    }

    if (status == 3) {
      this.status = "Decline";
    }
    const alert = await this.alertCtrl.create({
      header: this.status,
      message: 'are you sure ?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            //this.UpdateBooking(booking_id,status);
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.UpdateBooking(booking_id, status);
          }
        }
      ]
    });

    await alert.present();
  }


  UpdateBooking(booking_id, status) {
    let data_post = {
      token: this.user.token,
      booking_id: booking_id,
      status: status
    };
    this.allServicesService.sendData('UpdateBooking', data_post).subscribe(data => {
      this.res = data;
      if (this.res.status = 'ok') {
        this.GetBooking();
        this.allServicesService.presentAlert(this.res.msg);
      }
    }, (err) => {
      this.ready = true;
      if (err.error.error_code == "user_expire") {
        this.router.navigate(['/home']);
      }
      this.allServicesService.presentAlert(err.error.errormsg);
    })
  }

}