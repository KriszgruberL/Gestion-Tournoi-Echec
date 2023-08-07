import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../shared/services/auth.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  isLogged = false;

  constructor(private _authService : AuthService) {
  }

  ngOnInit(): void {
    this._authService.$isLogged.subscribe(isLogged => {
      this.isLogged = isLogged
    } )
  }

  onLogout() {
    this._authService.logout();
    this.isLogged = false;
  }

}
