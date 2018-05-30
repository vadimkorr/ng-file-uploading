import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { RestService } from './services/rest.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private _fb: FormBuilder,
    private _restService: RestService) {}

  formGroup = this._fb.group({
    file: new FormControl(null)
  });

  uploadFile() {

  }

  sayHi() {
    this._restService.sayHi().subscribe(r => {
      console.log(`Server responded: ${r}`);
    });
  }
}
