import {Component, OnInit} from '@angular/core';
import {Observable, tap} from "rxjs";
import {TournamentCategory, TournamentDetailsDTO} from "../../models/tournament";
import {TournoiService} from "../../services/tournoi.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {checkNumber} from "../../validators/checkNumber";
import {Category} from "../../../shared/models/utilities";


@Component({
  selector: 'app-edit-tournoi',
  templateUrl: './edit-tournoi.component.html',
  styleUrls: ['./edit-tournoi.component.scss']
})
export class EditTournoiComponent implements OnInit {

  tournoiId: string;
  tournoiDetail!: TournamentDetailsDTO;

  categories!: Category[];
  editForm!: FormGroup;

  minDate!: Date;
  delayAdd: number = 5;

  constructor(private _tournoiService: TournoiService,
              private _activeRoute: ActivatedRoute,
              private _router: Router,
              private _fb: FormBuilder) {
    this.tournoiId = this._activeRoute.snapshot.params['id']

    this.categories = [{name: TournamentCategory.Junior}, {name: TournamentCategory.Senior}, {name: TournamentCategory.Veteran}]
  }

  ngOnInit(): void {
    this.editForm = this._fb.group({
      name: [null, [Validators.required]],
      location: [null,],
      minPlayers: [null, [Validators.required, Validators.min(2), Validators.max(16)]],
      maxPlayers: [null, [Validators.required, Validators.min(2), Validators.max(16)]],
      eloMin: [null,],
      eloMax: [null,],
      categories: [[], [Validators.required]],
      womenOnly: [false,],
      endOfRegistrationDate: [null, [Validators.required]]
    }, {
      validators: [
        checkNumber('minPlayers', 'maxPlayers'),
        checkNumber('eloMin', 'eloMax')
      ],
      updateOn: 'blur',
    });

    this.minimalDate()

    this._tournoiService.getOne(this.tournoiId).subscribe(
      {
        next: (data: TournamentDetailsDTO) => {
          this.tournoiDetail = data;

          this.editForm.patchValue({
            name: data.name,
            location: data.location,
            minPlayers: data.minPlayers,
            maxPlayers: data.maxPlayers,
            eloMin: data.eloMin,
            eloMax: data.eloMax,
            categories: data.categories?.map((categoryName: string) => {
              return this.categories.find((category: Category) => category.name === categoryName)
            }),
            womenOnly: data.womenOnly,
            endOfRegistrationDate: data.endOfRegistrationDate
          })
        },
        error: (error) => console.error("Error Fetching the data", error)
      }
    );
  }

  minimalDate() {
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate() + this.delayAdd)
  }


  onEdit() {
    const formValue = {
      ...this.editForm.value,
      categories: this.editForm.value.categories.map((obj: any) => obj.name)
    }

    console.log("Onsubmit ", formValue)

    this._tournoiService.addTournoi(formValue).pipe(
      tap(this._tournoiService.deleteTournoi(this.tournoiId)),
      tap(() => this._router.navigateByUrl('gestion-tournoi/list-tournoi'))
    ).subscribe()
  }
}
