import { Injectable } from "@angular/core";
import * as FileSaver from "file-saver";

@Injectable({
  providedIn: "root"
})
export class FileService {
  constructor() {}

  save(file: File) {
    FileSaver.saveAs(file, file.name);
  }
}
