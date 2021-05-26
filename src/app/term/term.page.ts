import { Component, OnInit } from '@angular/core';
import {AllServicesService} from '../all-services.service';

@Component({
  selector: 'app-term',
  templateUrl: './term.page.html',
  styleUrls: ['./term.page.scss'],
})
export class TermPage implements OnInit {
  data: any;

  constructor(
    public AllServicesService:AllServicesService
  ) { 
    this.AllServicesService.term('pages/125259').subscribe(res =>{
      this.data = res['content'].rendered
    })
  }

  ngOnInit() {
  }

}
