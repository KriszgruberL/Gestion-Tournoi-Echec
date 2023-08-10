import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListTournoiComponent} from './components/list-tournoi/list-tournoi.component';
import {SharedModule} from "../shared/shared.module";
import {PrimeNgModule} from "../shared/prime-ng.module";
import {GestionTournoiRoutingModule} from "./gestion-tournoi-routing.module";
import {LandingPageComponent} from './landing-page/landing-page.component';
import {TournoiService} from "./services/tournoi.service";
import {DetailTournoiComponent} from './components/detail-tournoi/detail-tournoi.component';
import {HttpClientModule} from "@angular/common/http";
import {ToastModule} from "primeng/toast";
import {MenuModule} from "primeng/menu";
import {MessageService} from "primeng/api";
import {SlideMenuModule} from "primeng/slidemenu";
import { AddTournamentComponent } from './components/add-tournament/add-tournament.component';
import {KeyFilterModule} from "primeng/keyfilter";
import {MultiSelectModule} from "primeng/multiselect";
import {CalendarModule} from "primeng/calendar";
import {SelectButtonModule} from "primeng/selectbutton";
import {CheckboxModule} from "primeng/checkbox";


@NgModule({
  declarations: [
    ListTournoiComponent,
    LandingPageComponent,
    DetailTournoiComponent,
    AddTournamentComponent
  ],
  imports: [
    CommonModule,
    GestionTournoiRoutingModule,
    SharedModule,
    PrimeNgModule,
    HttpClientModule,
    MultiSelectModule,
    CalendarModule,
    SelectButtonModule,
    CheckboxModule,

  ], exports : [
    ListTournoiComponent
  ], providers : [
    TournoiService,
    MessageService
  ]
})
export class GestionTournoiModule { }
