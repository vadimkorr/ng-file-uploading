import { Observable } from "rxjs";
import { RestService } from "./../../../services/utils/rest/rest.service";
import { Injectable } from "@angular/core";
import { UploaderModule } from "../../uploader.module";

@Injectable()
export class UploaderService {
  constructor(private _restService: RestService) {}

  sayHi(): Observable<any> {
    return this._restService.sayHi();
  }

  uploadFile(file: File): Observable<any> {
    const formData: any = new FormData();
    formData.append("file", file, file.name);
    return this._restService.uploadFile(formData);
  }
}
