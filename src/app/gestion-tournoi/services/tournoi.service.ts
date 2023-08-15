import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, delay, interval, map, Observable, of, tap} from "rxjs";
import {TournamentDetailsDTO, TournamentDTO, TournamentIndexDTO} from "../models/tournament";
import {TournamentAddDTO} from "../models/tournament-add";
import {Match} from "../models/match";
import {AuthService} from "../../shared/services/auth.service";
import {TokenDTO} from "../../shared/models/user";

@Injectable()
export class TournoiService {

  private _urlTournament = 'https://khun.somee.com/api/Tournament'
  private _urlTournamentInscription = 'https://khun.somee.com/api/TournamentInscription'

  private _tournamentIsRegisteredMap: { [key: string]: boolean } = {};

  constructor(private _http: HttpClient,
              private _authService: AuthService) {
  }

  getAllTournoi(): Observable<TournamentIndexDTO> {
    return this._http.get<TournamentIndexDTO>(`${this._urlTournament}`)
  }


  getOne(tournoiId: string): Observable<TournamentDetailsDTO> {
    return this._http.get<TournamentDetailsDTO>(`${this._urlTournament}/${tournoiId}`)
  }

  getMatch(tournoiId: string): Observable<Match[]> | undefined {
    return this.getOne(tournoiId).pipe(
      map(t => t?.matches || []),
      catchError(() => of([]))
    )
  }

  getRound(round: number, id: string): Observable<Match[]> | undefined {
    return this.getMatch(id)?.pipe(
      map(matches => (matches ? matches.filter(match => match.round === round) : [])),
      catchError(() => of([]))
    );
  }

  isRegistered(tournoiId: string): Observable<boolean> {
    if (this._tournamentIsRegisteredMap[tournoiId] !== undefined) {
      return of(this._tournamentIsRegisteredMap[tournoiId]);
    }

    return this.getOne(tournoiId).pipe(
      map((t) => t.isRegistered || false),
      catchError(() => of(false)),
      tap((isRegistered) => (this._tournamentIsRegisteredMap[tournoiId] = isRegistered))
    );
  }

  // Setter for isRegistered property
  setIsRegistered(tournoiId: string, isRegistered: boolean): void {
    this._tournamentIsRegisteredMap[tournoiId] = isRegistered;
  }

  addTournoi(addForm: TournamentAddDTO): Observable<TournamentAddDTO> {
    return this._http.post<TournamentAddDTO>(`${this._urlTournament}`, addForm).pipe(
      tap(() => (`TournoiService : ${console.log(addForm.name)})`))
    )
  }

  deleteTournoi(tournoiId: string) {
    return this._http.delete(`${this._urlTournament}/${tournoiId}`)
  }

  getActualPlayers(tournoiId: string) {
    return this._http.get<TournamentDetailsDTO>(`${this._urlTournament}/${tournoiId}`).pipe(
      map((t) => t.players?.length)
    )
  }

  addPlayers(tournoiId: string) {
    return this._http.get<TournamentDetailsDTO>(`${this._urlTournament}/${tournoiId}`).pipe(
      map((t) => t.players?.length),
      map((t) => typeof t === 'number' ? t++ : undefined)
    )
  }

  inscriptionTournoi(tournoiId: string, user: TokenDTO) {
    return this._http.post(`${this._urlTournamentInscription}/${tournoiId}`, user.user.id).pipe(
      tap (() => this.setIsRegistered(tournoiId, true))
    )

  }

  desinscriptionTournoi(tournoiId: string) {
    return this._http.delete(`${this._urlTournamentInscription}/${tournoiId}`).pipe(
      tap(() => {
        this.setIsRegistered(tournoiId, false);
      }))
  }

  startTournoi(tournoiId : string){
    return this._http.patch(`${(this._urlTournament)}/${tournoiId}/start`, tournoiId)
  }

}
