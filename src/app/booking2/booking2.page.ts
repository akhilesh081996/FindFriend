import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';
import { AllServicesService } from '../all-services.service';
import { AlertController, LoadingController, NavController, Platform, MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Location } from '@angular/common';
import { relativeTimeThreshold } from 'moment';

@Component({
  selector: 'app-booking2',
  templateUrl: './booking2.page.html',
  styleUrls: ['./booking2.page.scss'],
})
export class Booking2Page implements OnInit {
  date: any;
  daysInThisMonth: any;
  daysInLastMonth: any;
  daysInNextMonth: any;
  weekNames: any;
  monthNames: string[];
  currentMonth: any;
  currentYear: any;
  currentDate: any;
  rate:any;

  startdate: any;
  enddate: any;
  isSelected: any;
  isday: any;

  res: any;
  ready: boolean = false;

  user: any;
  booking: any = [];

  selected_date: any;
  status:any;
  booking_id:any=0;
  result;
  cards = [];
  customer: any;
  userProfile;
  myinfo;
  constructor(public menuCtrl: MenuController,
    public alertCtrl: AlertController,
    public allServicesService: AllServicesService,
    public loadingCtrl: LoadingController,
    public router: Router,
    public route: ActivatedRoute,
    public navCtrl: NavController,
    public location: Location,
    public storage: Storage) { 
      this.booking_id = this.route.snapshot.parent.paramMap.get('booking_id');
  }

  ngOnInit() {

  }
  back(){
    this.navCtrl.navigateBack('tabs/booking')
  }
  ionViewWillEnter() {
    this.storage.get('user').then(userInfo => {
      if (userInfo != null) {
        this.user = userInfo;
        this.getMyPro(this.user.user_id)
        this.GetBooking();
        this.GetCards()
      } else {
        this.router.navigate(['/home']);
      }
    }, err => {
      this.router.navigate(['/home']);
    });
  }
  getMyPro(user_id){
    this.allServicesService.getData('getProfile/?token=' + user_id + '&type=public').subscribe(data => {
      this.myinfo = data
    })
  }
  GetCards() {
    //this.is_issue = false;
    this.allServicesService.GetCards(this.user.token)
    .subscribe(res => {
      this.result=res;
      if (this.result.status == "ok") {
        this.cards = this.result.cards.data;
        this.customer = this.result.customer;
      }else{
        this.allServicesService.presentAlert("something went wrong.");
      }
 
    },(err) => {
    });

  }
  GetBooking() {
    this.allServicesService.getData('GetMyBookings/?type=user&token=' + this.user.token+'&booking_id='+this.booking_id).subscribe(data => {
      this.res = data;
      if (this.res.status = 'ok') {
        this.ready = true;
        this.booking = this.res.booking;
        this.allServicesService.getSecoondUserInfo(this.user.token, this.booking[0].user_id).subscribe((result) => {
          this.userProfile = result;
          this.ready = true;
          this.allServicesService.dismissLoading();
        }, (err) => {
          this.allServicesService.dismissLoading();
          let msg = err.error.errormsg;
          this.allServicesService.presentAlert(msg);
        });
      }
    }, (err) => {
      this.ready = true;
      if (err.error.error_code == "user_expire") {
        this.router.navigate(['/home']);
      }
      this.allServicesService.presentAlert(err.error.errormsg);
    })
  }

  selectDate(day) {
    this.startdate = '';
    this.enddate = '';
    this.isSelected == true;
    this.isday = day;
    let thisDate1 = this.date.getFullYear() + "/" + (this.date.getMonth() + 1) + "/" + day;
    let d = new Date(thisDate1);
    let n = d.getDay();
    this.selected_date = (this.date.getMonth() + 1) + '/' + day + '/' + this.date.getFullYear();
  }

  checkarrive(data,role){
    // this.allServicesService.showLoader()
    const option ={
      booking_id:this.booking_id,
      token:this.user.token,
      lat:data.lat,
      long:data.long,
      role:role
    }
    this.allServicesService.sendData('check',option).subscribe(res=>{
      if(res['status'] == 'ok'){
        this.allServicesService.dismissLoading()
      }else{
        this.allServicesService.dismissLoading()
        this.allServicesService.presentAlert('Something went wrong')
      }
    },err =>{
      this.allServicesService.dismissLoading()
      this.allServicesService.presentAlert('Something went wrong')
    })
  }
  arrivedfrnd(data,role){
    // this.allServicesService.showLoader()
    const option ={
      booking_id:this.booking_id,
      token:this.user.token,
      lat:data.lat,
      long:data.long,
      role:role
    }
    this.allServicesService.sendData('arrivedfriend',option).subscribe(res=>{
      if(res['status'] == 'ok'){
        this.allServicesService.dismissLoading()
      }else{
        this.allServicesService.dismissLoading()
        this.allServicesService.presentAlert('Something went wrong')
      }
    },err =>{
      this.allServicesService.dismissLoading()
      this.allServicesService.presentAlert('Something went wrong')
    })
  }
  async ProcessBooking(status,booking_id){
    if(this.cards == [] || this.cards.length == 0){
      const alert = await this.alertCtrl.create({
        header:'Please add card First',
        message:'are you sure ?',
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
              this.navCtrl.navigateForward('/billing/forpayment/invoice')
            }
          }
        ]
      });
      await alert.present();
    }else if (this.myinfo.kyc_status == 0) {
      this.presentAlertforkyc()
    } else {
    if(status==1){
      this.status="Accept";
    }
    if(status==3){
      this.status="Decline";
    }
    if(status==2){
      this.status="Complete";
    }
    if(status==4){
      this.status="Start";
    }
    const alert = await this.alertCtrl.create({
      header:this.status,
      message:'are you sure ?',
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
            this.UpdateBooking(booking_id,status);
          }
        }
      ]
    });

    await alert.present();
  }
  }
  async presentAlertforkyc() {
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
  meetup(bk){
    this.storage.set('cart',bk)
    this.router.navigate(['/makepayment'])
  }

  UpdateBooking(booking_id,status) {
    let data_post = {
      token:this.user.token,
      booking_id:booking_id,
      status:status,
      Card:this.cards[0].id
    };
    this.allServicesService.sendData('UpdateBooking',data_post).subscribe(data => {
      this.res = data;
      if (this.res.status = 'ok') {
          this.GetBooking();
          this.allServicesService.presentAlert(this.res.msg); 
      }
    }, (err) => {
      this.ready = true;
      if (err.error.error_code == "user_expire") {
        this.router.navigate(['/home']);
      }else{
        this.allServicesService.presentAlert(err.error.msg);
      }
    })
  }

  onRateChange($event){
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
        fromMy: true
      }
    };
    this.navCtrl.navigateForward(['/chat'], navigationExtras);
  }
}
