import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AllServicesService } from '../all-services.service';
import { Events, ModalController, MenuController, LoadingController, ActionSheetController, AlertController, NavController, ToastController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/Camera/ngx';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.page.html',
  styleUrls: ['./changepassword.page.scss'],
})
export class ChangepasswordPage implements OnInit {
  editform: FormGroup;
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



  userImage: any = 'http://1.gravatar.com/avatar/1aedb8d9dc4751e229a335e371db8058?s=96&d=mm&r=g';
  constructor(public events: Events, public allServicesService: AllServicesService, public loadingCtrl: LoadingController, public router: Router, public alertCtrl: AlertController, public storage: Storage, public menu: MenuController, private camera: Camera, private file: File, public transfer: FileTransfer, private toastController: ToastController, private plt: Platform, private loadingController: LoadingController, private actionSheetController: ActionSheetController, private ref: ChangeDetectorRef, private filePath: FilePath) { 
    this.storage.get('user').then(userInfo => {
      if (userInfo != null) {
        this.user = userInfo;
        this.GetUserProfile();
        this.GetUserImage();
      } else {
        this.router.navigate(['/home']);
      }
    }, err => { 
      this.router.navigate(['/home']);
    });
  }

  ngOnInit() {
    this.editform = new FormGroup({
      'old_password': new FormControl('', Validators.compose([
        Validators.required,

      ])),
      'new_password': new FormControl('', Validators.compose([
        Validators.required,

      ])),
      'confirm_password': new FormControl('', Validators.compose([
        Validators.required
      ]))

    });
    this.RenderProfileData();
  }


  GetUserProfile() {
    this.allServicesService.getData('getProfile/?token=' + this.user.token).subscribe(data => {
      this.res = data;
      if (this.res.status = 'ok') {
        this.ready = true;
        this.user_info = this.res;
        //this.userImage = this.user_profile.userImage;
        this.storage.set('user_profile', this.res);
        this.GetUserProfileImages(this.user.token);
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

  doEdit(formdata) {

    if(formdata.new_password!=formdata.confirm_password){
      this.allServicesService.presentAlert('Password and Confirm Password values must be same');
      return false;
    }
    this.allServicesService.showLoader();

    this.allServicesService.sendData('changePassword/?token=' + this.user.token, formdata).subscribe(data => {
      this.allServicesService.dismissLoading();
      if(data['success']=='error'){
        this.allServicesService.presentAlert(data['message']);
      }
      else{
        this.storage.clear();
        this.router.navigate(['/signin']);
      }
    }, (err) => {
      this.allServicesService.dismissLoading();
      if (err.error.error_code == "user_expire") {
        this.router.navigate(['/home']);
      }
      this.allServicesService.presentAlert(err.error.errormsg);
    })
  }


  RenderProfileData() {

    this.storage.get('user_profile').then(user_profile => {
      if (user_profile != null) {
        this.ready = true;
      
      } else {
        this.router.navigate(['/home']);
      }
    }, err => {
      this.router.navigate(['/home']);
    });
  }

 

  async selectImage(type) {
    this.images = [];
    this.type=type;
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
      if (this.plt.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            let smext = currentName.split('.').pop();
            let ext = smext.toLowerCase();
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName(ext));
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        let smext = currentName.split('.').pop();
        let ext = smext.toLowerCase();
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName(ext));
      }
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
        params: { 'type':this.type, 'user': user.user_id, 'ext': ext },
        headers: { 'Authorization': 'Bearer ' + user.token }
      }


      let url = this.allServicesService.getURL();
      fileTransfer.upload(this.images[0].filePath, url + '/wp-json/wp/v2/media?token=' + user.token, options)
        .then((data1) => {
          this.allServicesService.dismissLoading();
          if(this.type=="trainerGallery"){
           this. GetUserProfileImages(user.token);
          }else{
            this.GetUserImage();
          }
           
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


  GetUserImage(){
    this.allServicesService.getData('GetUserMainImage/?token=' + this.user.token).subscribe(data => {
      this.res_image = data;
      this.userImage = this.res_image.userImage;
    }, (err) => {
      this.ready = true;
      if (err.error.error_code == "user_expire") {
        this.allServicesService.presentAlert(err.error.errormsg);
        this.router.navigate(['/home']);
      }
      this.allServicesService.presentAlert(err.error.errormsg);
    })
  }


  deleteImage(image) {
    this.allServicesService.getData('deleteImage/?token=' + this.user.token + '&collection_id=' + image.collection_id).subscribe(data => {
      this.res_gallery = data;
      if (this.res_gallery.status = 'ok') {
        this.GetUserProfileImages(this.user.token);
      }
    }, (err) => {
      this.allServicesService.presentAlert(err.error.errormsg);
      if (err.error.error_code == "user_expire") {
        //this.location.back();
      }
    })
  }

  GetUserProfileImages(user_id) {
    this.allServicesService.getData('getPhotos/?token=' + user_id + '&type=private').subscribe(data => {
      this.res_gallery = data;
      if (this.res_gallery.status = 'ok') {
        this.gallery = this.res_gallery.images;
      }
    }, (err) => {

      this.allServicesService.presentAlert(err.error.errormsg);
      if (err.error.error_code == "user_expire") {
        //this.location.back();
      }
    })
  }


}
