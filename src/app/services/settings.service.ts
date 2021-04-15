import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserDto} from "../models/dto";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private settingUrl = `${environment.apiUrl}/user`

  constructor(private http: HttpClient) { }

  getUser$(): Observable<UserDto> {
    return this.http.get<UserDto>(this.settingUrl)
  }
}
