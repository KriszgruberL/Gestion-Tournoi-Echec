import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../shared/services/auth.service";
import {tap} from "rxjs";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent{
  isLogged = false;

  constructor(private _authService : AuthService) {
    let temp = localStorage.getItem('userConnected');

    if(temp){
      this._authService.$isLogged.pipe(
        tap(() => this.isLogged = true)
      ).subscribe();
    }
  }


  onLogout() {
    this._authService.logout();
    this.isLogged = false;
  }

}
