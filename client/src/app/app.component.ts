import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators, Validator } from '@angular/forms';
import { map } from 'rxjs/operators';
import { HttpEventType } from '@angular/common/http';
import { CalcService } from './services/utils/calc/calc.service';
import { RestService } from './services/utils/rest/rest.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  uploadingProgress = 0;
  filesToUpload: File[] = [];

  constructor(
    private _fb: FormBuilder,
    private _restService: RestService,
    private _calcService: CalcService ) {}

  formGroup = this._fb.group({
    name: new FormControl(null, Validators.compose([Validators.required, Validators.minLength(2)])),
    email: new FormControl(null, Validators.required),
    file: new FormControl(null, Validators.required)
  });

  submit() {
    const formData: any = new FormData();
    for (let i = 0; i < this.filesToUpload.length; i++) {
      const f = this.filesToUpload[i];
      formData.append('files', f, f.name);
    }
    this._restService.uploadFile(formData)
      .subscribe(e => {
        switch (e.type) {
          case HttpEventType.DownloadProgress:
            console.log('DownloadProgress', e);
            break;
          case HttpEventType.Response:
            console.log('Response', e);
            break;
          case HttpEventType.ResponseHeader:
            console.log('ResponseHeader', e);
            break;
          case HttpEventType.Sent:
            console.log('Sent', e);
            break;
          case HttpEventType.UploadProgress:
            console.log('UploadProgress', e);
            this.uploadingProgress = this._calcService.getPartInPercent(e.loaded, e.total);
            break;
          case HttpEventType.User:
            console.log('User', e);
            break;
        }
      });
  }

  sayHi() {
    this._restService.sayHi().subscribe(r => {
      console.log(`Server responded: ${r.body.data}`);
    });
  }

  download() {
    this._restService.downloadFile()
      .subscribe(r => {
        console.log(r);
      });
  }

  onfileChange(event: any) {
    this.filesToUpload = event.target.files;
  }
}
