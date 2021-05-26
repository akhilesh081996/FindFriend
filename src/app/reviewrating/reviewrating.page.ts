import { Component, OnInit } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Events, AlertController, Platform, MenuController, NavController, ModalController, IonContent } from '@ionic/angular';
import { ViewChild, ElementRef, NgZone } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute,Router } from '@angular/router';
import { AllServicesService } from '../all-services.service';
import { Storage } from '@ionic/storage';
import { Location } from '@angular/common';
import { NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-reviewrating',
  templateUrl: './reviewrating.page.html',
  styleUrls: ['./reviewrating.page.scss'],
})
export class ReviewratingPage implements OnInit {
  user
  list
    constructor(public storage: Storage,
      private callNumber: CallNumber,
      public menuCtrl: MenuController,
      private route: ActivatedRoute,
      public navctrl: NavController,
      public allServicesService: AllServicesService,
      ) { }

  ngOnInit() {
    this.storage.get('user').then(userInfo => {
      this.user = userInfo;
      this.getalllist()
})
  }
  getalllist(){
    // this.allServicesService.showLoader()
    const option ={
      token:this.user.list
    }
    this.allServicesService.getData('getRatingList?token='+this.user.token).subscribe(res=>{
      this.allServicesService.dismissLoading()
      this.list = res['ratingList']
    })
  }

  back(){
    this.menuCtrl.toggle()
    this.navctrl.back()
  }
}
