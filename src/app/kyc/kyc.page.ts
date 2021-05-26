import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NavController, ActionSheetController, Platform,Events} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Stripe ,StripeBankAccountParams} from '@ionic-native/stripe/ngx/index';
import { AllServicesService } from '../all-services.service';
@Component({
  selector: 'app-kyc',
  templateUrl: './kyc.page.html',
  styleUrls: ['./kyc.page.scss'],
})
export class KycPage implements OnInit {

  front_image='https://via.placeholder.com/400'
  back_image='https://via.placeholder.com/400'

  mediaArray
  images: any[];
  setting
  kycdetail: FormGroup;
  user: any;
  image_data: any;
  type: any;
  image_data1: any;
  images1: any[];
  type1: any;
  imagefrontadd = false;
  imagebackadd: boolean = false;
  myinfo;

  constructor(
    public navCtrl:NavController,
    public ref: ChangeDetectorRef,
    public actionSheetController: ActionSheetController,
    public plt: Platform,
    public Storage:Storage,
    private sanitizer: DomSanitizer,
    public router: Router,
    public allServicesService: AllServicesService,
    private eventService: Events,
    private stripe: Stripe,
    public events: Events,
  ) {
    this.kycdetail = new FormGroup({
      'date_of_birth': new FormControl('', Validators.compose([
        Validators.required
      ])),
      'business_website': new FormControl('', Validators.compose([
        Validators.required
      ])),
      'phone': new FormControl('', Validators.compose([
        Validators.required
      ])),
      'pin_ssn': new FormControl('', Validators.compose([
        Validators.required
      ])),
      'routing_number': new FormControl('', Validators.compose([
        Validators.required
      ])),
      'account_number': new FormControl('', Validators.compose([
        Validators.required
      ])),
      'account_holder_name': new FormControl('', Validators.compose([
        Validators.required
      ])),
      'city': new FormControl('', Validators.compose([
        Validators.required
      ])),
      'zipcode': new FormControl('', Validators.compose([
        Validators.required
      ])),
      'state_code': new FormControl('', Validators.compose([
        Validators.required
      ])),
      'address1': new FormControl('', Validators.compose([
        Validators.required
      ])),
      'address2': new FormControl(''),
      'mcc': new FormControl('', Validators.compose([
        Validators.required
      ])),
    });
   }
  ionViewWillEnter(){
    this.Storage.get('user').then((val) => {
      if (val != null) {
        this.user = val;
        this.getMyPro(this.user.user_id)
          this.GetSetting();
      }else{
        this.Storage.clear();
        this.router.navigate(['/login']);
      }
    },err=>{
      this.Storage.clear();
      this.router.navigate(['/login']);
    });
      this.kycdetail.controls.mcc.setValue('6513')
  }
  ngOnInit() {
    
  }
  getMyPro(user_id){
    this.allServicesService.getData('getProfile/?token=' + user_id + '&type=public').subscribe(data => {
      this.myinfo = data
      this.events.publish('userCheck:created', data)
    })
  }
  back(){
    this.navCtrl.back()
  }
   GetSetting() {
    this.allServicesService.getData('GetSetting')
      .subscribe(res => {
        this.setting = res;
      })
  }
  // submit(data){
  //   this.allServicesService.showLoader()
  //   this.stripe.setPublishableKey(this.setting.publishable_key);
  //   var bankAccount = {
  //     routing_number: data.routing_number,
  //     account_number: data.account_number,
  //     account_holder_name: data.account_holder_name, // optional
  //     account_holder_type: 'individual', // optional
  //     currency: 'USD',
  //     country: 'US'
  //   };
  //   this.stripe.createBankAccountToken(bankAccount).then(res =>{
  //     data['token'] = this.user.token
  //     data['stripeToken'] = res['id']
  //     data['front_image'] = this.front_image
  //     data['back_image'] = this.back_image
  //     this.allServicesService.sendData('verify_kyc_callback',data).subscribe(res =>{
  //       if(res['status'] == 'ok'){
  //         this.allServicesService.dismissLoading()
  //         this.navCtrl.back()
  //         // this.UploadImage()
  //         // this.UploadImage1()
  //       }else{
  //         this.allServicesService.dismissLoading()
  //         this.allServicesService.presentAlert('Something went Wrong')
  //       }
  //     },err =>{
  //       this.allServicesService.dismissLoading()
  //       this.allServicesService.presentAlert('Something went Wrong')
  //     })
  //   },err =>{
  //     this.allServicesService.dismissLoading()
  //     this.allServicesService.presentAlert(err.error.errormsg)
  //   })
 

