import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatorsPageRoutingModule } from './creators-routing.module';

import { CreatorsPage } from './creators.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreatorsPageRoutingModule,
    ComponentsModule,
    ComponentsModule,
    PipesModule
  ],
  declarations: [CreatorsPage]
})
export class CreatorsPageModule {}
