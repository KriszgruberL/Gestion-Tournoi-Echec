import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from '../shared/shared.module';
import {DividerModule} from "primeng/divider";
import { ProfilComponent } from './components/profil/profil.component';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    NavbarComponent,
    LoginComponent,
    ProfilComponent,
  ],
    imports: [
        CommonModule,
        SharedModule,
        DividerModule,
    ],
  exports: [
    HomeComponent,
    HeaderComponent,
    NavbarComponent,
  ],
})
export class CoreModule {}
