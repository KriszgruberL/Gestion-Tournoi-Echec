import {Component, OnInit} from '@angular/core';
import {MegaMenuItem} from "primeng/api";

class Link {
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {


  items: MegaMenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Accueil',
        icon: '/assets/img/home.png',
        routerLink : '/'

      },
      {
        label: 'Tournois',
        icon: '/assets/img/trophy.png',
        routerLink : '/gestion-tournoi/landing-page',
        items: [
        ]
      },

    ];
  }



  sidebarVisible: boolean = false;

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }
}

