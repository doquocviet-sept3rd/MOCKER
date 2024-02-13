import { AbstractService, HttpMethod } from './abstract.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface AuthResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService extends AbstractService<any> {
  ROUTE: string = 'api/v1/auth';

  signIn(username: string, password: string): Observable<AuthResponse> {
    return this.request(HttpMethod.POST, `${this.ROUTE}/authenticate`, {
      body: {
        username,
        password
      },
      errorIgnore: true
    });
  }

  signUp(username: string, password: string): Observable<AuthResponse> {
    return this.request(HttpMethod.POST, `${this.ROUTE}/register`, {
      body: {
        username,
        password
      },
      errorIgnore: true
    });
  }

}
