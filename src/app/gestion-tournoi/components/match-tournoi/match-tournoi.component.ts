
import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {TournoiService} from "../../services/tournoi.service";
import {ActivatedRoute} from "@angular/router";
import {map, Observable} from "rxjs";
import {Match} from "../../models/match";


interface Column {
  field: string;
  header: string;
}

interface RandomSet {
  totalPlayed: number;
  victoryCount: number;
  defeatCount: number;
  drawCount: number;
}

@Component({
  selector: 'app-match-tournoi',
  templateUrl: './match-tournoi.component.html',
  styleUrls: ['./match-tournoi.component.scss']
})
export class MatchTournoiComponent implements OnInit {

  items: MenuItem[] | undefined;
  activeIndex: number = 0;
  cols!: Column[];

  tournoiId!: string;
  $match!: Observable<Match[]> | undefined
  $round!: Observable<Match[]> | undefined

  randomNumber! : RandomSet[];

  constructor(private _tournoiService: TournoiService,
              private _activeRoute: ActivatedRoute) {
    this.tournoiId = this._activeRoute.snapshot.params['id']
  }

  ngOnInit() {

    this.$match = this._tournoiService.getMatch(this.tournoiId)
    this.$round = this._tournoiService.getRound(this.activeIndex + 1, this.tournoiId);

    this.randomNumber = this.generateSets(2)

    this.items = [
      {label: ' Tour 1 '},
      {label: ' Tour 2 '},
    ];

    this.cols = [
      {field: 'position', header: 'Position'},
      {field: 'name', header: 'Nom'},
      {field: 'played', header: 'Jouer'},
      {field: 'victory', header: 'Victoire'},
      {field: 'defeat', header: 'Défaite'},
      {field: 'draw', header: 'Nul'},
      {field: 'score', header: 'Score'},
    ];
  }

  getResults(result: string): string {
    switch (result) {
      case 'WhiteWin' :
        return 'Victoire des blancs'
      case 'BlackWin' :
        return 'Victoire des noirs'
      case 'NotPlayed' :
        return 'Non joué'
      case 'Draw' :
        return 'Match nul'
      default :
        return 'Error'
    }
  }

  randomizer(multiplicator = 9): number {
    return Math.floor(Math.random() * multiplicator)
  }

  generateRandomValues(): RandomSet {
    const totalPlayed = this.randomizer();
    const victoryCount = this.randomizer(totalPlayed);
    const defeatCount = this.randomizer(totalPlayed - victoryCount);
    const drawCount = totalPlayed - victoryCount - defeatCount;

    return {
      totalPlayed: totalPlayed,
      victoryCount: victoryCount,
      defeatCount: defeatCount,
      drawCount: drawCount
    };
  }

  generateSets(n: number) : RandomSet[]{
    const tableau: RandomSet[] = []
    for (let i = 0; i < n; i++) {
      const set = this.generateRandomValues();
      tableau.push(set)
    }
    return tableau;
  }


  onActiveIndexChange(event: number) {
    this.activeIndex = event;
    this.$round = this._tournoiService.getRound(this.activeIndex + 1, this.tournoiId)
  }

}
