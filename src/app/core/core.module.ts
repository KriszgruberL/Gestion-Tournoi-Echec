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
import { LoginComponent } from './components/login/login.component';
import {FormsModule} from "@angular/forms";
import {ChipsModule} from "primeng/chips";
import {PasswordModule} from "primeng/password";
import {RippleModule} from "primeng/ripple";



@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    NavbarComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    SidebarModule,
    ButtonModule,
    RouterLink,
    TabMenuModule,
    MegaMenuModule,
    FormsModule,
    ChipsModule,
    PasswordModule,
    RippleModule
  ],
  exports: [
    HomeComponent,
    HeaderComponent,
    NavbarComponent
  ]
})
export class CoreModule { }
