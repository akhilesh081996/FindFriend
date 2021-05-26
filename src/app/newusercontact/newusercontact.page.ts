import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { AllServicesService } from '../all-services.service';
import { Events, ModalController, MenuController, LoadingController, ActionSheetController, AlertController, NavController, ToastController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/Camera/ngx';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-newusercontact',
  templateUrl: './newusercontact.page.html',
  styleUrls: ['./newusercontact.page.scss'],
})
export class NewusercontactPage implements OnInit {
  contactinfo: FormGroup;
  errorMsg: any;
  loading: any;
  password: any;
  user: any;
  show: any = 'show';
  rs: any;

  res: any;
  user_info: any;
  ready: any;
  user_profile: any;

  imageURI: any;
  images: any = [];
  res_image:any;

  type:any;

  res_gallery:any;
  gallery:any;
  userid:any;
  constructor(public events: Events,
    public allServicesService: AllServicesService,
    public loadingCtrl: LoadingController,
    public router: Router,
    public alertCtrl: AlertController,
    public storage: Storage,
    public menu: MenuController,
    private camera: Camera,
    private file: File,
    public transfer: FileTransfer,
    private toastController: ToastController,
    private plt: Platform,
    private loadingController: LoadingController,
    private actionSheetController: ActionSheetController,
    private ref: ChangeDetectorRef,
    private filePath: FilePath,
    public route: ActivatedRoute,
    public serviceForAllService: AllServicesService
  ) {
    this.route.queryParams.subscribe((params) => {
      if (params && params.UserId) {
        this.userid=params.UserId;
      }
    });
  }

  ngOnInit() {
    this.contactinfo = new FormGroup({
     
      'phone': new FormControl('', Validators.compose([
        Validators.required
      ])),
    
      'address1': new FormControl('', Validators.compose([
        Validators.required
      ])),
      'address2': new FormControl(''),
      'city': new FormControl('', Validators.compose([
        Validators.required
      ])),
      'state': new FormControl('', Validators.compose([
        Validators.required
      ])),
      'zipcode': new FormControl('', Validators.compose([
        Validators.required
      ])),
      'jw_auth_sec':new FormControl('wivxCNm$<(+WFwivxCNm$<(+WF#7}1]TWMUl7OaU*TxS(r*$#7}1]wivxCNm$<(+WF#7}1]TWMUl7OaU*TxS(r*$TWMUl7OaU*TxS(r*$', Validators.compose([
        Validators.required
      ])),
    });
    this.RenderProfileData();
  }
  GetUserProfile() {
    this.allServicesService.getData('getProfile/?token=' + this.user.token).subscribe(data => {
      this.res = data;
      if (this.res.status = 'ok') {
        this.ready = true;
        this.user_info = this.res;
        // this.userImage = this.user_profile.userImage;
        this.storage.set('user_profile', this.res);
        // this.GetUserProfileImages(this.user.token);
        //this.RenderProfileData();
      }
    }, (err) => {
      this.ready = true;
      if (err.error.error_code == "user_expire") {
        this.allServicesService.presentAlert(err.error.errormsg);
        this.router.navigate(['/home']);
      }
      this.allServicesService.presentAlert(err.error.errormsg);
    })
  }
  doConatct(formdata) {

    this.allServicesService.showLoader();
    this.allServicesService.sendData('updateProfile/?token=' + this.user.token, formdata).subscribe(data => {
      this.allServicesService.dismissLoading();
      this.rs = data;

      if (this.rs.status = 'ok') {
        this.GetUserProfile();
        this.allServicesService.presentAlert(this.rs.msg);
      }
    }, (err) => {
      this.allServicesService.dismissLoading();
      if (err.error.error_code == "user_expire") {
        // this.router.navigate(['/home']);
      }
      this.allServicesService.presentAlert(err.error.errormsg);
    })
  }
  RenderProfileData() {

    this.storage.get('user_profile').then(user_profile => {
      if (user_profile != null) {
        this.ready = true;
        this.user_profile = user_profile;
        // this.contactinfo.controls['first_name'].setValue(this.user_profile.first_name);
        // this.userImage = this.user_profile.userImage;
        // this.contactinfo.controls['last_name'].setValue(this.user_profile.last_name);
        this.contactinfo.controls['phone'].setValue(this.user_profile.phone);
        // this.contactinfo.controls['email'].setValue(this.user_profile.email);
        this.contactinfo.controls['address1'].setValue(this.user_profile.address1);
        this.contactinfo.controls['address2'].setValue(this.user_profile.address2);
        this.contactinfo.controls['city'].setValue(this.user_profile.city);
        this.contactinfo.controls['state'].setValue(this.user_profile.state);
        this.contactinfo.controls['zipcode'].setValue(this.user_profile.zipcode);
        // this.contactinfo.controls['about'].setValue(this.user_profile.about);
        // this.contactinfo.controls['notes'].setValue(this.user_profile.notes);

      } else {
        // this.router.navigate(['/home']);
      }
    }, err => {
      // this.router.navigate(['/home']);
    });
  }

  doContact(userinfo){
    this.showLoader();

    this.serviceForAllService.UpdateUserInfo(this.userid, userinfo)
      .subscribe(res => {
        this.dismissLoading(); 
        let navigationExtras: NavigationExtras = {
          queryParams: {
            UserId: this.userid,
          }
        };
        this.router.navigate(['interest'],navigationExtras);  
      },
      (err) => {
        let msg = err.error.msg;
        this.dismissLoading(); 
      })
    
  }

  async dismissLoading() {
    await this.loading.dismiss();
  }

  async showLoader() {
    this.loading = await this.loadingCtrl.create({
      message: 'please wait',
      backdropDismiss: true,
      });
      this.loading.present();
      await this.loading.onDidDismiss();
  }
}
