import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../shared/services/auth.service";
import {tap} from "rxjs";
import {MegaMenuItem} from "primeng/api";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  isLogged = false;
  items: MegaMenuItem[] | undefined;

  constructor(private _authService : AuthService) {
    let temp = localStorage.getItem('userConnected');

    if(temp){
      this._authService.$isLogged.pipe(
        tap(() => this.isLogged = true)
      ).subscribe();
    }
  }

  ngOnInit() {
    this.items = [
      {
        label: 'Accueil',
        icon: '/assets/img/icons/home.png',
        routerLink: '/',
        visible: false,

      },
      {
        label: 'Tournois',
        icon: '/assets/img/icons/trophy.png',
        routerLink: '//gestion-tournoi/landing-page',
        visible: false,
        items: [
          [
            { label: 'Liste', icon: '/assets/img/icons/verifier.png', routerLink: '/gestion-tournoi/list-tournoi' },
            { label: 'Ajouter', icon: '/assets/img/icons/icone-plus.png', routerLink: '/gestion-tournoi/add-tournoi' },
          ]
        ]
      },
    ];
  }

  onLogout() {
    this._authService.logout();
    this.isLogged = false;
  }

  sidebarVisible: boolean = false;

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  toggleVisible(item: MegaMenuItem): void {
    this.items?.forEach(i => i.visible = false)
    item.visible = true;
  }

}
