import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map, retry } from 'rxjs/operators';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Globalization } from '@ionic-native/globalization/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { Platform } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';


let Url = 'http://findfriend2.betaplanets.com/';
let fullUrl = 'http://findfriend2.betaplanets.com/wp-json/mobileapi/v1/';
let url = 'http://findfriend2.betaplanets.com/wp-json/wp/v2/';


@Injectable({
  providedIn: 'root'
})
export class AllServicesService {
  type
  loading: any;
  iana_timezone:any;
  one_id:any;
  token:any;

  totalPosts = null;
  pages: any;
  constructor(
    private http: HttpClient,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private globalization: Globalization,
    private oneSignal: OneSignal,
    public nativeStorage: NativeStorage,
    private platform: Platform,
    public toastController: ToastController,
    
    ) { }

    getURL() {
      return Url;
    }
    
    async presenttoast(msg) {
      const toast = await this.toastController.create({
        message: msg,
        duration: 3000
      });
      toast.present();
    }
  async presentAlert(msg) {
    let alert = await this.alertCtrl.create({
      // header: 'Alert',
      message: msg,
      buttons: [{
        text: 'OK',
        handler: () => {

        }
      }]
    });

    await alert.present();
  }

  async dismissLoading() {
    if(this.loading){
      await this.loading.dismiss();
    }
  }

  UpdateUserInfo(userid, userinfo) {
    return this.http.post(Url + 'wp-json/mobileapi/v1/UpdateUserInfo', {
      userid: userid,
      userinfo: userinfo    
    });
  }

  UpdateUserInterests(userid, userinterests) {
    return this.http.post(Url + 'wp-json/mobileapi/v1/UpdateUserInterests', {
      userid: userid,
      userinterests: userinterests    
    });
  }

  UpdateUserAbout(userid, userabout) {
    return this.http.post(Url + 'wp-json/mobileapi/v1/UpdateUserAbout', {
      userid: userid,
      userinterests: userabout    
    });
  }

  async showLoader(msg: string = '') {
    if (msg == '') {
      msg = 'Please wait...';
    }
    this.loading = await this.loadingCtrl.create({ message: msg });
    await this.loading.present();
  }

  getData(endPoint) {
    return this.http.get(fullUrl + endPoint).pipe(
      map(data => {
        return data;
      })
    )
  }
  term(endPoint) {
    return this.http.get(url + endPoint).pipe(
      map(data => {
        return data;
      })
    )
  }
  sendData(endPoint, data) {
    return this.http.post(fullUrl + endPoint, data).pipe(
      map(data => {
        return data;
      })
    )
  }

  doLogin(endPoint, data) {
    return this.http.post('http://findfriend2.betaplanets.com/wp-json/jwt-auth/v1/' + endPoint, data).pipe(
      map(data => {
        return data;
      })
    )
  }

  StripeAddBankAccount(token, bank_new, type: number = 0) {
    return this.http.post(Url + 'wp-json/mobileapi/v1/StripeAddBankAccount', {
      token: token,
      bank_new: bank_new,
      type: type      
    });
  }

  GetCards(token) {
    return this.http.post(Url + 'wp-json/mobileapi/v1/StripeGetCards', {
      token: token,
    })
  }
  CreateStripeUser(token, stripeToken, type: number = 0) {
    return this.http.post(Url + 'wp-json/mobileapi/v1/CreateStripeUser', {
      token: token,
      stripeToken: stripeToken,
      type: type
    });
  }

  addCardtoBank(token, stripeToken) {
    return this.http.post(Url + 'wp-json/mobileapi/v1/add_debit_card', {
      token: token,
      type: 'card',
      stripeToken: stripeToken
    });
  }

  GetStripeAuthToken(token, details) {
    return this.http.post(Url + 'wp-json/mobileapi/v1/CreateStripeCaptureBooking', {
      token: token,
      // Currency: details.Currency,
      // Card: details.Card,
      Amount: Number(details.Amount),
      response_time_limit:details.response_time_limit,
      activity:details.activity,
      location:details.location,
      city:details.city,
      state:details.state,
      zipcode:details.zipcode,
      minimum_time_to_spend_with_Friend:details.minimum_time_to_spend_with_Friend,
      // notes: details.notes,
      to_user_id: details.to_user_id,
      // myservices:details.myservices,
      // invtotalItem:details.invtotalItem,
      // invtotalamount:details.invtotalamount,
      select_day:details.select_day,
      select_time:details.select_time,
      select_date:details.select_date
    }).pipe(
      map(data => {
        return data;
      })
    )
  }

  saveOneSignID(token, oneSignID) {
    if(this.platform.is('android')){
      this.type ='android'
    }else{
      this.type ='ios'
    }
    this.globalization.getDatePattern({ formatLength: 'string', selector: 'timezone and utc_offset' }).
      then(res => {
        this.iana_timezone = res.iana_timezone
        this.http.post(Url + 'wp-json/mobileapi/v1/save_onesignal_id', {
          oneSignID: oneSignID,
          token: token,
          type: this.type,
          timezone: this.iana_timezone
        })
      })
      .catch(e => {});

    return this.http.post(Url + 'wp-json/mobileapi/v1/save_onesignal_id', {
      oneSignID: oneSignID,
      token: token,
      type: this.type,
      timezone: this.iana_timezone
    });
  }

