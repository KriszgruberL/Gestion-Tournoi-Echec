import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import {SidebarModule} from "primeng/sidebar";
import {ButtonModule} from "primeng/button";
import {RouterLink} from "@angular/router";



@NgModule({
  declarations: [
    NavbarComponent,
    HomeComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    SidebarModule,
    ButtonModule,
    RouterLink
  ],
  exports: [
    NavbarComponent,
    HomeComponent,
    HeaderComponent
  ]
})
export class CoreModule { }
