import {Injectable} from '@angular/core';
import {TokenDTO, UserDTO} from "../models/user";
import {BehaviorSubject, map, Observable, of, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _urlAPI = 'https://khun.somee.com/api'
  private _$isLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _$auth: BehaviorSubject<TokenDTO | undefined> = new BehaviorSubject<TokenDTO | undefined>(this.connectedUser);


  constructor(private _http: HttpClient,
              private _router: Router) {
  }

  login(username: string, password: string): Observable<TokenDTO> {
    return this._http.post<TokenDTO>(`${this._urlAPI}/login`, {username, password}).pipe(
      tap((response: TokenDTO) => {
        this.connectedUser = response
      })
    )
  }

  readonly AUTH_KEY = 'userConnected'

  get connectedUser(): TokenDTO | undefined {
    const authString = localStorage.getItem(this.AUTH_KEY)
    if (authString) {
      return JSON.parse(authString) as TokenDTO
    } else {
      return undefined
    }
  }

  set connectedUser(value: TokenDTO | undefined) {
    if (value)
      localStorage.setItem(this.AUTH_KEY, JSON.stringify(value))
    else
      localStorage.removeItem(this.AUTH_KEY)

    this._$auth.next(this.connectedUser)
  }

  isAdmin(): boolean  {
    return this._$auth.value?.user.role === 'Admin'
  }

  get token$() {
    return this._$auth.pipe(map(auth => auth?.token))
  }

  get username(): Observable<string | undefined> {
    return this._$auth.pipe(map(auth => auth?.user.username))
  }

  get isConnected() {
    return !!this.connectedUser
  }

  get token(){
    return this.connectedUser?.token
  }

  set username(value: string) {
    const currentAuth = this._$auth.value;

    if (currentAuth) {
      currentAuth.user.username = value;
      this._$auth.next(currentAuth);
    }
  }
  get $isLogged(): Observable<boolean> {
    return this._$isLogged.asObservable();
  }

  set $isLogged(value: boolean){
    this._$isLogged.next(value);
  }

  logout(): void {
    this.connectedUser = undefined
    localStorage.removeItem('AUTH_KEY')
    this.$isLogged = false;

    this._router.navigateByUrl('/home')
  }
}
