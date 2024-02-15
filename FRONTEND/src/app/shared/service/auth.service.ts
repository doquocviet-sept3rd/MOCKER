import { AbstractService, HttpMethod } from './abstract.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface AuthRequest {
  username: string;
  password: string;
  otpCode?: string;
}

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

  signUp(authRequest: AuthRequest): Observable<AuthResponse> {
    return this.request(HttpMethod.POST, `${this.ROUTE}/register`, {
      body: authRequest,
      errorIgnore: true
    });
  }

  verify(username: string): Observable<unknown> {
    return this.get(`${this.ROUTE}/verify?username=${username}`, {
      errorIgnore: true
    });
  }

}
