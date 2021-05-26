import { Component, OnInit } from '@angular/core';
import { Events, AlertController, Platform, MenuController, NavController, ModalController, IonContent } from '@ionic/angular';
import { Routes, RouterModule, ActivatedRoute,Router } from '@angular/router';
import { AllServicesService } from '../all-services.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-favfriend',
  templateUrl: './favfriend.page.html',
  styleUrls: ['./favfriend.page.scss'],
})
export class FavfriendPage implements OnInit {
  user: any;
list
  is_login: boolean;
  constructor(
    public storage: Storage,
    public navctrl: NavController,
    public allServicesService: AllServicesService,
    public alertCtrl: AlertController
  ) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.storage.get('user').then(userInfo => {
      if (userInfo != null) {
        this.user = userInfo;
        this.allServicesService.showLoader();
        this.allServicesService.getData('getFav/?token='+this.user.token).subscribe((result) => {
          this.list = result['favList']

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
  
  }
}
