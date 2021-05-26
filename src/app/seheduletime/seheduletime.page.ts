import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';
import { AllServicesService } from '../all-services.service';
import { AlertController, LoadingController, NavController, Platform, MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Location } from '@angular/common';
@Component({
  selector: 'app-seheduletime',
  templateUrl: './seheduletime.page.html',
  styleUrls: ['./seheduletime.page.scss'],
})
export class SeheduletimePage implements OnInit {
  time
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
this.selectDate(this.currentDate)
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
      } else {
        this.router.navigate(['/home']);
      }
    }, err => {
      this.router.navigate(['/home']);
    });
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

  }
  update() {
    var d = new Date(this.time)
    var n = d.toLocaleString("en-US", { hour: '2-digit', minute: '2-digit' , hour12: true})
    const option = {
      date:this.selected_date,
      time:n
    }
    let navigationExtras: NavigationExtras = {
      queryParams: {
        val: JSON.stringify(option),
      }
    };
    this.navCtrl.navigateForward(['tabs/searchfilter'], navigationExtras);
  }

}
