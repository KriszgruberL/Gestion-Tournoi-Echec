import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MembersService} from "../../services/members.service";
import {Router} from "@angular/router";
import {tap} from "rxjs";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit{
  modifyPasswordForm!: FormGroup

  constructor(private _memberService: MembersService,
              private _router: Router,
              private _fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.modifyPasswordForm = this._fb.group({
        oldPassword: [null, [Validators.required]],
        password: [null, [Validators.required]]
      }
    )

  }

  onSubmit() {
    if (this.modifyPasswordForm.valid) {
      const formValue = {...this.modifyPasswordForm.value}
      console.log("Onsubmit change pwd ", formValue)

      this._memberService.changePassword(formValue).pipe(
        tap(() => this._router.navigateByUrl('/profil'))
      ).subscribe()
    }
  }
}
