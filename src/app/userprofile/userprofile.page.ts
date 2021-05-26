import { CallNumber } from '@ionic-native/call-number/ngx';
import { ViewChild, ElementRef, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { GalleryCustomModalPage } from '../gallery-custom-modal/gallery-custom-modal.page';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { AllServicesService } from '../all-services.service';
import { Events, ModalController, MenuController, LoadingController, ActionSheetController, AlertController, NavController, ToastController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/Camera/ngx';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Crop } from '@ionic-native/crop/ngx';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.page.html',
  styleUrls: ['./userprofile.page.scss'],
})
export class UserprofilePage implements OnInit {
  user_background_image
  userDetails: any = [];
  type: any;
  user_id: any;
  user;
  is_private: boolean = false;
  ready: boolean = false;
  user_info;
  res: any;
  res_gallery: any;
  gallery: any=[];
  userImage: any = 'http://1.gravatar.com/avatar/1aedb8d9dc4751e229a335e371db8058?s=96&d=mm&r=g';
  pictype
  images: any[];
  constructor(
    public storage: Storage, 
    private callNumber: CallNumber, 
    public menuCtrl: MenuController, 
    private route: ActivatedRoute, 
    public location: Location, 
    public modalController: ModalController, 
    public allServicesService: AllServicesService, 
    public alertCtrl: AlertController,
    public Router: Router,
    public events: Events, 
    public loadingCtrl: LoadingController, 
    public router: Router, 
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
       public navctrl: NavController,
       public crop:Crop

    ) {

  
 
  }

  ionViewWillEnter() {
    this.type = this.route.snapshot.parent.paramMap.get('type');
    this.user_id = this.route.snapshot.parent.paramMap.get('user_id');
    this.storage.get('user').then(userInfo => {
      if (userInfo != null) {
        this.user = userInfo;
        this.userImage = this.user.userImage
        this.GetUserPbackgroundImages()
        this.allServicesService.SaveAutoConfiqure(this.user.token);
      }
    }, err => {

    });
    if (this.type == "private") {
      this.is_private = true;
      this.RenderProfileData();
    } else {
      this.is_private = false;
      this.GetUserProfile(this.user_id);
    }

  }
  editprofile(){
    this.Router.navigate(['/addupload'])
  }

  ngOnInit() {
  }

  call(num) {
    this.callNumber.callNumber(num, true)
      .then(res => {})
      .catch(err => {});
  }

  RenderProfileData() {

    this.storage.get('user_profile').then(user_profile => {
      if (user_profile != null) {
        //this.ready = true;
        this.user_info = user_profile;
        this.GetUserProfile(this.user.token);
      }
    }, err => {

    });
  }

  GetUserProfile(user_id) {
    this.allServicesService.getData('getProfile/?token=' + user_id + '&type=' + this.type).subscribe(data => {
      this.res = data;
      if (this.res.status = 'ok') {
        //this.ready = true;
        this.user_info = data;
        this.userImage = this.user_info.userImage
        this.GetUserProfileImages(user_id);
        if (this.type == "private") {
          this.storage.set('user_profile', this.res);
        }
      }
    }, (err) => {
      this.ready = true;
      this.allServicesService.presentAlert(err.error.errormsg);
      if (err.error.error_code == "user_expire") {
        this.location.back();
      }
    })
  }

