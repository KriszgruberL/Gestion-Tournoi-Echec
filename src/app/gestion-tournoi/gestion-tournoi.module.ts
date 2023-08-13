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
import {MessageService} from "primeng/api";
import {AddTournamentComponent} from './components/add-tournament/add-tournament.component';
import {MatchTournoiComponent} from './components/match-tournoi/match-tournoi.component';
import {EditTournoiComponent} from './components/edit-tournoi/edit-tournoi.component';
import {InputSwitchModule} from "primeng/inputswitch";


@NgModule({
  declarations: [
    ListTournoiComponent,
    LandingPageComponent,
    DetailTournoiComponent,
    AddTournamentComponent,
    MatchTournoiComponent,
    EditTournoiComponent
  ],
  imports: [
    CommonModule,
    GestionTournoiRoutingModule,
    SharedModule,
    PrimeNgModule,
    HttpClientModule,
    InputSwitchModule,


  ], exports : [
    ListTournoiComponent
  ], providers : [
    TournoiService,
    MessageService
  ]
})
export class GestionTournoiModule { }
