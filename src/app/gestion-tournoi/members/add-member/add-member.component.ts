import {Component, OnInit} from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators
} from "@angular/forms";
import {UserDTO, UserGender} from "../../../shared/models/user";
import {catchError, map, Observable, of, tap} from "rxjs";
import {MembersService} from "../../services/members.service";
import {Router} from "@angular/router";
import {checkNumber} from "../../validators/checkNumber";
import {Category} from "../../../shared/models/utilities";

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss']
})
export class AddMemberComponent implements OnInit {

  gender!: Category[];
  addMemberForm!: FormGroup;
  validMail!: boolean
  validName!: boolean

  constructor(private _memberService: MembersService,
              private _router: Router,
              private _fb: FormBuilder) {
  }

  ngOnInit() {

    this.addMemberForm = this._fb.group({
      username: [null, [Validators.required], [isUsername(this._memberService)]],
      email: [null, [Validators.required], [isEmail(this._memberService)]],
      elo: [null,],
      birthDate: [null, [Validators.required]],
      gender: [null, [Validators.required]]
    }, {
      updateOn: 'blur',
    });

    this.gender = [
      {name: UserGender.Female},
      {name: UserGender.Male},
      {name: UserGender.Other},
    ];
  }

  onSubmit() {
    if (this.addMemberForm.valid) {
      const formValue = {
        ...this.addMemberForm.value,
        gender: this.addMemberForm.value.gender.name
      }

      console.log("Onsubmit AddMember ", formValue)
      this._memberService.addMember(formValue).subscribe({
          next: () => {
            this._router.navigateByUrl('/')
          },

        }
      )
    }
  }
}

function isEmail(service: MembersService): AsyncValidatorFn {
  return (control) => {
    return service.existEmail(control.value).pipe(
      tap(console.log),
      map(() => ({emailExists: 'err'})),
      catchError(err => of(null))
    );
  }
}

function isUsername(service: MembersService): AsyncValidatorFn {
  return (control) => {
    return service.existUsername(control.value).pipe(
      tap(console.log),
      map(() => ({usernameExists: 'err'})),
      catchError(err => of(null))
    );
  }
}