  // }
  submit2(data){
    this.allServicesService.showLoader()
    const option ={
      routing_number: data.routing_number,
      account_number: data.account_number,
      account_holder_name: data.account_holder_name, // optional
      account_holder_type: 'individual', // optional
      currency: 'USD',
      country: 'US',
      key: 'pk_test_TnwBveZThNM1TIHVliq4JEGG008JwgP5l1',
      payment_user_agent: 'stripe.js/6c4e062'
    }
    this.allServicesService.createBankAccountToken(option).subscribe(res =>{
      data['token'] = this.user.token
      data['front_image'] = this.front_image
      data['back_image'] = this.back_image
      data['stripeToken'] = res['id']
      this.allServicesService.sendData('verify_kyc_callback',data).subscribe(res =>{
        if(res['status'] == 'ok'){
          this.allServicesService.dismissLoading()
          this.navCtrl.back()
          this.getMyPro(this.user.user_id)
          // this.UploadImage()
          // this.UploadImage1()
        }else{
          this.allServicesService.dismissLoading()
          this.allServicesService.presentAlert('Something went Wrong')
        }
      },err =>{
        this.allServicesService.dismissLoading()
        // this.allServicesService.presentAlert('Something went Wrong')
        this.allServicesService.presentAlert(err.error.errormsg);
      })    },err =>{
                this.allServicesService.dismissLoading()
                // this.allServicesService.presentAlert('Something went Wrong')
                this.allServicesService.presentAlert(err.error.errormsg);
    })

  }
  cutimage1(){
    this.imagefrontadd = false
    this.images = []
  }
  cutimage2(){
    this.imagebackadd = false
    this.images1 =[]
  }
  addimage(){
    document.getElementById('kycfiletype').click()
  }
  media_preview(event){
    this.allServicesService.showLoader()
    for (let i = 0; i < event.target.files.length; i++) {
      let formvalue = new FormData();
      formvalue.append('file', event.target.files[i])
      formvalue.append('token', this.user.token)
      formvalue.append('type', 'front')
      this.allServicesService.sendMedia('addKycImage', formvalue, this.user.token).subscribe(
        result => {
          this.allServicesService.dismissLoading();
          let rs: any = [];
          rs = result;
          this.front_image = rs.front_img
      },err =>{
        if(err.error.code =='jwt_auth_bad_iss'){
          this.allServicesService.dismissLoading();
          this.navCtrl.navigateForward('login')
        }else{
          this.allServicesService.dismissLoading();
          this.allServicesService.presentAlert('Something Went Wrong')
        }
      });
    }
  }
  addimage1(){
    document.getElementById('kycfiletype1').click()
  }
  media_preview1(event){
    this.allServicesService.showLoader()
    for (let i = 0; i < event.target.files.length; i++) {
      let formvalue = new FormData();
      formvalue.append('file', event.target.files[i])
      formvalue.append('token', this.user.token)
      formvalue.append('type', 'back')

      this.allServicesService.sendMedia('addKycImage', formvalue, this.user.token).subscribe(
        result => {
          this.allServicesService.dismissLoading();
          let rs: any = [];
          rs = result;
          this.back_image = rs.back_img
      },err =>{
        if(err.error.code =='jwt_auth_bad_iss'){
          this.allServicesService.dismissLoading();
          this.navCtrl.navigateForward('login')
        }else{
          this.allServicesService.dismissLoading();
          this.allServicesService.presentAlert('Something Went Wrong')
        }
      });
    }
  }

}
