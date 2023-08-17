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
import {UserGender} from "../../../shared/models/user";
import {catchError, map, Observable, of, tap} from "rxjs";
import {MembersService} from "../../services/members.service";
import {Router} from "@angular/router";
import {Category} from "../../../shared/models/utilities";

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss']
})
export class AddMemberComponent implements OnInit {

  gender!: Category[];
  addMemberForm!: FormGroup;

  constructor(private _memberService: MembersService,
              private _router: Router,
              private _fb: FormBuilder) {
  }

  ngOnInit() {

    this.addMemberForm = this._fb.group({
      username:new FormControl(null, [Validators.required],[isUsername(this._memberService)]),
      email: new FormControl(null, [Validators.required], [isEmail(this._memberService)]),
      elo: [null],
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
    console.log(this.addMemberForm)
    if (this.addMemberForm.valid) {
      const formValue = {
        ...this.addMemberForm.value,
        gender: this.addMemberForm.value.gender.name
      }

      this._memberService.addMember(formValue)
        .subscribe(() => this._router.navigateByUrl('/'))
    }
  }
}

function isEmail(service: MembersService): AsyncValidatorFn {
  console.log("please")
  return (control) => {
    console.log(control)
    return service.existEmail(control.value).pipe(
      map(() => null),
      catchError( err => of({emailExists: err}) )
    );
  }
}

function isUsername(service: MembersService): AsyncValidatorFn {
  return (control) => {
    console.log(control)
    return service.existUsername(control.value).pipe(
      map(() => ({usernameExists: 'err'})),
      catchError( err => of(null) )
    );
  }
}
