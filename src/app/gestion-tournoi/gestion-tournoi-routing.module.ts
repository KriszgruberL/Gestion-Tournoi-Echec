import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ListTournoiComponent} from "./list-tournoi/list-tournoi.component";
import {LandingPageComponent} from "./landing-page/landing-page.component";
import {DetailTournoiComponent} from "./detail-tournoi/detail-tournoi.component";
import {listResolver} from "./resolvers/list.resolver";


const routes: Routes = [
  { path: 'list-tournoi', component: ListTournoiComponent , resolve : { lists : listResolver}},
  { path: 'detail-tournoi/:id', component: DetailTournoiComponent },
  { path: 'landing-page', component: LandingPageComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionTournoiRoutingModule { }
