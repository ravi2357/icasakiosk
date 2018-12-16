import { ApiService } from './api.service';
import { Http } from '@angular/http/src/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthenticationService {
  private showLoginSubject: Subject<boolean> = new Subject();
  showLogin$: Observable<boolean>;
  private isLoggedInSubject: Subject<any> = new Subject();
  isLoggedIn$: Observable<any>;
  private _nextURL: string;
  constructor(private apiService: ApiService) {
    this.showLogin$ = this.showLoginSubject.asObservable();
    this.isLoggedIn$ = this.isLoggedInSubject.asObservable();
  }

  get nextURL() {
    return this._nextURL;
  }
  set nextURL(url) {
    this._nextURL = url;
  }
  login(data): Observable<any> {
    return this.apiService.create('deployment/authenticatedeployment/', data).map(response => {
     return response;
    });
  }

  logout() {
    localStorage.removeItem('userData');
  }

  isLogin() {
    return JSON.parse(localStorage.getItem('userData')) ? true : false;
  }
  userDetails(): any {
    return JSON.parse(localStorage.getItem('userData'));
  }

  emitLoginEvent(response) {
    this.isLoggedInSubject.next(response);
  }

}
