import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  getUrl(url: string) {
    return `${environment.baseUrl}${url}`;
  }
}
