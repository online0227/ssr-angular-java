import { SERVER_ADDRESS } from '../../../app.constants';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UniversalStorage } from '@shared/storage/universal.storage';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    protected http: HttpClient,
    @Inject(UniversalStorage) private _appStorage: Storage,    private router: Router
  ) { }

  signUp(username, email, name, password) {
    return this.http.post<any>(
      `/api/auth/signup`, {
      username: username,
      email: email,
      name: name,
      password: password
    }).pipe(      map(
        data => {
          return data;
        }
      )
    );
  }

  executeJWTAuthenticationService(usernameOrEmail, password) {
    return this.http.post<any>(
      `/api/auth/signin`, {
      usernameOrEmail: usernameOrEmail,
      password: password
    }).pipe(      map(
        data => {
          let auth = { username : data.username, token : `Bearer ${data.accessToken}` }
          this._appStorage.setItem('authenticaterUser', auth.username);
          this._appStorage.setItem('token', auth.token);
          return auth;
        }
      )
    );
  }

}

export class AuthenticationBean {
  constructor(public message: string) { }
}