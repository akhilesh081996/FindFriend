import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import {  NavController, LoadingController, AlertController, Events,ModalController } from '@ionic/angular';
import { AllServicesService } from '../all-services.service';
import { Router, NavigationExtras } from '@angular/router';
import { ChoosetypePage } from '../choosetype/choosetype.page';

@Component({
  selector: 'app-managebankcards',
  templateUrl: './managebankcards.page.html',
  styleUrls: ['./managebankcards.page.scss'],
}) 
export class ManagebankcardsPage implements OnInit {
  user:any;
  result:any;
  cards:any;
  bank_accounts:any;
  card_accounts:any;
  customer:any; 
  error:any;
  ready:boolean=false;
  setting:any;
  can_add_card:boolean=false;
  userDetail: any;
  constructor(public events: Events,
    public navCtrl: NavController,
    public storage: Storage,
    public router: Router,
    public modalController: ModalController,
    public serviceForAllService: AllServicesService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) { 
      this.GetSetting();
    }
    back(){
      this.navCtrl.navigateBack('/tabs/searchfilter')
    }
  ngOnInit() {
  } 




  ionViewWillEnter(){
    this.storage.get('user').then((val) => {
      if (val != null) {
           this.user = val;
           this.GetUserProfile(this.user.token)
          this.serviceForAllService.SaveAutoConfiqure(this.user.token);
      }else{
        this.storage.clear();
        this.router.navigate(['/login']);
      }
    },err=>{
      this.storage.clear();
      this.router.navigate(['/login']);
    });
  }
  GetUserProfile(user_id) {
    this.serviceForAllService.getData('getProfile/?token=' + user_id + '&type=private').subscribe(data => {
      this.userDetail = data
      this.GetCards();
    }, (err) => {
      this.GetCards();
      this.serviceForAllService.presentAlert(err.error.errormsg);
      if (err.error.error_code == "user_expire") {
        this.navCtrl.back();
      }
    })
  }
  GetSetting(){
    this.serviceForAllService.GetSetting()
    .subscribe(res => {
      this.setting=res;
      this.serviceForAllService.setSetting({
        secret_key:  this.setting.secret_key,
        publishable_key: this.setting.publishable_key,
        about:this.setting.about
      });

    })
  }
  async presentAlert() {
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
  async openChooseModal(){
    const modal = await this.modalController.create({
      component: ChoosetypePage,
      componentProps: {
      }
    });
    return await modal.present();
  }

  GetCards() {
    this.serviceForAllService.GetCards(this.user.token)
    .subscribe(res => {
      this.result=res;
      if (this.result.status == "ok") {
        this.cards = this.result.cards.data;
        this.bank_accounts=this.result.bank_accounts.data;
        this.card_accounts=this.result.card_accounts.data;
        this.customer = this.result.customer;
        this.can_add_card=this.result.can_add_card;
        this.ready = true;
        if(this.userDetail.kyc_status == 0){
          this.presentAlert()
        }
      }else{
        this.serviceForAllService.presentAlert("something went wrong.");
      }
    },(err) => {
      this.error= err.error.errormsg;
      if(this.error=="Not any resources found."){
        this.error = 'No Saved Cards'
        this.can_add_card=true;
      }
      this.ready = true;
    })
  } 

  GotoCardInfo(v, type) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        card_id: v.id,
        card_name: v.name,
        card_last4: v.last4,
        card_brand: v.brand,
        card_exp_month: v.exp_month,
        card_exp_year: v.exp_year,
        default_for_currency: false,
        type: type
      }
    };
    this.router.navigate(['/cardinfo'], navigationExtras);
  }

  GotoBankAccountInfo(v, type) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        card_id: v.id,
        card_name: v.account_holder_name,
        card_last4: v.last4,
        card_brand: v.bank_name,
        card_exp_month: v.routing_number,
        card_exp_year: v.account_holder_type,
        default_for_currency: v.default_for_currency,
        type: type
      }
    };
    this.router.navigate(['/cardinfo'], navigationExtras);
  }


}
