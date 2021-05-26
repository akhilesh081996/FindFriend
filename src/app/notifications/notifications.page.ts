import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';
import { AllServicesService } from '../all-services.service';
import { AlertController, LoadingController, NavController, Platform, MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Location } from '@angular/common';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  user:any;
  res:any;
  ready:boolean=false;
  notifications:any=[];
  constructor(public menuCtrl: MenuController,
    public alertCtrl: AlertController,
    public allServicesService: AllServicesService,
    public loadingCtrl: LoadingController,
    public router: Router,
    public route: ActivatedRoute,
    public navCtrl: NavController,
    public location: Location,
    public storage: Storage) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.storage.get('user').then(userInfo => {
      if (userInfo != null) {
        this.user = userInfo;
        this.GetBooking();
        this.allServicesService.SaveAutoConfiqure(this.user.token);
      } else {
        this.router.navigate(['/home']);
      }
    }, err => {
      this.router.navigate(['/home']);
    }); 
  }
  async presentAlert() {
    let alert = await this.alertCtrl.create({
      header: 'Alert',
      message: 'Are you sure to clear all notifications?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Clear',
          handler: () => {
            this.clear()
          }
        }
      ]
    });

    await alert.present();
  }
  clear(){
    this.notifications = []
    const option ={
      token:this.user.token
    }
    this.allServicesService.sendData('clearNotification',option).subscribe(res =>{

    })
 
  }
  GetBooking() {
    this.allServicesService.getData('GetMyNotifications/?type=user&token=' + this.user.token).subscribe(data => {
      this.res = data;
      if (this.res.status = 'ok') {
        this.ready = true;
        this.notifications = this.res.notifications;
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
