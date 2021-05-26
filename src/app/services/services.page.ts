import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder,FormArray , FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';
import { AllServicesService } from '../all-services.service';
import { AlertController, LoadingController, NavController, Events } from '@ionic/angular';
import { Storage } from '@ionic/storage';



@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
})
export class ServicesPage implements OnInit {
  user: any;
  ready:boolean=false;
  res:any;
  list:any;
  service: any={};
  price:any={};
  time:any={};
  addCheckListForm:FormGroup;
  form_value:any;

  arrayItems: {
    service: number;
    price: string;
    time:string
  }[];
  constructor(
    public allServicesService: AllServicesService,
    public loadingCtrl: LoadingController,
    public router: Router,
    public route: ActivatedRoute,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public storage: Storage,
    private _formBuilder: FormBuilder,
    public events:Events

  ) {
    this.service = {};
    this.price = {};
    this.time = {};
    this.addCheckListForm = this._formBuilder.group({
      demoArray: this._formBuilder.array([])
   });
   }

  ngOnInit() {
    this.arrayItems = [];

    this.storage.get('user').then(userInfo => {
      if (userInfo != null) {
        this.user = userInfo;
        this.GetServices();
      } else {
        this.router.navigate(['/home']);
      }
    }, err => {
      this.router.navigate(['/home']);
    });

  }

  get demoArray() {
    return this.addCheckListForm.get('demoArray') as FormArray;
 }
 addItem(item) {
    this.arrayItems.push(item);
    this.demoArray.push(this._formBuilder.control(false));
 }
 removeItem() {
    this.arrayItems.pop();
    this.demoArray.removeAt(this.demoArray.length - 1);
 }

  GetServices(){
      this.allServicesService.getData('getUserServices/?token=' + this.user.token).subscribe(data => {
      this.res = data;
      if (this.res.status = 'ok') {
        this.ready = true;
        this.list = this.res.list;

        let group={}    
        this.list.forEach(input_template=>{
          // let price_field="price_"+input_template.post_id;
          let service_field="service_"+input_template.post_id;
          // let time_field="time_"+input_template.post_id;
          // group[price_field] = new FormControl(input_template.value.price); 
          group[service_field] = new FormControl(input_template.checked); 
          // group[time_field] = new FormControl(input_template.value.time);  
        })
        this.addCheckListForm = new FormGroup(group);
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



  addServices(){
   this.form_value = this.addCheckListForm.value;
   for (var key in this.form_value) {
    if ( this.form_value.hasOwnProperty(key)) {
      if( typeof this.form_value[key] != 'undefined'){
      if (key.substring(0, 8) === "service_") {
           let realkey = key;
           let thenum = key.match(/\d+/)[0]; 
           this.service[thenum]=this.form_value[realkey];
        }
        if (key.substring(0, 6) === "price_") {
          let realkey = key;
          let thenum = key.match(/\d+/)[0]; 
          this.price[thenum]=this.form_value[realkey];
         }

         if (key.substring(0, 5) === "time_") {
          let realkey = key;
          let thenum = key.match(/\d+/)[0]; 
            this.time[thenum]=this.form_value[realkey];
          }
        }
     }
}
    let processData={
      service:this.service,
      // price:this.price,
      // time:this.time
    };
   
     this.allServicesService.showLoader();
     this.allServicesService.sendData('addServices/?token='+this.user.token, processData).subscribe(data => {
      this.allServicesService.dismissLoading();
      let rs: any = [];
      rs = data;
      if (rs.status = 'ok') {
        // this.service = {};
        // this.price = {};
        // this.time = {};
        this.allServicesService.presentAlert(rs.msg);
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
