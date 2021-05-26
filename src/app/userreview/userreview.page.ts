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
  selector: 'app-userreview',
  templateUrl: './userreview.page.html',
  styleUrls: ['./userreview.page.scss'],
})
export class UserreviewPage implements OnInit {
id
rating
user
review
  constructor(public storage: Storage,
    private callNumber: CallNumber,
    public menuCtrl: MenuController,
    private route: ActivatedRoute,
    public navctrl: NavController,
    public allServicesService: AllServicesService,
    ) { }

  ngOnInit() {
    this.id = this.route.snapshot.parent.paramMap.get('id');
    this.storage.get('user').then(userInfo => {
        this.user = userInfo;
  })
}
  onModelChange(ev){
    this.rating = ev
  }
    submit(){
      const option ={
        token: this.user.token,
        rating:this.rating,
        friend_id:Number(this.id),
        review:this.review
      }
      this.allServicesService.sendData('addRating',option).subscribe(res =>{
        this.navctrl.navigateForward('tabs/searchfilter')
      })
    }
  back(){
    this.navctrl.back()

  }
}