  GetUserProfileImages(user_id) {
    this.allServicesService.getData('getPhotos/?token=' + user_id + '&type='+this.type).subscribe(data => {
      this.res_gallery = data;
      if (this.res_gallery.status = 'ok') {
        this.gallery = this.res_gallery.images;
      }
      this.ready = true;
    }, (err) => {
      this.ready = true;
      this.allServicesService.presentAlert(err.error.errormsg);
      if (err.error.error_code == "user_expire") {
        //this.location.back();
      }
    })
  }
  async open_gallery_modal(index, gallery) {
    const modal = await this.modalController.create({
      component: GalleryCustomModalPage,
      componentProps: { index: index, gallery: gallery },
      cssClass: 'gallery_modal'
    });
    return await modal.present();
  }
  async selectImage(type) {
    this.images = [];
    this.pictype=type;
    const actionSheet = await this.actionSheetController.create({
      header: "Select Image source",
      buttons: [{
        text: 'Load image from Library',
        handler: () => {
          this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: 'capture image using Camera',
        handler: () => {
          this.takePicture(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }

  takePicture(sourceType: PictureSourceType) {
    var options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };
    this.camera.getPicture(options).then(imagePath => {
      this.crop.crop(imagePath, { quality: 100 }).then(
        newPath => {
          if(newPath){
            if (this.plt.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
              this.filePath.resolveNativePath(newPath)
                .then(filePath => {
                  let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                  let currentName = newPath.substring(newPath.lastIndexOf('/') + 1, newPath.lastIndexOf('?'));
                  let smext = currentName.split('.').pop();
                  let ext = smext.toLowerCase();
                  this.copyFileToLocalDir(correctPath, currentName, this.createFileName(ext));
                });
            } else {
              var currentName = newPath.substr(newPath.lastIndexOf('/') + 1);
              var correctPath = newPath.substr(0, newPath.lastIndexOf('/') + 1);
              let smext = currentName.split('.').pop();
              let ext = smext.toLowerCase();
              this.copyFileToLocalDir(correctPath, currentName, this.createFileName(ext));
            }
          }

          // this.UploadImage()
        },
        error => {
        }
      );
    });
  }
  createFileName(ext) {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + "." + ext;
    return newFileName;
  }

  copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(success => {
      this.updateStoredImages(newFileName);
    }, error => {
      this.presentToast('Error while storing file.');
    });
  }
  updateStoredImages(name) {
    let filePath = this.file.dataDirectory + name;
    let resPath = this.pathForImage(filePath);

    let newEntry = {
      name: name,
      path: resPath,
      filePath: filePath
    };

    this.images.push(newEntry);
    this.UploadImage(this.user);
    this.ref.detectChanges(); // trigger change detection cycle
  }
  pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      let converted = (<any>window).Ionic.WebView.convertFileSrc(img);
      return converted;
    }
  }
  UploadImage(user) {
    this.allServicesService.showLoader('uploading...')
    if (this.images.length > 0) {
      let _mime_type = 'image/jpeg'
      let smext = this.images[0].name.split('.').pop();
      let ext = smext.toLowerCase();
      if (ext == 'png') {
        _mime_type = 'image/png';
      }
      if (ext == 'jpeg') {
        _mime_type = 'image/jpeg';
      }
      if (ext == 'mov') {
        _mime_type = 'video/quicktime';
      }
      if (ext == 'mp4') {
        _mime_type = 'video/mp4';
      }
      if (ext == 'jpg') {
        _mime_type = 'image/jpeg';
      }
      const fileTransfer: FileTransferObject = this.transfer.create();
      let header: Headers = new Headers();
      header.append('Authorization', 'Bearer ' + user.token);
      let options: FileUploadOptions = {
        fileKey: 'file',
        fileName: user.user_id + '_featured.' + ext,
        chunkedMode: false,
        mimeType: _mime_type,
        params: { 'type':this.pictype, 'token': this.user.token},
        headers: { 'Authorization': 'Bearer ' + user.token }
      }
      let url = this.allServicesService.getURL();
      fileTransfer.upload(this.images[0].filePath,'http://findfriend2.betaplanets.com/wp-json/mobileapi/v1/user_backgroundimage',options)
        .then((data1) => {
          this.allServicesService.dismissLoading();
          this.GetUserPbackgroundImages()
     
          this.images = [];
        }, (err) => {
          this.allServicesService.dismissLoading();
        });
    }
  }
  async presentToast(text) {
    const toast = await this.toastController.create({
      message: text,
      position: 'bottom',
      duration: 3000
    });
    toast.present();
  }
  GetUserPbackgroundImages() {
    this.allServicesService.getData('get_userbackgroundimage/?token=' + this.user.token).subscribe(data => {
      this.user_background_image = data['user_background_image']
    }, (err) => {
      this.ready = true;
      this.allServicesService.presentAlert(err.error.errormsg);
      if (err.error.error_code == "user_expire") {
        //this.location.back();
      }
    })
  }
}
