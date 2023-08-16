import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, delay, forkJoin, interval, map, Observable, of, switchMap, tap} from "rxjs";
import {TournamentDetailsDTO, TournamentDTO, TournamentIndexDTO} from "../models/tournament";
import {TournamentAddDTO} from "../models/tournament-add";
import {Match} from "../models/match";
import {AuthService} from "../../shared/services/auth.service";
import {TokenDTO, UserDTO} from "../../shared/models/user";

@Injectable()
export class TournoiService {

  private _urlTournament = 'https://khun.somee.com/api/Tournament'
  private _urlTournamentInscription = 'https://khun.somee.com/api/TournamentInscription'
  private _$registered: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  constructor(private _http: HttpClient,
              private _authService: AuthService) {
  }

  getAllTournoi(): Observable<TournamentIndexDTO> {
    return this._http.get<TournamentIndexDTO>(`${this._urlTournament}`).pipe(
      switchMap((data) => {
        if (this._authService.connectedUser) {
          const connectedUserId = this._authService.connectedUser.user.id;
          const tournamentRequests = data.results.map((tournament) =>
            this.getOne(tournament.id).pipe(
              map((tournamentDetails) => {
                tournament.isRegistered = tournamentDetails.players?.some((player) => player.id === connectedUserId) ?? false;
                return tournament;
              })
            )
          );

          return forkJoin(tournamentRequests).pipe(
            map((updatedTournaments) => {
              data.results = updatedTournaments;
              return data;
            })
          );
        } else {
          return of(data);
        }
      })
    );
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

  get $registered(): Observable<boolean> {
    return this._$registered.asObservable()
  }

  set $registered(value: boolean) {
    this._$registered.next(value)
  }

  registerTournament(tournoiId: string): Observable<{ registered: boolean, players: UserDTO[] }> {
    return this._http.post<boolean>(`${this._urlTournamentInscription}/${tournoiId}`, tournoiId).pipe(
      switchMap((result) => {
        this.$registered = result;
        return this.updatePlayerList(tournoiId).pipe(
          map((players) => ({ registered: result, players: players }))
        );
      })
    );
  }

  unregisterTournament(tournoiId: string) : Observable<{ registered: boolean, players: UserDTO[] }> {
    return this._http.delete<boolean>(`${this._urlTournamentInscription}/${tournoiId}`).pipe(
      switchMap((result) => {
        this.$registered = result;
        return this.updatePlayerList(tournoiId).pipe(
          map((players) => ({ registered: result, players: players }))
        );
      })
    );
  }

  updatePlayerList(tournoiId: string)  : Observable<UserDTO[]>{
    return this.getOne(tournoiId).pipe(
      map((tournamentDetails) => {
        if (tournamentDetails && tournamentDetails.players) {
          if (this._authService.connectedUser) {
            tournamentDetails.players.push(this._authService.connectedUser.user);
          }
          return tournamentDetails.players;
        }
        return [];
      }),
      // ...
    );
  }

  addTournoi(addForm: TournamentAddDTO): Observable<TournamentAddDTO> {
    return this._http.post<TournamentAddDTO>(`${this._urlTournament}`, addForm).pipe(
      tap(() => (`TournoiService : ${console.log(addForm.name)})`))
    )
  }

  deleteTournoi(tournoiId: string) {
    return this._http.delete(`${this._urlTournament}/${tournoiId}`)
  }

  startTournoi(tournoiId: string) {
    return this._http.patch(`${(this._urlTournament)}/${tournoiId}/start`, tournoiId)
  }
}

