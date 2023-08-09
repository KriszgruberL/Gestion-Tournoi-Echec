import {TournamentIndexDTO} from "../models/tournament";
import {Observable} from "rxjs";
import {inject} from "@angular/core";
import {TournoiService} from "../services/tournoi.service";
import {ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";

export const listResolver: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => Observable<TournamentIndexDTO> = (route, state)  => {
  const tournoiService = inject(TournoiService);

  return tournoiService.getAllTournoi();
};
