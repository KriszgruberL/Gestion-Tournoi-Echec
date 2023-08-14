import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ListTournoiComponent} from "./components/list-tournoi/list-tournoi.component";
import {LandingPageComponent} from "./landing-page/landing-page.component";
import {listResolver} from "./resolvers/list.resolver";
import {AddTournamentComponent} from "./components/add-tournament/add-tournament.component";
import {MatchTournoiComponent} from "./components/match-tournoi/match-tournoi.component";
import {EditTournoiComponent} from "./components/edit-tournoi/edit-tournoi.component";
import {AddMemberComponent} from "./members/add-member/add-member.component";


const routes: Routes = [
  { path: 'list-tournoi', component: ListTournoiComponent , resolve : { lists : listResolver}},
  { path: 'edit-tournoi/:id', component: EditTournoiComponent },
  { path: 'match-tournoi/:id', component: MatchTournoiComponent },
  { path: 'add-tournoi', component: AddTournamentComponent },
  { path: 'members/add-member', component: AddMemberComponent },
  { path: 'landing-page', component: LandingPageComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionTournoiRoutingModule { }
