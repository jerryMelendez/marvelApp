import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StoriesPageRoutingModule } from './stories-routing.module';

import { StoriesPage } from './stories.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoriesPageRoutingModule,
    ComponentsModule
  ],
  declarations: [StoriesPage]
})
export class StoriesPageModule {}
