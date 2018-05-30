import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ApiService } from './services/utils/rest/api/api.service';
import { RestService } from './services/utils/rest/rest.service';
import { UrlService } from './services/utils/url/url.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [ApiService, RestService, UrlService],
  bootstrap: [AppComponent]
})
export class AppModule { }
