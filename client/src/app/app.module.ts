import { UploaderModule } from "./uploader/uploader.module";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { ApiService } from "@services/rest/api/api.service";
import { RestService } from "@services/rest/rest.service";
import { UrlService } from "@services/url/url.service";
import { Route } from "@angular/compiler/src/core";

const routes: Routes = [
  {
    path: "",
    loadChildren: "./uploader/uploader.module#UploaderModule"
  }
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [ApiService, RestService, UrlService],
  bootstrap: [AppComponent]
})
export class AppModule {}
