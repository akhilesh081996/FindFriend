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
  selector: 'app-newuserabout',
  templateUrl: './newuserabout.page.html',
  styleUrls: ['./newuserabout.page.scss'],
})
export class NewuseraboutPage implements OnInit {
  userid:any;
  aboutuser:any;
  loading:any;
  constructor(public allServicesService: AllServicesService,
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
    public serviceForAllService: AllServicesService,public events: Events,public navCtrl: NavController) { 
    this.route.queryParams.subscribe((params) => {
      if (params && params.UserId) {
        this.userid=params.UserId;
      }
    });
  }

  ngOnInit() {
  }

  logintoapp(){
    this.showLoader();
    this.serviceForAllService.UpdateUserAbout(this.userid, this.aboutuser)
      .subscribe(res => {
        this.dismissLoading(); 
        //this.presentAlert('User Signed Up successfully');
      
        this.storage.clear();
        this.router.navigate(['/signin']);  
      },
      (err) => {
        let msg = err.error.msg;
        this.dismissLoading(); 
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

}
