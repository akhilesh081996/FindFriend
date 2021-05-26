import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import {AllServicesService} from '../all-services.service';
import { AlertController, LoadingController, NavController, MenuController,ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { NavigationExtras } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signupForm: FormGroup;
  loading: any;
  type:any;
  biffclass:any='biff';
  griffclass:any;
  bufordclass:any;
  role:any="trainer";
  userid:number;
  passwordStateBox: any;
  ress: any;
  passwordStateBox2 ='password'
  latitude: any
  longitude: any
  address
  constructor(
    public allServicesService:AllServicesService,
    public loadingCtrl: LoadingController,
    public router: Router,
    public alertCtrl:AlertController, 
    public menu:MenuController,
    public actionSheetController: ActionSheetController,
    public toastController:ToastController,
    public storage:Storage,
    private geolocation: Geolocation,
    public nativeGeocoder:NativeGeocoder
  ) { 
    this.passwordStateBox = "password";
    this.griffclass='biff';
    this.biffclass='';
    this.storage.get('option').then(res =>{
      this.ress = res
    })
  }
  ionViewWillEnter(){
    this.GetLocation()
  }
  GetLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      this.getAddress()
    }).catch((error) => {
      this.getAddress()
    });
  }
  getAddress(){
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
  };
  this.nativeGeocoder.reverseGeocode(this.latitude,this.longitude, options)
    .then((result: NativeGeocoderResult[]) => {
      this.address = result[0]['subThoroughfare']+' ' + result[0]['thoroughfare']+' ' + result[0]['locality']+', ' + result[0]['administrativeArea']+' ' + result[0]['postalCode']
    })
    .catch((error: any) => {
    });
  }
  ngOnInit() {

    this.signupForm = new FormGroup({
      'userName':new FormControl('', Validators.compose([
        Validators.required
      ])),
      'fullName':new FormControl('', Validators.compose([
        Validators.required
      ])),
      'lastName':new FormControl('', Validators.compose([
        Validators.required
      ])),
      'email': new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      'password':new FormControl('', Validators.compose([
        Validators.required
      ])),
      'cpassword':new FormControl('', Validators.compose([
        Validators.required
      ])),
      'role':new FormControl('customer', Validators.compose([
        Validators.required
      ])),

      // 'phone':new FormControl('', Validators.compose([
      //   Validators.required
      // ])),
     'jw_auth_sec':new FormControl('wivxCNm$<(+WFwivxCNm$<(+WF#7}1]TWMUl7OaU*TxS(r*$#7}1]wivxCNm$<(+WF#7}1]TWMUl7OaU*TxS(r*$TWMUl7OaU*TxS(r*$', Validators.compose([
      Validators.required
    ])),
      
    });

  }
  showHidePassword(){
    if( this.passwordStateBox == "password" )
      this.passwordStateBox = "text";
    else
      this.passwordStateBox = "password";
  }
  showHidePassword1(){
    if( this.passwordStateBox2 == "password" )
      this.passwordStateBox2 = "text";
    else
      this.passwordStateBox2 = "password";
  }
  radioChecked(event){
    if(event.detail.value=="trainer"){
      this.role="trainer";
      this.biffclass='biff'
      this.griffclass='';
    }
    if(event.detail.value=="customer"){
      this.role="customer";
      this.griffclass='biff';
      this.biffclass='';
    }
  }

  doSignup(signUpData){
    signUpData.role=this.role;
    signUpData['items']=this.ress.items
    signUpData['shop_location']=this.address
    signUpData['map_lat']=this.latitude
    signUpData['map_lng']=this.longitude
    // signUpData['offer_services']=this.ress.offer_services
     this.showLoader();
      let data=signUpData;
      this.allServicesService.sendData('register',data).subscribe(data=>{
        let rs:any=[];
        rs =data;
        this.dismissLoading();
        if(rs.status='ok'){
          this.signupForm.reset(); 
          this.router.navigate(['signin']); 
          this.presentAlert("User Register Successfully!");
        }
      },err=>{
        this.dismissLoading();
        this.presentToast(err.error.errormsg);
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
  
  async presentAlert(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
  
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position:'bottom'
    });
    toast.present();
  }
  
}
