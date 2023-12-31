import {Injectable} from '@angular/core';
import {TokenDTO, UserDTO, UserRole} from "../models/user";
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
  private _$auth: BehaviorSubject<TokenDTO | undefined>

  constructor(private _http: HttpClient,
              private _router: Router) {
    this._$auth= new BehaviorSubject<TokenDTO | undefined>(this.connectedUser);
  }

  login(username: string, password: string): Observable<TokenDTO> {
    return this._http.post<TokenDTO>(`${this._urlAPI}/login`, {username, password}).pipe(
      tap((response: TokenDTO) => this.connectedUser = response),
    )
  }

  readonly AUTH_KEY = 'userConnected'

  get connectedUser$(){
    return this._$auth.asObservable()
  }
  get connectedUser(): TokenDTO | undefined {
    const authString = localStorage.getItem(this.AUTH_KEY)
    return authString ? JSON.parse(authString) as TokenDTO : undefined
    // return this._$auth.getValue()

  }

  set connectedUser(value: TokenDTO | undefined) {
    if (value){
      localStorage.setItem(this.AUTH_KEY, JSON.stringify(value))
      localStorage.setItem('role', this.connectedUser?.user.role || '')
    }
    else{
      localStorage.removeItem(this.AUTH_KEY)
      localStorage.removeItem('role')
    }
    this._$auth.next(this.connectedUser)
  }

  get isAdmin() {
      return this._$auth.pipe(map (auth => auth?.user.role === 'Admin'))
  }

  get token$() {
    return this._$auth.pipe(map(auth => auth?.token))
  }

  get username(): Observable<string | undefined> {
    return this._$auth.pipe(map(auth => auth?.user.username))
  }

  get isConnected() {
    return this.connectedUser
  }


  get token() {
    return this.connectedUser?.token
  }

  get role(){
    return this.connectedUser?.user.role
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

  set $isLogged(value: boolean) {
    this._$isLogged.next(value);
  }

  logout(): void {
    this.connectedUser = undefined
    localStorage.removeItem('AUTH_KEY')
    this.$isLogged = false;

    this._router.navigateByUrl('/home')
  }


}

