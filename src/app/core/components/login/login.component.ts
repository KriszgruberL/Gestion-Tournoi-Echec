import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../shared/services/auth.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HeaderComponent} from "../header/header.component";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private _authService: AuthService,
              private _router: Router,
              private _fb: FormBuilder) {

    this.loginForm = this._fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    })
  }


  onLogin(): void {
    if (this.loginForm.valid) {
      this._authService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe({
        next: (response) => {
          console.log('Authentification réussie');
          this._authService.connectedUser = response;

          this._authService.$isLogged = true;
          localStorage.setItem('role', this._authService.connectedUser?.user.role || '')
          this._router.navigateByUrl('/home');
        },
        error: (err) => {
          console.error('Erreur d\'authentification :', err);
          this.errorMessage = 'Échec de l\'authentification. Vérifiez vos informations.'
        },
        complete: () => {

        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
