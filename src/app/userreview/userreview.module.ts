import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicRatingModule } from 'ionic-rating';

import { IonicModule } from '@ionic/angular';

import { UserreviewPage } from './userreview.page';

const routes: Routes = [
  {
    path: '',
    component: UserreviewPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,IonicRatingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UserreviewPage]
})
export class UserreviewPageModule {}
