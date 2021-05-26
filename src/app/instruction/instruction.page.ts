import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-instruction',
  templateUrl: './instruction.page.html',
  styleUrls: ['./instruction.page.scss'],
})
export class InstructionPage implements OnInit {
  items = [];
  services: any;

  constructor(
    public storage: Storage,
    public navctrl: NavController,
  ) { }

  ngOnInit() {
    this.storage.remove('option')
  }
  select(ev){
    if (this.items.indexOf(ev.detail.value) == -1) {
      this.items.push(ev.detail.value)
    } else {
      this.items = this.items.filter(item => item !== ev.detail.value);
    }
  }
  radioChecked(ev){
    this.services = ev.detail.value
  }
  goto(){
    const option ={
      items:this.items,
      offer_services:this.services
    }
    this.storage.set('option',option)
    this.navctrl.navigateForward('signup')
  }
}
