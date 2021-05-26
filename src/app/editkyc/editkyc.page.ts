import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavController, ActionSheetController, Platform} from '@ionic/angular';
import { FilePath } from '@ionic-native/file-path/ngx/index';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { Storage } from '@ionic/storage';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Stripe} from '@ionic-native/stripe/ngx/index';
import { AllServicesService } from '../all-services.service';
@Component({
  selector: 'app-editkyc',
  templateUrl: './editkyc.page.html',
  styleUrls: ['./editkyc.page.scss'],
})
export class EditkycPage implements OnInit {
  front_image='https://via.placeholder.com/400'
  back_image='https://via.placeholder.com/400'

  mediaArray
  images: any[];
  kycdetail: FormGroup;
  user: any;
  image_data: any;
  type: any;
  image_data1: any;
  images1: any[];
  type1: any;
  imagefrontadd = false;
  imagebackadd: boolean = false;

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
  ) {
    this.kycdetail = new FormGroup({
      'date_of_birth': new FormControl('', Validators.compose([
        Validators.required
      ])),
      'phone': new FormControl('', Validators.compose([
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
      'termConditions': new FormControl(false),
    });
   }
  ionViewWillEnter(){
    this.Storage.get('user').then((val) => {
      if (val != null) {
        this.user = val;
        this.getBankingInfo();
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
    
  }

  back(){
    this.navCtrl.back()
  }


  getBankingInfo(){
    this.allServicesService.showLoader();
      this.allServicesService.getData('get_kyc_details?token='+ this.user.token).subscribe(res =>{
              if(res['status'] == 'ok'){
                this.allServicesService.dismissLoading();
                      let kycDetail = res['kyc_detail']
                        let splitDate = kycDetail.dob.split("-")
                        if(parseInt(splitDate[0])< 10){
                          splitDate[0] = "0"+splitDate[0]
                        }
                        if(parseInt(splitDate[1])< 10){
                          splitDate[1] = "0"+splitDate[0]
                        }
                        let birthdate = splitDate[0] +"/" + splitDate[1] +"/" + splitDate[2];
                    this.kycdetail.patchValue({
                        'address1' : kycDetail.address1,
                        'address2' :kycDetail.address2,
                        'city':kycDetail.city,
                        'phone':kycDetail.phone.split("+1").pop(),
                        'state_code':kycDetail.state_code,
                        'zipcode':(kycDetail.zipcode  == null) ? "" : kycDetail.zipcode,
                        'mcc':'6513',
                        'date_of_birth': kycDetail.dob,
                        'routing_number':res['bank_accounts'].data[0].routing_number,
                        'account_number':res['bank_accounts'].data[0].account,
                        'account_holder_name':res['bank_accounts'].data[0].account_holder_name
                    })
              }else{
                this.allServicesService.presentAlert('Something went wrong');
                this.allServicesService.dismissLoading();
              }
      }, err=>{ 
        this.allServicesService.dismissLoading();
              if(err.error['status'] == 'error'){
                this.allServicesService.dismissLoading();
                this.allServicesService.presentAlert(err.error.errormsg);
              }
                  
      })

  }



  updateBankingInfo(data){
    if(data.termConditions != false){
          this.allServicesService.showLoader()
         var obj = {}
         obj = data;
         obj['token'] = this.user.token

        this.allServicesService.sendData('update_kyc_details', obj).subscribe(res=>{
                  if(res){
                    this.allServicesService.dismissLoading();
                    this.allServicesService.presenttoast('Banking Info updated successfully');
                    
                  }else{
                    this.allServicesService.dismissLoading();
                    this.allServicesService.presentAlert('Something went wrong');
                  }
        }, err=>{   
          if(err.error['status'] == 'error'){
            this.allServicesService.dismissLoading();
            this.allServicesService.presentAlert(err.error.errormsg);
          }
        })
    }else{
      this.allServicesService.presentAlert('Accept Stripe terms & conditions')
    }
        
  }

}
