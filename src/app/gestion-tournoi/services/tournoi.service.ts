import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {delay, interval, Observable, tap} from "rxjs";
import {TournamentDetailsDTO, TournamentDTO, TournamentIndexDTO} from "../models/tournament";
import {TournamentAddDTO} from "../models/tournament-add";

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

  addTournoi(addForm : TournamentAddDTO) : Observable<TournamentAddDTO>{
    return this._http.post<TournamentAddDTO>(`${this._urlTournament}`, addForm).pipe(
      tap( () => (`TournoiService : ${console.log(addForm.name)})`))
    )
  }

  deleteTournoi(tournoiId : string) {
    return this._http.delete(`${this._urlTournament}/${tournoiId}`)

  }

}
