import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {TournoiService} from "../../services/tournoi.service";
import {tap} from "rxjs";
import {TournamentCategory} from "../../models/tournament";
import {MessageService} from "primeng/api";
import {checkNumber} from "../../validators/checkNumber";
import {Category} from "../../../shared/models/utilities";

@Component({
  selector: 'app-add-tournament',
  templateUrl: './add-tournament.component.html',
  styleUrls: ['./add-tournament.component.scss']
})

export class AddTournamentComponent implements OnInit {

  addForm!: FormGroup;
  categories! : Category[];

  minDate!: Date;
  delayAdd : number = 5;


  constructor(private _fb: FormBuilder,
              private _router: Router,
              private _tournoiService: TournoiService,
              private _msgService : MessageService) {
  }

  ngOnInit(): void {
    this.addForm = this._fb.group({
      name: [null, [Validators.required]],
      location: [null, ],
      minPlayers: [null, [Validators.required, Validators.min(2), Validators.max(16)]],
      maxPlayers: [null, [Validators.required,Validators.min(2), Validators.max(16) ]],
      eloMin: [null,],
      eloMax: [null, ],
      categories: [[], [Validators.required]],
      womenOnly: [false, ],
      endOfRegistrationDate: [null, [Validators.required]]
    }, {
      validators : [
        checkNumber('minPlayers', 'maxPlayers'),
        checkNumber('eloMin', 'eloMax')
      ],
      updateOn: 'blur',
    });

    this.categories = [{name: TournamentCategory.Junior}, {name : TournamentCategory.Senior}, {name : TournamentCategory.Veteran} ]

    this.minimalDate()

  }

  onSubmit() {
    const formValue = {
      ...this.addForm.value,
      categories: this.addForm.value.categories.map((obj:any) => obj.name)
    }

    console.log("Onsubmit ", formValue)
    this._tournoiService.addTournoi(formValue).pipe(
      tap(() => this._router.navigateByUrl('gestion-tournoi/list-tournoi'))
    ).subscribe()

  }

  minimalDate() {
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate() + this.delayAdd)
  }



}
