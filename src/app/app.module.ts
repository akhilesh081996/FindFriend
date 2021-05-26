import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { AllServicesService } from '../app/all-services.service';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { PipesModule } from '../app/pipes/pipes.module'; ;

import { Stripe } from '@ionic-native/stripe/ngx';
import { BrMaskerModule } from 'br-mask';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { Globalization } from '@ionic-native/globalization/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/Camera/ngx';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { GalleryCustomModalPageModule } from './gallery-custom-modal/gallery-custom-modal.module';
import { IonicRatingModule } from 'ionic-rating';   
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Braintree, ApplePayOptions, PaymentUIOptions } from '@ionic-native/braintree/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Crop } from '@ionic-native/crop/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrMaskerModule,
    BrowserModule,
    PipesModule,
    IonicRatingModule, 
    IonicModule.forRoot({
    animated:false
  }), 
  AppRoutingModule, 
  HttpClientModule, 
  IonicStorageModule.forRoot(),
   ReactiveFormsModule,
   GalleryCustomModalPageModule],
  providers: [
    StatusBar,
    SplashScreen,
    CallNumber,
    Crop,
    LocalNotifications,
    Stripe,
    OneSignal,
    Globalization,
    NativeStorage,
    Geolocation,
    Camera,
    File,
    FilePath,
    FileTransfer,
    Braintree,
    PayPal,
    NativeGeocoder,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}


