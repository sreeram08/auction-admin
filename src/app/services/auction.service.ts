import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {

  constructor(public _http: HttpClient) { }

  public fetchAuctions(): Observable<any> {
    return this._http.get(env.base_url + "/auction")
  };

  public createAuction(data): Observable<any> {
    return this._http.post(env.base_url + "/auction", data)
  }

  public editAuction(data): Observable<any> {
    return this._http.put(env.base_url + "/auction", data)
  }

  public fetchAuctionById(data): Observable<any> {
    return this._http.get(env.base_url + "/auction/" + data)
  }

  public fetchUsersInAuction(auctionId): Observable<any> {
    return this._http.get(env.base_url + "/auction/users/" + auctionId)
  }
}
