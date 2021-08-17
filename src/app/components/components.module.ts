import { NgModule } from "@angular/core";
import { MenuComponent } from "./menu/menu.component";
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { CategoryComponent } from "./category/category.component"
import { PanelCharacterComponent } from "./panel-character/panel-character.component";
import { PanelSearchComponent } from "./panel-search/panel-search.component";
import { ModalDetailCharacterComponent } from './modals/modal-detail-character/modal-detail-character.component';
import { PanelComicComponent } from './panel-comic/panel-comic.component';
import { ModalDetailComicComponent } from './modals/modal-detail-comic/modal-detail-comic.component';

@NgModule({
    declarations: [
        MenuComponent,
        HeaderComponent,
        CategoryComponent,
        PanelCharacterComponent,
        PanelSearchComponent,
        ModalDetailCharacterComponent,
        PanelComicComponent,
        ModalDetailComicComponent
    ],
    exports: [
        MenuComponent,
        HeaderComponent,
        CategoryComponent,
        PanelCharacterComponent,
        PanelSearchComponent,
        ModalDetailCharacterComponent,
        PanelComicComponent,
        ModalDetailComicComponent
    ],
    imports: [
        CommonModule,
        IonicModule.forRoot(), 
    ]
})

export class ComponentsModule { }