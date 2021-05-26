import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AllServicesService } from '../all-services.service';
import { Events, AlertController, LoadingController, NavController, ActionSheetController, MenuController, ToastController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/Camera/ngx';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {
  editsh: FormGroup;
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

  is_monday: boolean = false;
  is_tuesday: boolean = false;
  is_wednesday: boolean = false;
  is_thursday: boolean = false;
  is_friday: boolean = false;
  is_saturdy: boolean = false;
  is_sunday: boolean = false;
  imageURI: any;
  images: any = [];
  res_image: any;
  res_gallery: any;
  gallery: any;
  type:any;
  userImage: any = 'http://1.gravatar.com/avatar/1aedb8d9dc4751e229a335e371db8058?s=96&d=mm&r=g';
  constructor(
    public events: Events,
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
    public nvCtrl :NavController
  ) { 
    this.storage.get('user').then(userInfo => {
      if (userInfo != null) {
        this.user = userInfo;
        this.allServicesService.SaveAutoConfiqure(this.user.token);
        this.GetUserProfile();
      } else {
        this.router.navigate(['/home']);
      }
    }, err => {
      this.router.navigate(['/home']);
    });
  }

  ngOnInit() {
    this.editsh = new FormGroup({
      'shop_name': new FormControl('', Validators.compose([
        Validators.required,
      ])),
      'shop_phone': new FormControl('', Validators.compose([
        Validators.required
      ])),
      'shop_email': new FormControl('', Validators.compose([
        Validators.required
      ])),
      'shop_address1': new FormControl('', Validators.compose([
        Validators.required
      ])),
      'shop_address2': new FormControl('', Validators.compose([

      ])),
      'shop_city': new FormControl('', Validators.compose([
        Validators.required
      ])),
      'shop_state': new FormControl('', Validators.compose([
        Validators.required
      ])),
      'shop_zipcode': new FormControl('', Validators.compose([
        Validators.required
      ])),
      'shop_about': new FormControl(''),
      'shop_website': new FormControl('', Validators.compose([
        Validators.required
      ])),
      'monday_from': new FormControl(''),
      'monday_to': new FormControl(''),
      'tuesday_from': new FormControl(''),
      'tuesday_to': new FormControl(''),
      'wedesday_from': new FormControl(''),
      'wedesday_to': new FormControl(''),
      'thursday_from': new FormControl(''),
      'thursday_to': new FormControl(''),
      'friday_from': new FormControl(''),
      'friday_to': new FormControl(''),
      'saturday_from': new FormControl(''),
      'saturday_to': new FormControl(''),
      'sunday_from': new FormControl(''),
      'sunday_to': new FormControl(''),
    });
    this.RenderProfileData();
  }

  GetUserProfile() {
    this.allServicesService.getData('getProfile/?token=' + this.user.token).subscribe(data => {
      this.res = data;
      if (this.res.status = 'ok') {
        this.ready = true;
        this.user_info = this.res;
        this.GetUserProfileImages(this.user.token);
        this.storage.set('user_profile', this.res);
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
    formdata.is_monday = this.is_monday;
    formdata.is_tuesday = this.is_tuesday;
    formdata.is_wednesday = this.is_wednesday;
    formdata.is_thursday = this.is_thursday;
    formdata.is_friday = this.is_friday;
    formdata.is_saturdy = this.is_saturdy;
    formdata.is_sunday = this.is_sunday;
    this.allServicesService.showLoader();
    this.allServicesService.sendData('updateProfileCompany/?token=' + this.user.token, formdata).subscribe(data => {
      this.allServicesService.dismissLoading();
      this.rs = data;

      if (this.rs.status = 'ok') {
        this.GetUserProfile();
        this.allServicesService.presentAlert(this.rs.msg);
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
        this.user_profile = user_profile;
        this.editsh.controls['shop_name'].setValue(this.user_profile.shop_name);
        this.userImage = this.user_profile.userImage;
        this.editsh.controls['shop_phone'].setValue(this.user_profile.shop_phone);
        this.editsh.controls['shop_email'].setValue(this.user_profile.shop_email);
        this.editsh.controls['shop_address1'].setValue(this.user_profile.shop_address1);
        this.editsh.controls['shop_address2'].setValue(this.user_profile.shop_address2);
        this.editsh.controls['shop_city'].setValue(this.user_profile.shop_city);
        this.editsh.controls['shop_state'].setValue(this.user_profile.shop_state);
        this.editsh.controls['shop_zipcode'].setValue(this.user_profile.shop_zipcode);
        this.editsh.controls['shop_website'].setValue(this.user_profile.shop_website);
        this.editsh.controls['shop_about'].setValue(this.user_profile.shop_about);

        if (this.user_profile.working.is_sunday != false) {
          this.is_sunday = true;
          this.editsh.controls['sunday_from'].setValue(this.user_profile.working.is_sunday.from_time);
          this.editsh.controls['sunday_to'].setValue(this.user_profile.working.is_sunday.to_time);
        } else {
          this.is_sunday = false;
        }

        if (this.user_profile.working.is_monday != false) {
          this.is_monday = true;
          this.editsh.controls['monday_from'].setValue(this.user_profile.working.is_monday.from_time);
          this.editsh.controls['monday_to'].setValue(this.user_profile.working.is_monday.to_time);
        } else {
          this.is_monday = false;
        }

        if (this.user_profile.working.is_tuesday != false) {
          this.is_tuesday = true;
          this.editsh.controls['tuesday_from'].setValue(this.user_profile.working.is_tuesday.from_time);
          this.editsh.controls['tuesday_to'].setValue(this.user_profile.working.is_tuesday.to_time);
        } else {
          this.is_tuesday = false;
        }


        if (this.user_profile.working.is_wednesday != false) {
          this.is_wednesday = true;
          this.editsh.controls['wedesday_from'].setValue(this.user_profile.working.is_wednesday.from_time);
          this.editsh.controls['wedesday_to'].setValue(this.user_profile.working.is_wednesday.to_time);
        } else {
          this.is_wednesday = false;
        }

        if (this.user_profile.working.is_thursday != false) {
          this.is_thursday = true;
          this.editsh.controls['thursday_from'].setValue(this.user_profile.working.is_thursday.from_time);
          this.editsh.controls['thursday_to'].setValue(this.user_profile.working.is_thursday.to_time);
        } else {
          this.is_thursday = false;
        }

        if (this.user_profile.working.is_friday != false) {
          this.is_friday = true;
          this.editsh.controls['friday_from'].setValue(this.user_profile.working.is_friday.from_time);
          this.editsh.controls['friday_to'].setValue(this.user_profile.working.is_friday.to_time);
        } else {
          this.is_friday = false;
        }

        if (this.user_profile.working.is_saturdy != false) {
          this.is_saturdy = true;
          this.editsh.controls['saturday_from'].setValue(this.user_profile.working.is_saturdy.from_time);
          this.editsh.controls['saturday_to'].setValue(this.user_profile.working.is_saturdy.to_time);
        } else {
          this.is_saturdy = false;
        }


      } else {
        this.router.navigate(['/home']);
      }
    }, err => {
      this.router.navigate(['/home']);
    });
  }


  async selectImage(type) {
    this.type=type;
    this.images = [];
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
        params: { 'type': this.type, 'user': user.user_id, 'ext': ext },
        headers: { 'Authorization': 'Bearer ' + user.token }
      }


      let url = this.allServicesService.getURL();
      fileTransfer.upload(this.images[0].filePath, url + '/wp-json/wp/v2/media?token=' + user.token, options)
        .then((data1) => {
          this.allServicesService.dismissLoading();
          //this.images = [];
          if(this.type=="barberGallery"){
            this. GetUserProfileImages(user.token);
           }else{
             this.GetUserImage();
           }
          this.GetUserProfileImages(this.user.token);
        }, (err) => {
          this.allServicesService.dismissLoading();
        });
    }
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

  async presentToast(text) {
    const toast = await this.toastController.create({
      message: text,
      position: 'bottom',
      duration: 3000
    });
    toast.present();
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
  back(){
    this.nvCtrl.back()
  }

}
