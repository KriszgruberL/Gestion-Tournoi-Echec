import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./core/components/home/home.component";
import {LoginComponent} from "./core/components/login/login.component";

const routes: Routes = [
  { path: 'gestion-tournoi', loadChildren: () => import('./gestion-tournoi/gestion-tournoi.module').then(m => m.GestionTournoiModule) },
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
