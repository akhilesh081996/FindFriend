import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicRatingModule } from 'ionic-rating';

import { IonicModule } from '@ionic/angular';

import { ReviewratingPage } from './reviewrating.page';
import { StarRatingModule } from 'ionic4-star-rating';
const routes: Routes = [
  {
    path: '',
    component: ReviewratingPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicRatingModule,
    StarRatingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ReviewratingPage]
})
export class ReviewratingPageModule {}
