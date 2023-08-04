import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CoreModule} from "./core/core.module";
import {HomeComponent} from "./core/components/home/home.component";
import {ListTournoiComponent} from "./gestion-tournoi/list-tournoi/list-tournoi.component";

const routes: Routes = [
  { path : '', component : HomeComponent},
  { path : 'tournoi-list', component : ListTournoiComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
