import { NgModule } from "@angular/core";
import { MenuComponent } from "./menu/menu.component";
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { CategoryComponent } from "./category/category.component"
import { PanelCharacterComponent } from "./panel-character/panel-character.component";
import { PanelSearchComponent } from "./panel-search/panel-search.component";

@NgModule({
    declarations: [
        MenuComponent,
        HeaderComponent,
        CategoryComponent,
        PanelCharacterComponent,
        PanelSearchComponent
    ],
    exports: [
        MenuComponent,
        HeaderComponent,
        CategoryComponent,
        PanelCharacterComponent,
        PanelSearchComponent
    ],
    imports: [
        CommonModule,
        IonicModule.forRoot(), 
    ]
})

export class ComponentsModule { }