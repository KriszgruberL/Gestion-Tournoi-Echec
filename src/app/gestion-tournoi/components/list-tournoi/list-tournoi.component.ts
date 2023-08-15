import {Component, OnInit} from '@angular/core';

import {PaginatorState} from "primeng/paginator";
import {HttpClient} from "@angular/common/http";
import {TournamentDetailsDTO, TournamentDTO, TournamentIndexDTO} from "../../models/tournament";
import {Router} from "@angular/router";
import {AuthService} from "../../../shared/services/auth.service";
import {MenuItem, MessageService} from "primeng/api";
import {TournoiService} from "../../services/tournoi.service";
import {map, tap} from "rxjs";
import {Column} from "../../../shared/models/utilities";
import {TokenDTO} from "../../../shared/models/user";

@Component({
  selector: 'app-list-tournoi',
  templateUrl: './list-tournoi.component.html',
  styleUrls: ['./list-tournoi.component.scss']
})

export class ListTournoiComponent implements OnInit {

  $tournois!: TournamentDTO[];
  actualPlayers: { [tournoiId: string]: number } = {};
  isRegistered: { [tournoiId: string]: boolean } = {}

  total: number = 0;
  cols!: Column[];

  filter: boolean = false;

  admin: boolean = false;
  user!: TokenDTO;

  constructor(private _tournoiService: TournoiService,
              private _authService: AuthService,
              private messageService: MessageService,
              private _router: Router) {

    this.admin = localStorage.getItem('role') === 'Admin';
  }

  ngOnInit() {

    this._tournoiService.getAllTournoi().subscribe({
      next: (data) => {
        this.$tournois = data.results;
        this.total = data.total;

        if (data.results.length > 0) {
          for (const tournoi of this.$tournois) {
            this._tournoiService.isRegistered(tournoi.id).subscribe((isRegistered) => {
              this.isRegistered[tournoi.id] = isRegistered;
            })

            this._tournoiService.getActualPlayers(tournoi.id).subscribe({
              next: (playerCount: number | undefined) => {
                if (playerCount != null) {
                  this.actualPlayers[tournoi.id] = playerCount;
                  if (playerCount < tournoi.maxPlayers) {
                    tournoi.canRegister = true;
                  }
                }
                ;
              }, error: err => console.log("getActualPlayers(tournoi.id) : ", err)
            })
          }
        }

      },
      error: error => {
        console.error('Error fetching data:', error);
      }
    });

    console.log("admin : ", this.admin)

    if (this._authService.connectedUser) {
      this.user = this._authService.connectedUser
    }

    // * Dynamic columns --------------------------------------------
    this.cols = [
      {field: 'name', header: 'Nom'},
      {field: 'location', header: 'Lieu'},
      {field: 'elo', header: 'Elo'},
      {field: 'category', header: 'Catégorie'},
      {field: 'inventoryStatus', header: 'Status'},
      {field: 'registerEnd', header: 'Date limite'},
      {field: 'women', header: 'Féminin'},
      {field: 'player', header: 'Joueurs'},
      {field: '', header: ''},
    ];
  }

  toggleFilter() {
    this.filter = !this.filter;
  }


  // * Paginator --------------------------------------------
  first: number = 0;
  rows: number = 10;

  onPageChange(event: PaginatorState) {
    // @ts-ignore
    this.first = event.first;
    // @ts-ignore
    this.rows = event.rows;
  }

  deleteTournoi(id: string) {
    this._tournoiService.deleteTournoi(id).subscribe(
      () => {
        this.$tournois = this.$tournois.filter((t) => t.id !== id);
      }
    )
  }

  register(id: string) {
    console.log('tournoi id: ', id);

    this._tournoiService.isRegistered(id).subscribe({
      next: (isRegistered) => {
        if (!isRegistered) {
          this.inscriptionForTournament(id);
        } else {
          this.desinscriptionForTournament(id);
        }
      }
    });
  }

  inscriptionForTournament(id: string) {
    this.actualPlayers[id]++;
    this._tournoiService.inscriptionTournoi(id, this.user).subscribe(() => {
      this._tournoiService.isRegistered(id).subscribe((test) => {
        this._tournoiService.setIsRegistered(id, test);
      });
    });
  }

  desinscriptionForTournament(id: string) {
    this.actualPlayers[id]--;
    this._tournoiService.desinscriptionTournoi(id).subscribe(() => {
      this._tournoiService.isRegistered(id).subscribe((test) => {
        this._tournoiService.setIsRegistered(id, test);
      });
    });
  }


  startTournament(id: string) {
    if (this._tournoiService.getOne(id).pipe(
      map((t) => t.canStart)
    ).subscribe()) {
      this._tournoiService.startTournoi(id).subscribe();
    }
    console.log('start tournopi')

  }
}
