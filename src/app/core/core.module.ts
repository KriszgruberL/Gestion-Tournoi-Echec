import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './components/home/home.component';
import {HeaderComponent} from './components/header/header.component';

import {LoginComponent} from './components/login/login.component';
import {SharedModule} from '../shared/shared.module';
import {DividerModule} from "primeng/divider";
import {ProfilComponent} from './components/profil/profil.component';
import {MembersService} from "../gestion-tournoi/services/members.service";

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,

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

  ], providers : [
    MembersService
  ]
})
export class CoreModule {
}
