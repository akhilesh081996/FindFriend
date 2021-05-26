
//import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import * as moment from 'moment';
import * as firebase from 'firebase';
import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, NavController, MenuController, Platform, Events } from '@ionic/angular';
declare var google: any;
import { NavigationExtras } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AllServicesService } from '../all-services.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  @ViewChild('content', { static: false }) content: any;
  chatbox: any = [];
  ref: any;
  ref2: any;
  ref4: any;
  userData: any;
  imageURI: any;
  nameFrom: any;
  idFrom: any;
  messagesList: any;
  newmessage: any;
  current_page = 9;
  per_page = 9;
  morePagesAvailable: boolean = true;
  isCust: boolean = false;
  chatEnd: boolean = true;
  chatEndDealer: boolean = true;
  dealerDeviceToken: any;
  spDeviceToken: any;
  senderDeviceToken: any;
  userRole: any;
  userId: any;
  fromPage: any = '';
  senderName: any;
  someTextUrl: any;
  selectedPhoto;
  loadings;
  currentImage;
  pdffilepath: any;
  img_banner: any;
  imgfilepath: any;
  reciverData: any = [];
  currentUser: any = [];
  fromNotfification: boolean;
  CuserID: any;
  CuserName: any;
  classCond: boolean;
  toName: any;
  message:any;
  constructor(
    public events: Events,
    public storage: Storage,
    public navCtrl: NavController,
    public serviceForAllService: AllServicesService,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public platform: Platform,
    public route: ActivatedRoute,
     public router: Router,

  ) {
    //  this.classCond=true;


    this.imageURI = '';

    this.route.queryParams.subscribe((params) => {
      if (params && params.secondUser) {
        this.reciverData = JSON.parse(params.secondUser);
        this.currentUser = JSON.parse(params.currentUser);
        this.newmessage=params.message;
        this.CuserID = this.currentUser.id;
        this.CuserName = this.currentUser.display_name;
        this.fromNotfification = params.fromNotfification;
        this.events.publish('secondUser', this.reciverData, this.currentUser);
      }
    });
    this.events.subscribe('toName', (val) => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      this.toName = val;
    });
    this.events.subscribe('secondUser', (val, val2) => {
      this.reciverData = val;
      this.currentUser = val2;
      this.CuserID = this.currentUser.id;
      this.CuserName = this.currentUser.display_name;
      this.events.publish('toName', this.reciverData.first_name);
      this.chatbox = {
        id: Number(this.reciverData.id),
        topDetails: this.reciverData.first_name,
        nameTo: this.reciverData.first_name,
        nameFrom: this.CuserName,
        idFrom: Number(this.CuserID),

      };
      if (this.chatbox.id > this.chatbox.idFrom) {
        let chatBoxID = this.chatbox.id + '_chat_' + this.chatbox.idFrom;
        this.ref = firebase.database().ref('chatbox/' + this.CuserID + '/' + chatBoxID);
        this.ref2 = firebase.database().ref('chatbox/' + this.reciverData.id + '/' + chatBoxID);
        this.fetchChatDetails();
      } else {
        let chatBoxID = this.chatbox.idFrom + '_chat_' + this.chatbox.id;
        this.ref = firebase.database().ref('chatbox/' + this.CuserID + '/' + chatBoxID);
        this.ref2 = firebase.database().ref('chatbox/' + this.reciverData.id + '/' + chatBoxID);
        this.fetchChatDetails();
      }
    });
  }
  ngOnInit() {

  }

  ionViewDidLoad() {


  }
  back(){
    this.navCtrl.back()
  }

  fetchChatDetails() {
    this.ref.orderByKey().limitToLast(this.current_page).on('value', data => {
      let tmp = [];
      var i = 1;
      data.forEach(data1 => {
        tmp.push({
          key: data.key,
          name: data1.val().name,
          nameFrom: data1.val().nameFrom,
          message: data1.val().message,
          senderID: parseInt(data1.val().senderID),
          reciverID: parseInt(data1.val().reciverID),
          user1: data1.val().user1,
          user2: data1.val().user2,
          secondUserID: parseInt(data1.val().secondUserID),
          time: moment(data1.val().time).fromNow(),
          media: data1.val().media,
          file_name: data1.val().file_name,
          file_ext: data1.val().file_ext

        })
        // this.ref4 = firebase.database().ref('chatbox/' + this.CuserID + '/' + data.key+ '/' + data1.key).off();
      });

      this.messagesList = tmp;
      this.current_page = this.current_page + this.per_page;
      this.scrollToBottomFunction();
    });
  }
  ionViewWillEnter() {
    if(this.newmessage!=''){
      this.sendMessage();
    }
  }
 
  sendMessage() {
    if (this.imageURI != '') {
      //this.upload();
    }

    if (this.newmessage == undefined || this.newmessage == 'undefined' || (this.newmessage).trim() == '') {
      this.newmessage = '';
      return false;
    }
    let time = Date.now();
    this.ref.push({
      name: this.chatbox.nameTo,
      nameFrom: this.chatbox.nameFrom,
      message: this.newmessage,
      senderID: parseInt(this.chatbox.idFrom),
      reciverID: parseInt(this.chatbox.id),
      user1: this.chatbox.nameFrom,
      user2: this.chatbox.nameTo,
      time: time,
      unread: 0,
      secondUserID: parseInt(this.chatbox.id),

    });
    this.ref2.push({
      name: this.chatbox.nameTo,
      nameFrom: this.chatbox.nameFrom,
      message: this.newmessage,
      user1: this.chatbox.nameTo,
      user2: this.chatbox.nameFrom,
      unread: 1,
      secondUserID: parseInt(this.chatbox.idFrom),
      senderID: parseInt(this.chatbox.idFrom),
      reciverID: parseInt(this.chatbox.id),
      time: time
    });
    this.sendNotification(this.chatbox.id, this.newmessage, this.chatbox.nameFrom);
    this.scrollToBottomFunction();
    this.newmessage = '';


  }



  scrollToBottomFunction() {
    setTimeout(() => {
      if (this.content._scroll) this.content.scrollToBottom();
    }, 400)
  }



  loadMoreLeads(infiniteScroll) {

    this.ref.orderByKey().limitToLast(this.current_page).on('value', data => {
      let tmp = [];
      data.forEach(data => {
        tmp.push({
          key: data.key,
          name: data.val().name,
          nameFrom: data.val().nameFrom,
          message: data.val().message,
          senderID: parseInt(data.val().senderID),
          reciverID: parseInt(data.val().reciverID),
          user1: data.val().user1,
          user2: data.val().user2,
          secondUserID: parseInt(data.val().secondUserID),
          time: moment(data.val().time).fromNow(),
          media: data.val().media,
          file_name: data.val().file_name,
          file_ext: data.val().file_ext
        })
      });
      this.messagesList = tmp;
      this.current_page = this.current_page + this.per_page;
      infiniteScroll.target.complete();
    });

  }
  sendNotification(secondUserID, msg, name) {
    const option ={
      secondUserID:secondUserID,
      msg:msg,
      name:name,
      senderID:this.CuserID
    }
    this.serviceForAllService.sendData('sendPushNotification',option).subscribe((result) => {
    });
}

}