import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AllServicesService } from '../all-services.service';
import { AlertController, LoadingController, ModalController, Events,ToastController, Platform,ActionSheetController ,NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage'; 

import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/Camera/ngx';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-myservicesadd',
  templateUrl: './myservicesadd.page.html',
  styleUrls: ['./myservicesadd.page.scss'],
})
export class MyservicesaddPage implements OnInit {

  user:any;
  serviceaddform: FormGroup;
  rs:any=[];
  post_id:any;
  post:any=[];
  price:any=[];
  
  form_valid:boolean=false;

  imageURI: any;
  images: any = [];
  res_image: any;

  type:any="service_image";
  image_data:any="http://1.gravatar.com/avatar/1aedb8d9dc4751e229a335e371db8058?s=96&d=mm&r=g";
  constructor(
    private modalController: ModalController,
    public allServicesService: AllServicesService,
    public loadingCtrl: LoadingController,
    public router: Router,
    public alertCtrl: AlertController,
    public storage: Storage,
    public events:Events,
    private sanitizer: DomSanitizer,
    private camera: Camera,
    private file: File,
    public transfer: FileTransfer,
    private toastController: ToastController,
    private plt: Platform,
    private loadingController: LoadingController,
    private actionSheetController: ActionSheetController,
    private ref: ChangeDetectorRef,
    private filePath: FilePath,
    public NavController:NavController

  ) { 
    // this.index = navParams.get('index');
    // this.gallery = navParams.get('gallery');
    

  }
  back(){
    this.NavController.back()
  }
  ngOnInit() {
    this.image_data="http://1.gravatar.com/avatar/1aedb8d9dc4751e229a335e371db8058?s=96&d=mm&r=g";
    this.storage.get('user').then(userInfo => {
      if (userInfo != null) {
        this.user = userInfo;
        if(this.post_id){
          this.GetCustomService(this.post_id);
        }else{
          this.post_id=0;
        }
       
      } else {
        this.router.navigate(['/home']);
      }
    }, err => {
      this.router.navigate(['/home']);
    });

    this.serviceaddform = new FormGroup({
      'service_name': new FormControl('', Validators.compose([
        Validators.required,

      ])),
      'service_price': new FormControl('', Validators.compose([
        Validators.required
      ])),
      'service_time': new FormControl('', Validators.compose([
        Validators.required
      ]))
    });
  }
 
  async closeModal(close:any='') {
    const onClosedData: string =close;
    await this.modalController.dismiss(onClosedData);
    
  }


  GetCustomService(post_id){
    let formdata ={
      post_id:post_id
    }
    
    this.allServicesService.showLoader();
    this.allServicesService.sendData('GetCustomService/?token=' + this.user.token, formdata).subscribe(data => {
      this.allServicesService.dismissLoading();
      this.rs = data;

      if (this.rs.status = 'ok') {
        if(!this.rs.post){
           this.closeModal();
        }else{
           this.post=this.rs.post;
           this.price=this.rs.post_price;
           this.serviceaddform.controls['service_name'].setValue(this.post.post_title);
           this.serviceaddform.controls['service_price'].setValue(this.price.price);
           this.serviceaddform.controls['service_time'].setValue(this.price.time);
           this.image_data=this.rs.image;

        }
        //this.allServicesService.presentAlert(this.rs.msg);
      }
    }, (err) => {
      this.allServicesService.dismissLoading();
      if (err.error.error_code == "user_expire") {
        this.router.navigate(['/home']);
      }
      this.allServicesService.presentAlert(err.error.errormsg);
    })
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

  async presentToast(text) {
    const toast = await this.toastController.create({
      message: text,
      position: 'bottom',
      duration: 3000
    });
    toast.present();
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
   this.image_data=resPath;
    this.ref.detectChanges(); // trigger change detection cycle
  }

  getImgContent() {
    return this.sanitizer.bypassSecurityTrustUrl(this.image_data);
}


  pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      let converted = (<any>window).Ionic.WebView.convertFileSrc(img);
      return converted;
    }
  }



  UploadImage(post_id,msg) {
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
      header.append('Authorization', 'Bearer ' + this.user.token);
      let options: FileUploadOptions = {
        fileKey: 'file',
        fileName: post_id + '_featured.' + ext,
        chunkedMode: false,
        mimeType: _mime_type,
        params: { 'type': this.type, 'user': this.user.user_id,'post_id':post_id, 'ext': ext },
        headers: { 'Authorization': 'Bearer ' + this.user.token }
      }


      let url = this.allServicesService.getURL();
      fileTransfer.upload(this.images[0].filePath, url + '/wp-json/wp/v2/media?token=' + this.user.token, options)
        .then((data1) => {
          this.events.publish('reloadservices',1);
          this.allServicesService.presentAlert(msg);
          this.closeModal('reload');
          this.allServicesService.dismissLoading();
        }, (err) => {
          this.allServicesService.dismissLoading();
        });
    }
  }

  UpdateService(formdata){
    formdata.token=this.user.token;
    if(this.post){
      formdata.post_id=this.post_id;
    }
    this.allServicesService.showLoader();
    this.allServicesService.sendData('CreateMyCustomService/?token=' + this.user.token, formdata).subscribe(data => {
      this.allServicesService.dismissLoading();
      this.rs = data;
      if (this.rs.status = 'ok') {
        if(this.images.length > 0){
          this.UploadImage(this.rs.post,this.rs.msg);
        }else{
          this.events.publish('reloadservices',1);
          this.allServicesService.presentAlert(this.rs.msg);
          this.closeModal('reload');
        }
       
         
      }
    }, (err) => {
      this.allServicesService.dismissLoading();
      if (err.error.error_code == "user_expire") {
        this.router.navigate(['/home']);
      }
      this.allServicesService.presentAlert(err.error.errormsg);
    })
  }

}
