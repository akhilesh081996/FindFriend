import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { IonicRatingModule } from 'ionic-rating';

import { TrainerPage } from './trainer.page';

const routes: Routes = [
  {
    path: '',
    component: TrainerPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,IonicRatingModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TrainerPage]
})
export class TrainerPageModule {}
