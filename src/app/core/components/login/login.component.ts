import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../shared/services/auth.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  loginForm: FormGroup;

  constructor(private _authService: AuthService,
              private _router: Router,
              private _fb: FormBuilder) {

    this.loginForm = this._fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    })
  }

  ngOnInit(): void {

  }

  onLogin(): void {
    if (this.loginForm.valid) {
      this._authService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(
        (response) => {
          console.log(`auth réussie :`, response)
          this._router.navigateByUrl('/home')
        },
        (error) => { console.error('Erreur d\'authentification :', error);}
      );
    } else {
      this.loginForm.markAllAsTouched();
    }
  }


}
