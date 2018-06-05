import { ReactiveFormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UploaderComponent } from "./uploader.component";
import { UploaderService } from "./services/uploader/uploader.service";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: UploaderComponent
  }
];

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)],
  declarations: [UploaderComponent],
  providers: [UploaderService]
})
export class UploaderModule {}
