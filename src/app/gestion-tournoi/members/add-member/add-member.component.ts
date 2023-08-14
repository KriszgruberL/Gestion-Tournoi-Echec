import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserGender} from "../../../shared/models/user";
import {tap} from "rxjs";
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

  gender! : Category[];
  addMemberForm!: FormGroup;

  constructor(private _memberService : MembersService,
              private _router : Router,
              private _fb : FormBuilder) {
  }

  ngOnInit() {

    this.addMemberForm = this._fb.group({
      username: [null, [Validators.required]],
      email: [null, [Validators.required] ],
      elo: [null, ],
      birthDate: [null, [Validators.required]],
      gender: [null, [Validators.required]]
    }, {
      validators : [
      ],
      updateOn: 'blur',
    });

    this.gender = [
      { name: UserGender.Female },
      { name: UserGender.Male },
      { name: UserGender.Other },
    ];
  }



  onSubmit() {
    const formValue = {
      ...this.addMemberForm.value,
      gender: this.addMemberForm.value.gender.name
    }

    console.log("Onsubmit AddMember ", formValue)
    this._memberService.addMember(formValue).pipe(
      tap(() => this._router.navigateByUrl('/'))
    ).subscribe()
  }
}
