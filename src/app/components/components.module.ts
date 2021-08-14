import { NgModule } from "@angular/core";
import { MenuComponent } from "./menu/menu.component";
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { CategoryComponent } from "./category/category.component"

@NgModule({
    declarations: [
        MenuComponent,
        HeaderComponent,
        CategoryComponent
    ],
    exports: [
        MenuComponent,
        HeaderComponent,
        CategoryComponent
    ],
    imports: [
        CommonModule,
        IonicModule.forRoot(), 
    ]
})

export class ComponentsModule { }