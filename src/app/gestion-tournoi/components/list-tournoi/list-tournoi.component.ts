import {Component, OnInit} from '@angular/core';

import {PaginatorState} from "primeng/paginator";
import {TournamentDTO} from "../../models/tournament";
import {Router} from "@angular/router";
import {AuthService} from "../../../shared/services/auth.service";
import {MessageService} from "primeng/api";
import {TournoiService} from "../../services/tournoi.service";
import {map} from "rxjs";
import {Column} from "../../../shared/models/utilities";
import {TokenDTO} from "../../../shared/models/user";

@Component({
  selector: 'app-list-tournoi',
  templateUrl: './list-tournoi.component.html',
  styleUrls: ['./list-tournoi.component.scss']
})

export class ListTournoiComponent implements OnInit {

  $tournois!: TournamentDTO[];
  isRegistered!: boolean;

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
      },
      error: error => {
        console.error('Error fetching data:', error);
      }
    });

    this._tournoiService.$registered.subscribe((value) => {
      this.isRegistered = value
    })

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

  getStatus(result: string): string {
    switch (result) {
      case 'WaitingForPlayers' :
        return 'En attente de joueurs'
      case 'InProgress' :
        return 'En cours'
      case 'Closed' :
        return 'Clos'
      default :
        return 'Error'
    }
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
    console.log('register tournoi id: ', id);

    this._tournoiService.registerTournament(id).subscribe({
      next: (result) => {
        this._tournoiService.$registered = result.registered;
        this.ngOnInit()
      },
      error: (err) => console.log(err)
    });

  }

  unregister(id: string) {
    console.log('unregister tournoi id: ', id);

    this._tournoiService.unregisterTournament(id).subscribe({
      next: (result) => {
        this._tournoiService.$registered = result.registered;
        this.ngOnInit()
      },
      error: (err) => console.log(err)
    });
  }

  startTournament(id: string) {
    const temp = this._tournoiService.getOne(id).pipe(map((t) => t.canStart)).subscribe()
    if (temp) {
      this._tournoiService.startTournoi(id).subscribe();
      this.ngOnInit()
    }
    console.log('start tournoi')
  }

  nextRound(id :  string) {
    const temp = this._tournoiService.getOne(id).pipe(map(t => t.status === 'InProgress' && t.canValidateRound)).subscribe()
    if(temp){
      this._tournoiService.nextRound(id).subscribe();
      this.ngOnInit()
    }
  }
}
