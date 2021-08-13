import { NgModule } from "@angular/core";
import { MenuComponent } from "./menu/menu.component";
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "../app-routing.module";

@NgModule({
    declarations: [
        MenuComponent,
        HeaderComponent
    ],
    exports: [
        MenuComponent,
        HeaderComponent
    ],
    imports: [
        CommonModule,
        IonicModule.forRoot(), 
    ]
})

export class ComponentsModule { }