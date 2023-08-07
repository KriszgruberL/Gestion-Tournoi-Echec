import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListTournoiComponent } from './list-tournoi/list-tournoi.component';
import {SharedModule} from "../shared/shared.module";
import {PrimeNgModule} from "../shared/prime-ng.module";
import {GestionTournoiRoutingModule} from "./gestion-tournoi-routing.module";
import {CarouselModule} from "primeng/carousel";
import { LandingPageComponent } from './landing-page/landing-page.component';
import {PaginatorModule} from "primeng/paginator";
import {TableModule} from "primeng/table";
import {TournoiService} from "./services/tournoi.service";
import { DetailTournoiComponent } from './detail-tournoi/detail-tournoi.component';
import {FieldsetModule} from "primeng/fieldset";
import {DividerModule} from "primeng/divider";



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

  ], exports : [
    ListTournoiComponent
  ], providers : [
    TournoiService,
  ]
})
export class GestionTournoiModule { }
