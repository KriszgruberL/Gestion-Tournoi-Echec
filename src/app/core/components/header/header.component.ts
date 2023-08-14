import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../shared/services/auth.service";
import {tap} from "rxjs";
import {MegaMenuItem} from "primeng/api";
import {UserRole} from "../../../shared/models/user";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLogged = false;
  isAdmin: boolean = false;
  items: MegaMenuItem[] | undefined;

  constructor(private _authService: AuthService) {
    let temp = localStorage.getItem('userConnected');

    if (temp) {
      this._authService.$isLogged.pipe(
        tap(() => this.isLogged = true)
      ).subscribe();
      this._authService.$isAdmin().subscribe(admin => {
        this.isAdmin = !!admin;
      });

      console.log(this.isAdmin)
    }
  }


  ngOnInit() {
    this._authService.$isAdmin().subscribe(admin => {
      this.isAdmin = admin === 'Admin';
      this.updateMenuVisibility();
    });

    this.items = [
      {
        label: 'Accueil',
        icon: '/assets/img/icons/home.png',
        routerLink: '/',
        visible: true
      },
      {
        label: 'Tournois',
        icon: '/assets/img/icons/trophy.png',
        routerLink: '/gestion-tournoi/list-tournoi',
        visible: true,

      },
      {
        label: 'Ajouter un membre',
        icon: '/assets/img/icons/ajouter-un-utilisateur-blanc.png',
        routerLink: '/gestion-tournoi/members/add-member',
        visible: this.isAdmin,
      },
      {
        label: 'Ajouter un tournoi',
        icon: '/assets/img/icons/plus-blanc.png',
        routerLink: '/gestion-tournoi/add-tournoi',
        visible: this.isAdmin
      }
    ]

  }

  updateMenuVisibility(): void {
    if (this.items) {
      this.items.forEach((item) => {
        if (item.label === 'Ajouter un membre' || item.label === 'Ajouter un tournoi') {
          item.visible = this.isAdmin;
        }
      });
    }
  }

  onLogout() {
    this._authService.logout();
    this.isLogged = false;
    this.isAdmin = false;
    this.updateMenuVisibility()
  }

  sidebarVisible: boolean = false;

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }


}
