import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';
import { AllServicesService } from '../all-services.service';
import { AlertController, LoadingController, NavController, Events } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Location } from '@angular/common';
import { NavigationExtras } from '@angular/router';
import { Stripe } from '@ionic-native/stripe/ngx';
import { element } from 'protractor';
import { Braintree, ApplePayOptions, PaymentUIOptions, PaymentUIResult } from '@ionic-native/braintree/ngx';

@Component({
  selector: 'app-makepayment',
  templateUrl: './makepayment.page.html',
  styleUrls: ['./makepayment.page.scss'],
})
export class MakepaymentPage implements OnInit {
  user: any;
  cart: any;
  totalpricecal = 20;
  result;
  cards: any;
  customer: any;
  Cardready: boolean;
  error: any;
  card: any;
  is_issue: boolean;
  paynowReady: boolean;
  randomNo: number;
  pay_result: any;

  constructor(
    public alertCtrl: AlertController,
    public allServicesService: AllServicesService,
    public loadingCtrl: LoadingController,
    public router: Router,
    public events:Events,
    public route: ActivatedRoute,
    public navCtrl: NavController,
    public location: Location,
    private stripe: Stripe,
    public storage: Storage,
    public Braintree:Braintree
  ) {
    events.subscribe('usercardload', (card) => {
      this.storage.get('user').then(userInfo => {
        if (userInfo != null) {
          this.user = userInfo;
          this.GetCards(this.user);
         
        } 
      }, err => {
      });
    });
   }
back(){
  this.navCtrl.back()
}
   ngOnInit() {
 
    this.storage.get('user').then(userInfo => {
      if (userInfo != null) {
        this.user = userInfo;
        this.GetCards(this.user);
        this.allServicesService.SaveAutoConfiqure(this.user.token);
      } else {
        this.router.navigate(['/home']);
      }
    }, err => {
      this.router.navigate(['/home']);
    });

    // this.storage.get('cart').then(cart => {
    //   if (cart != null) {
    //     this.cart = cart;
    //     let value = this.cart.minimum_time_to_spend_with_Friend/60
    //     if(value > 2){
    //       let value2 = value - 2
    //       let value3:any  = 20+(value2*10)
    //       this.totalpricecal =value3.toFixed(1)
    //     }else{
    //       let value4:any =value*20
    //       this.totalpricecal = value4.toFixed(1)
    //     }
    //     // this.SolveCart(this.cart);
    //   } else {
    //     // this.location.back();
    //   }
    // }, err => {
    //   // this.location.back();
    // });
  }
  GetCards(user) {
    //this.is_issue = false;
    this.allServicesService.GetCards(this.user.token)
    .subscribe(res => {

      this.result=res;
      if (this.result.status == "ok") {
        
        this.cards = this.result.cards.data;
        this.customer = this.result.customer;
        this.Cardready=true;
 
      }else{
        this.allServicesService.presentAlert("something went wrong.");
      }
 
    },(err) => {
      this.error= err.error.errormsg;
      this.Cardready = true;
    });

  }
  CardradioChecked(card) {
    this.card = card;
    if (this.card != '') {
      this.is_issue = false;
    }
  }
  pay(){
    const BRAINTREE_TOKEN = 'e59b3671c8a490059cdb37e3841b0e82';
    const appleOptions: ApplePayOptions = {
      merchantId: 'qmh7bs8fz9mf4yh7',
      currency: 'USD',
      country: 'US'
    }
    const paymentOptions: PaymentUIOptions = {
      amount: '14.99',
      primaryDescription: 'Your product or service (per /item, /month, /week, etc)',
    }
    this.Braintree.initialize(BRAINTREE_TOKEN)
  // .then(() => this.Braintree.setupApplePay(appleOptions))
  .then(() => this.Braintree.presentDropInPaymentUI(paymentOptions))
  .then((result: PaymentUIResult) => {
    if (result.userCancelled) {
    } else {
    }
  })
  .catch((error: string) => console.error(error));

  }
  paynow1() {
    this.allServicesService.showLoader()
      this.paynowReady = false;
      let details = {
        response_time_limit:this.cart.response_time_limit,
        activity:this.cart.activity,
        location:this.cart.location,
        minimum_time_to_spend_with_Friend:this.cart.minimum_time_to_spend_with_Friend,
        Amount:this.totalpricecal,
        select_day:this.cart.select_day,
        select_time:this.cart.select_time,
        select_date:this.cart.select_date,
        city:this.cart.city,
        state:this.cart.state,
        zipcode:this.cart.zipcode,
        Currency: 'usd',
        Card: this.card,
        // Amount: this.totalprice * 100,
        // notes: this.notes,
        to_user_id: this.cart.barber_id,
        // myservices:this.myservices,
        // invtotalItem:this.invtotalItem,
        // invtotalamount:this.totalprice,
        // select_day:this.select_day,
        // select_time:this.select_time,
        // select_date:this.select_date
      }
      this.is_issue=true;
      this.allServicesService.GetStripeAuthToken(this.user.token, details)
        .subscribe(res => {
          this.pay_result = res;
          if (this.pay_result.status == "ok") {
        this.allServicesService.dismissLoading()
          this.storage.remove('cart')
          this.navCtrl.back()
          }
          this.paynowReady = true;
        },
          err => {
        this.allServicesService.dismissLoading()
            this.error = err;
            this.allServicesService.presentAlert(this.error.error.msg)
            this.paynowReady = true;
            this.is_issue=false;
          })
  }
}
