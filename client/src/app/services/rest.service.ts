import { UrlService } from './url.service';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Urls } from '../consts/urls';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(
    private _apiService: ApiService,
    private _urlService: UrlService) { }

  sayHi(): Observable<any> {
    const fullUrl = this._urlService.getUrl(Urls.getHi);
    return this._apiService.get(fullUrl);
  }
  uploadFile(data: any): Observable<any> {
    const fullUrl = this._urlService.getUrl(Urls.uploadFile);
    return this.uploadFile(data);
  }
}
