import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { AlertController, LoadingController, NavController, Events } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    public nav:NavController
  ) { }

  ngOnInit() {
  }
goto(val){
  let navigationExtras: NavigationExtras = {
    queryParams: {
      val: JSON.stringify(val),
    }
  };
  this.nav.navigateForward(['/login'], navigationExtras);
}
}
