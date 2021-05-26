import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonBottomDrawerModule } from './../modules/ion-bottom-drawer/ion-bottom-drawer.module';
import { IonicModule } from '@ionic/angular';

import { SearchfilterPage } from './searchfilter.page';

const routes: Routes = [
  {
    path: '',
    component: SearchfilterPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonBottomDrawerModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SearchfilterPage]
})
export class SearchfilterPageModule {}
