import {Component, OnInit} from '@angular/core';
import {TournamentCategory, TournamentDetailsDTO} from "../../models/tournament";
import {TournoiService} from "../../services/tournoi.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, tap} from "rxjs";

interface Category {
  name: string,
}

@Component({
  selector: 'app-detail-tournoi',
  templateUrl: './detail-tournoi.component.html',
  styleUrls: ['./detail-tournoi.component.scss']
})
export class DetailTournoiComponent implements OnInit{

  tournoiId : string;
  $tournoi!: Observable<TournamentDetailsDTO>;
  categories! : Category[];

  constructor(private _tournoiService : TournoiService,
              private _activeRoute : ActivatedRoute,) {
    this.tournoiId = this._activeRoute.snapshot.params['id']

    this.categories = [{name: TournamentCategory.Junior}, {name : TournamentCategory.Senior}, {name : TournamentCategory.Veteran} ]

  }

  ngOnInit(): void {
    this.$tournoi = this._tournoiService.getOne(this.tournoiId);
  }

}
