import {Component, OnInit} from '@angular/core';

import {PaginatorState} from "primeng/paginator";
import {HttpClient} from "@angular/common/http";
import {TournamentDTO} from "../../models/tournament";
import {Router} from "@angular/router";
import {AuthService} from "../../../shared/services/auth.service";
import {MenuItem, MessageService} from "primeng/api";
import {TournoiService} from "../../services/tournoi.service";
import {tap} from "rxjs";


interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-list-tournoi',
  templateUrl: './list-tournoi.component.html',
  styleUrls: ['./list-tournoi.component.scss']
})

export class ListTournoiComponent implements OnInit {

  $tournois!: TournamentDTO[];
  total: number = 0;
  cols!: Column[];
  filter: boolean = false;
  admin: boolean = false;

  constructor(private _tournoiService: TournoiService,
              private _http: HttpClient,
              private _router: Router,
              private _authService: AuthService,
              private messageService: MessageService) {

    let temp = localStorage.getItem('userConnected');

    if (temp) {
      this._authService.$isAdmin().pipe(
        tap(() => this.admin = true)
      ).subscribe();
    }
  }

  ngOnInit() {
    this._tournoiService.getAllTournoi().subscribe(
      (data) => {
        this.$tournois = data.results;
        this.total = data.total;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
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
      () => {this.$tournois = this.$tournois.filter((t) => t.id !== id);
      }
    )
  }


  // update() {
  //   this.messageService.add({severity: 'success', summary: 'Success', detail: 'Data Updated'});
  // }
  //
  // delete() {
  //   this.messageService.add({severity: 'warn', summary: 'Delete', detail: 'Data Deleted'});
  // }


}
