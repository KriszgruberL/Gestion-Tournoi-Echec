import {Component, OnInit} from '@angular/core';
import {TournamentDetailsDTO} from "../../models/tournament";
import {TournoiService} from "../../services/tournoi.service";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-detail-tournoi',
  templateUrl: './detail-tournoi.component.html',
  styleUrls: ['./detail-tournoi.component.scss']
})
export class DetailTournoiComponent implements OnInit{

  tournoiId : string;
  $tournoi!: Observable<TournamentDetailsDTO>;

  constructor(private _tournoiService : TournoiService,
              private _activeRoute : ActivatedRoute) {
    this.tournoiId = this._activeRoute.snapshot.params['id']
  }

  ngOnInit(): void {
    this.$tournoi = this._tournoiService.getOne(this.tournoiId);
  }



}
