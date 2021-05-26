import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NavController, ActionSheetController, Platform} from '@ionic/angular';
import { AllServicesService } from '../all-services.service';
import { File } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx/index';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Storage } from '@ionic/storage';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Stripe ,StripeBankAccountParams} from '@ionic-native/stripe/ngx/index';
@Component({
  selector: 'app-addbank',
  templateUrl: './addbank.page.html',
  styleUrls: ['./addbank.page.scss'],
})
export class AddbankPage implements OnInit {

  setting
  addbankform: FormGroup;
  user: any;
  constructor(
    public allServicesService: AllServicesService,
    public navCtrl:NavController,
    public filePath: FilePath,
    public ref: ChangeDetectorRef,
    public transfer: FileTransfer,
    public actionSheetController: ActionSheetController,
    public plt: Platform,
    public Storage:Storage,
    private sanitizer: DomSanitizer,
    public router: Router,
    private stripe: Stripe,
  ) { }
  ionViewWillEnter(){
    this.Storage.get('user').then((val) => {
      if (val != null) {
        this.user = val;
          this.GetSetting();
      }else{
        this.Storage.clear();
        this.router.navigate(['/login']);
      }
    },err=>{
      this.Storage.clear();
      this.router.navigate(['/login']);
    });
  }
  ngOnInit() {
    this.addbankform = new FormGroup({
      'routing_number': new FormControl('', Validators.compose([
        Validators.required
      ])),
      'account_number': new FormControl('', Validators.compose([
        Validators.required
      ])),
      'account_holder_name': new FormControl('', Validators.compose([
        Validators.required
      ])),
    });
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
      data['stripeToken'] = res['id']
      this.allServicesService.sendData('addBankToConnectedAccount',data).subscribe(res =>{
        if(res['status'] == 'ok'){
          this.allServicesService.dismissLoading()
          this.navCtrl.back()
          this.allServicesService.presentAlert('Bank added')
        }else{
          this.allServicesService.dismissLoading()
          this.allServicesService.presentAlert('Something went Wrong')
        }
      },err =>{
        this.allServicesService.dismissLoading()
        this.allServicesService.presentAlert('Something went Wrong')
      })
       },err =>{
        this.allServicesService.dismissLoading()
        this.allServicesService.presentAlert(err.message);
    })
  }

}
