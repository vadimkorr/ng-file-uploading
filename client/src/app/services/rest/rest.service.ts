import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Urls } from "@consts/urls";
import { ApiService } from "@services/rest/api/api.service";
import { UrlService } from "@services/url/url.service";

@Injectable({
  providedIn: "root"
})
export class RestService {
  constructor(
    private _apiService: ApiService,
    private _urlService: UrlService
  ) {}

  sayHi(): Observable<any> {
    const fullUrl = this._urlService.getUrl(Urls.getHi);
    return this._apiService.get(fullUrl);
  }
  uploadFile(data: any): Observable<any> {
    const fullUrl = this._urlService.getUrl(Urls.uploadFile);
    return this._apiService.post(fullUrl, data);
  }
  upload2File(data: any): Observable<any> {
    const fullUrl = this._urlService.getUrl(Urls.upload2File);
    return this._apiService.post(fullUrl, data);
  }
  downloadFile(): Observable<any> {
    const fullUrl = this._urlService.getUrl(Urls.downloadFile);
    return this._apiService.get(fullUrl);
  }
}
