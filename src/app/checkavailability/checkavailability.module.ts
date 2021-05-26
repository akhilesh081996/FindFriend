import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CheckavailabilityPage } from './checkavailability.page';

const routes: Routes = [
  {
    path: '',
    component: CheckavailabilityPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CheckavailabilityPage]
})
export class CheckavailabilityPageModule {}
