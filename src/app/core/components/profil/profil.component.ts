import {Component, OnInit} from '@angular/core';
import {MembersService} from "../../../gestion-tournoi/services/members.service";
import {UserDTO, UserGender} from "../../../shared/models/user";



@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit{

  member! : UserDTO | undefined
    constructor(private _memberService : MembersService) {
    }


  ngOnInit(): void {
    this.member = this._memberService.getMember();
  }

  protected readonly UserGender = UserGender;
}
