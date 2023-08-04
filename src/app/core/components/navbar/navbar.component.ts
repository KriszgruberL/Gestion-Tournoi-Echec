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

      },
      {
        label: 'Tournois',
        icon: '/assets/img/trophy.png',
        items: []
      },

    ];
  }



  sidebarVisible: boolean = false;

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }
}

