import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SetschedulePage } from './setschedule.page';
import { PipesModule } from '../pipes/pipes.module'; ;

const routes: Routes = [
  {
    path: '',
    component: SetschedulePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    PipesModule
  ],
  declarations: [SetschedulePage]
})
export class SetschedulePageModule {}
