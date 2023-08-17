import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ChangePasswordDTO, Member, MemberForm} from "../models/member";
import {Observable, tap} from "rxjs";
import {UserDTO} from "../../shared/models/user";
import {AuthService} from "../../shared/services/auth.service";

@Injectable()
export class MembersService {

  constructor(private _http : HttpClient,
              private _authService : AuthService) { }

  private _urlTournament = 'https://khun.somee.com/api/Member'


  addMember (addMemberForm : MemberForm) : Observable<MemberForm>{
    return this._http.post<MemberForm>(`${this._urlTournament}`, addMemberForm).pipe(
      tap(() => (`addMember : ${console.log(addMemberForm)})`))
    )
  }

  getMember() : UserDTO | undefined {
    return this._authService.connectedUser?.user
  }

  changePassword (passwordForm : ChangePasswordDTO) : Observable<ChangePasswordDTO>{
    return this._http.patch<ChangePasswordDTO>(`${this._urlTournament}`, passwordForm).pipe(
      tap(() => (`changePassword : ${console.log(passwordForm)})`))
    )
  }

  existUsername (username: string)  {
    return this._http.head<null>(`${this._urlTournament}/existsUsername?username=${username}`);
  }

  existEmail (email: string)  {
    return this._http.head<null>(`${this._urlTournament}/existsEmail?email=${email}`);
  }





}
