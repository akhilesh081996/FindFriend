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
  selector: 'app-interest',
  templateUrl: './interest.page.html',
  styleUrls: ['./interest.page.scss'],
})
export class InterestPage implements OnInit {
  userid:any;
  selecteditems:any=[];
  isdisabled:boolean=true;
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
  items = [
    {name:'Dating', active:false},
    {name:'Hiking', active:false},
    {name:'Racing', active:false},
    {name:'Cooking', active:false},
    {name:'Traveling', active:false},
  ];
  toggleClass(item){
    item.active = !item.active;
    if(item.active){
      this.selecteditems.push(item.name);
    }
    else{
      let ind = this.selecteditems.indexOf(item.name);

      if(ind!=-1){
        this.selecteditems.splice(ind,1);
      }
    }

    if(this.selecteditems.length > 0){
      this.isdisabled=false;
    }
    else{
      this.isdisabled=true;
    }
  }

  adduserinterests(){
    this.showLoader();
    this.serviceForAllService.UpdateUserInterests(this.userid, this.selecteditems)
      .subscribe(res => {
        this.dismissLoading(); 
        //this.presentAlert('User Signed Up successfully');
      
        let navigationExtras: NavigationExtras = {
          queryParams: {
            UserId: this.userid,
          }
        };
        //this.router.navigate(['/userupload'],navigationExtras);  
        this.router.navigate(['/newuserabout'],navigationExtras);  
      },
      (err) => {
        let msg = err.error.msg;
        this.dismissLoading(); 
      })
  }

  async presentAlert(msg) {
    let alert = await this.alertCtrl.create({
      header: 'Alert',
      message: msg,
      buttons: [{
        text: 'OK',
        handler: () => {
          this.router.navigate(['signin']);                                                            
        }
      }]
    });

    await alert.present();
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
