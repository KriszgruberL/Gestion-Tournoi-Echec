import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListTournoiComponent } from './list-tournoi/list-tournoi.component';
import {SharedModule} from "../shared/shared.module";
import {PrimeNgModule} from "../shared/prime-ng.module";
import {GestionTournoiRoutingModule} from "./gestion-tournoi-routing.module";
import {CarouselModule} from "primeng/carousel";
import { LandingPageComponent } from './landing-page/landing-page.component';



@NgModule({
  declarations: [
    ListTournoiComponent,
    LandingPageComponent
  ],
  imports: [
    CommonModule,
    GestionTournoiRoutingModule,
    SharedModule,
    PrimeNgModule,
    CarouselModule,
  ], exports : [
    ListTournoiComponent
  ]
})
export class GestionTournoiModule { }
