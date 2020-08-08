import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LotService {

  constructor(public _http: HttpClient) { }

  public createLot(data): Observable<any> {
    return this._http.post(env.base_url + "/lot", data)
  }

  public fetchLotsByAuction(auctionId): Observable<any> {
    return this._http.get(env.base_url + "/lot/" + auctionId)
  }

}
