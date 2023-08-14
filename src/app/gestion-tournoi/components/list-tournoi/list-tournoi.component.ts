import {Component, OnInit} from '@angular/core';

import {PaginatorState} from "primeng/paginator";
import {HttpClient} from "@angular/common/http";
import {TournamentDetailsDTO, TournamentDTO} from "../../models/tournament";
import {Router} from "@angular/router";
import {AuthService} from "../../../shared/services/auth.service";
import {MenuItem, MessageService} from "primeng/api";
import {TournoiService} from "../../services/tournoi.service";
import {tap} from "rxjs";
import {Column} from "../../../shared/models/utilities";

@Component({
  selector: 'app-list-tournoi',
  templateUrl: './list-tournoi.component.html',
  styleUrls: ['./list-tournoi.component.scss']
})

export class ListTournoiComponent implements OnInit {

  $tournois!: TournamentDTO[];

  // actualPlayers: number[] = []

  total: number = 0;
  cols!: Column[];

  filter: boolean = false;

  admin: boolean = false;

  constructor(private _tournoiService: TournoiService,
              private _authService: AuthService,
              private messageService: MessageService) {

    let temp = localStorage.getItem('userConnected');

    if (temp) {
      this._authService.$isAdmin().subscribe(admin => {
        this.admin = admin === 'Admin';
      });
    }
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

    // this._tournoiService.getAllTournoiPlayers().subscribe({
    //   next: (value : number ) => {
    //     if(value && this.actualPlayers){
    //       this.actualPlayers.push(value);
    //     }
    //   },
    //   error : err => console.log(err)
    //   }
    // )
    //   console.log(this.actualPlayers)

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

  inscriptionTournoi(id: string) {
    this._tournoiService.inscriptionTournoi(id).subscribe()
  }


  // update() {
  //   this.messageService.add({severity: 'success', summary: 'Success', detail: 'Data Updated'});
  // }
  //
  // delete() {
  //   this.messageService.add({severity: 'warn', summary: 'Delete', detail: 'Data Deleted'});
  // }


}
