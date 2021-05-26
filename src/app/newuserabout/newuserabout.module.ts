import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NewuseraboutPage } from './newuserabout.page';

const routes: Routes = [
  {
    path: '',
    component: NewuseraboutPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NewuseraboutPage]
})
export class NewuseraboutPageModule {}
