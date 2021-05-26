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
// declare var Stripe;
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';
import { element } from 'protractor';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.page.html',
  styleUrls: ['./invoice.page.scss'],
})
export class InvoicePage implements OnInit {
  user: any;
  cart: any;
  // stripe = Stripe('pk_test_TnwBveZThNM1TIHVliq4JEGG008JwgP5l1');

  res:any;

  service: any = {};
  price: any = {};
  time: any = {};
  item: any = {};
  selecteddate: any;
  serviceName: any = {};
  is_issue: boolean = false;
  select_day: any;
  select_time: any;
  select_date:any;

  myservices:any=[];

  invtotalItem:any=0
  invtotalamount:any=0

  result:any;
  cards:any=[];
  bank_accounts:any;
  card_accounts:any;
  customer:any;
  error:any;
  ready:boolean=false;
  setting:any;

  Cardready:boolean=true;
  card:any;


  myInput: any;
  type: any;
  amount: any = 0;
  user_id: any;

  username: any;
  cardResult: any;

  hasCards: boolean = false;

  issue_message: any;
  notes: any;
  pay_result: any; 
  
  validateResult: any;
  paynowReady: boolean = true;
  card_issue: boolean = true;
  unique_name: any;
  additional_notes: any;
  userProfile:any;

  message:any;
  user_info: any;
  priceperhour= 0 ;
  totalprice = 0;
  totalpricecal;
  randomNo: number;

  

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
    private payPal: PayPal,
    public LocalNotifications:LocalNotifications
    ) {
      this.user_id = this.route.snapshot.parent.paramMap.get('user_id');
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

  ngOnInit() {

    this.storage.get('user').then(userInfo => {
      if (userInfo != null) {
        this.user = userInfo;
        this.GetCards(this.user);
        this.allServicesService.SaveAutoConfiqure(this.user.token);

        this.allServicesService.getSecoondUserInfo(this.user.token, this.user_id).subscribe((result) => {
          this.userProfile = result;
        }, (err) => {
          let msg = err.error.errormsg;
        });
      } else {
        this.router.navigate(['/home']);
      }
    }, err => {
      this.router.navigate(['/home']);
    });

    this.storage.get('cart').then(cart => {
      if (cart != null) {
        this.cart = cart;
        let value = this.cart.minimum_time_to_spend_with_Friend/60
        if(value > 2){
          let value2 = value - 2
          let value3:any  = 20+(value2*10)
          this.totalpricecal =value3.toFixed(1)
        }else{
          let value4:any =value*20
          this.totalpricecal = value4.toFixed(1)
        }
        this.SolveCart(this.cart);
      } else {
        // this.location.back();
      }
    }, err => {
      // this.location.back();
    });
  }

  SolveCart(card) {
        this.allServicesService.getData('getProfile/?token=' + this.user_id + '&type=' + 'public').subscribe(data => {
          this.res = data;
            this.ready = true;
            this.user_info = this.res;  
            this.priceperhour = this.user_info.price_per_hour
            this.totalprice = Number(this.invtotalamount) + Number(this.priceperhour)
        }, (err) => {
        })
    this.service = card.service;
    this.price = card.price;
    this.item = card.item;
    this.time = card.time;
    this.select_day = card.select_day;
    this.select_time = card.select_time;
    this.selecteddate = card.selecteddate;
    this.serviceName = card.Servicesname;
    this.select_date=card.select_date;

    for (var key in this.service) {
      if (this.service.hasOwnProperty(key)) {
        if (typeof this.service[key] != 'undefined') {
            if (this.service[key] == true) {
                let serviceOffer = {
                  service_id:key,
                  service_name:this.serviceName[key],
                  price:this.price[key],
                  item:this.item[key]
                }
                this.invtotalItem=parseInt(this.invtotalItem)+parseInt(this.item[key]);
                this.invtotalamount=parseInt(this.invtotalamount)+parseInt(this.price[key]);
                this.myservices.push(serviceOffer)
            }
        
         }
      }
    }

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
        // // Currency: 'usd',
        // // Card: this.card,
        // Amount: this.totalprice * 100,
        // notes: this.notes,
        to_user_id: this.user_id,
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
          this.storage.set('bookingid',res)
     this.randomNo = Math.floor(100000 + Math.random() * 900000)
     var date = new Date()
     var date2 = new Date()
        date.setHours(date2.getHours())
        date.setMinutes(date2.getMinutes()+this.cart.response_time_limit)
          this.pay_result = res;
          if (this.pay_result.status == "ok") {
            this.LocalNotifications.schedule({
              id:this.randomNo,
             title: "Booking",
              text: "Your request was not accepted in the time limit you set. Please try another Friend",
              trigger: {
              at: date
            },
           vibrate: true,
           foreground: true,
           wakeup: true,
           launch: true,
           sound: 'file://assets/alarm_tone.mp3'
            })
        this.allServicesService.dismissLoading()
          this.storage.remove('cart');
            this.router.navigate(['thankyou'], { queryParams: { msg: this.pay_result.msg, page_title: this.pay_result.page_title } });
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
paynow(){
  this.navCtrl.navigateForward('paypal')

}
  paynow2(){
    this.payPal.init({
      PayPalEnvironmentProduction: 'YOUR_PRODUCTION_CLIENT_ID',
      PayPalEnvironmentSandbox: 'ATZWKx0MSTQzptjj2SKmuQ11mcF2ys6_cTjqT3rqYsU_SPf0FDizA4J8Bqi9kuzPcGSGwlbTF4Htli61'
    }).then(() => {
      // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
      this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
        // Only needed if you get an "Internal Service Error" after PayPal login!
        //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
      })).then(() => {
        let payment = new PayPalPayment(String(this.totalprice), 'USD', 'Description', 'sale');
        this.payPal.renderSinglePaymentUI(payment).then((res) => {
this.paynow1()
          // Successfully paid
    
          // Example sandbox response
          //
          // {
          //   "client": {
          //     "environment": "sandbox",
          //     "product_name": "PayPal iOS SDK",
          //     "paypal_sdk_version": "2.16.0",
          //     "platform": "iOS"
          //   },
          //   "response_type": "payment",
          //   "response": {
          //     "id": "PAY-1AB23456CD789012EF34GHIJ",
          //     "state": "approved",
          //     "create_time": "2016-10-03T13:33:33Z",
          //     "intent": "sale"
          //   }
          // }
        }, () => {

          // Error or render dialog closed without being successful
        });
      }, () => {
        // Error in configuration
      });
    }, () => {

      // Error in initialization, maybe PayPal isn't supported or something else
    });
  }

  sendToMessage(userProfile) {
    this.storage.get('user').then((val) => {
      if (val != null) {
        this.allServicesService.showLoader();
        this.allServicesService.getCurrentUserInfo(val.token).subscribe((result) => {
          this.res = result;
          this.openChatPage(userProfile, this.res.result);
          this.allServicesService.dismissLoading();
        }, (err) => {
          this.allServicesService.dismissLoading();
          let msg = err.error.errormsg;
          this.allServicesService.presentAlert(msg);
        });
      }
    });
  }

  openChatPage(userProfile, Currentuser) {
    let userPro = {
      first_name: userProfile.first_name + '' + userProfile.last_name,
      id: parseInt(userProfile.id),
      user_img: userProfile.user_img
    };
    let navigationExtras: NavigationExtras = {
      queryParams: {
        //  special: JSON.stringify(workout),
        secondUser: JSON.stringify(userPro),
        currentUser: JSON.stringify(Currentuser),
        fromMy: true,
        message:this.message
      }
    };
    this.message='';
    this.navCtrl.navigateForward(['/chat'], navigationExtras);
  }
  back(){
    this.navCtrl.back();
  }


}
