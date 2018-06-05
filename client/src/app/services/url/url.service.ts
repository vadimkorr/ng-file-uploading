import { Injectable } from "@angular/core";
import { environment } from "@environments/environment";

@Injectable({
  providedIn: "root"
})
export class UrlService {
  getUrl(url: string) {
    return `${environment.baseUrl}${url}`;
  }
}
