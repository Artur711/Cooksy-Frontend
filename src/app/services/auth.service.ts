import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {catchError, mapTo, tap} from "rxjs/operators";
import {LoginData} from "../models/loginData";
import {environment} from "../../environments/environment";
// import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private loggedUser!: string;
  private userId!: number;

  constructor(private http: HttpClient) {}

  register(user: {username: string, password: string, email: string}): Observable<boolean> {
    return this.http.post<any>(`${environment.apiUrlHost}/register`, user)
      .pipe(
      mapTo(true),
          catchError(error => {
            alert("Oops!, Username or email already in use.");
//             swal("Oops!", "Username or email already in use.", "error");
            // alert('Username or email already in use.');
            return of(false);
          }));
  }

  login(user: {username: string, password: string}): Observable<boolean> {
    return  this.http.post<any>(`${environment.apiUrlHost}/login`, user)
      .pipe(
        tap((data: LoginData) => this.doLoginUser(data.username, data.token, data.userId)),
        mapTo(true),
        catchError(error => {
//           swal("Oops!", "Incorrect login details.", "error");
          alert("Oops!, Incorrect login details.");
          // alert('Incorrect login details.');
          return of(false);
        }));
  }

  logout() {
    return this.http.post<any>(`${environment.apiUrlHost}/logout`, {})
      .pipe(
      tap(() => this.doLogoutUser()),
      mapTo(true),
      catchError(error => {
      alert('logout error');
      return of(false);
    }));
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  private doLoginUser(username: string, token: string, userId: number) {
    console.log(username + " username")
    console.log(userId + " userId")
    localStorage.setItem("isLogged", "true");
    this.loggedUser = username;
    this.storeToken(token);
  }

  public doLogoutUser() {
    this.loggedUser = "";
    this.removeToken();
    localStorage.setItem("isLogged", "false");
  }

  private storeToken(token: string) {
    localStorage.setItem(this.JWT_TOKEN, token);
  }

  private removeToken() {
    localStorage.removeItem(this.JWT_TOKEN);
  }

  public getLoggedUser() {
    return this.loggedUser;
  }
}
