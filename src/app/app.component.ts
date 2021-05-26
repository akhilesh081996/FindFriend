import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NavigationExtras, Router } from '@angular/router';
import { Events, MenuController, NavController, AlertController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { OneSignal, OSNotificationPayload } from '@ionic-native/onesignal/ngx';
import * as firebase from 'firebase';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { AllServicesService } from './all-services.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent {
  myinfo
  appPages: Array<{ title: string, url: any, icon: any }>;
  logout: any;
  userDetails: any;
  is_offer: boolean = false;
  bookingid: any;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private menu: MenuController,
    public navCtrl: NavController,
    private oneSignal: OneSignal,
    public alertController: AlertController,
    public storage: Storage,
    public events: Events,
    public LocalNotifications:LocalNotifications,
    public AllServicesService:AllServicesService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.hide();
      this.splashScreen.hide();
      this.storage.get('user').then(userInfo => {
        this.userDetails = userInfo
        if (userInfo) {
        this.AllServicesService.SaveAutoConfiqure(userInfo.token);
        this.getMyPro(userInfo.user_id)
            // this.router.navigate(['/chosehome'])
        } else {
          this.router.navigate(['/home'])
          this.storage.clear();
          localStorage.clear()
        }
      });
      this.oneSignal.startInit('1663f43a-2342-44c3-b363-54ea59211ea0')
      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification)
      this.oneSignal.handleNotificationReceived().subscribe(data => this.onPushReceived(data.payload))
      this.oneSignal.handleNotificationOpened().subscribe(data => this.onPushOpened(data.notification.payload))
      this.oneSignal.endInit();
      this.LocalNotifications.on('trigger').subscribe(res=>{
          const option ={
            token:this.userDetails.token,
            booking_id:this.bookingid
          }
          this.AllServicesService.sendData('deleteRequest',option).subscribe(res =>{
            this.storage.remove('bookingid')
          })
      })
      
      var firebaseConfig = {
        apiKey: "AIzaSyBGQg76Fm7t3j6FURR46fLuTf02aUDz-OA",
        authDomain: "find-a-friend-e3b52.firebaseapp.com",
        databaseURL: "https://find-a-friend-e3b52.firebaseio.com",
        projectId: "find-a-friend-e3b52",
        storageBucket: "find-a-friend-e3b52.appspot.com",
        messagingSenderId: "162781664880",
        appId: "1:162781664880:web:2c65682ac5c929e4b1c6b5"
      };
      firebase.initializeApp(firebaseConfig);
    });

    this.events.subscribe('userCheck:created', (user) => {
      this.logout = true;
      if(user.kyc_status == 0){
          this.appPages = [
            {
              title: 'Home',
              url: '/chosehome',
              icon: 'home'
            },
            {
              title: 'My Profile',
              url: '/userprofile/' + user.user_id + '/private',
              icon: 'person'
            },
            {
              title: 'Set Availability',
              url: '/availability/' + user.user_id + '/private',
              icon: 'person'
            },
            {
              title: 'My Appointments',
              url: '/tabs/booking',
              icon: 'person'
            },
            // {
            //   title: 'Card Details',
            //   url: '/carddetails',
            //   icon: 'card'
            // },
            {
              title: 'Card Details',
              url: '/managebankcards',
              icon: 'card'
            },
            {
              title: 'Payment Setup',
              url: '/kyc',
              icon: 'card'
            },
            // {
            //   title: 'Bank Details',
            //   url: '/banks',
            //   icon: 'card'
            // },
            {
              title: 'Notifications',
              url: '/notifications/',
              icon: 'notifications'
            },
            {
              title: 'Review & Rating',
              url: '/reviewrating',
              icon: 'star-half'
            },
            // {
            //   title: 'Schedule Your Time',
            //   url: '/schedule',
            //   icon: 'calendar'
            // },
            // {
            //   title: 'My Services',
            //   url: '/services',
            //   icon: 'person'
            // },            
            // {
            //   title: 'Contact',
            //   url: '/contact',
            //   icon: 'mail'
            // },
            // {
            //   title: 'About',
            //   url: '/about',
            //   icon: 'person'
            // },
            // {
            //   title: 'News',
            //   url: '/news',
            //   icon: 'paper'
            // },
          ]
      }else{
        this.appPages = [
          {
            title: 'Home',
            url: '/chosehome',
            icon: 'home'
          },
          {
            title: 'My Profile',
            url: '/userprofile/' + user.user_id + '/private',
            icon: 'person'
          },
          {
            title: 'Set Availability',
            url: '/availability/' + user.user_id + '/private',
            icon: 'person'
          },
          {
            title: 'My Appointments',
            url: '/tabs/booking',
            icon: 'person'
          },
          // {
          //   title: 'Card Details',
          //   url: '/carddetails',
          //   icon: 'card'
          // },
          {
            title: 'Card Details',
            url: '/managebankcards',
            icon: 'card'
          },
          {
            title: 'Payment Setup',
            url: '/editkyc',
            icon: 'card'
          },
          // {
          //   title: 'Bank Details',
          //   url: '/banks',
          //   icon: 'card'
          // },
          {
            title: 'Notifications',
            url: '/notifications/',
            icon: 'notifications'
          },
          {
            title: 'Review & Rating',
            url: '/reviewrating',
            icon: 'star-half'
          },
          // {
          //   title: 'Schedule Your Time',
          //   url: '/schedule',
          //   icon: 'calendar'
          // },
          // {
          //   title: 'My Services',
          //   url: '/services',
          //   icon: 'person'
          // },            
          // {
          //   title: 'Contact',
          //   url: '/contact',
          //   icon: 'mail'
          // },
          // {
          //   title: 'About',
          //   url: '/about',
          //   icon: 'person'
          // },
          // {
          //   title: 'News',
          //   url: '/news',
          //   icon: 'paper'
          // },
        ]
      }
    });

    setTimeout(() => {
      this.splashScreen.hide();
    }, 1000);
  }

  private onPushReceived(payload: OSNotificationPayload) {
  }
  getMyPro(user_id){
    this.AllServicesService.getData('getProfile/?token=' + user_id + '&type=public').subscribe(data => {
      this.myinfo = data
      this.events.publish('userCheck:created', data)
    })
  }
  openForm() {
    this.navCtrl.navigateForward(['/forms', { form_id: 1 }]);
  }

  private onPushOpened(payload: OSNotificationPayload) {
    this.is_offer = true;
    this.storage.get('user').then(userInfo => {
      if (userInfo != null) {
        let event_notification = payload.additionalData;
        if (event_notification.type == "appointment_complete" || event_notification.type == "appointment_start" || event_notification.type == "appointment_request") {
          this.router.navigate(['/booking2/' + event_notification.booking_id]);
        } else if(event_notification.type == "new_message"){
          this.openChatPage(event_notification)
        }else{

        }
      } else {
        this.router.navigate(['/chosehome']);
      }

    }, error => {
      this.router.navigate(['/chosehome']);
    });
  }
  openChatPage(userProfile) {
    let userPro = {
      id: userProfile.id,
      first_name: userProfile.display_name, 
      user_img: userProfile.user_img,
    }
    const option ={
      display_name: this.userDetails.shop_name,
      first_name: this.userDetails.shop_name,
      id: this.userDetails.user_id,
      last_name: '',
      user_img: this.userDetails.userImage
    }
    let navigationExtras: NavigationExtras = {
      queryParams: {
        secondUser: JSON.stringify(userPro),
        currentUser: JSON.stringify(option),
        fromMy: true
      }
    };
    this.navCtrl.navigateForward(['/chat'], navigationExtras);
  }
  async DoLogout() {
    this.menu.toggle();
    const alert = await this.alertController.create({
      header: 'Logout',
      message: 'are you sure ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Logout',
          handler: () => {
            this.storage.clear();
            localStorage.clear()
            this.router.navigate(['/home']);
          }
        }
      ]
    });
    await alert.present();

  }
}