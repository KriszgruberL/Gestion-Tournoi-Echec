import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import {SidebarModule} from "primeng/sidebar";
import {ButtonModule} from "primeng/button";
import {RouterLink} from "@angular/router";
import { NavbarComponent } from './components/navbar/navbar.component';
import {TabMenuModule} from "primeng/tabmenu";
import {MegaMenuModule} from "primeng/megamenu";



@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    SidebarModule,
    ButtonModule,
    RouterLink,
    TabMenuModule,
    MegaMenuModule
  ],
  exports: [
    HomeComponent,
    HeaderComponent,
    NavbarComponent
  ]
})
export class CoreModule { }
