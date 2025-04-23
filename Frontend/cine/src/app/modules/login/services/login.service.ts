import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ILoginResponse } from '../interfaces/login.interface';
import { API } from 'src/config';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  api= API;

  private isLoginSubject = new BehaviorSubject<boolean>(false);
  private isMenuSubject = new BehaviorSubject<boolean>(false);
  private hideLoginSubject = new BehaviorSubject<boolean>(false);
  private hideMenuSubject = new BehaviorSubject<boolean>(false);
  
  constructor(private router: Router, private http: HttpClient) { }

  getIsLogin() {
    return this.isLoginSubject.asObservable();
  }

  getIsMenu() {
    return this.isMenuSubject.asObservable();
  }

  getHideLogin() {
    return this.hideLoginSubject.asObservable();
  }

  getHideMenu() {
    return this.hideMenuSubject.asObservable();
  }

  login(credentials: { user_name: string, password: string }): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(this.api+"/login", credentials);
  }

  logout(): void {
    this.isMenuSubject.next(false);
    this.hideLoginSubject.next(false);
    this.isLoginSubject.next(false);

    setTimeout(() => {
      this.hideMenuSubject.next(false);
    }, 300);
    localStorage.removeItem('token'); 
    this.router.navigate(['/login']);
  }
}