  async SaveAutoConfiqure(token) {
    if (this.platform.is('cordova')) {
      this.oneSignal.getIds().then((id) => {
        this.one_id = id.userId;
        this.token = token;
        this.saveOneSignID(this.token, this.one_id).subscribe(m => {
        });
      });
    }

  }

  setSetting(setting) {
    if (this.platform.is('cordova')) {
    //return this.nativeStorage.setItem('fancase_user', user);
    this.nativeStorage.setItem('setting', setting)
      .then(
        () => {},
        error => console.error('Error storing item', error)
      );
    }
  }

  getStoreSetting() {
    if (this.platform.is('cordova')) {
    return this.nativeStorage.getItem('setting');
    }
  }


GetSetting() {
  return this.http.get(Url + 'wp-json/mobileapi/v1/GetSetting', {
  });
}


getCurrentUserInfo(token){
  return this.http.post(Url+ 'wp-json/mobileapi/v1/getCurrentUserInfo', {
    token:token
  })
}
getSecoondUserInfo(token,id){
  return this.http.post(Url+ 'wp-json/mobileapi/v1/getSecoondUserInfo', {
    token:token,
    id:id
  })
}

getSecoondUserInfo1(token,id){
  return this.http.post(Url+ 'wp-json/mobileapi/v1/getSecoondUserInfo1', {
    token:token,
    id:id,
  
  })
}

updateCard(token,card,card_new,type){
  return this.http.post(Url+ "wp-json/mobileapi/v1/updateCard",{
    token:token,
    card:card,
    name:card_new.name,
    expMonth:card_new.expMonth,
    expYear:card_new.expYear,
    type:type,
    default:card_new.default
  }).pipe(
    map(content => {
      return content;
    })
  )
}

removeCard(token,card,type){
  return this.http.post(Url + "wp-json/mobileapi/v1/DeleteCard",{
    token:token,
    card:card,
    type:type
  }).pipe(
    retry(2),
    map(content => {
      return content;
    })
  )
}

submitForm(formId,formdata,user_id,user_token){
  return this.http.post(fullUrl + "submitForm",{
    formId: formId,
    formdata: formdata,
    user_id: user_id,
    user_token: user_token
  })
}

getPosts(page = 1, userToken: any = '', mypost: number = 0, c: number=0): Observable<any[]> {
  let category_url = c ? ("&service_category=" + c) : "";
  let options = {
    observe: "response" as 'body',
    params: {
      per_page: '10', 
      page: '' + page
    }
  };

  return this.http.get<any[]>(url+ 'posts?_embed&token=' + userToken + "&mypost=" + mypost + category_url, options).pipe(
    map(resp => {
      this.pages = resp['headers'].get('x-wp-totalpages');
      this.totalPosts = resp['headers'].get('x-wp-total');

      let data = resp['body'];

      for (let post of data) {
        post.media_url = post['media_url'];
      }
      return data;
    })
  )
}
getPostContent(id) {
  return this.http.get(url + 'posts/' + id + '?_embed').pipe(
    map(post => { 
      post['media_url'] = post['media_url'];
      return post;
    })
  )
}
createBankAccountToken(data) {
  return this.http.post('https://api.stripe.com/v1/tokens', 'bank_account[routing_number]='+data.routing_number+'&bank_account[account_number]='+data.account_number+'&bank_account[account_holder_name]='+data.account_holder_name+'&bank_account[account_holder_type]=individual&bank_account[currency]=USD&bank_account[country]=US&key='+data.key,
  {headers:{
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Bearer '+data.key,
    'accept': 'application/json'
  }}
  ).pipe(
    map(data => {
      return data;
    })
  )
}
sendMedia(endPoint,data,token){
  const HttpUploadOptions = {
    headers: new HttpHeaders({ 'Authorization': 'Bearer '+ token })
  }
  return this.http.post(fullUrl+endPoint,data,HttpUploadOptions).pipe(
    map(data => {
      return data;
    })
  )
    
}
createCardToken(data) {
  return this.http.post('https://api.stripe.com/v1/tokens', 'time_on_page=113448&guid=NA&muid=NA&sid=NA&key='+data.key+'&payment_user_agent=stripe.js%2F6c4e062&card[name]='+data.name+'&card[number]='+data.number+'&card[exp_month]='+data.expMonth+'&card[exp_year]='+data.expYear+'&card[cvc]='+data.cvc+'&card[currency]=USD',
  {headers:{
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Bearer '+data.key,
    'accept': 'application/json'
  }}
  ).pipe(
    map(data => {
      return data;
    })
  )
}
}
