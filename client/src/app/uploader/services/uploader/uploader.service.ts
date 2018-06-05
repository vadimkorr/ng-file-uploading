import { Observable } from "rxjs";
import { RestService } from "@services/rest/rest.service";
import { Injectable } from "@angular/core";
import { UploaderModule } from "../../uploader.module";

@Injectable()
export class UploaderService {
  constructor(private _restService: RestService) {}

  sayHi(): Observable<any> {
    return this._restService.sayHi();
  }

  uploadFile(file: File, name: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append("name", name);
    formData.append("file", file);
    return this._restService.uploadFile(formData);
  }
}
