import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../../shared/services/auth.service";
import {Observable, Subscription, tap} from "rxjs";
import {MegaMenuItem} from "primeng/api";
import {UserRole} from "../../../shared/models/user";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLogged = false;
  isAdmin!: boolean;
  items: MegaMenuItem[] | undefined;

  sidebarVisible: boolean = false;
  subscription$$!: Subscription;

  constructor(private _authService: AuthService) {
      this.subscription$$ = this._authService.connectedUser$.subscribe((user) => {
        console.log('auth:', user)
        this.isLogged = user !== undefined;
        this.isAdmin = this.isLogged ? user?.user.role === 'Admin' : false
        this.updateMenuVisibility()
      });
    //
    // }
  }

  ngOnInit() {
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

  ngOnDestroy(): void {
    this.subscription$$.unsubscribe()
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
  }


  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }


}
