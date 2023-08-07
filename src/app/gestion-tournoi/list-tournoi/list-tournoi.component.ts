import {Component, OnInit} from '@angular/core';
import {TournoiService} from "../services/tournoi.service";
import {PaginatorState} from "primeng/paginator";
import {HttpClient} from "@angular/common/http";
import {TournamentDTO, TournamentIndexDTO} from "../models/tournament";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}
interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-list-tournoi',
  templateUrl: './list-tournoi.component.html',
  styleUrls: ['./list-tournoi.component.scss']
})
export class ListTournoiComponent implements OnInit{

  $tournois! : TournamentDTO[];
  total: number = 0;
  cols!: Column[];

  constructor(private _tournoiService : TournoiService,
              private _http : HttpClient,
              private _router : Router) {
  }

  ngOnInit() {
  this._tournoiService.getAllTournoi().subscribe(
      (data) => {
        this.$tournois = data.results;
        this.total = data.total;
        console.log("Received data:", this.$tournois);
      },
    (error) => {
        console.error('Error fetching data:', error);
    }
    );


    // * Dynamic columns --------------------------------------------
    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'location', header: 'Location' },
      { field: 'elo', header: 'Elo' },
      { field: 'category', header: 'Category' },
      { field: 'inventoryStatus', header: 'Status' },
      { field: 'registerEnd', header: 'Fin des inscriptions' },
      { field: 'women', header: 'Women Only' },
      { field: 'player', header: 'Joueurs' },
      { field: '', header: '' },
    ];
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

}
