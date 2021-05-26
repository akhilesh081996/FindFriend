import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-gallery-custom-modal',
  templateUrl: './gallery-custom-modal.page.html',
  styleUrls: ['./gallery-custom-modal.page.scss'],
})
export class GalleryCustomModalPage implements OnInit {

  slideOpts:any = {
    initialSlide: 0,
    speed: 400
  };
  gallery:any=[];
  index:number;
  type:any;
  constructor(
    private modalController: ModalController
  ) { 
    // this.index = navParams.get('index');
    // this.gallery = navParams.get('gallery');

  }
 
  ngOnInit() {
    //this.type=this.navParams.data.type;
    this.slideOpts={
      initialSlide: this.index,
      speed: 400
    }
  }
 
  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }
}


 