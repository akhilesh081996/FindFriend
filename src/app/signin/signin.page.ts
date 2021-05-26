import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder,FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {AllServicesService} from '../all-services.service';
import { Events,AlertController, LoadingController, NavController, MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  loginForm: FormGroup;
  errorMsg:any;
  loading: any; 
  password:any;
  show:any='show';
  passwordStateBox: any;
  biffclass:any='biff';
  griffclass:any;
  bufordclass:any;
value = 'Find a Friend'
  constructor(  
    public events: Events,
    public allServicesService:AllServicesService,
    public loadingCtrl: LoadingController,
    public router: Router,
    public alertCtrl:AlertController,
    public storage:Storage,
    public menu:MenuController,
    public route: ActivatedRoute,
    ) { 
      this.passwordStateBox = "password";

    }


  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params && params.val) {
        this.value = params.val
      }
    });
    
    this.loginForm = new FormGroup({
      'username': new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      'password': new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
      'jw_auth_sec':new FormControl('wivxCNm$<(+WFwivxCNm$<(+WF#7}1]TWMUl7OaU*TxS(r*$#7}1]wivxCNm$<(+WF#7}1]TWMUl7OaU*TxS(r*$TWMUl7OaU*TxS(r*$', Validators.compose([
        Validators.required
      ])),
    });
  } 
  showHidePassword(){
    if( this.passwordStateBox == "password" )
      this.passwordStateBox = "text";
    else
      this.passwordStateBox = "password";
  }
  doLogin(loginData){
     this.showLoader();
    this.allServicesService.doLogin('token',loginData).subscribe(data=>{
      this.dismissLoading();
      let rs:any=[];
      rs =data;
       if(rs.status='ok'){
        this.storage.set('user', rs);
        this.storage.set('user_profile', rs);
        this.allServicesService.getData('getProfile/?token=' + rs.user_id + '&type=public').subscribe(data => {
          this.events.publish('userCheck:created', data)
        })
        this.allServicesService.SaveAutoConfiqure(rs.token);
        this.loginForm.reset()
        this.router.navigate(['/chosehome'])
       }
    },(err)=>{
      this.dismissLoading();
      this.errorMsg = 'User name or password invalid';
    })
  }
  ionViewWillEnter(){
    this.menu.enable(false);
    this.menu.swipeEnable(false);

  }
  ionViewDidLeave(){
    this.menu.enable(true);
  }

  async showLoader(){
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


  //   hideShowPassword() {
  //     this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
  //     this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  // }
}
