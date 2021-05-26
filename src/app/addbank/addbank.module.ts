import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddbankPage } from './addbank.page';
import { ReactiveFormsModule } from '@angular/forms';
import { BrMaskerModule } from 'br-mask';
const routes: Routes = [
  {
    path: '',
    component: AddbankPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrMaskerModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddbankPage]
})
export class AddbankPageModule {}
