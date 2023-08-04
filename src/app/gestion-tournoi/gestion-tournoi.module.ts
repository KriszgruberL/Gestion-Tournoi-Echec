import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListTournoiComponent } from './list-tournoi/list-tournoi.component';



@NgModule({
  declarations: [
    ListTournoiComponent
  ],
  imports: [
    CommonModule
  ], exports : [
    ListTournoiComponent
  ]
})
export class GestionTournoiModule { }
