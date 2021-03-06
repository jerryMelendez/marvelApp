import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyDataPageRoutingModule } from './my-data-routing.module';

import { MyDataPage } from './my-data.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyDataPageRoutingModule,
    ComponentsModule
  ],
  declarations: [MyDataPage]
})
export class MyDataPageModule {}
