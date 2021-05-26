import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(public menuCtrl: MenuController) {}

  toggleMenu() {
    this.menuCtrl.toggle(); //Add this method to your button click function
  }

}
