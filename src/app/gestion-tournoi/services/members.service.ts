import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ChangePasswordDTO, Member, MemberForm} from "../models/member";
import {Observable, tap} from "rxjs";
import {UserDTO} from "../../shared/models/user";

@Injectable()
export class MembersService {

  constructor(private _http : HttpClient) { }

  private _urlTournament = 'https://khun.somee.com/api/Member'

  addMember (addMemberForm : MemberForm) : Observable<MemberForm>{
    return this._http.post<MemberForm>(`${this._urlTournament}`, addMemberForm).pipe(
      tap(() => (`addMember : ${console.log(addMemberForm)})`))
    )
  }

  changePassword (passwordForm : ChangePasswordDTO) : Observable<ChangePasswordDTO>{
    return this._http.patch<ChangePasswordDTO>(`${this._urlTournament}`, passwordForm).pipe(
      tap(() => (`changePassword : ${console.log(passwordForm)})`))
    )
  }

  existEmail (availableEmail : UserDTO)  {
    const headers = new HttpHeaders({
      [availableEmail.email]: availableEmail.email,
      [availableEmail.id]: availableEmail.id,
    });

    return this._http.head<boolean>(`${this._urlTournament}/existsEmail`, { headers });
  }

  existUsername (availableUsername : UserDTO)  {
    const headers = new HttpHeaders({
      [availableUsername.username]: availableUsername.username,
      [availableUsername.id]: availableUsername.id,
    });

    return this._http.head<boolean>(`${this._urlTournament}/existsUsername`, { headers });
  }





}
