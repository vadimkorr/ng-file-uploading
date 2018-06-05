import { UploaderService } from "./services/uploader/uploader.service";
import { Component } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { CalcService } from "../services/utils/calc/calc.service";
import { HttpEventType } from "@angular/common/http";

@Component({
  selector: "app-uploader",
  templateUrl: "./uploader.component.html",
  styleUrls: ["./uploader.component.scss"]
})
export class UploaderComponent {
  uploadingProgress = 0;
  fileToUpload: File;

  constructor(
    private _fb: FormBuilder,
    private _uploaderService: UploaderService,
    private _calcService: CalcService
  ) {}

  formGroup = this._fb.group({
    name: new FormControl(
      null,
      Validators.compose([Validators.required, Validators.minLength(2)])
    ),
    file: new FormControl(null, Validators.required)
  });

  onFileChange(event: any) {
    this.fileToUpload = event.target.files[0];
  }

  submit() {
    this._uploaderService.uploadFile(this.fileToUpload).subscribe(e => {
      switch (e.type) {
        case HttpEventType.DownloadProgress:
          console.log("DownloadProgress", e);
          break;
        case HttpEventType.Response:
          console.log("Response", e);
          break;
        case HttpEventType.ResponseHeader:
          console.log("ResponseHeader", e);
          break;
        case HttpEventType.Sent:
          console.log("Sent", e);
          break;
        case HttpEventType.UploadProgress:
          console.log("UploadProgress", e);
          this.uploadingProgress = this._calcService.getPartInPercent(
            e.loaded,
            e.total
          );
          break;
        case HttpEventType.User:
          console.log("User", e);
          break;
      }
    });
  }

  sayHi() {
    this._uploaderService.sayHi().subscribe(r => {
      console.log(`Server responded: ${r.body.data}`);
    });
  }
}
