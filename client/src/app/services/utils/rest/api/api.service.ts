import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http: HttpClient) { }

  public get(url: string): Observable<any> {
    return this._http.request(new HttpRequest('GET', url))
      .pipe(
        filter(e => e.type === HttpEventType.Response)
      );
  }

  public post(url: string, body: any): Observable<any> {
    return this._http.request(new HttpRequest('POST', url, body, {
      reportProgress: true
    }));
  }
}
