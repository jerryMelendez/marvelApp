import { NgModule } from "@angular/core";
import { MenuComponent } from "./menu/menu.component";
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { CategoryComponent } from "./category/category.component"
import { PanelCharacterComponent } from "./panel-character/panel-character.component";

@NgModule({
    declarations: [
        MenuComponent,
        HeaderComponent,
        CategoryComponent,
        PanelCharacterComponent
    ],
    exports: [
        MenuComponent,
        HeaderComponent,
        CategoryComponent,
        PanelCharacterComponent
    ],
    imports: [
        CommonModule,
        IonicModule.forRoot(), 
    ]
})

export class ComponentsModule { }