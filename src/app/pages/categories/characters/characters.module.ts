import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CharactersPageRoutingModule } from './characters-routing.module';

import { CharactersPage } from './characters.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { FiltroPipe } from 'src/app/pipes/filtro.pipe';
import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CharactersPageRoutingModule,
    ComponentsModule,
    PipesModule
  ],
  declarations: [CharactersPage]
})
export class CharactersPageModule {}
