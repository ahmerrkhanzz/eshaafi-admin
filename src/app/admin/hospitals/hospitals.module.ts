import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../../components/shared.module";

import { HospitalsRoutingModule } from "./hospitals-routing.module";
import { HospitalsComponent } from "./hospitals.component";
import { ViewHospitalsComponent } from "./view-hospitals/view-hospitals.component";
import { HospitalsService } from "./hospitals.service";
import { AddHospitalComponent } from './add-hospital/add-hospital.component';

@NgModule({
  declarations: [HospitalsComponent, ViewHospitalsComponent, AddHospitalComponent],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    HospitalsRoutingModule,
  ],
  exports: [HospitalsComponent, ViewHospitalsComponent, AddHospitalComponent],
  providers: [HospitalsService],
})
export class HospitalsModule {}
