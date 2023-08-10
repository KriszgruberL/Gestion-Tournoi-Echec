import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListTournoiComponent} from './list-tournoi/list-tournoi.component';
import {SharedModule} from "../shared/shared.module";
import {PrimeNgModule} from "../shared/prime-ng.module";
import {GestionTournoiRoutingModule} from "./gestion-tournoi-routing.module";
import {LandingPageComponent} from './landing-page/landing-page.component';
import {TournoiService} from "./services/tournoi.service";
import {DetailTournoiComponent} from './detail-tournoi/detail-tournoi.component';
import {HttpClientModule} from "@angular/common/http";
import {ToastModule} from "primeng/toast";
import {MenuModule} from "primeng/menu";
import {MessageService} from "primeng/api";
import {SlideMenuModule} from "primeng/slidemenu";


@NgModule({
  declarations: [
    ListTournoiComponent,
    LandingPageComponent,
    DetailTournoiComponent
  ],
  imports: [
    CommonModule,
    GestionTournoiRoutingModule,
    SharedModule,
    PrimeNgModule,
    HttpClientModule,
    ToastModule,
    MenuModule,
    SlideMenuModule,

  ], exports : [
    ListTournoiComponent
  ], providers : [
    TournoiService,
    MessageService
  ]
})
export class GestionTournoiModule { }
