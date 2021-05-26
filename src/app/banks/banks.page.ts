import { Storage } from '@ionic/storage';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NavController, ActionSheetController, Platform} from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AllServicesService } from '../all-services.service';
@Component({
  selector: 'app-banks',
  templateUrl: './banks.page.html',
  styleUrls: ['./banks.page.scss'],
})
export class BanksPage implements OnInit {

  user
  result
  banks
  constructor(
    public navCtrl: NavController,
    public storage: Storage,
    public plt: Platform,
    public router: Router,
    private activatedRoute: ActivatedRoute,
    public allServicesService: AllServicesService,
    public actionSheetController: ActionSheetController,

  ) {
    this.allServicesService.showLoader()
   }

  ngOnInit() {
  }
  back(){
    this.navCtrl.back()
  }
  ionViewWillEnter(){
    this.storage.get('user').then((val) => {
      if (val != null) {
        this.user = val;
          this.getbank()
      }else{
        this.storage.clear();
        this.router.navigate(['/login']);
      }
    },err=>{
      this.storage.clear();
      this.router.navigate(['/login']);
    });
  }
  getbank(){
    let data={'token':this.user.token};
    this.allServicesService.sendData('StripeGetCards',data).subscribe(res => {
      if(res){
        this.allServicesService.dismissLoading()
        this.result = res
        this.banks = this.result.bank_accounts.data;
      }else{
        this.allServicesService.dismissLoading()
        this.allServicesService.presentAlert("Something went Wrong")
      }
    },err =>{
        this.allServicesService.dismissLoading()
        if(err.error.errormsg =='Not any resources found.'){
        // this.banks.length = 0
        // this.allServicesService.presentAlert("Something went Wrong")
      }else{
        this.allServicesService.presentAlert("Something went Wrong")
      }
    })
}
    async action(data,i) {
      const actionSheet = await this.actionSheetController.create({
        // header: "Select Image source",
        buttons: [{
          text: 'Edit',
          handler: () => {
            let navigationExtras: NavigationExtras = {
              queryParams: {
                data: JSON.stringify(data),
              }
            }
            this.navCtrl.navigateForward(['/editbanks'], navigationExtras);
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.banks.splice()
            this.delete(data)
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
    delete(data){

    }

}
