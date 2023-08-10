import {Component, OnInit} from '@angular/core';
import {MegaMenuItem} from "primeng/api";


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

  toggleVisible(item: MegaMenuItem): void {
    this.items?.forEach(i => i.visible = false)
    item.visible = true;
  }

  sidebarVisible: boolean = false;

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }
}

