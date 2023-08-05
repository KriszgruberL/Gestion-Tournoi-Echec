import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ListTournoiComponent} from "./list-tournoi/list-tournoi.component";
import {LandingPageComponent} from "./landing-page/landing-page.component";


const routes: Routes = [
  { path: 'list-tournoi', component: ListTournoiComponent },
  { path: 'landing-page', component: LandingPageComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionTournoiRoutingModule { }
