import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NguCarouselModule } from "@ngu/carousel";

import { TopnavComponent } from "./topnav/topnav.component";
import { FooterComponent } from "./footer/footer.component";
import { AdminLoginComponent } from "./admin-login/admin-login.component";
import { ConfirmationDialogueComponent } from "./confirmation-dialogue/confirmation-dialogue.component";
import { ConfirmationDialogueService } from "./confirmation-dialogue/confirmation-dialogue.service";
import { CustomTableComponent } from './custom-table/custom-table.component';
import { SearchPipe } from './pipes/search.pipe';
import { AddUpdateFeatureModalComponent } from './add-update-feature-modal/add-update-feature-modal.component';
import { ServicesTreatmentsComponent } from './services-treatments/services-treatments.component';
import { GeneralInformationComponent } from './general-information/general-information.component';
import { TimingsComponent } from './timings/timings.component';

@NgModule({
  declarations: [
    TopnavComponent,
    FooterComponent,
    AdminLoginComponent,
    ConfirmationDialogueComponent,
    CustomTableComponent,
    SearchPipe,
    AddUpdateFeatureModalComponent,
    GeneralInformationComponent,
    TimingsComponent,
    ServicesTreatmentsComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NguCarouselModule,
  ],
  exports: [
    TopnavComponent,
    FooterComponent,
    AdminLoginComponent,
    ConfirmationDialogueComponent,
    CustomTableComponent,
    SearchPipe,
    AddUpdateFeatureModalComponent,
    GeneralInformationComponent,
    TimingsComponent,
    ServicesTreatmentsComponent,
  ],
  entryComponents: [],
  providers: [ConfirmationDialogueService],
})
export class SharedModule {}
