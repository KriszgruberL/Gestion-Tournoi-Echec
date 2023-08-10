import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {delay, interval, Observable} from "rxjs";
import {TournamentDetailsDTO, TournamentDTO, TournamentIndexDTO} from "../models/tournament";

@Injectable()
export class TournoiService {

  private _urlTournament = 'https://khun.somee.com/api/Tournament'

  constructor(private _http : HttpClient) { }

  getAllTournoi() : Observable<TournamentIndexDTO> {
    return this._http.get<TournamentIndexDTO>(`${this._urlTournament}`)
  }

  getOne(tournoiId: string) : Observable<TournamentDetailsDTO> {
    return this._http.get<TournamentDetailsDTO>(`${this._urlTournament}/${tournoiId}`)
  }

  addTournoi(){

  }

  deleteTournoi() {

  }

}
