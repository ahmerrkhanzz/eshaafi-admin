import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../../components/shared.module";

import { PatientsRoutingModule } from "./patients-routing.module";
import { ViewPatientsComponent } from "./view-patients/view-patients.component";
import { PatientsComponent } from "./patients.component";
import { AddPatientComponent } from "./add-patient/add-patient.component";
import { PatientService } from "./patient.service";

@NgModule({
  declarations: [ViewPatientsComponent, PatientsComponent, AddPatientComponent],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    PatientsRoutingModule,
  ],
  exports: [ViewPatientsComponent, PatientsComponent, AddPatientComponent],
  providers: [PatientService],
})
export class PatientsModule {}
