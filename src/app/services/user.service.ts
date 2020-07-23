import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { environment as env } from "../../environments/environment"
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  isLoggedIn = new Subject<boolean>();
  constructor(public _http: HttpClient) { }

  public login(data): Observable<any> {
    return this._http.post(env.base_url + "/users/login", data)
  }
  public fetchUsers(): Observable<any> {
    return this._http.get(env.base_url + "/users")
  }
}
