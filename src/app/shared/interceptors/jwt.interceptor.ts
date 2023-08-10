import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private _authService : AuthService) {}


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this._authService.token;
    if(token){
      const newRequest = request.clone({
        setHeaders: {
          'Authorization': `Bearer ${token}`
        }
      })
      return next.handle(newRequest);
    }
    else
      return next.handle(request);
  }
}
