import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';
import { AllServicesService } from '../all-services.service';
import { AlertController, LoadingController, NavController, Platform, MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Location } from '@angular/common';

@Component({
  selector: 'app-carddetails',
  templateUrl: './carddetails.page.html',
  styleUrls: ['./carddetails.page.scss'],
})
export class CarddetailsPage implements OnInit {
  user:any;
  res:any;
  ready:boolean=false;
  cards:any=[];
  cardslength:any; 
  loading:any;
  constructor(public menuCtrl: MenuController, public alertCtrl: AlertController, public allServicesService: AllServicesService, public loadingCtrl: LoadingController, public router: Router, public route: ActivatedRoute, public navCtrl: NavController, public location: Location, public storage: Storage,public alertController: AlertController) {

   }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.storage.get('user').then(userInfo => {
      if (userInfo != null) {
        this.user = userInfo;
        this.GetCards();
        //this.allServicesService.SaveAutoConfiqure(this.user.token);
      } else {
        this.router.navigate(['/home']);
      }
    }, err => {
      this.router.navigate(['/home']);
    }); 
  }

  GetCards() {
    let data={'token':this.user.token};
    this.allServicesService.sendData('StripeGetCards',data).subscribe(data => {
      this.res = data;
      this.cards=this.res.cards.data;
      this.ready=true;
    }, (err) => {
      this.cards = []
      this.ready = true;
      if (err.error.error_code == "user_expire") {
        this.router.navigate(['/home']);
      }
      // this.allServicesService.presentAlert(err.error.errormsg);
      this.cardslength=0;
    })
  }

  newcard(){
    this.router.navigate(['/billing']);
  }

  async removecard(cardinfo){

    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'Are you sure?',
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
            this.showLoader();
            let data={'token':this.user.token,'card':cardinfo.id,'type':'forpayment'};
            this.allServicesService.sendData('DeleteCard',data).subscribe(data => {
              this.dismissLoading();
              this.ionViewWillEnter();
            }, (err) => {
              this.ready = true;
              if (err.error.error_code == "user_expire") {
                this.router.navigate(['/home']);
              }
            })
          }
        }
      ]
    });
    await alert.present();    
  }

  async showLoader() {
    this.loading = await this.loadingCtrl.create({
      message: 'please wait',
      backdropDismiss: true,
      
    });
    
    this.loading.present();
    
    await this.loading.onDidDismiss();
  }
  
  async dismissLoading() {
    await this.loading.dismiss();
  }
  back(){
    this.navCtrl.back()
  }
}
