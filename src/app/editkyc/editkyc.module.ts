import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditkycPage } from './editkyc.page';
import { ReactiveFormsModule } from '@angular/forms';
import { BrMaskerModule } from 'br-mask';
const routes: Routes = [
  {
    path: '',
    component: EditkycPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,   
    ReactiveFormsModule,
    BrMaskerModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditkycPage]
})
export class EditkycPageModule {}
