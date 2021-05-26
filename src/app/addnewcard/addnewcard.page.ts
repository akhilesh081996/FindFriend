import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { Stripe } from '@ionic-native/stripe/ngx';
import {AllServicesService} from '../all-services.service';
import { AlertController, LoadingController, NavController, MenuController,ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addnewcard',
  templateUrl: './addnewcard.page.html',
  styleUrls: ['./addnewcard.page.scss'],
})
export class AddnewcardPage implements OnInit {
  bank_form: FormGroup;
  cardexpirydate:any;
  cvv:any;
  loading:any;
  constructor(
    private stripe: Stripe,
    public loadingCtrl: LoadingController,
    public alertCtrl:AlertController,
    public allServicesService:AllServicesService,
    public storage: Storage,
    public router: Router,
    public navCtrl: NavController,
    ) { 
    this.stripe.setPublishableKey('pk_test_SZpukm3mSStZrJZd4rBEwpW6');

    this.bank_form= new FormGroup({
      'credit_card_num': new FormControl('', Validators.compose([Validators.required])),
      'credit_card_expiry': new FormControl('',Validators.compose([Validators.required])),
      'cvv': new FormControl('',Validators.compose([Validators.required])),
    });
  }

  ngOnInit() {
  }

  minEndDate(): string {
    return moment().format('YYYY-MM');
  }

  maxEndDate(): string {
    return moment().add(10, 'year').format('YYYY-MM');
  }

  UpdateCardDetails(formvalue){
    this.showLoader();
    //this.loading.present();
    let _cardExp = formvalue.credit_card_expiry;
    let _d=_cardExp.split("-");
    let _expMonth = _d[1].replace(/^0+/, '');
    let _expYear = _d[0];

    let card = {
      name: "dedar",
      number: formvalue.credit_card_num,
      expMonth: _expMonth,
      expYear: _expYear,
      cvc: formvalue.cvv,
      currency: 'USD'

    };
    this.stripe.setPublishableKey('pk_test_TnwBveZThNM1TIHVliq4JEGG008JwgP5l1');
  this.storage.get('user').then((val) => {
    this.stripe.createCardToken(card)
      .then(token => {
       let stripetoken=token.id; 
       let data={
         'stripeToken':stripetoken,
         'token':val.token,
         'type': 1
        };
       this.allServicesService.sendData('CreateStripeUser',data)
          .subscribe(res => {
            this.dismissLoading();
            this.router.navigate(['/carddetails']);
          }, (err) => {
            this.allServicesService.dismissLoading();
            if (err.error.error_code == "user_expire") {
              this.router.navigate(['/home']);
            }
            this.allServicesService.presentAlert(err.error.errormsg);
          });           
                
      }).catch(error => {
        this.dismissLoading();
      })
    })
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
